import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from './usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function pseudoHash(seed) {
  const chars = '0123456789abcdef';
  let s = seed * 9301 + 49297;
  let out = '';
  for (let i = 0; i < 12; i++) {
    s = (s * 9301 + 49297) % 233280;
    out += chars[s % 16];
  }
  return out;
}

const TOTAL_BLOCKS = 5;

export default function BlockchainStage() {
  const ref = useRef(null);
  const svgRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(null);

  const blocks = useMemo(() => {
    const list = [];
    for (let i = 0; i < TOTAL_BLOCKS; i++) {
      list.push({
        id: i,
        index: i + 1,
        hash: pseudoHash(i + 1),
        prevHash: i === 0 ? '000000000000' : pseudoHash(i),
        nonce: (i * 4731) % 99999,
        data: i === 0 ? 'genesis' : `tx:${(i * 13).toString(16)}`,
        timestamp: `0x${(0x4f3a + i * 0x10).toString(16)}`,
      });
    }
    return list;
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    const root = ref.current;
    if (!svg || !root) return;

    if (reduced) {
      gsap.set(svg.querySelectorAll('.chain-block'), { opacity: 1, scale: 1, y: 0 });
      gsap.set(svg.querySelectorAll('.chain-link'), { opacity: 1, scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('.chain-block--last', { opacity: 0, scale: 0.85 });
      gsap.set('.chain-block--last .block-fill', { fillOpacity: 0, strokeDasharray: '6, 6' });
      gsap.set('.chain-block--last .block-content', { opacity: 0 });
      gsap.set('.chain-link--last', { scaleX: 0, transformOrigin: 'left center' });

      const introTl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1.2 },
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          once: true,
        },
      });

      introTl
        .from('.chain-block:not(.chain-block--last)', {
          y: 40,
          opacity: 0,
          stagger: 0.15,
        })
        .from(
          '.chain-link:not(.chain-link--last)',
          {
            scaleX: 0,
            opacity: 0,
            stagger: 0.15,
            transformOrigin: 'left center',
          },
          '-=1.0'
        );

      const mineTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 35%',
          once: true,
        },
      });

      mineTl
        .to('.chain-link--last', {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.inOut',
        })
        .to('.energy-pulse-ambient', {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
          stagger: 0.12,
        }, '-=0.4')
        .to('.chain-link', {
          strokeWidth: 5,
          stroke: 'var(--amethyst, #9333ea)',
          opacity: 1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          stagger: 0.08,
        }, '-=1.2')
        .to('.chain-block--last', {
          opacity: 1,
          duration: 0.4,
        }, '-=0.6')
        .to('.chain-block--last .block-fill', {
          stroke: 'var(--amethyst, #9333ea)',
          strokeWidth: 2,
          duration: 0.3,
        }, '-=0.4')
        .to('.chain-block--last .block-fill', {
          fillOpacity: 1,
          strokeDasharray: 'none',
          stroke: 'rgba(147, 51, 234, 0.4)',
          duration: 0.8,
          ease: 'power3.out',
        })
        .to('.chain-block--last', {
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.5)',
        }, '-=0.8')
        .to('.chain-block--last .block-content', {
          opacity: 1,
          duration: 0.5,
        }, '-=0.3')
        .from('.chain-block--last .typed-hash', {
          textShadow: '0 0 10px var(--amethyst)',
          opacity: 0,
          duration: 1,
        }, '-=0.2');

      gsap.to('.chain-glow', {
        opacity: 0.7,
        scale: 1.15,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });

      gsap.to('.energy-pulse-ambient', {
        strokeDashoffset: -200,
        duration: 2.5,
        ease: 'none',
        repeat: -1,
      });

    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  const width = 960;
  const height = 280;
  const padX = 90;
  const usableWidth = width - padX * 2;
  const spacing = usableWidth / (blocks.length - 1);
  const blockY = height / 2;

  return (
    <div ref={ref} className="blockchain" style={{ position: 'relative', width: '100%' }}>
      <svg
        ref={svgRef}
        className="blockchain__svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Interactive premium blockchain ledger simulation"
        style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="link-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--amethyst, #9333ea)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--amethyst, #9333ea)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--amethyst, #9333ea)" stopOpacity="0.15" />
          </linearGradient>
          
          <radialGradient id="glow-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--amethyst, #9333ea)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--amethyst, #9333ea)" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="var(--amethyst, #9333ea)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {blocks.slice(0, -1).map((_, i) => {
          const x1 = padX + i * spacing + 50;
          const x2 = padX + (i + 1) * spacing - 50;

          return (
            <g key={i}>
              <line
                x1={x1}
                y1={blockY}
                x2={x2}
                y2={blockY}
                stroke="rgba(147,51,234,.25)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <line
                x1={x1}
                y1={blockY}
                x2={x2}
                y2={blockY}
                stroke="url(#link-gradient)"
                strokeWidth="4"
                opacity=".4"
                filter="url(#blur)"
              />

              <line
                className="energy-pulse"
                x1={x1}
                y1={blockY}
                x2={x2}
                y2={blockY}
                stroke="url(#pulse-gradient)"
                strokeWidth="3"
                strokeDasharray="30 150"
                strokeDashoffset="180"
              />
            </g>
          );
        })}

        {blocks.map((block, i) => {
          const x = padX + i * spacing;
          const isLast = i === blocks.length - 1;
          const isHovered = activeIndex === i;

          return (
            <g
              key={block.id}
              className={`chain-block ${isLast ? 'chain-block--last' : ''}`}
              transform={`translate(${x} ${blockY})`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(i)}
              onBlur={() => setActiveIndex(null)}
              tabIndex={0}
              role="button"
              aria-label={`Block ${block.index}: Hash ${block.hash}`}
              style={{
                cursor: 'pointer',
                outline: 'none',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <circle
                className="chain-glow"
                cx="0"
                cy="0"
                r="75"
                fill="url(#glow-gradient)"
                pointerEvents="none"
                style={{
                  transition: 'opacity 0.4s ease',
                  opacity: isHovered ? 1 : 0.4
                }}
              />

              <rect
                className="block-fill"
                x="-50"
                y="-50"
                width="100"
                height="100"
                rx="12"
                fill="#07070a" 
                stroke={isHovered ? 'var(--amethyst, #9333ea)' : 'rgba(255,255,255,0.1)'}
                strokeWidth={isHovered ? '2' : '1.2'}
                style={{
                  transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                }}
              />

              <rect
                x="-42"
                y="-42"
                width="84"
                height="84"
                rx="8"
                fill="none"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="1"
                pointerEvents="none"
              />

              <g className="block-content">
                <text
                  x="-36"
                  y="-26"
                  textAnchor="start"
                  fill="rgba(255, 255, 255, 0.3)"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}
                >
                  B_{String(block.index).padStart(2, '0')}
                </text>

                <g style={{
                  transition: 'opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                  opacity: isHovered ? 1 : 0
                }}>
                  <text x="-36" y="-10" fill="rgba(255,255,255,0.25)" style={{ fontFamily: 'monospace', fontSize: '7px', fontWeight: 700 }}>PRV</text>
                  <text x="-12" y="-10" fill="rgba(255,255,255,0.7)" style={{ fontFamily: 'monospace', fontSize: '7px' }}>{block.prevHash.slice(0, 8)}</text>
                  
                  <text x="-36" y="2" fill="rgba(255,255,255,0.25)" style={{ fontFamily: 'monospace', fontSize: '7px', fontWeight: 700 }}>NON</text>
                  <text x="-12" y="2" fill="rgba(255,255,255,0.7)" style={{ fontFamily: 'monospace', fontSize: '7px' }}>{block.nonce}</text>

                  <text x="-36" y="14" fill="rgba(255,255,255,0.25)" style={{ fontFamily: 'monospace', fontSize: '7px', fontWeight: 700 }}>DAT</text>
                  <text x="-12" y="14" fill="var(--amethyst, #9333ea)" style={{ fontFamily: 'monospace', fontSize: '7.5px', fontWeight: 'bold' }}>{block.data}</text>
                </g>

                <g style={{
                  transition: 'opacity 0.25s ease',
                  opacity: isHovered ? 0 : 0.85
                }}>
                  <polygon
                    points="0,-16 14,8 -14,8"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="6"
                    fill="var(--amethyst, #9333ea)"
                    opacity="0.3"
                  />
                </g>

                <text
                  x="0"
                  y="28"
                  textAnchor="middle"
                  className="typed-hash"
                  fill="rgba(255, 255, 255, 0.85)"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '8px',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}
                >
                  {isHovered ? block.hash : `0x${block.hash.slice(0, 5)}`}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      <p className="blockchain__hint" style={{
        textAlign: 'center',
        marginTop: '1.2rem',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: 'rgba(255, 255, 255, 0.35)',
        fontFamily: 'monospace'
      }}>
        Interact with nodes • Scroll to sync ledger
      </p>
    </div>
  );
}