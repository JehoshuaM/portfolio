import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import marlexLogo from '../assets/marlexLogo.png';
import amethystLogo from '../assets/amethystLogo.png';
import xylonLogo from '../assets/xylonLogo.webp';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    index: '01',
    role: 'Founder',
    org: 'Marlex',
    date: 'May 2026 - now',
    location: 'Remote',
    logo: marlexLogo,
    desc: 'Currently building a new agency for web app development, design, and infrastructure.',
  },
  {
    index: '02',
    role: 'SWE',
    org: 'XylonFFA',
    date: 'Jan 2026 - now',
    location: 'Remote, based in UK',
    logo: xylonLogo,
    desc: 'Shipped event features, backend systems, and server fixes for a competitive Minecraft ecosystem.',
  },
];

export default function Positions() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.scene').forEach((scene) => {
        gsap.from(scene, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scene,
            start: 'top 80%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="positions" className="positions section">
      <div className="positions__intro">
        <p className="section-label">Scenes</p>
        <h2 className="positions__title">Work history, framed like <span className="stack__title-accent">film</span>.</h2>
      </div>

      <div className="positions__list">
        {scenes.map((scene) => (
          <article key={scene.index} className="scene">

            <div className="scene__body">
              <p className="scene__eyebrow">{scene.index}</p>
              <h3 className="scene__title">{scene.org}</h3>
              <p className="scene__role">{scene.role}</p>
              <p className="scene__desc">{scene.desc}</p>
            </div>

            <div className="scene__aside">
              <img src={scene.logo} alt="" className="scene__logo" loading="lazy" aria-hidden="true" />
              <div className="scene__meta">
                <span>{scene.date}</span>
                <span>{scene.location}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}