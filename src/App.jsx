import { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Interlude from './components/Interlude';
import Positions from './components/Positions';
import Stack from './components/Stack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import TransitionBlend from './components/TransitionBlend';
import FiveHundredths from './components/FiveHundredths';
import HeroScrollTransition from './components/HeroScrollTransition';

function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      smoothWheel: !prefersReducedMotion,
      smoothTouch: false,
    })

    let rafId = 0

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    const links = document.querySelectorAll('a[href^="#"]')
    const handleAnchorClick = (e) => {
      const link = e.currentTarget
      e.preventDefault()

      const target = document.querySelector(link.getAttribute('href'))

      if (target) {
        lenis.scrollTo(target, {
          duration: prefersReducedMotion ? 0 : 1.4,
        })
      }
    }

    links.forEach((link) => {
      link.addEventListener('click', handleAnchorClick)
    })

    return () => {
      cancelAnimationFrame(rafId)
      links.forEach((link) => {
        link.removeEventListener('click', handleAnchorClick)
      })
      lenis.destroy()
    }
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
      <FiveHundredths screenshotUrl="/lapShot.png" videoUrl="/replay.webm" />
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
