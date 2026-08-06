import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Interlude from './components/Interlude';
import Positions from './components/Positions';
import Stack from './components/Stack';
import Projects from './components/Projects';
import Inspirations from './components/Inspirations';
import Contact from './components/Contact';
import TransitionBlend from './components/TransitionBlend';
import HeroScrollTransition from './components/HeroScrollTransition';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      smoothWheel: !prefersReducedMotion,
      smoothTouch: false,
    });

    // Drive Lenis from GSAP's ticker so scroll + ScrollTrigger share one rAF.
    // Avoids dual animation loops fighting and reduces frame thrashing.
    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const links = document.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = (e) => {
      const link = e.currentTarget;
      e.preventDefault();

      const target = document.querySelector(link.getAttribute('href'));

      if (target) {
        lenis.scrollTo(target, {
          duration: prefersReducedMotion ? 0 : 1.4,
        });
      }
    };

    links.forEach((link) => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      gsap.ticker.remove(tickerFn);
      links.forEach((link) => {
        link.removeEventListener('click', handleAnchorClick);
      });
      lenis.destroy();
    };
  }, []);

  return (
    <main className="site">
      <HeroScrollTransition>
        <Hero />
      </HeroScrollTransition>
      <Intro />
      <Interlude
        quote="THIS, IS MODERN art."
        caption="and i call myself an artist"
        align="right"
        withArt
      />
      <Positions />
      <Stack />
      <Projects />
      <Inspirations />
      <Interlude
        quote="UNFORTUNATELY, IT ALSO RUNS ON JAVASCRIPT."
        caption="post-credit"
      />
      <TransitionBlend />
      <Contact />
      <footer className="footer">
        <div className="footer__left">
          <span>END OF REEL</span>
          <span>© 2026 JEHOSHUA M.</span>
        </div>

        <div className="footer__right">
          <strong>MISERY, POWERED BY JAVASCRIPT.</strong>
          <br />
          Why pay for a therapist
          <br />
          when JavaScript does it for free?
        </div>
      </footer>
    </main>
  );
}

export default App;
