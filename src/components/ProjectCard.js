"use client";

import { useState } from "react";
import { Play, FileText, Cpu, RotateCw, ExternalLink } from "lucide-react";
import { Github } from "./Icons";

export default function ProjectCard({ 
  title, 
  tagline, 
  stack, 
  github, 
  liveUrl,
  mockupImg,
  role, 
  impact = []
}) {
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "sandbox"
  const [reloadKey, setReloadKey] = useState(0);

  const cleanDisplayUrl = github 
    ? github.replace("https://", "") 
    : (liveUrl ? liveUrl.replace("https://", "") : "local://development");

  return (
    <div className="border border-border-custom bg-card-bg font-mono transition-all duration-200 hover:border-border-focus flex flex-col h-full">
      {/* Top Banner/Bar */}
      <div className="flex h-10 items-center justify-between border-b border-border-custom bg-bg px-4">
        <div className="flex items-center space-x-1.5">
          <Cpu size={12} className="text-accent" />
          <span className="text-xs font-bold text-fg tracking-wide uppercase">{title}</span>
        </div>
        
        {/* Toggle tabs */}
        <div className="flex border border-border-custom bg-card-bg text-[10px] h-6 overflow-hidden rounded-sm">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 flex items-center justify-center font-bold uppercase transition-all cursor-pointer ${
              activeTab === "overview" 
                ? "bg-fg text-bg" 
                : "text-muted hover:text-fg"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("sandbox")}
            className={`px-3 flex items-center justify-center font-bold uppercase border-l border-border-custom transition-all cursor-pointer ${
              activeTab === "sandbox" 
                ? "bg-fg text-bg" 
                : "text-muted hover:text-fg"
            }`}
          >
            UI Mockup
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        {activeTab === "overview" ? (
          /* OVERVIEW TAB */
          <div className="space-y-4 flex-grow flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs text-muted font-bold tracking-wider">{tagline}</div>
              
              {/* Stack Badges */}
              <div className="flex flex-wrap gap-1.5">
                {stack.map((tech) => (
                  <span 
                    key={tech} 
                    className="border border-border-custom bg-bg px-2 py-0.5 text-[9px] text-fg font-semibold rounded-sm hover:border-accent transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Summary */}
              <div className="text-xs text-fg py-2 leading-relaxed font-sans">
                <span className="font-mono text-accent font-bold mr-1">ROLE:</span> {role}
              </div>
            </div>

            {/* Impact Checklist */}
            <div className="border-t border-border-custom/50 pt-3 space-y-1.5 flex-grow">
              <div className="text-[10px] text-muted font-bold tracking-widest uppercase">Metrics & Impact:</div>
              <ul className="text-xs space-y-1 font-sans">
                {impact.map((point, index) => (
                  <li key={index} className="flex items-start text-muted text-xs leading-normal">
                    <span className="font-mono text-accent mr-2 mt-0.5 text-[10px] font-bold">▶</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* MOCK BROWSER VIEW (SCREENSHOT) */
          <div className="flex-grow flex flex-col min-h-[300px] border border-border-custom bg-bg rounded-sm overflow-hidden relative">
            {/* Browser Control Header */}
            <div className="flex items-center justify-between bg-card-bg border-b border-border-custom h-9 px-3 text-[10px] select-none">
              {/* Window Dots */}
              <div className="flex items-center space-x-1.5 w-12">
                <span className="h-1.5 w-1.5 rounded-full bg-border-custom" />
                <span className="h-1.5 w-1.5 rounded-full bg-border-custom" />
                <span className="h-1.5 w-1.5 rounded-full bg-border-custom" />
              </div>
              
              {/* Address Input Bar */}
              <div className="flex-grow max-w-[200px] sm:max-w-md bg-bg border border-border-custom h-6 px-3 rounded-sm flex items-center justify-between text-muted text-[9px] truncate">
                <span className="truncate">{cleanDisplayUrl}</span>
                <button 
                  onClick={() => setReloadKey((prev) => prev + 1)}
                  className="hover:text-fg active:scale-95 transition-transform cursor-pointer"
                  title="Reload mockup"
                >
                  <RotateCw size={8} />
                </button>
              </div>

              {/* Viewport Actions (GitHub launch) */}
              <div className="flex items-center space-x-2 w-16 justify-end">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 hover:text-accent transition-colors"
                    title="Open GitHub Repository"
                  >
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>

            {/* Viewport container rendering actual UI screenshot */}
            <div className="flex-grow bg-[#0c0c0d] flex items-center justify-center p-2 relative min-h-[210px] overflow-hidden">
              <div className="h-full relative border border-border-custom/50 shadow-sm w-full h-[210px]">
                {mockupImg ? (
                  <img
                    key={reloadKey}
                    src={mockupImg}
                    alt={`${title} Actual UI Mockup`}
                    className="w-full h-full object-cover object-top select-none pointer-events-none rounded-sm border border-border-custom/40"
                  />
                ) : (
                  <div className="text-center text-xs text-muted font-bold py-12">
                    [NO SCREENSHOT DEPLOYED]
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-4 border-t border-border-custom/50 pt-3 flex items-center justify-between text-xs">
          {github ? (
            <a 
              href={github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-muted hover:text-fg transition-colors"
            >
              <Github size={14} />
              <span className="underline">Source Code</span>
            </a>
          ) : (
            <span className="text-[10px] text-muted italic">[Private Repository]</span>
          )}

          <button 
            onClick={() => setActiveTab(activeTab === "overview" ? "sandbox" : "overview")}
            className="flex items-center space-x-1 text-accent hover:text-fg transition-colors cursor-pointer"
          >
            {activeTab === "overview" ? (
              <>
                <span>View UI Mockup</span>
                <Play size={10} />
              </>
            ) : (
              <>
                <span>View Details</span>
                <FileText size={10} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
