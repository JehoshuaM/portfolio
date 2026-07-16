import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = [
  { text: 'React', size: 'xl', col: '1 / span 4', align: 'start' },
  { text: 'Git', size: 'm', col: '6 / span 2', align: 'center' },
  { text: 'Next.js', size: 'xl', col: '9 / span 4', align: 'end', tone: 'amethyst' },

  { text: 'Docker', size: 'l', col: '2 / span 3', align: 'start' },
  { text: 'Go', size: 'xl', col: '9 / span 3', align: 'center', tone: 'amethyst' },
  { text: 'Java', size: 'xl', col: '5 / span 4', align: 'center', tone: 'red' },
  { text: 'GSAP', size: 'm', col: '11 / span 2', align: 'end', tone: 'amethyst' },

  { text: 'Cloudflare', size: 'l', col: '1 / span 4', align: 'start', tone: 'amber' },
  { text: 'C', size: 'm', col: '6 / span 1', align: 'center' },
  { text: 'Node.js', size: 'xl', col: '8 / span 4', align: 'end' },

  { text: 'MongoDB', size: 'm', col: '2 / span 3', align: 'start' },
  { text: 'Tailwind', size: 'l', col: '5 / span 5', align: 'center' },
  { text: 'VPS', size: 'm', col: '11 / span 2', align: 'end' },

  { text: 'Electron', size: 'l', col: '1 / span 4', align: 'start' },
  { text: 'GitHub Actions', size: 'm', col: '6 / span 4', align: 'center', tone: 'red' },
  { text: 'Linux', size: 'l', col: '10 / span 3', align: 'end' },

  { text: 'Express', size: 'm', col: '2 / span 3', align: 'start' },
  { text: 'PostgreSQL', size: 'l', col: '5 / span 4', align: 'center' },
  { text: 'MySQL', size: 'l', col: '11 / span 2', align: 'end' },
  { text: 'C++', size: 'm', col: '10 / span 1', align: 'end' },

  { text: 'Vite', size: 'm', col: '1 / span 2', align: 'start', tone: 'amber' },
  { text: 'CI/CD', size: 'm', col: '5 / span 3', align: 'center', tone: 'amethyst' },
  { text: 'Gradle', size: 'm', col: '9 / span 3', align: 'end' },
  { text: 'Caddy', size: 'm', col: '3 / span 3', align: 'start', tone: 'amber' },
]

export default function Stack() {
  const ref = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.stack__word', {
        y: 28,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="stack" className="stack section">
      <div className="stack__intro">
        <p className="section-label">Stack</p>
        <p className="stack__aside">tools i use often enough to remember the syntax</p>
      </div>

      <div className="stack__title">
        <h2>
          Tech stack,
          <span className="stack__title-accent"> shaped like typography.</span>
        </h2>
      </div>

      <ul className="stack__cloud" aria-label="Technologies">
        {words.map((word) => (
          <li
            key={word.text}
            className={`stack__word stack__word--${word.size} ${
              word.tone ? `stack__word--${word.tone}` : ''
            }`.trim()}
            style={{ gridColumn: word.col, justifySelf: word.align }}
          >
            {word.text}
          </li>
        ))}
      </ul>
    </section>
  )
}