import { useEffect, useRef } from 'react'

export default function TransitionBlend() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
    const lerp = (start, end, amount) => start + (end - start) * amount

    let rafId = 0
    const current = {
      x: 66,
      y: 72,
      alpha: 0.22,
      shift: 72,
      width: 16,
    }
    const target = { ...current }

    const ease = (value) => {
      return value < 0.5
        ? 4 * value * value * value
        : 1 - Math.pow(-2 * value + 2, 3) / 2
    }

    const update = (time) => {
      const rect = element.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      const total = rect.height + viewport
      const progress = clamp((viewport - rect.top) / total, 0, 1)
      const eased = ease(progress)
      const breath = Math.sin(time * 0.0014 + eased * 2.6) * 0.02

      target.x = 70 - eased * 52
      target.y = 78 - eased * 60
      target.alpha = clamp(0.2 + eased * 0.32 + breath, 0.18, 0.55)
      target.shift = 74 - eased * 46
      target.width = 14 + eased * 26 + Math.sin(time * 0.001) * 3

      current.x = lerp(current.x, target.x, 0.08)
      current.y = lerp(current.y, target.y, 0.08)
      current.alpha = lerp(current.alpha, target.alpha, 0.08)
      current.shift = lerp(current.shift, target.shift, 0.08)
      current.width = lerp(current.width, target.width, 0.08)

      const lightStop = clamp(current.shift - current.width, 6, 78)
      const darkStop = clamp(current.shift + current.width, 26, 96)

      element.style.setProperty('--blend-x', `${current.x.toFixed(2)}%`)
      element.style.setProperty('--blend-y', `${current.y.toFixed(2)}%`)
      element.style.setProperty('--blend-alpha', current.alpha.toFixed(3))
      element.style.setProperty('--blend-light-stop', `${lightStop.toFixed(2)}%`)
      element.style.setProperty('--blend-dark-stop', `${darkStop.toFixed(2)}%`)

      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return <div ref={ref} className="transition-blend" aria-hidden="true" />
}
