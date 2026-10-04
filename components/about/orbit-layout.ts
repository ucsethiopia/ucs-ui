// Geometry for the Global Network orbit diagram (components/about/orbital-partners.tsx).
// Radii were picked by simulating every node + its name label as boxes
// (labels wrap to 2 lines and grow a hover-only location line): at 160/280
// no label touches another node, label, or the center hub.

export const INNER_RADIUS = 160;
export const OUTER_RADIUS = 280;

// The diagram is drawn in a 640×720 px space (unscaled): ±320 wide = outer
// radius + node radius; ±360 tall leaves room for the bottom node's label.
// Those numbers live in Tailwind classes in orbital-partners.tsx — update
// both together if the radii change.

const FULL_TURN = 2 * Math.PI;
const OFFSET_SEARCH_STEPS = 90;

/** Wrap an angle difference into [-π, π) and return its magnitude. */
function angularDistance(a: number, b: number): number {
  return Math.abs(((a - b + Math.PI) % FULL_TURN + FULL_TURN) % FULL_TURN - Math.PI);
}

function ringAngles(count: number, offset: number): number[] {
  return Array.from({ length: count }, (_, i) => (i / count) * FULL_TURN + offset);
}

/**
 * Inner ring sits half a step off the vertical axis, so no inner node sits
 * directly under an outer node's label at the top or above one at the bottom.
 */
export function innerRingOffset(innerCount: number): number {
  return innerCount > 0 ? Math.PI / innerCount : 0;
}

/**
 * Outer-ring rotation that keeps every outer node as far (angularly) from
 * every inner node as possible — recomputed from the counts, so adding a
 * partner to either ring rebalances the layout automatically.
 */
export function outerRingOffset(innerCount: number, outerCount: number): number {
  if (innerCount === 0 || outerCount === 0) return 0;
  const inner = ringAngles(innerCount, innerRingOffset(innerCount));
  const step = FULL_TURN / outerCount;
  let bestOffset = 0;
  let bestGap = -1;
  for (let s = 0; s < OFFSET_SEARCH_STEPS; s++) {
    const offset = (s / OFFSET_SEARCH_STEPS) * step;
    const gap = Math.min(
      ...ringAngles(outerCount, offset).flatMap((o) => inner.map((i) => angularDistance(o, i))),
    );
    if (gap > bestGap) {
      bestGap = gap;
      bestOffset = offset;
    }
  }
  return bestOffset;
}

/** Position of item `index` of `total` on a ring, starting from 12 o'clock. */
export function orbitPosition(index: number, total: number, radius: number, angleOffset = 0) {
  const angle = (index / total) * FULL_TURN - Math.PI / 2 + angleOffset;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}
