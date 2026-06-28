"use client";

import { useState, useMemo } from "react";
import { Sliders } from "lucide-react";
import { runSimulation } from "../../utils/solver";

export default function EcosystemSandbox() {
  const [alpha, setAlpha] = useState(0.15); // Prey birth rate
  const [gamma, setGamma] = useState(0.12); // Predator death rate

  // Run the Lotka-Volterra simulation using Euler integration
  const simData = useMemo(() => {
    return runSimulation(alpha, gamma);
  }, [alpha, gamma]);

  // Construct SVG paths
  const svgPaths = useMemo(() => {
    const width = 320;
    const height = 110;
    const points = simData.data;
    const maxVal = simData.maxVal;
    
    let preyPath = "";
    let predPath = "";

    points.forEach((pt, i) => {
      const x = (i / (points.length - 1)) * width;
      // Invert Y coordinate since SVG 0 is at the top
      const yPrey = height - 10 - (pt.prey / maxVal) * (height - 20);
      const yPred = height - 10 - (pt.pred / maxVal) * (height - 20);

      if (i === 0) {
        preyPath = `M ${x} ${yPrey}`;
        predPath = `M ${x} ${yPred}`;
      } else {
        preyPath += ` L ${x} ${yPrey}`;
        predPath += ` L ${x} ${yPred}`;
      }
    });

    return { preyPath, predPath };
  }, [simData]);

  return (
    <div className="border border-border-custom bg-bg p-3 rounded-sm text-xs font-mono flex flex-col h-full justify-between space-y-3">
      {/* Simulation Header */}
      <div className="flex items-center justify-between border-b border-border-custom/50 pb-1.5">
        <span className="text-[10px] text-muted font-bold uppercase flex items-center space-x-1">
          <Sliders size={10} />
          <span>Biophysical Parameters</span>
        </span>
        <span className="text-[9px] text-accent font-bold">Euler Integration Step = 0.5s</span>
      </div>

      {/* SVG Canvas Chart */}
      <div className="border border-border-custom bg-card-bg relative h-[105px] w-full flex items-center justify-center p-1 overflow-hidden">
        {/* Y Axis Legend */}
        <div className="absolute left-1.5 top-1.5 text-[8px] text-muted flex flex-col justify-between h-[85%] font-mono select-none">
          <span>MAX</span>
          <span>MID</span>
          <span>0</span>
        </div>

        <svg viewBox="0 0 320 110" className="w-full h-full overflow-visible">
          {/* Grid lines */}
          <line x1="0" y1="15" x2="320" y2="15" stroke="var(--border)" strokeDasharray="3,3" strokeWidth="0.5" />
          <line x1="0" y1="55" x2="320" y2="55" stroke="var(--border)" strokeDasharray="3,3" strokeWidth="0.5" />
          <line x1="0" y1="95" x2="320" y2="95" stroke="var(--border)" strokeWidth="0.5" />

          {/* Prey Curve (Solid Ink line) */}
          <path 
            d={svgPaths.preyPath} 
            fill="none" 
            stroke="var(--foreground)" 
            strokeWidth="1.5" 
          />

          {/* Predator Curve (Dashed Accent line) */}
          <path 
            d={svgPaths.predPath} 
            fill="none" 
            stroke="var(--accent)" 
            strokeDasharray="4,3" 
            strokeWidth="1.5" 
          />
        </svg>

        {/* Legend Overlay */}
        <div className="absolute right-2 bottom-1.5 flex space-x-3 text-[8px] font-bold">
          <div className="flex items-center space-x-1">
            <span className="w-3 h-0.5 bg-fg inline-block" />
            <span className="text-fg">PREY (RABBITS)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-0.5 border-t border-dashed border-accent inline-block" />
            <span className="text-accent">PREDATORS (FOXES)</span>
          </div>
        </div>
      </div>

      {/* Sliders Container */}
      <div className="space-y-2 border-t border-border-custom/50 pt-2 text-[10px]">
        {/* Slider 1: Prey Birth Rate */}
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between font-bold">
            <span className="text-muted">PREY BIRTH RATE (α):</span>
            <span className="text-fg">{alpha.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.30"
            step="0.01"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="w-full h-1 bg-border-custom rounded-lg appearance-none cursor-pointer accent-fg"
          />
        </div>

        {/* Slider 2: Predator Death Rate */}
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between font-bold">
            <span className="text-accent">PREDATOR DEATH RATE (γ):</span>
            <span className="text-accent">{gamma.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.30"
            step="0.01"
            value={gamma}
            onChange={(e) => setGamma(parseFloat(e.target.value))}
            className="w-full h-1 bg-border-custom rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>
    </div>
  );
}
