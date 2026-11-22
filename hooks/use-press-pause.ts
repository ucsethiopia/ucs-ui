import { useState, type PointerEvent, type MouseEvent } from "react";

const MOUSE = "mouse";

export interface PressPauseHandlers {
  onPointerEnter: (event: PointerEvent) => void;
  onPointerLeave: (event: PointerEvent) => void;
  onPointerDown: (event: PointerEvent) => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
  onContextMenu: (event: MouseEvent) => void;
}

/**
 * Pauses a scrolling strip while a mouse hovers it, or while a finger or pen
 * presses and holds it. Pointer events (not mouse events) keep the two apart:
 * a tap on a touch screen fires emulated mouseenter with no matching
 * mouseleave, which would otherwise leave the strip stuck paused.
 *
 * Starting a page scroll on the strip makes the browser fire pointercancel,
 * so the strip resumes as soon as the gesture turns into a scroll.
 */
export function usePressPause(): { paused: boolean; handlers: PressPauseHandlers } {
  const [hovered, setHovered] = useState(false);
  const [held, setHeld] = useState(false);

  const release = () => setHeld(false);

  const handlers: PressPauseHandlers = {
    onPointerEnter: (event) => {
      if (event.pointerType === MOUSE) setHovered(true);
    },
    onPointerLeave: (event) => {
      if (event.pointerType === MOUSE) setHovered(false);
      else release();
    },
    onPointerDown: (event) => {
      if (event.pointerType !== MOUSE) setHeld(true);
    },
    onPointerUp: release,
    onPointerCancel: release,
    // A long press would otherwise open the image/share menu on touch devices.
    onContextMenu: (event) => {
      if (held) event.preventDefault();
    },
  };

  return { paused: hovered || held, handlers };
}
