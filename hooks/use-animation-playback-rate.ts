import { useEffect, type RefObject } from "react";

const RAMP_DURATION_MS = 800;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

/**
 * Eases the playback rate of an element's running CSS animations toward
 * `targetRate`. Assigning `playbackRate` keeps the animation's current
 * position, so the motion slows or speeds up in place with no jump (changing
 * `animation-duration` instead would snap the element to a new offset).
 *
 * `ready` should flip whenever the animated element mounts or remounts, so
 * the new animation instance is picked up.
 */
export function useAnimationPlaybackRate(
  ref: RefObject<HTMLElement | null>,
  targetRate: number,
  ready: boolean,
): void {
  useEffect(() => {
    const element = ref.current;
    if (!ready || !element) return;

    // Empty under prefers-reduced-motion (animation: none), so this is a no-op.
    const animations = element.getAnimations();
    if (animations.length === 0) return;

    const startRate = animations[0].playbackRate;
    if (startRate === targetRate) return;

    const startTime = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / RAMP_DURATION_MS, 1);
      const rate = startRate + (targetRate - startRate) * easeOutCubic(progress);
      animations.forEach((animation) => {
        animation.playbackRate = rate;
      });
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [ref, targetRate, ready]);
}
