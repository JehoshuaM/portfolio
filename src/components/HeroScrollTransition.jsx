import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollTransition({ children }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const revealWordRef = useRef(null);
  const signatureRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const stage = stageRef.current;
    const revealWord = revealWordRef.current;

    const ctx = gsap.context(() => {
      const signatureText = signatureRef.current?.querySelector('text');
      let pathLength = 0;

      if (signatureText) {
        pathLength = signatureText.getTotalLength ? signatureText.getTotalLength() : 1000;
        
        gsap.set(signatureText, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
      }

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        stage,
        {
          scale: 0.83,
          duration: 0.65,
          ease: 'power2.inOut',
        },
        0
      )
        .from(
          revealWord,
          {
            scale: 1.12,
            duration: 0.7,
            ease: 'power2.out',
          },
          0
        );

      if (signatureText) {
        tl.to(
          signatureText,
          {
            strokeDashoffset: 0,
            duration: 0.35,
            ease: 'power1.inOut',
          },
          0.62
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-transition" ref={sectionRef}>
      <div className="hero-transition__reveal" aria-hidden="true">
        <span className="hero-transition__reveal-word" ref={revealWordRef}>
          CRAFT
        </span>
      </div>

      <div className="hero-transition__stage" ref={stageRef}>
        {children}
      </div>

      <div
        className="hero-transition__signature"
        ref={signatureRef}
        aria-hidden="true"
      >
        <svg viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text
            x="50%"
            y="60%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="'Brittany Signature', 'BrittanySignature', cursive"
            fontSize="160"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            jehoshua
          </text>
        </svg>
      </div>
    </section>
  );
}