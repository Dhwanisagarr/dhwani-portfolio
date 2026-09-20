'use client';

import React, { useState, useEffect, useRef } from 'react';

// Custom Zland Amusement Park Loader themed in Red & Pink for Dhwani's Portfolio
// Color palette: Background #660005 (Deep Red), Ride outlines #DF8F9C (Rose Pink), Accent Lights #FFD1DC (Light Soft Pink)

export default function ZlandLoader({ durationMs = 1400 }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Hard failsafe timeout: Loader hides after durationMs + 300ms max
    const failsafeTimeout = setTimeout(() => {
      setFading(true);
      setTimeout(() => setVisible(false), 400);
    }, durationMs + 300);

    const startTime = performance.now();
    let frameId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / durationMs);
      setProgress(p);

      if (p < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setFading(true);
        setTimeout(() => {
          setVisible(false);
        }, 400);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      clearTimeout(failsafeTimeout);
    };
  }, [durationMs]);

  // Only hide once animation completes and fading finishes
  if (!visible) return null;

  const bg = '#660005'; // Deep Red
  const rideColor = '#DF8F9C'; // Rose Pink
  const lightColor = '#FFD1DC'; // Bright Soft Pink

  return (
    <div
      className={`zland-loader-overlay ${fading ? 'fading' : ''}`}
      suppressHydrationWarning
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 999999,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: fading ? 'none' : 'auto',
        transition: 'opacity 0.4s ease-out, visibility 0.4s',
        opacity: fading ? 0 : 1,
        visibility: fading ? 'hidden' : 'visible'
      }}
    >
      <div className="zland-scene-wrapper">
        <ZLScene progress={mounted ? progress : 0} rideColor={rideColor} lightColor={lightColor} bg={bg} />
      </div>

      <style jsx global>{`
        @keyframes zll-auto-dismiss {
          0% { opacity: 1; visibility: visible; pointer-events: auto; }
          70% { opacity: 1; visibility: visible; pointer-events: auto; }
          100% { opacity: 0; visibility: hidden; pointer-events: none; }
        }

        .zland-loader-overlay {
          width: 100vw;
          height: 100dvh;
          animation: zll-auto-dismiss 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .zland-loader-overlay.fading {
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        .zland-scene-wrapper {
          width: 100%;
          max-width: 1200px;
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1.5rem;
          box-sizing: border-box;
        }

        @keyframes zll-wheel { to { transform: rotate(360deg); } }
        @keyframes zll-cabin { to { transform: rotate(-360deg); } }
        @keyframes zll-carousel-orbit {
          0% { transform: translate(0px, -18px); }
          12.5% { transform: translate(42px, -11px); }
          25% { transform: translate(58px, 0px); }
          37.5% { transform: translate(42px, 12px); }
          50% { transform: translate(0px, 19px); }
          62.5% { transform: translate(-42px, 12px); }
          75% { transform: translate(-58px, 0px); }
          87.5% { transform: translate(-42px, -11px); }
          100% { transform: translate(0px, -18px); }
        }
        @keyframes zll-carousel-bob {
          0%, 100% { transform: translateY(-3px); }
          50% { transform: translateY(3px); }
        }
        @keyframes zll-ship-start-open { from { transform: rotate(0deg); } to { transform: rotate(-14deg); } }
        @keyframes zll-ship-open { 0%, 100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }

        @media (max-width: 768px) {
          .zland-scene-wrapper {
            height: 280px;
          }
        }
      `}</style>
    </div>
  );
}

function ZLScene({ progress, rideColor, lightColor, bg }) {
  const p = Math.max(0, Math.min(1, progress));
  const on = [p > 0, p >= 0.2, p >= 0.4, p >= 0.6, p >= 0.8];
  const running = [p >= 0.2, p >= 0.4, p >= 0.6, p >= 0.8, p >= 1];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '12px',
        background: bg
      }}
    >
      <RideSlot width="12%">
        <ZLDropTower motionEnabled={running[0]} color={rideColor} lightColor={lightColor} bg={bg} lights={on[0] ? 'On' : 'Off'} />
      </RideSlot>
      <RideSlot width="15%">
        <ZLFerrisWheel motionEnabled={running[1]} color={rideColor} lightColor={lightColor} bg={bg} lights={on[1] ? 'On' : 'Off'} />
      </RideSlot>
      <RideSlot width="15%">
        <ZLPirateShip motionEnabled={running[2]} color={rideColor} lightColor={lightColor} bg={bg} lights={on[2] ? 'On' : 'Off'} />
      </RideSlot>
      <RideSlot width="15%">
        <ZLCarousel motionEnabled={running[3]} color={rideColor} lightColor={lightColor} bg={bg} lights={on[3] ? 'On' : 'Off'} />
      </RideSlot>
      <RideSlot width="43%">
        <ZLRollerCoaster motionEnabled={running[4]} color={rideColor} lightColor={lightColor} bg={bg} lights={on[4] ? 'On' : 'Off'} />
      </RideSlot>
    </div>
  );
}

function RideSlot({ width, children }) {
  return (
    <div style={{ width, height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      {children}
    </div>
  );
}

/* --- DROP TOWER --- */
const ZL_DropTowerRide_CX = 120;
const ZL_DropTowerRide_TOP_Y = 82;
const ZL_DropTowerRide_BOTTOM_Y = 280;
const ZL_DropTowerRide_TRAVEL = ZL_DropTowerRide_BOTTOM_Y - ZL_DropTowerRide_TOP_Y;
const ZL_DropTowerRide_CYCLE = { liftStart: 0.1, liftEnd: 0.58, release: 0.7, brakeStart: 0.775, brakeEnd: 0.825 };
const ZL_DropTowerRide_WINDOWS = [-36, -12, 12, 36];
const ZL_DropTowerRide_TOWER_LIGHTS = [70, 94, 118, 142, 166, 190, 214, 238, 262, 286];
const ZL_DropTowerRide_CAP_LIGHTS = [100, 110, 120, 130, 140];
const ZL_DropTowerRide_BASE_LIGHTS = [78, 92, 106, 120, 134, 148, 162];

function ZL_DropTowerRide_gondolaY(phase) {
  const t = (phase % 1 + 1) % 1;
  if (t < ZL_DropTowerRide_CYCLE.liftStart) return ZL_DropTowerRide_BOTTOM_Y;
  if (t < ZL_DropTowerRide_CYCLE.liftEnd) {
    const u = (t - ZL_DropTowerRide_CYCLE.liftStart) / (ZL_DropTowerRide_CYCLE.liftEnd - ZL_DropTowerRide_CYCLE.liftStart);
    const eased = u * u * u * (u * (6 * u - 15) + 10);
    return ZL_DropTowerRide_BOTTOM_Y - ZL_DropTowerRide_TRAVEL * eased;
  }
  if (t < ZL_DropTowerRide_CYCLE.release) return ZL_DropTowerRide_TOP_Y;
  const fallTime = ZL_DropTowerRide_CYCLE.brakeStart - ZL_DropTowerRide_CYCLE.release;
  const brakeTime = ZL_DropTowerRide_CYCLE.brakeEnd - ZL_DropTowerRide_CYCLE.brakeStart;
  const peakVelocity = ZL_DropTowerRide_TRAVEL / (fallTime / 2 + brakeTime / 3);
  if (t < ZL_DropTowerRide_CYCLE.brakeStart) {
    const elapsed = t - ZL_DropTowerRide_CYCLE.release;
    return ZL_DropTowerRide_TOP_Y + (peakVelocity / (2 * fallTime)) * elapsed ** 2;
  }
  if (t < ZL_DropTowerRide_CYCLE.brakeEnd) {
    const u = (t - ZL_DropTowerRide_CYCLE.brakeStart) / brakeTime;
    const fallDistance = (peakVelocity * fallTime) / 2;
    const brakeDistance = peakVelocity * brakeTime * (u - u * u + u * u * u / 3);
    return ZL_DropTowerRide_TOP_Y + fallDistance + brakeDistance;
  }
  return ZL_DropTowerRide_BOTTOM_Y;
}

function ZLDropTower({ motionEnabled = true, color = '#DF8F9C', lightColor = '#FFD1DC', bg = '#660005', strokeWidth = 5, lights = 'On' }) {
  const lightsOn = lights === 'On';
  const duration = 4;
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
      <svg width="100%" height="100%" viewBox={`0 0 240 ${336 + strokeWidth / 2}`} preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <ZL_DropTowerRide_Tower lightsOn={lightsOn} lightColor={lightColor} bg={bg} />
        {motionEnabled ? (
          <ZL_DropTowerRide_MovingGondola duration={duration} lightsOn={lightsOn} lightColor={lightColor} bg={bg} strokeWidth={strokeWidth} />
        ) : (
          <g transform={`translate(${ZL_DropTowerRide_CX} ${ZL_DropTowerRide_BOTTOM_Y})`}>
            <ZL_DropTowerRide_Gondola lightsOn={lightsOn} lightColor={lightColor} bg={bg} strokeWidth={strokeWidth} />
          </g>
        )}
        <ZL_DropTowerRide_Base lightsOn={lightsOn} lightColor={lightColor} bg={bg} />
        <ZL_DropTowerRide_Crown lightsOn={lightsOn} lightColor={lightColor} bg={bg} />
      </svg>
    </div>
  );
}

function ZL_DropTowerRide_MovingGondola({ duration, lightsOn, lightColor, bg, strokeWidth }) {
  const carriageRef = useRef(null);
  const phaseRef = useRef(ZL_DropTowerRide_CYCLE.liftStart);

  useEffect(() => {
    const carriage = carriageRef.current;
    if (!carriage) return;
    let frame;
    let lastTime = null;

    const tick = (time) => {
      try {
        if (lastTime !== null) {
          const dt = Math.max(0, Math.min((time - lastTime) / 1000, 0.05));
          phaseRef.current = (phaseRef.current + dt / duration) % 1;
        }
        lastTime = time;
        const y = ZL_DropTowerRide_gondolaY(phaseRef.current);
        if (carriage) {
          carriage.setAttribute('transform', `translate(${ZL_DropTowerRide_CX} ${y.toFixed(3)})`);
        }
        frame = requestAnimationFrame(tick);
      } catch (err) {
        // Prevent uncaught errors from halting thread
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration]);

  return (
    <g ref={carriageRef} transform={`translate(${ZL_DropTowerRide_CX} ${ZL_DropTowerRide_BOTTOM_Y})`}>
      <ZL_DropTowerRide_Gondola lightsOn={lightsOn} lightColor={lightColor} bg={bg} strokeWidth={strokeWidth} />
    </g>
  );
}

function ZL_DropTowerRide_Tower({ lightsOn, lightColor, bg }) {
  return (
    <g>
      <path d="M98 48 H142 V325 H98 Z" fill={bg} />
      {ZL_DropTowerRide_TOWER_LIGHTS.map((y) => (
        <circle key={y} cx={ZL_DropTowerRide_CX} cy={y} r="2.2" fill={lightsOn ? lightColor : 'currentColor'} stroke="none" opacity={lightsOn ? 1 : 0.3} />
      ))}
    </g>
  );
}

function ZL_DropTowerRide_Gondola({ lightsOn, lightColor, bg, strokeWidth }) {
  const trimWeight = Math.max(1.5, Math.min(3, strokeWidth * 0.5));
  return (
    <g>
      <path d="M-43 23 V32 M43 23 V32 M-49 32 H49" />
      <path d="M-57 -12 Q0 -23 57 -12 L51 23 Q0 32 -51 23 Z" fill="currentColor" />
      {ZL_DropTowerRide_WINDOWS.map((x) => (
        <g key={x} transform={`translate(${x} 0)`} stroke="none">
          <rect x="-8" y="-7" width="16" height="12" rx="2" fill={lightsOn ? lightColor : bg} />
          <circle cx="-3" cy="-1" r="1.4" fill="currentColor" />
          <circle cx="3" cy="-1" r="1.4" fill="currentColor" />
        </g>
      ))}
      <path d="M-42 17 Q0 23 42 17" stroke={bg} strokeWidth={trimWeight} />
    </g>
  );
}

function ZL_DropTowerRide_Base({ lightsOn, lightColor, bg }) {
  return (
    <g>
      <path d="M54 314 H186 L177 336 H63 Z" fill={bg} />
      {ZL_DropTowerRide_BASE_LIGHTS.map((x) => (
        <circle key={x} cx={x} cy="325" r="2.6" fill={lightsOn ? lightColor : 'currentColor'} stroke="none" opacity={lightsOn ? 1 : 0.35} />
      ))}
    </g>
  );
}

function ZL_DropTowerRide_Crown({ lightsOn, lightColor, bg }) {
  return (
    <g>
      <path d="M120 20 V32" />
      <circle cx={ZL_DropTowerRide_CX} cy="20" r="4" fill="currentColor" stroke="none" />
      <path d="M88 45 L101 32 H139 L152 45 V55 H88 Z" fill={bg} />
      {ZL_DropTowerRide_CAP_LIGHTS.map((x) => (
        <circle key={x} cx={x} cy="45" r="2.3" fill={lightsOn ? lightColor : 'currentColor'} stroke="none" opacity={lightsOn ? 1 : 0.35} />
      ))}
    </g>
  );
}

/* --- FERRIS WHEEL --- */
const ZL_FerrisWheelRide_CX = 120;
const ZL_FerrisWheelRide_CY = 120;
const ZL_FerrisWheelRide_RADIUS = 72;
const ZL_FerrisWheelRide_CABIN_COUNT = 8;
const ZL_FerrisWheelRide_LIGHT_COUNT = 24;

function ZL_FerrisWheelRide_points(count, r) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2;
    return {
      x: Number((ZL_FerrisWheelRide_CX + Math.cos(a) * r).toFixed(3)),
      y: Number((ZL_FerrisWheelRide_CY + Math.sin(a) * r).toFixed(3))
    };
  });
}

const ZL_FerrisWheelRide_cabins = ZL_FerrisWheelRide_points(ZL_FerrisWheelRide_CABIN_COUNT, ZL_FerrisWheelRide_RADIUS);
const ZL_FerrisWheelRide_bulbs = ZL_FerrisWheelRide_points(ZL_FerrisWheelRide_LIGHT_COUNT, ZL_FerrisWheelRide_RADIUS);

function ZLFerrisWheel({ motionEnabled = true, color = '#DF8F9C', lightColor = '#FFD1DC', bg = '#660005', strokeWidth = 5, lights = 'On' }) {
  const lightsOn = lights === 'On';
  const duration = 12;
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
      <svg width="100%" height="100%" viewBox={`0 0 240 ${232 + strokeWidth / 2}`} preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <g className="zll-wheel" style={{ transformOrigin: `${ZL_FerrisWheelRide_CX}px ${ZL_FerrisWheelRide_CY}px`, animation: motionEnabled ? `zll-wheel ${duration}s linear infinite` : 'none' }}>
          <circle cx={ZL_FerrisWheelRide_CX} cy={ZL_FerrisWheelRide_CY} r={ZL_FerrisWheelRide_RADIUS} />
          {ZL_FerrisWheelRide_cabins.map((p, i) => (
            <line key={i} x1={ZL_FerrisWheelRide_CX} y1={ZL_FerrisWheelRide_CY} x2={p.x} y2={p.y} />
          ))}
          {ZL_FerrisWheelRide_bulbs.map((p, i) => (
            <circle key={`l${i}`} cx={p.x} cy={p.y} r="2.2" fill={lightsOn ? lightColor : 'currentColor'} stroke="none" opacity={lightsOn ? 1 : 0.4} />
          ))}
          {ZL_FerrisWheelRide_cabins.map((p, i) => (
            <ZL_FerrisWheelRide_Cabin key={`c${i}`} {...p} running={motionEnabled} lightsOn={lightsOn} duration={duration} lightColor={lightColor} bg={bg} />
          ))}
        </g>
        <line x1={ZL_FerrisWheelRide_CX} y1={ZL_FerrisWheelRide_CY} x2="72" y2="232" />
        <line x1={ZL_FerrisWheelRide_CX} y1={ZL_FerrisWheelRide_CY} x2="168" y2="232" />
        <line x1="55" y1="232" x2="185" y2="232" />
        <circle cx={ZL_FerrisWheelRide_CX} cy={ZL_FerrisWheelRide_CY} r="7" fill="currentColor" stroke="none" />
        <circle cx={ZL_FerrisWheelRide_CX} cy={ZL_FerrisWheelRide_CY} r="3" fill={lightsOn ? lightColor : 'currentColor'} stroke="none" />
      </svg>
    </div>
  );
}

function ZL_FerrisWheelRide_Cabin({ x, y, running, lightsOn, duration, lightColor, bg }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="zll-cabin" style={{ transformOrigin: '0 0', animation: running ? `zll-cabin ${duration}s linear infinite` : 'none' }}>
        <line x1="0" y1="0" x2="0" y2="7" />
        <path d="M-10 9 Q0 5 10 9" />
        <path d="M-10 9 L-8 23 Q0 27 8 23 L10 9 Z" fill={bg} />
        <path d="M-5 12 H5 V18 H-5 Z" fill={lightsOn ? lightColor : bg} />
        <circle cx="-2.5" cy="15" r="1" fill="currentColor" stroke="none" />
        <circle cx="2.5" cy="15" r="1" fill="currentColor" stroke="none" />
      </g>
    </g>
  );
}

/* --- PIRATE SHIP --- */
const ZL_PirateShipRide_CX = 120;
const ZL_PirateShipRide_PY = 52;
const ZL_PirateShipRide_LIGHTS = [[-43, 84], [-30, 88], [-16, 91], [0, 92], [16, 91], [30, 88], [43, 84]];

function ZLPirateShip({ motionEnabled = true, color = '#DF8F9C', lightColor = '#FFD1DC', bg = '#660005', strokeWidth = 5, lights = 'On' }) {
  const lightsOn = lights === 'On';
  const duration = 4;
  const animation = motionEnabled ? `zll-ship-start-open ${duration / 4}s ease-in-out both, zll-ship-open ${duration}s ease-in-out ${duration / 4}s infinite` : 'none';

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
      <svg width="100%" height="100%" viewBox={`0 0 240 ${226 + strokeWidth / 2}`} preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <line x1={ZL_PirateShipRide_CX} y1={ZL_PirateShipRide_PY} x2="61" y2="226" />
        <line x1={ZL_PirateShipRide_CX} y1={ZL_PirateShipRide_PY} x2="179" y2="226" />
        <line x1="48" y1="226" x2="192" y2="226" />
        <line x1="78" y1="176" x2="162" y2="176" />
        <g className="zll-pirate-ship" style={{ transformOrigin: `${ZL_PirateShipRide_CX}px ${ZL_PirateShipRide_PY}px`, animation }}>
          <line x1={ZL_PirateShipRide_CX} y1={ZL_PirateShipRide_PY} x2={ZL_PirateShipRide_CX} y2="139" />
          <line x1={ZL_PirateShipRide_CX} y1="82" x2={ZL_PirateShipRide_CX} y2="151" />
          <path d="M120 82 L148 91 L120 101 Z" fill="currentColor" />
          <line x1="72" y1="139" x2="168" y2="139" />
          <path d="M58 139 Q120 158 182 139 Q171 184 120 191 Q69 184 58 139 Z" fill={bg} />
          <path d="M58 139 L48 128" />
          <path d="M182 139 L192 128" />
          {[91, 120, 149].map((x, i) => (
            <circle key={x} cx={x} cy={[158, 163, 158][i]} r="5" fill={lightsOn ? lightColor : bg} />
          ))}
          {ZL_PirateShipRide_LIGHTS.map(([x, y], i) => (
            <circle key={i} cx={ZL_PirateShipRide_CX + x} cy={y} r={lightsOn ? 2.8 : 2.2} fill={lightsOn ? lightColor : 'currentColor'} stroke="none" opacity={lightsOn ? 1 : 0.4} />
          ))}
        </g>
        <circle cx={ZL_PirateShipRide_CX} cy={ZL_PirateShipRide_PY} r="7" fill="currentColor" stroke="none" />
        <circle cx={ZL_PirateShipRide_CX} cy={ZL_PirateShipRide_PY} r="3" fill={lightsOn ? lightColor : 'currentColor'} stroke="none" />
      </svg>
    </div>
  );
}

/* --- CAROUSEL --- */
const ZL_CarouselRide_CX = 120;
const ZL_CarouselRide_CY = 153;
const ZL_CarouselRide_CABINS = [{ delay: 0 }, { delay: -0.25 }, { delay: -0.5 }, { delay: -0.75 }];
const ZL_CarouselRide_LIGHTS = [{ x: 59, y: 91 }, { x: 74, y: 87 }, { x: 89, y: 84 }, { x: 105, y: 82 }, { x: 120, y: 81 }, { x: 135, y: 82 }, { x: 151, y: 84 }, { x: 166, y: 87 }, { x: 181, y: 91 }];

function ZLCarousel({ motionEnabled = true, color = '#DF8F9C', lightColor = '#FFD1DC', bg = '#660005', strokeWidth = 5, lights = 'On' }) {
  const clipId = 'zll-carousel-static-clip';
  const lightsOn = lights === 'On';
  const duration = 10;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
      <svg width="100%" height="100%" viewBox={`0 0 240 ${220 + strokeWidth / 2}`} preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <ZL_CarouselRide_TopDecoration />
        <ZL_CarouselRide_CarouselRide clipId={clipId} running={motionEnabled} duration={duration} lightsOn={lightsOn} lightColor={lightColor} bg={bg} />
        <ZL_CarouselRide_TopDecoration />
        <ZL_CarouselRide_FlatBase lightsOn={lightsOn} lightColor={lightColor} bg={bg} />
        <ZL_CarouselRide_Canopy lightsOn={lightsOn} lightColor={lightColor} bg={bg} />
        <ZL_CarouselRide_FlatBase lightsOn={lightsOn} lightColor={lightColor} bg={bg} />
      </svg>
    </div>
  );
}

function ZL_CarouselRide_TopDecoration() {
  return (
    <g transform="translate(0 8)">
      <circle cx={ZL_CarouselRide_CX} cy="38" r="4" fill="currentColor" stroke="none" />
      <line x1={ZL_CarouselRide_CX} y1="42" x2={ZL_CarouselRide_CX} y2="52" />
    </g>
  );
}

function ZL_CarouselRide_Canopy({ lightsOn, lightColor, bg }) {
  return (
    <g>
      <path d="M45 94 Q120 28 195 94 Q120 108 45 94 Z" fill={bg} />
      <path d="M45 94 Q120 108 195 94" />
      {ZL_CarouselRide_LIGHTS.map((light, index) => (
        <circle key={index} cx={light.x} cy={light.y} r={lightsOn ? 2.7 : 2.1} fill={lightsOn ? lightColor : 'currentColor'} stroke="none" opacity={lightsOn ? 1 : 0.4} />
      ))}
    </g>
  );
}

function ZL_CarouselRide_CarouselRide({ clipId, running, duration, lightsOn, lightColor, bg }) {
  return (
    <g>
      <g>
        {ZL_CarouselRide_CABINS.map((cabin, index) => (
          <ZL_CarouselRide_OrbitCabin key={`rear-${index}`} clipId={clipId} index={index} delay={cabin.delay} running={running} duration={duration} lightsOn={lightsOn} lightColor={lightColor} bg={bg} layer="rear" />
        ))}
      </g>
      <ZL_CarouselRide_CenterPole clipId={clipId} />
      <g>
        {ZL_CarouselRide_CABINS.map((cabin, index) => (
          <ZL_CarouselRide_OrbitCabin key={`front-${index}`} clipId={clipId} index={index} delay={cabin.delay} running={running} duration={duration} lightsOn={lightsOn} lightColor={lightColor} bg={bg} layer="front" />
        ))}
      </g>
    </g>
  );
}

function ZL_CarouselRide_OrbitCabin({ clipId, index, delay, running, duration, lightsOn, lightColor, bg, layer }) {
  const animationDelay = delay * duration;
  return (
    <g clipPath={layer === 'rear' ? `url(#${clipId}-rear)` : `url(#${clipId}-front)`}>
      <g transform={`translate(${ZL_CarouselRide_CX} ${ZL_CarouselRide_CY})`}>
        <g className="zll-carousel-orbit" style={{ transformOrigin: '0px 0px', animation: running ? `zll-carousel-orbit ${duration}s linear infinite` : 'none', animationDelay: running ? `${animationDelay}s` : undefined }}>
          <line x1="0" y1="-78" x2="0" y2="12" />
          <g className="zll-carousel-bob" style={{ animation: running ? `zll-carousel-bob 2.2s ease-in-out ${-index * 0.45}s infinite` : 'none' }}>
            <g transform="translate(0 7)">
              <path d="M-12 0 Q0 -7 12 0" fill={bg} />
              <path d="M-12 0 L-10 16 Q0 21 10 16 L12 0 Z" fill={bg} />
              <rect x="-6" y="3" width="12" height="8" rx="2" fill={lightsOn ? lightColor : bg} />
              <circle cx="-2.3" cy="7" r="1" fill="currentColor" stroke="none" />
              <circle cx="2.3" cy="7" r="1" fill="currentColor" stroke="none" />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

function ZL_CarouselRide_CenterPole({ clipId }) {
  return (
    <>
      <defs>
        <clipPath id={`${clipId}-rear`}>
          <rect x="30" y="96" width="180" height="61" />
        </clipPath>
        <clipPath id={`${clipId}-front`}>
          <rect x="30" y="151" width="180" height="70" />
        </clipPath>
      </defs>
      <line x1={ZL_CarouselRide_CX} y1="102" x2={ZL_CarouselRide_CX} y2="220" />
      <circle cx={ZL_CarouselRide_CX} cy="103" r="4" fill="currentColor" stroke="none" />
    </>
  );
}

function ZL_CarouselRide_FlatBase({ lightsOn, lightColor, bg }) {
  return (
    <g>
      <path d="M48 202 H192 L182 220 H58 Z" fill={bg} />
      <circle cx={ZL_CarouselRide_CX} cy="211" r={lightsOn ? 2.8 : 2.2} fill={lightsOn ? lightColor : 'currentColor'} stroke="none" />
    </g>
  );
}

/* --- ROLLER COASTER --- */
const ZL_RollerCoasterRide_TRACK = `
    M 25 350
    C 55 350, 75 348, 92 338
    C 125 320, 132 245, 150 185
    C 168 128, 195 108, 245 110
    C 355 105, 350 345, 445 345
    C 520 345, 535 225, 625 220
    C 655 220, 665 235, 665 265
    C 665 325, 625 390, 555 405
    L 195 405
    C 125 405, 70 390, 25 350
    Z
`;
const ZL_RollerCoasterRide_SECOND_RAIL = `
    M25 363
    C55 363 76 361 96 350
    C132 330 141 255 160 195
    C177 142 202 123 245 125
    C340 122 350 360 445 360
    C525 360 545 242 625 236
`;
const ZL_RollerCoasterRide_STATION_Y = 405;
const ZL_RollerCoasterRide_STATION_X = 270;
const ZL_RollerCoasterRide_STATION_WIDTH = 170;
const ZL_RollerCoasterRide_TRACK_LIGHTS = [[92, 327], [112, 270], [137, 196], [176, 137], [224, 113], [278, 123], [324, 182], [357, 264], [397, 332], [454, 341], [505, 299], [548, 247], [601, 222]];
const ZL_RollerCoasterRide_SUPPORTS = [[70, 346], [100, 330], [125, 275], [150, 185], [180, 130], [225, 112], [270, 120], [315, 170], [350, 265], [390, 330], [445, 345], [500, 305], [550, 250], [600, 224]];
const ZL_RollerCoasterRide_STATIC_CARS = [{ x: 123.598, y: 287.306, angle: -72.303 }, { x: 104.791, y: 326.829, angle: -51.364 }, { x: 66.84, y: 347.133, angle: -10.954 }];

function ZLRollerCoaster({ color = '#DF8F9C', lightColor = '#FFD1DC', bg = '#660005', strokeWidth = 6, lights = 'On' }) {
  const lightsOn = lights === 'On';
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
      <svg width="100%" height="100%" viewBox={`0 45 700 ${ZL_RollerCoasterRide_STATION_Y + 28 + strokeWidth / 2 - 45}`} preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <g opacity="0.55">
          {ZL_RollerCoasterRide_SUPPORTS.map(([x, y], index) => (
            <line key={index} x1={x} y1={y} x2={x} y2={ZL_RollerCoasterRide_STATION_Y} />
          ))}
        </g>
        <path d={ZL_RollerCoasterRide_TRACK} />
        <path d={ZL_RollerCoasterRide_SECOND_RAIL} opacity="0.42" />
        <line x1="75" y1="405" x2="665" y2="405" opacity="0.72" />
        <g>
          {ZL_RollerCoasterRide_TRACK_LIGHTS.map(([x, y], index) => (
            <circle key={index} cx={x} cy={y} r={lightsOn ? 4 : 3} fill={lightsOn ? lightColor : 'currentColor'} stroke="none" opacity={lightsOn ? 1 : 0.35} />
          ))}
        </g>
        <rect x={ZL_RollerCoasterRide_STATION_X} y={ZL_RollerCoasterRide_STATION_Y - 28} width={ZL_RollerCoasterRide_STATION_WIDTH} height="56" rx="4" fill={bg} />
        <g>
          {ZL_RollerCoasterRide_STATIC_CARS.map((pose, index) => (
            <g key={index} transform={`translate(${pose.x.toFixed(3)} ${pose.y.toFixed(3)}) rotate(${pose.angle.toFixed(3)})`}>
              <g transform="translate(-18 -26.5)">
                <path d="M2 3 H32 L36 20 H0 Z" fill={bg} />
                <circle cx="8" cy="23" r="3.5" fill="currentColor" stroke="none" />
                <circle cx="28" cy="23" r="3.5" fill="currentColor" stroke="none" />
                <rect x="8" y="7" width="20" height="9" rx="2" fill={lightsOn ? lightColor : bg} />
                <circle cx="13" cy="11.5" r="1.6" fill="currentColor" stroke="none" />
                <circle cx="23" cy="11.5" r="1.6" fill="currentColor" stroke="none" />
              </g>
            </g>
          ))}
        </g>
        <rect x={ZL_RollerCoasterRide_STATION_X} y={ZL_RollerCoasterRide_STATION_Y - 28} width={ZL_RollerCoasterRide_STATION_WIDTH} height="56" rx="4" fill={bg} />
        <line x1={ZL_RollerCoasterRide_STATION_X} y1={ZL_RollerCoasterRide_STATION_Y} x2={ZL_RollerCoasterRide_STATION_X + ZL_RollerCoasterRide_STATION_WIDTH} y2={ZL_RollerCoasterRide_STATION_Y} />
        {Array.from({ length: 9 }, (_, index) => (
          <circle key={index} cx={ZL_RollerCoasterRide_STATION_X + 13 + index * 18} cy={ZL_RollerCoasterRide_STATION_Y + 7} r={lightsOn ? 3.2 : 2.4} fill={lightsOn ? lightColor : 'currentColor'} stroke="none" opacity={lightsOn ? 1 : 0.35} />
        ))}
      </svg>
    </div>
  );
}
