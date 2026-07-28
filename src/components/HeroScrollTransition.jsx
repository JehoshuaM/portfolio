import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FINAL_SCALE = 0.83;

const REVEAL_WORDS_ROW_1 = [
  'REACT',
  'NEXT.JS',
  'NODE.JS',
  'TAILWIND',
  'DOCKER',
  'JAVA',
];
const REVEAL_WORDS_ROW_2 = [
  'GSAP',
  'POSTGRESQL',
  'MONGODB',
  'C++',
  'LINUX',
  'CLOUDFLARE',
];
const REVEAL_REPEATS = 3;

/**
 * Side inset % so the crop frame matches the previous width animation:
 * final visible width ≈ window.innerHeight * FINAL_SCALE, centered.
 * Uses clip-path (compositor) instead of animating layout `width`.
 */
function cropInsetPercent() {
  const vw = window.innerWidth || 1;
  const target = (window.innerHeight || 1) * FINAL_SCALE;
  return Math.max(0, (1 - target / vw) * 50);
}

export default function HeroScrollTransition({ children }) {
  const sectionRef = useRef(null);
  const cropRef = useRef(null);
  const stageRef = useRef(null);
  const revealTrackTopRef = useRef(null);
  const revealTrackBottomRef = useRef(null);
  const signatureRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const crop = cropRef.current;
    const stage = stageRef.current;
    const revealTrackTop = revealTrackTopRef.current;
    const revealTrackBottom = revealTrackBottomRef.current;

    const ctx = gsap.context(() => {
      const signaturePath = signatureRef.current?.querySelector('path');

      if (signaturePath) {
        // getTotalLength once at setup — not during scrub frames.
        const pathLength = signaturePath.getTotalLength();
        gsap.set(signaturePath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
      }

      gsap.set(crop, { clipPath: 'inset(0 0% 0 0%)' });

      const animatedEls = [crop, stage, revealTrackTop, revealTrackBottom].filter(Boolean);

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
          onToggle: (self) => {
            // Promote layers only while the pin/scrub is active.
            animatedEls.forEach((el) => {
              if (!self.isActive) {
                el.style.willChange = 'auto';
                return;
              }
              if (el === crop) el.style.willChange = 'clip-path';
              else if (el === stage) el.style.willChange = 'transform, filter';
              else el.style.willChange = 'transform';
            });
          },
        },
      });

      tl.to(
        stage,
        {
          scale: FINAL_SCALE,
          filter: 'grayscale(100%)',
          duration: 0.65,
          ease: 'power2.inOut',
          force3D: true,
        },
        0
      )
        .to(
          crop,
          {
            // clip-path replaces width animation — no layout thrashing.
            clipPath: () => `inset(0 ${cropInsetPercent()}% 0 ${cropInsetPercent()}%)`,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          0
        )
        .fromTo(
          revealTrackTop,
          { xPercent: 0 },
          { xPercent: -50, duration: 1, ease: 'none', force3D: true },
          0
        )
        .fromTo(
          revealTrackBottom,
          { xPercent: -50 },
          { xPercent: 0, duration: 1, ease: 'none', force3D: true },
          0
        );

      if (signaturePath) {
        tl.to(
          signaturePath,
          {
            strokeDashoffset: 0,
            duration: 0.35,
            ease: 'power1.inOut',
          },
          0.62
        );
      }
    }, section);

    return () => {
      // Clear any leftover will-change from onToggle.
      ;[crop, stage, revealTrackTop, revealTrackBottom].forEach((el) => {
        if (el) el.style.willChange = 'auto';
      });
      ctx.revert();
    };
  }, []);

  const rowWordsTop = Array.from({ length: REVEAL_REPEATS }).flatMap(
    () => REVEAL_WORDS_ROW_1
  );
  const rowWordsBottom = Array.from({ length: REVEAL_REPEATS }).flatMap(
    () => REVEAL_WORDS_ROW_2
  );

  return (
    <section className="hero-transition" ref={sectionRef}>
      <div className="hero-transition__reveal" aria-hidden="true">
        <div className="hero-transition__reveal-row">
          <div className="hero-transition__reveal-track" ref={revealTrackTopRef}>
            {[0, 1].map((set) => (
              <div className="hero-transition__reveal-set" key={set}>
                {rowWordsTop.map((word, i) => (
                  <span className="hero-transition__reveal-word" key={i}>
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="hero-transition__reveal-row">
          <div
            className="hero-transition__reveal-track"
            ref={revealTrackBottomRef}
          >
            {[0, 1].map((set) => (
              <div className="hero-transition__reveal-set" key={set}>
                {rowWordsBottom.map((word, i) => (
                  <span className="hero-transition__reveal-word" key={i}>
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-transition__crop" ref={cropRef}>
        <div className="hero-transition__stage" ref={stageRef}>
          {children}
        </div>
      </div>
      <div
        className="hero-transition__signature"
        ref={signatureRef}
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M60 260 C 110 130, 150 40, 190 20 C 220 6, 210 90, 180 170 C 240 90, 300 40, 330 70 C 350 92, 300 150, 260 200 C 320 230, 360 190, 340 140"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
