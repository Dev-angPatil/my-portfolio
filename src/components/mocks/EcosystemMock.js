"use client";

import { useState, useMemo } from "react";
import { runSimulation } from "../../utils/solver";

export default function EcosystemMock() {
  const [preyBirth, setPreyBirth] = useState(0.15); // alpha
  const [predDeath, setPredDeath] = useState(0.12); // gamma

  const { data, maxVal } = useMemo(() => {
    return runSimulation(preyBirth, predDeath);
  }, [preyBirth, predDeath]);

  // SVG dimensions
  const width = 280;
  const height = 110;
  const padding = 10;

  // Generate SVG path for prey
  const preyPath = useMemo(() => {
    if (data.length === 0) return "";
    return data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - (d.prey / maxVal) * (height - 2 * padding);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  }, [data, maxVal]);

  // Generate SVG path for predators
  const predPath = useMemo(() => {
    if (data.length === 0) return "";
    return data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - (d.pred / maxVal) * (height - 2 * padding);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  }, [data, maxVal]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 h-full text-[10px]">
      {/* Parameter Sliders */}
      <div className="sm:col-span-2 border border-border-custom bg-bg p-3 rounded-sm flex flex-col justify-center space-y-4">
        <div>
          <div className="text-[9px] text-muted font-bold tracking-widest uppercase mb-1">Prey Growth Rate (α)</div>
          <div className="flex items-center space-x-2">
            <input 
              type="range" 
              min="0.05" 
              max="0.4" 
              step="0.01"
              value={preyBirth}
              onChange={(e) => setPreyBirth(parseFloat(e.target.value))}
              className="w-full accent-[#ea580c] cursor-pointer bg-neutral-800 h-1 rounded-sm appearance-none"
            />
            <span className="font-mono text-fg w-8 text-right font-semibold">{preyBirth.toFixed(2)}</span>
          </div>
        </div>

        <div>
          <div className="text-[9px] text-muted font-bold tracking-widest uppercase mb-1">Predator Decay Rate (γ)</div>
          <div className="flex items-center space-x-2">
            <input 
              type="range" 
              min="0.05" 
              max="0.4" 
              step="0.01"
              value={predDeath}
              onChange={(e) => setPredDeath(parseFloat(e.target.value))}
              className="w-full accent-[#ea580c] cursor-pointer bg-neutral-800 h-1 rounded-sm appearance-none"
            />
            <span className="font-mono text-fg w-8 text-right font-semibold">{predDeath.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* SVG Population Waves Graph */}
      <div className="sm:col-span-3 border border-border-custom bg-card-bg/40 p-3 rounded-sm flex flex-col justify-between h-[190px]">
        <div className="flex items-center justify-between border-b border-border-custom/50 pb-1.5 mb-1 text-[8px] text-muted select-none">
          <span>POPULATION_DYNAMICS_PLOT</span>
          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-1"><span className="h-1.5 w-1.5 rounded-full bg-accent" /><span>Prey</span></span>
            <span className="flex items-center space-x-1"><span className="h-1.5 w-1.5 rounded-full border border-fg" /><span>Predator</span></span>
          </div>
        </div>
        
        {/* SVG Drawing Canvas */}
        <div className="flex-grow flex items-center justify-center">
          <svg className="w-full h-full max-h-[110px]" viewBox={`0 0 ${width} ${height}`}>
            {/* Grid line guidelines */}
            <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#262626" strokeDasharray="2,2" strokeWidth={0.5} />
            
            {/* Simulation Line Paths */}
            <path d={preyPath} fill="none" stroke="#ea580c" strokeWidth={1.5} />
            <path d={predPath} fill="none" stroke="#ededec" strokeWidth={1.5} strokeDasharray="3,3" />
            
            {/* Axes */}
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#262626" strokeWidth={0.5} />
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#262626" strokeWidth={0.5} />
          </svg>
        </div>

        <div className="text-[7px] text-muted text-right font-mono mt-1 select-none">
          Euler dt = 0.5s • Steps = 100 • Max Valuation = {Math.round(maxVal)}
        </div>
      </div>
    </div>
  );
}
