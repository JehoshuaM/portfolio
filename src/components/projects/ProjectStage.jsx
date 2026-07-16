import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from './usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectStage({
  index,
  title,
  status,
  description,
  repoHref,
  theme = 'amethyst',
  children,
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.1 },
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 78%',
          end: 'top 20%',
        },
      });

      tl.from('.stage__index', { y: 18, opacity: 0, duration: 0.7 })
        .from('.stage__status', { y: 18, opacity: 0, duration: 0.7 }, '<')
        .from(
          '.stage__title-line',
          { yPercent: 110, opacity: 0, duration: 1.2, stagger: 0.08 },
          '-=0.4'
        )
        .from('.stage__centerpiece', { opacity: 0, scale: 0.94, duration: 1.4 }, '-=0.8')
        .from('.stage__desc', { y: 16, opacity: 0, duration: 0.8 }, '-=0.7')
        .from('.stage__repo', { y: 16, opacity: 0, duration: 0.8 }, '-=0.6');
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  const titleLines = Array.isArray(title) ? title : [title];

  return (
    <article
      ref={ref}
      className={`stage stage--${theme}`}
      data-stage={index}
      aria-labelledby={`stage-title-${index}`}
    >
      <div className="stage__halo" aria-hidden="true" />
      <div className="stage__inner">
        <header className="stage__head">
          <span className="stage__index">
            <span className="stage__index-current">{index}</span>
            <span className="stage__index-divider" aria-hidden="true">/</span>
            <span className="stage__index-total">04</span>
          </span>
          <span className={`stage__status stage__status--${status.toLowerCase().replace(/\s+/g, '-')}`}>
            {status}
          </span>
        </header>

        <h3 id={`stage-title-${index}`} className="stage__title">
          {titleLines.map((line, i) => (
            <span className="stage__title-row" key={i}>
              <span
                className="stage__title-line glare-title"
                data-text={line}
              >
                {line}
              </span>
            </span>
          ))}
        </h3>

        <div className="stage__centerpiece" aria-hidden="false">
          {children}
        </div>

        <p className="stage__desc">{description}</p>

        {repoHref && (
          <a
            className="stage__repo"
            href={repoHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit the ${titleLines.join(' ')} repository (opens in new tab)`}
          >
            <span className="stage__repo-label">Repository</span>
            <span className="stage__repo-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
