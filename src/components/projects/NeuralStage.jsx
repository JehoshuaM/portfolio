import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from './usePrefersReducedMotion';
import { pauseOffscreen } from '../../utils/animationLifecycle';

gsap.registerPlugin(ScrollTrigger);

// Layer layout: 4 input → 6 hidden → 6 hidden → 3 output.
// Declared at module scope so the array identity is stable across renders.
const NEURAL_LAYERS = [4, 6, 6, 3];

const SVG_WIDTH = 720;
const SVG_HEIGHT = 280;
const PAD_X = 90;

/**
 * Pre-computes the neuron positions and fully-connected links for the
 * network. Called once via useMemo so the layout is stable across renders.
 */
function buildNetwork(layers) {
  const neurons = [];
  const connections = [];

  const colSpacing = (SVG_WIDTH - PAD_X * 2) / (layers.length - 1);
  let id = 0;
  layers.forEach((count, layerIdx) => {
    const x = PAD_X + layerIdx * colSpacing;
    const rowSpacing = (SVG_HEIGHT - 80) / (count + 1);
    for (let i = 0; i < count; i++) {
      const y = 40 + rowSpacing * (i + 1);
      neurons.push({ id: id++, layer: layerIdx, idx: i, x, y });
    }
  });

  let cid = 0;
  for (let l = 0; l < layers.length - 1; l++) {
    const from = neurons.filter((n) => n.layer === l);
    const to = neurons.filter((n) => n.layer === l + 1);
    from.forEach((a) => {
      to.forEach((b) => {
        connections.push({ id: cid++, from: a, to: b });
      });
    });
  }

  return { neurons, connections };
}

/**
 * NeuralStage
 * -----------
 * Interactive neural network.
 *  - Gentle pulsing on every neuron
 *  - Cursor movement propagates a signal through the nearest input neuron
 *  - Clicking anywhere triggers a full forward-pass animation
 *
 * Pure SVG. No fake graphs, no random floating numbers.
 */
export default function NeuralStage() {
  const ref = useRef(null);
  const svgRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const layers = NEURAL_LAYERS;

  const { neurons, connections } = useMemo(() => buildNetwork(layers), [layers]);

  useEffect(() => {
    const root = ref.current;
    const svg = svgRef.current;
    if (!root || !svg) return;

    if (reduced) return;

    // Cache layout once; refresh on resize only — never mid-mousemove.
    let svgRect = svg.getBoundingClientRect();
    const refreshRect = () => {
      svgRect = svg.getBoundingClientRect();
    };
    window.addEventListener('resize', refreshRect, { passive: true });

    const inputNodes = Array.from(svg.querySelectorAll('[data-layer="0"]'));
    // Pre-parse data-y so mousemove never touches the DOM attribute repeatedly.
    const inputMeta = inputNodes.map((node) => ({
      node,
      y: parseFloat(node.getAttribute('data-y')),
      core: node.querySelector('.neural-node-core'),
      id: node.getAttribute('data-id'),
    }));

    const allCores = svg.querySelectorAll('.neural-node-core');
    const allLinks = svg.querySelectorAll('.neural-link');

    let moveRaf = 0;
    let pendingY = null;
    let lastNearestId = null;

    const applyNearest = (my) => {
      let nearest = null;
      let nearestDist = Infinity;
      for (let i = 0; i < inputMeta.length; i++) {
        const dist = Math.abs(inputMeta[i].y - my);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = inputMeta[i];
        }
      }

      if (!nearest || nearest.id === lastNearestId) return;
      lastNearestId = nearest.id;

      // Batch writes: de-emphasize, then emphasize nearest path.
      gsap.to(allCores, { fill: 'var(--ink)', duration: 0.4, overwrite: 'auto' });
      gsap.to(allLinks, { strokeOpacity: 0.1, duration: 0.3, overwrite: 'auto' });

      gsap.to(nearest.core, {
        fill: 'var(--amber)',
        duration: 0.3,
        overwrite: 'auto',
      });

      const outgoing = svg.querySelectorAll(`.neural-link[data-from="${nearest.id}"]`);
      gsap.to(outgoing, { strokeOpacity: 0.55, duration: 0.3, overwrite: 'auto' });

      const downstreamCores = [];
      outgoing.forEach((l) => {
        const toId = l.getAttribute('data-to');
        const toNode = svg.querySelector(`.neural-node[data-id="${toId}"]`);
        const core = toNode?.querySelector('.neural-node-core');
        if (core) downstreamCores.push(core);
      });
      if (downstreamCores.length) {
        gsap.to(downstreamCores, {
          fill: 'var(--amethyst)',
          duration: 0.4,
          delay: 0.15,
          overwrite: 'auto',
        });
      }
    };

    const onMouseMove = (e) => {
      // Read only clientY + cached rect height — no layout thrashing.
      pendingY = ((e.clientY - svgRect.top) / svgRect.height) * SVG_HEIGHT;
      if (moveRaf) return;
      moveRaf = requestAnimationFrame(() => {
        moveRaf = 0;
        if (pendingY != null) applyNearest(pendingY);
      });
    };

    const onClick = () => {
      gsap.killTweensOf(allCores);

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      layers.forEach((_, layerIdx) => {
        const nodes = svg.querySelectorAll(`[data-layer="${layerIdx}"] .neural-node-core`);
        const incomingLinks =
          layerIdx === 0
            ? []
            : svg.querySelectorAll(`.neural-link[data-to-layer="${layerIdx}"]`);

        tl.to(
          incomingLinks,
          { strokeOpacity: 0.75, duration: 0.35, stagger: 0.01 },
          layerIdx * 0.35
        )
          .to(
            incomingLinks,
            { strokeOpacity: 0.1, duration: 0.6 },
            layerIdx * 0.35 + 0.35
          )
          .to(
            nodes,
            {
              fill: 'var(--amber)',
              scale: 1.4,
              duration: 0.4,
              stagger: 0.03,
              transformOrigin: 'center center',
            },
            layerIdx * 0.35
          )
          .to(
            nodes,
            { fill: 'var(--ink)', scale: 1, duration: 0.6 },
            layerIdx * 0.35 + 0.45
          );
      });
    };

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: root,
          start: 'top 70%',
          once: true,
        },
      });

      introTl
        .from(allLinks, {
          opacity: 0,
          duration: 1.1,
          stagger: 0.005,
        })
        .from(
          svg.querySelectorAll('.neural-node'),
          {
            scale: 0,
            opacity: 0,
            duration: 0.7,
            stagger: 0.04,
            transformOrigin: 'center center',
          },
          '-=0.8'
        );

      // Gentle continuous pulse — paused while off-screen.
      const pulse = gsap.to(allCores, {
        scale: 1.18,
        opacity: 0.85,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.12, from: 'random' },
        transformOrigin: 'center center',
      });

      const links = Array.from(allLinks);
      const linkPulseTl = gsap.timeline({ repeat: -1 });
      for (let i = 0; i < 4; i++) {
        const link = links[Math.floor(Math.random() * links.length)];
        if (!link) continue;
        linkPulseTl
          .to(link, { strokeOpacity: 0.6, duration: 0.6 }, i * 0.8)
          .to(link, { strokeOpacity: 0.12, duration: 0.8 }, i * 0.8 + 0.6);
      }

      pauseOffscreen(root, [pulse, linkPulseTl]);
    }, ref);

    svg.addEventListener('mousemove', onMouseMove, { passive: true });
    svg.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('resize', refreshRect);
      if (moveRaf) cancelAnimationFrame(moveRaf);
      svg.removeEventListener('mousemove', onMouseMove);
      svg.removeEventListener('click', onClick);
      ctx.revert();
    };
  }, [reduced, layers]);

  return (
    <div ref={ref} className="neural">
      <svg
        ref={svgRef}
        className="neural__svg"
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Interactive neural network. Move your cursor or click to trigger a forward pass."
      >
        <defs>
          <radialGradient id="neural-glow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--amethyst)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--amethyst)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* connections */}
        {connections.map((c) => (
          <line
            key={`link-${c.id}`}
            className="neural-link"
            data-from={c.from.id}
            data-to={c.to.id}
            data-to-layer={c.to.layer}
            x1={c.from.x}
            y1={c.from.y}
            x2={c.to.x}
            y2={c.to.y}
            stroke="var(--ink)"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        ))}

        {/* neurons */}
        {neurons.map((n) => (
          <g
            key={`node-${n.id}`}
            className="neural-node"
            data-id={n.id}
            data-layer={n.layer}
            data-y={n.y}
            transform={`translate(${n.x} ${n.y})`}
          >
            <circle className="neural-node-halo" cx="0" cy="0" r="20" fill="url(#neural-glow-grad)" />
            <circle
              className="neural-node-core"
              cx="0"
              cy="0"
              r="7"
              fill="var(--ink)"
              stroke="var(--paper)"
              strokeWidth="1.2"
            />
          </g>
        ))}
      </svg>

      <p className="neural__hint">move cursor · click for forward pass</p>
    </div>
  );
}
