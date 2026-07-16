import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from './usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const COMMITS = [
  { id: 'c1', x: 80, branch: 'main', message: 'initial commit', hash: 'a3f1c2', author: 'jehoshua' },
  { id: 'c2', x: 180, branch: 'main', message: 'add hashing', hash: '7b9e44', author: 'jehoshua' },
  { id: 'c3', x: 280, branch: 'main', message: 'proof of work', hash: '4d2aba', author: 'jehoshua' },
  { id: 'c4', x: 380, branch: 'feature', message: 'branch: persist', hash: '9f8c11', author: 'jehoshua' },
  { id: 'c5', x: 480, branch: 'feature', message: 'add leveldb', hash: 'c0218a', author: 'jehoshua' },
  { id: 'c6', x: 580, branch: 'main', message: 'merge feature', hash: 'e772b9', author: 'jehoshua', isMerge: true },
  { id: 'c7', x: 680, branch: 'main', message: 'release v0.1', hash: '11ad5f', author: 'jehoshua' },
];

const MAIN_Y = 130;
const FEATURE_Y = 60;

const LINKS = [
  { from: 'c1', to: 'c2', branch: 'main' },
  { from: 'c2', to: 'c3', branch: 'main' },
  { from: 'c3', to: 'c4', branch: 'feature', curve: true },
  { from: 'c4', to: 'c5', branch: 'feature' },
  { from: 'c5', to: 'c6', branch: 'feature', curve: true, merge: true },
  { from: 'c3', to: 'c6', branch: 'main' },
  { from: 'c6', to: 'c7', branch: 'main' },
];

export default function GitStage() {
  const ref = useRef(null);
  const svgRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const root = ref.current;
    const svg = svgRef.current;
    if (!root || !svg) return;

    if (reduced) return;

    const ctx = gsap.context(() => {
      const paths = svg.querySelectorAll('.git-link');
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const nodes = svg.querySelectorAll('.git-commit');
      gsap.set(nodes, { scale: 0, opacity: 0, transformOrigin: 'center center' });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.6,
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: root,
          start: 'top 70%',
          once: true,
        },
      });

      COMMITS.forEach((commit) => {
        const idx = COMMITS.indexOf(commit);
        const incoming = svg.querySelectorAll(`.git-link[data-to="${commit.id}"]`);
        if (incoming.length) {
          tl.to(
            incoming,
            { strokeDashoffset: 0, duration: 0.7, stagger: 0.15 },
            idx * 0.7
          );
        }
        tl.to(
          svg.querySelector(`.git-commit[data-id="${commit.id}"]`),
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
          idx * 0.7 + 0.35
        );
      });

      tl.to({}, { duration: 1.2 });
      tl.to(paths, {
        strokeDashoffset: (i, el) => el.getTotalLength(),
        duration: 0.5,
        ease: 'power2.in',
      });
      tl.to(nodes, { scale: 0, opacity: 0, duration: 0.4, stagger: 0.04 }, '<');

      const head = svg.querySelector('.git-commit--head');
      if (head) {
        gsap.to(head, {
          scale: 1.15,
          duration: 1.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          transformOrigin: 'center center',
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  const width = 760;
  const height = 200;

  const linkPath = (link) => {
    const from = COMMITS.find((c) => c.id === link.from);
    const to = COMMITS.find((c) => c.id === link.to);
    if (!from || !to) return '';
    const y1 = from.branch === 'main' ? MAIN_Y : FEATURE_Y;
    const y2 = to.branch === 'main' ? MAIN_Y : FEATURE_Y;

    if (link.curve) {
      const midX = (from.x + to.x) / 2;
      return `M ${from.x} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${to.x} ${y2}`;
    }
    return `M ${from.x} ${y1} L ${to.x} ${y2}`;
  };

  return (
    <div ref={ref} className="git">
      <svg
        ref={svgRef}
        className="git__svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Interactive git history graph with branches and a merge"
      >
        <defs>
          <linearGradient id="git-main-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--amethyst)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--amethyst)" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="git-feature-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--amber)" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        <text x="20" y={MAIN_Y + 4} className="git__branch-label" fill="var(--muted)">
          main
        </text>
        <text x="20" y={FEATURE_Y + 4} className="git__branch-label" fill="var(--muted)">
          feature
        </text>

        <line
          x1="60"
          y1={MAIN_Y}
          x2={width - 30}
          y2={MAIN_Y}
          stroke="var(--ink)"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <line
          x1="60"
          y1={FEATURE_Y}
          x2={width - 30}
          y2={FEATURE_Y}
          stroke="var(--ink)"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {LINKS.map((link, i) => (
          <path
            key={`link-${i}`}
            className="git-link"
            data-from={link.from}
            data-to={link.to}
            d={linkPath(link)}
            fill="none"
            stroke={link.branch === 'main' ? 'url(#git-main-grad)' : 'url(#git-feature-grad)'}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {COMMITS.map((commit, i) => {
          const y = commit.branch === 'main' ? MAIN_Y : FEATURE_Y;
          const isHead = i === COMMITS.length - 1;
          return (
            <g
              key={commit.id}
              className={`git-commit ${isHead ? 'git-commit--head' : ''}`}
              data-id={commit.id}
              transform={`translate(${commit.x} ${y})`}
              onMouseEnter={() => setActiveId(commit.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(commit.id)}
              onBlur={() => setActiveId(null)}
              tabIndex={0}
              role="button"
              aria-label={`Commit ${commit.hash}: ${commit.message}`}
              style={{ cursor: 'pointer' }}
            >
              {commit.isMerge && (
                <circle
                  cx="0"
                  cy="0"
                  r="14"
                  fill="none"
                  stroke="var(--amber)"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
              )}
              <circle
                cx="0"
                cy="0"
                r={commit.isMerge ? 9 : 8}
                fill={commit.branch === 'main' ? 'var(--ink)' : 'var(--ink-soft)'}
                stroke="var(--paper)"
                strokeWidth="2"
              />
              <circle
                cx="0"
                cy="0"
                r="3"
                fill={commit.branch === 'main' ? 'var(--amethyst)' : 'var(--amber)'}
              />

              {activeId === commit.id && (
                <g transform={`translate(0 ${commit.branch === 'main' ? -28 : 28})`}>
                  <rect
                    x="-80"
                    y={commit.branch === 'main' ? -30 : 6}
                    width="160"
                    height="44"
                    rx="6"
                    fill="var(--paper)"
                    stroke="rgba(0,0,0,0.08)"
                  />
                  <text
                    x="0"
                    y={commit.branch === 'main' ? -16 : 22}
                    textAnchor="middle"
                    className="git__tip-hash"
                    fill="var(--muted)"
                  >
                    {commit.hash}
                  </text>
                  <text
                    x="0"
                    y={commit.branch === 'main' ? -4 : 34}
                    textAnchor="middle"
                    className="git__tip-message"
                    fill="var(--ink)"
                  >
                    {commit.message}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      <p className="git__hint">hover a commit · branches diverge & merge</p>
    </div>
  );
}
