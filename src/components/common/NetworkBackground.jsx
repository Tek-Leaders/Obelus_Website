import { useEffect, useRef } from 'react';

const MAX_PARTICLES = 150;
const MAX_GLOW_ORBS = 8;
const FRAME_INTERVAL_MS = 33; // ~30fps - plenty smooth for a slow drift
const MAX_Z_LINK_GAP = 0.32; // only link particles at a similar depth

/**
 * A drifting particle network rendered on a full-bleed <canvas>, styled to
 * read as 3D on a flat 2D canvas: every particle and glow orb carries a depth
 * value `z` (0 = closest, 1 = farthest), and everything else - size,
 * brightness, drift speed, and how far it shifts as the "camera" pans - is
 * derived from that one number. The two cues doing the real work are
 * parallax (near things move more than far things as the view pans, whether
 * from the pointer or the built-in idle sway) and depth-limited connections
 * (a dot only links to others at a similar depth, so the web reads as a
 * volume instead of one flat plane). Reusable anywhere a "live" network motif
 * fits; currently used behind the Request a Demo hero. Respects
 * prefers-reduced-motion by drawing one static frame instead of animating,
 * and stops entirely when the tab is hidden.
 *
 * Driven by setInterval rather than requestAnimationFrame on purpose - see
 * the note inline below where the loop is started.
 */
export default function NetworkBackground({
  className = '',
  dotColor = 'rgba(0, 198, 94, 0.95)',
  glowColor = 'rgba(0, 198, 94, 0.8)',
  lineColor = 'rgba(0, 198, 94, 0.28)',
  orbColor = 'rgba(0, 198, 94, 0.35)',
  density = 0.00016, // particles per pixel of canvas area, before the cap
  maxLinkDistance = 170,
  speed = 0.18,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let orbs = [];
    let intervalId = null;
    let t = 0;

    // Pointer-driven parallax target, smoothed toward each frame; falls back
    // to a slow autonomous sway when the pointer never moves (touch devices,
    // or a visitor who simply isn't moving the mouse over this section).
    let targetPanX = 0;
    let targetPanY = 0;
    let panX = 0;
    let panY = 0;

    function seedParticles() {
      const count = Math.min(MAX_PARTICLES, Math.max(40, Math.round(width * height * density)));
      particles = Array.from({ length: count }, () => {
        const z = Math.random(); // 0 = near, 1 = far
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          z,
          r: 2.6 - z * 1.8,
        };
      });

      const orbCount = Math.min(MAX_GLOW_ORBS, Math.max(4, Math.round((width * height) / 260000)));
      orbs = Array.from({ length: orbCount }, () => {
        const z = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed * 0.3,
          vy: (Math.random() - 0.5) * speed * 0.3,
          z,
          r: (90 + Math.random() * 160) * (1.15 - z * 0.5),
        };
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
    }

    // Depth-scaled world-space drift, independent of the camera pan applied
    // at draw time - near particles (small z) drift faster than far ones,
    // which is the parallax cue that sells the depth.
    function wrapDrift(p, radiusPad) {
      const depthSpeed = 1.6 - p.z * 1.1;
      p.x += p.vx * depthSpeed;
      p.y += p.vy * depthSpeed;
      if (p.x < -radiusPad || p.x > width + radiusPad) p.vx *= -1;
      if (p.y < -radiusPad || p.y > height + radiusPad) p.vy *= -1;
      p.x = Math.min(Math.max(p.x, -radiusPad), width + radiusPad);
      p.y = Math.min(Math.max(p.y, -radiusPad), height + radiusPad);
    }

    function step() {
      t += 1;
      // Idle autonomous sway (a slow figure-eight) blended with whatever the
      // pointer wants, so there's always some parallax even with no cursor.
      const swayX = Math.sin(t * 0.006) * 18;
      const swayY = Math.cos(t * 0.004) * 12;
      panX += ((targetPanX + swayX) - panX) * 0.04;
      panY += ((targetPanY + swayY) - panY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Soft, large, slow-drifting glow orbs behind everything else - the
      // bokeh-like depth layer. Farthest orbs pan the least.
      for (const o of orbs) {
        wrapDrift(o, o.r);
        const parallax = 1 - o.z * 0.8;
        const ox = o.x + panX * parallax;
        const oy = o.y + panY * parallax;
        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        gradient.addColorStop(0, orbColor);
        gradient.addColorStop(1, 'rgba(0, 198, 94, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ox, oy, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of particles) wrapDrift(p, 0);

      // Screen-space position for this frame only, depth-parallaxed - used
      // for both the connecting lines and the dots so they stay lined up.
      const projected = particles.map((p) => {
        const parallax = 1 - p.z * 0.8;
        return { x: p.x + panX * parallax, y: p.y + panY * parallax, z: p.z, r: p.r };
      });

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          if (Math.abs(a.z - b.z) > MAX_Z_LINK_GAP) continue; // stay within one depth band
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxLinkDistance) {
            const depthFade = 1 - (a.z + b.z) / 2; // far pairs fade out
            ctx.globalAlpha = (1 - dist / maxLinkDistance) * (0.35 + depthFade * 0.65);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Glowing dots, farthest first (painter's algorithm) so near dots sit
      // visually on top of far ones, then a single shadowBlur pass for glow.
      const byDepth = [...projected].sort((a, b) => b.z - a.z);
      ctx.shadowColor = glowColor;
      for (const p of byDepth) {
        ctx.globalAlpha = 1 - p.z * 0.7;
        ctx.shadowBlur = 8 - p.z * 5;
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    resize();
    step();
    if (!prefersReduced) {
      // setInterval rather than requestAnimationFrame on purpose. A recursive
      // rAF chain never lets the browser's main thread reach true idle, and
      // Chrome's `--virtual-time-budget` test mode only advances the virtual
      // clock at idle - so under that harness a perpetual rAF loop measurably
      // starved unrelated work queued around the same time (the hero text's
      // scroll-reveal IntersectionObserver callback next to it sat at the
      // very start of its transition long after it should have settled).
      // setInterval's callbacks are ordinary macrotasks and don't have that
      // interaction, and at ~30fps for a slow drift the visual result is
      // identical either way.
      intervalId = setInterval(step, FRAME_INTERVAL_MS);
    }

    const onResize = () => {
      resize();
      step();
    };
    const onVisibility = () => {
      const visible = document.visibilityState === 'visible';
      if (visible && !prefersReduced && intervalId === null) {
        intervalId = setInterval(step, FRAME_INTERVAL_MS);
      } else if (!visible && intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      targetPanX = -relX * 60;
      targetPanY = -relY * 40;
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      if (intervalId !== null) clearInterval(intervalId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [dotColor, glowColor, lineColor, orbColor, density, maxLinkDistance, speed]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
