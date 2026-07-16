import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Header from './Header';
import { Link } from 'react-router-dom';

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

      tl.set('.hero__shutter', { autoAlpha: 1 })
        .to('.hero__shutter-panel--top', { yPercent: -110, duration: 1.6 }, 0)
        .to('.hero__shutter-panel--bottom', { yPercent: 110, duration: 1.6 }, 0)
        .to('.hero__shutter-split--left', { xPercent: -110, opacity: 0, duration: 1.8 }, 0.2)
        .to('.hero__shutter-split--right', { xPercent: 110, opacity: 0, duration: 1.8 }, 0.2)
        .fromTo('.hero__shutter-line', { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: 'power2.out' }, 0.35)
        .to('.hero__shutter-line', { opacity: 0, duration: 0.8 }, 1.2)
        .set('.hero__shutter', { autoAlpha: 0 }, 2.1)
        .from('.hero__brand', { y: -20, opacity: 0, duration: 0.9 }, 0.9)
        .from('.hero__line', { yPercent: 120, duration: 1.2, stagger: 0.08 }, 1.05)
        .from('.hero__statement', { y: 14, opacity: 0, duration: 0.8 }, 1.45)
        .from('.hero__meta', { y: 14, opacity: 0, duration: 0.8 }, 1.6)
        .from('.hero__cta', { y: 14, opacity: 0, duration: 0.8 }, 1.75)
        .from('.hero__aside', { x: 24, opacity: 0, duration: 0.9 }, 1.65);
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="hero" className="hero">
      <div className="hero__shutter" aria-hidden="true">
        <span className="hero__shutter-panel hero__shutter-panel--top" />
        <span className="hero__shutter-panel hero__shutter-panel--bottom" />
        <span className="hero__shutter-split hero__shutter-split--left" />
        <span className="hero__shutter-split hero__shutter-split--right" />
        <span className="hero__shutter-line" />
      </div>

      <Header className="hero__brand" />

      <div className="hero__grid">
        <div className="hero__primary">
          <p className="section-label hero__eyebrow">personal portfolio</p>

          <h1 className="hero__title">
            <span className="hero__line glare-title" data-text="JEHOSHUA">JEHOSHUA</span>
            <span className="hero__line hero__line--accent glare-title" data-text="Software Engineer">Software Engineer</span>
          </h1>

          <p className="hero__statement">
            a software engineer building applications on the internet.
          </p>
        </div>

        <div className="hero__aside">
          <p className="hero__note">built somewhere past midnight.</p>
          <p className="hero__note">unfortunately it also runs on JavaScript.</p>

          <Link to="/notes" className="hero__cta-primary" viewTransition>
            View Notes
          </Link>
        </div>
      </div>
    </section>
  )
}