import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SITES = [
  { name: 'Lando Norris', href: 'https://landonorris.com', host: 'landonorris.com' },
  { name: 'Linear', href: 'https://linear.app', host: 'linear.app' },
  { name: 'Stripe', href: 'https://stripe.com', host: 'stripe.com' },
  { name: 'Vercel', href: 'https://vercel.com', host: 'vercel.com' },
  { name: 'Clerk', href: 'https://clerk.com', host: 'clerk.com' },
  { name: 'Dogstudio', href: 'https://dogstudio.co', host: 'dogstudio.co' },
];

export default function Inspirations() {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.inspirations__heading', {
        y: 20,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 78%',
        },
      });

      gsap.from('.inspirations__item', {
        y: 16,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.inspirations__list',
          start: 'top 82%',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="inspirations" ref={ref} className="inspirations section">
      <header className="inspirations__header">
        <h2 className="inspirations__heading glare-title" data-text="Inspirations">
          Inspirations
        </h2>
        <p className="inspirations__lede">
          Sites that set the bar for craft, type, and product feel.
        </p>
      </header>

      <ol className="inspirations__list">
        {SITES.map((site, i) => (
          <li key={site.host} className="inspirations__item">
            <a
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inspirations__link"
            >
              <span className="inspirations__index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="inspirations__name">{site.host}</span>
              <span className="inspirations__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
