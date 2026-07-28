import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pause GSAP tweens/timelines while their trigger is off-screen.
 * Keeps visuals identical but stops compositor work outside the viewport.
 */
export function pauseOffscreen(trigger, animations, options = {}) {
  const list = (Array.isArray(animations) ? animations : [animations]).filter(Boolean);
  if (!trigger || list.length === 0) return null;

  const play = () => {
    list.forEach((anim) => {
      if (anim && typeof anim.play === 'function') anim.play();
    });
  };

  const pause = () => {
    list.forEach((anim) => {
      if (anim && typeof anim.pause === 'function') anim.pause();
    });
  };

  // Start paused if the trigger is not currently intersecting.
  const rect = trigger.getBoundingClientRect();
  const inView =
    rect.bottom > 0 &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight);
  if (!inView) pause();

  return ScrollTrigger.create({
    trigger,
    start: options.start ?? 'top bottom',
    end: options.end ?? 'bottom top',
    onEnter: play,
    onEnterBack: play,
    onLeave: pause,
    onLeaveBack: pause,
  });
}

/**
 * Apply will-change only while an element is actively animating.
 * Clears after the tween completes to avoid stale compositor layers.
 */
export function withWillChange(targets, props, tweenVars = {}) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return gsap.to(targets, tweenVars);

  const willChange = props;
  els.forEach((el) => {
    if (el && el.style) el.style.willChange = willChange;
  });

  const clear = () => {
    els.forEach((el) => {
      if (el && el.style) el.style.willChange = 'auto';
    });
  };

  return gsap.to(targets, {
    ...tweenVars,
    onComplete: () => {
      clear();
      if (typeof tweenVars.onComplete === 'function') tweenVars.onComplete();
    },
    onInterrupt: () => {
      clear();
      if (typeof tweenVars.onInterrupt === 'function') tweenVars.onInterrupt();
    },
  });
}

/**
 * Toggle will-change on a set of elements for the lifetime of a ScrollTrigger.
 */
export function willChangeWhileActive(elements, props, scrollTriggerConfig) {
  const els = gsap.utils.toArray(elements).filter(Boolean);
  const apply = (active) => {
    els.forEach((el) => {
      if (el && el.style) el.style.willChange = active ? props : 'auto';
    });
  };

  return ScrollTrigger.create({
    ...scrollTriggerConfig,
    onToggle: (self) => {
      apply(self.isActive);
      if (typeof scrollTriggerConfig.onToggle === 'function') {
        scrollTriggerConfig.onToggle(self);
      }
    },
    onRefresh: (self) => {
      apply(self.isActive);
      if (typeof scrollTriggerConfig.onRefresh === 'function') {
        scrollTriggerConfig.onRefresh(self);
      }
    },
  });
}
