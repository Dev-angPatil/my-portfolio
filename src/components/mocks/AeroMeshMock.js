"use client";

import { useState, useEffect, useRef } from "react";
import { Play, PlayCircle, RefreshCw } from "lucide-react";

export default function AeroMeshMock() {
  const [target, setTarget] = useState({ x: 240, y: 70 });
  const [isRunning, setIsRunning] = useState(true);
  const [telemetryRate, setTelemetryRate] = useState(20);
  const requestRef = useRef(null);

  // Swarm of 8 drones starting clustered
  const [drones, setDrones] = useState([
    { id: 1, x: 25, y: 55, vx: 0, vy: 0, battery: 98 },
    { id: 2, x: 20, y: 65, vx: 0, vy: 0, battery: 97 },
    { id: 3, x: 30, y: 75, vx: 0, vy: 0, battery: 96 },
    { id: 4, x: 25, y: 85, vx: 0, vy: 0, battery: 98 },
    { id: 5, x: 15, y: 60, vx: 0, vy: 0, battery: 95 },
    { id: 6, x: 35, y: 60, vx: 0, vy: 0, battery: 97 },
    { id: 7, x: 18, y: 75, vx: 0, vy: 0, battery: 94 },
    { id: 8, x: 32, y: 80, vx: 0, vy: 0, battery: 96 }
  ]);

  // Circular Obstacles
  const obstacles = [
    { x: 90, y: 70, r: 16 },
    { x: 155, y: 40, r: 16 },
    { x: 160, y: 100, r: 16 }
  ];

  // Click on SVG to place target beacon
  const handleSvgClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 280;
    const y = ((e.clientY - rect.top) / rect.height) * 140;
    setTarget({ x, y });
  };

  const resetSwarm = () => {
    setDrones([
      { id: 1, x: 25, y: 55, vx: 0, vy: 0, battery: 98 },
      { id: 2, x: 20, y: 65, vx: 0, vy: 0, battery: 97 },
      { id: 3, x: 30, y: 75, vx: 0, vy: 0, battery: 96 },
      { id: 4, x: 25, y: 85, vx: 0, vy: 0, battery: 98 },
      { id: 5, x: 15, y: 60, vx: 0, vy: 0, battery: 95 },
      { id: 6, x: 35, y: 60, vx: 0, vy: 0, battery: 97 },
      { id: 7, x: 18, y: 75, vx: 0, vy: 0, battery: 94 },
      { id: 8, x: 32, y: 80, vx: 0, vy: 0, battery: 96 }
    ]);
    setTarget({ x: 240, y: 70 });
  };

  // Real-time APF Swarm Steer Physics Loop
  useEffect(() => {
    const updatePhysics = () => {
      if (!isRunning) return;

      setDrones((prevDrones) =>
        prevDrones.map((drone) => {
          // 1. Attractive Force to Target
          const dxTarget = target.x - drone.x;
          const dyTarget = target.y - drone.y;
          const distTarget = Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget);
          
          let forceX = 0;
          let forceY = 0;
          
          if (distTarget > 0) {
            forceX += (dxTarget / distTarget) * 1.5;
            forceY += (dyTarget / distTarget) * 1.5;
          }

          // 2. Repulsive Force from Obstacles (APF)
          obstacles.forEach((obs) => {
            const dxObs = drone.x - obs.x;
            const dyObs = drone.y - obs.y;
            const distObs = Math.sqrt(dxObs * dxObs + dyObs * dyObs);
            
            // Influence threshold
            const repRange = obs.r + 20;
            if (distObs < repRange && distObs > 0) {
              const strength = (repRange - distObs) / repRange;
              // Push vector directly away from obstacle center
              forceX += (dxObs / distObs) * strength * 4.5;
              forceY += (dyObs / distObs) * strength * 4.5;

              // Tangential Vortex steer (bypass local minima deadlocks)
              // Cross product of direction with z-axis [0, 0, 1] gives tangent [-dy, dx]
              const tangentX = -dyObs / distObs;
              const tangentY = dxObs / distObs;
              forceX += tangentX * strength * 2.0;
              forceY += tangentY * strength * 2.0;
            }
          });

          // 3. Repulsive Separation from other drones
          prevDrones.forEach((other) => {
            if (other.id === drone.id) return;
            const dxOther = drone.x - other.x;
            const dyOther = drone.y - other.y;
            const distOther = Math.sqrt(dxOther * dxOther + dyOther * dyOther);
            
            const minSeparation = 10;
            if (distOther < minSeparation && distOther > 0) {
              const strength = (minSeparation - distOther) / minSeparation;
              forceX += (dxOther / distOther) * strength * 1.5;
              forceY += (dyOther / distOther) * strength * 1.5;
            }
          });

          // 4. Update velocity and clamp speed
          let newVx = drone.vx * 0.8 + forceX * 0.2;
          let newVy = drone.vy * 0.8 + forceY * 0.2;
          
          const maxSpeed = 2.2;
          const speed = Math.sqrt(newVx * newVx + newVy * newVy);
          if (speed > maxSpeed) {
            newVx = (newVx / speed) * maxSpeed;
            newVy = (newVy / speed) * maxSpeed;
          }

          // 5. Apply positions
          const newX = Math.max(5, Math.min(275, drone.x + newVx));
          const newY = Math.max(5, Math.min(135, drone.y + newVy));

          // Slowly decay battery on motion
          const batteryDecay = Math.abs(newVx) + Math.abs(newVy) > 0.1 ? 0.02 : 0.005;

          return {
            ...drone,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            battery: Math.max(10, drone.battery - batteryDecay)
          };
        })
      );

      // Simulate telemetry updates rate
      setTelemetryRate(Math.floor(18 + Math.random() * 4));
      
      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    if (isRunning) {
      requestRef.current = requestAnimationFrame(updatePhysics);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, target]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 h-full text-[10px]">
      {/* HUD Telemetry Info */}
      <div className="sm:col-span-2 border border-border-custom bg-bg p-3 rounded-sm flex flex-col justify-between min-h-[160px]">
        <div>
          <div className="text-[8px] text-muted font-bold tracking-widest uppercase mb-2">Telemetry HUD</div>
          <div className="grid grid-cols-2 gap-2 font-mono text-[8px] text-neutral-400">
            <div className="border-b border-border-custom/30 pb-1">SWARM: <span className="text-fg font-bold">8 ACTIVE</span></div>
            <div className="border-b border-border-custom/30 pb-1">RATE: <span className="text-accent font-bold">{telemetryRate}Hz</span></div>
            <div className="border-b border-border-custom/30 pb-1">X-BYPASS: <span className="text-fg font-bold">ACTIVE</span></div>
            <div className="border-b border-border-custom/30 pb-1">MIN_SEP: <span className="text-fg font-bold">0.5m</span></div>
          </div>
          
          <div className="mt-3 space-y-1 overflow-y-auto max-h-[85px] pr-1 font-mono text-[7px] text-neutral-500">
            {drones.slice(0, 4).map((d) => (
              <div key={d.id} className="flex justify-between border-b border-border-custom/10 pb-0.5">
                <span>DRONE_0{d.id}</span>
                <span>[{d.x.toFixed(1)}, {d.y.toFixed(1)}]</span>
                <span className={d.battery < 20 ? "text-accent font-bold" : ""}>BAT: {Math.round(d.battery)}%</span>
              </div>
            ))}
            <div className="text-[6px] italic text-neutral-600 text-center pt-1">+ 4 background telemetry streams</div>
          </div>
        </div>

        <div className="flex space-x-1.5 mt-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex-grow border border-border-focus bg-fg text-bg py-1 text-[8px] font-bold hover:bg-bg hover:text-fg transition-all cursor-pointer"
          >
            {isRunning ? "PAUSE APF ENGINE" : "RESUME APF ENGINE"}
          </button>
          <button
            onClick={resetSwarm}
            className="border border-border-custom bg-card-bg p-1 hover:border-border-focus hover:text-accent transition-all cursor-pointer"
            title="Reset simulation"
          >
            <RefreshCw size={10} />
          </button>
        </div>
      </div>

      {/* SVG Steer simulation board */}
      <div className="sm:col-span-3 border border-border-custom bg-card-bg/40 p-3 rounded-sm flex flex-col justify-between h-[190px]">
        <div className="text-[8px] text-muted font-bold tracking-widest uppercase border-b border-border-custom/50 pb-1.5 flex justify-between select-none">
          <span>Swarm Navigation Twin View</span>
          <span className="text-neutral-500">CLICK GRID TO UPDATE TARGET</span>
        </div>

        <div className="flex-grow flex items-center justify-center mt-2 relative">
          <svg 
            onClick={handleSvgClick}
            className="w-full h-full max-h-[125px] border border-border-custom/40 bg-bg cursor-crosshair rounded-sm" 
            viewBox="0 0 280 140"
          >
            {/* Grid Mesh */}
            <defs>
              <pattern id="swarmGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#262626" strokeWidth="0.2" />
              </pattern>
            </defs>
            <rect width="280" height="140" fill="url(#swarmGrid)" />

            {/* Obstacles (Vector repulsion boundaries) */}
            {obstacles.map((obs, idx) => (
              <g key={idx}>
                {/* Repulsive range ring */}
                <circle cx={obs.x} cy={obs.y} r={obs.r + 12} fill="none" stroke="#ea580c" strokeWidth={0.5} strokeDasharray="1,3" className="opacity-40" />
                {/* Physical obstacle */}
                <circle cx={obs.x} cy={obs.y} r={obs.r} fill="#141414" stroke="#262626" strokeWidth={0.8} />
                <circle cx={obs.x} cy={obs.y} r={2} fill="#ea580c" className="opacity-30" />
              </g>
            ))}

            {/* Target Beacon */}
            <circle cx={target.x} cy={target.y} r={4} fill="#ea580c" className="animate-ping" style={{ transformOrigin: `${target.x}px ${target.y}px` }} />
            <circle cx={target.x} cy={target.y} r={2.5} fill="#ea580c" />
            <line x1={target.x} y1={target.y - 8} x2={target.x} y2={target.y + 8} stroke="#ea580c" strokeWidth={0.5} />
            <line x1={target.x - 8} y1={target.y} x2={target.x + 8} y2={target.y} stroke="#ea580c" strokeWidth={0.5} />

            {/* Swarm Drones (Vector agents) */}
            {drones.map((drone) => (
              <g key={drone.id}>
                {/* Vector heading arrow */}
                <line 
                  x1={drone.x} 
                  y1={drone.y} 
                  x2={drone.x + drone.vx * 3} 
                  y2={drone.y + drone.vy * 3} 
                  stroke="#ea580c" 
                  strokeWidth={0.8} 
                />
                <circle 
                  cx={drone.x} 
                  yRef={drone.y} 
                  cy={drone.y} 
                  r={2.2} 
                  fill="#ededec" 
                  stroke="#262626" 
                  strokeWidth={0.5} 
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="text-[6px] text-muted text-right font-mono mt-1 select-none">
          APF Attractive Gain: 1.5 • Repulsive Range: 36px • Safety violations: 0
        </div>
      </div>
    </div>
  );
}
