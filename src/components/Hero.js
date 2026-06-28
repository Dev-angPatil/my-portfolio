"use client";

import { useEffect, useState } from "react";
import { Terminal, Mail, ArrowRight } from "lucide-react";
import { Github, Linkedin } from "./Icons";

export default function Hero({ setIsCliOpen }) {
  const [typedText, setTypedText] = useState("");
  const specialties = [
    "Cooperative AI Agent Nodes",
    "Biophysical Lotka-Volterra Twins",
    "On-chain Rust & Solana Programs",
    "Performant Next.js App Architectures"
  ];
  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentSpecialty = specialties[specialtyIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentSpecialty.substring(0, typedText.length - 1));
      }, 30);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentSpecialty.substring(0, typedText.length + 1));
      }, 60);
    }

    if (!isDeleting && typedText === currentSpecialty) {
      timer = setTimeout(() => setIsDeleting(true), 2500); // Wait before deleting
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setSpecialtyIndex((prev) => (prev + 1) % specialties.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, specialtyIndex]);

  return (
    <section id="bio" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24 border-x border-border-custom bg-bg">
      <div className="border border-border-custom bg-card-bg p-6 md:p-8 font-mono relative overflow-hidden">
        {/* Terminal Header Decorator */}
        <div className="absolute top-0 left-0 right-0 h-8 border-b border-border-custom bg-bg flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-border-focus opacity-30" />
            <span className="h-2 w-2 rounded-full bg-border-focus opacity-30" />
            <span className="h-2 w-2 rounded-full bg-border-focus opacity-30" />
            <span className="text-[10px] text-muted font-bold">SYSTEM_MANIFEST.LOG</span>
          </div>
          <span className="text-[10px] text-muted">STATUS: ONLINE</span>
        </div>

        <div className="mt-6 space-y-6">
          {/* Main Info */}
          <div className="space-y-2">
            <div className="text-xs text-accent font-bold tracking-widest">[B.TECH CS / VIT PUNE]</div>
            <h1 className="text-3xl font-extrabold tracking-tight text-fg sm:text-5xl">
              DEVANG PATIL
            </h1>
            <p className="text-sm font-semibold text-muted">
              Timeline: 2025 — 2029 • Pune, MH
            </p>
          </div>

          {/* Typing Focus */}
          <div className="h-12 border-l-2 border-accent pl-4 flex items-center bg-bg/50">
            <div>
              <span className="text-xs text-muted block uppercase tracking-wider text-[10px]">Active Focus:</span>
              <span className="text-sm sm:text-md text-fg font-bold typing-caret">
                {typedText}
              </span>
            </div>
          </div>

          {/* Bio Text */}
          <p className="text-sm text-muted leading-relaxed max-w-2xl font-sans">
            I am a B.Tech Computer Science student at Vishwakarma Institute of Technology, Pune. I build high-fidelity frontend systems that bridge the gap between complex mathematical models, autonomous AI agent layers, and web interfaces.
          </p>

          {/* Stats Grid */}
          <div className="border border-border-custom bg-bg p-4 rounded-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs">
              <div className="flex justify-between border-b border-border-custom/50 py-1">
                <span className="text-muted">UNIVERSITY:</span>
                <span className="font-bold text-fg">VIT Pune</span>
              </div>
              <div className="flex justify-between border-b border-border-custom/50 py-1">
                <span className="text-muted">GPA TARGET:</span>
                <span className="font-bold text-fg">9.5+ Cumulative</span>
              </div>
              <div className="flex justify-between border-b border-border-custom/50 py-1">
                <span className="text-muted">GITHUB:</span>
                <a 
                  href="https://github.com/Dev-angPatil" 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-bold text-fg hover:text-accent underline transition-colors"
                >
                  github.com/Dev-angPatil
                </a>
              </div>
              <div className="flex justify-between border-b border-border-custom/50 py-1">
                <span className="text-muted">EMAIL:</span>
                <a 
                  href="mailto:officialdevangpatil@gmail.com" 
                  className="font-bold text-fg hover:text-accent underline transition-colors"
                >
                  officialdevangpatil@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) {
                  const offset = 80;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = element.getBoundingClientRect().top;
                  window.scrollTo({
                    top: elementRect - bodyRect - offset,
                    behavior: "smooth"
                  });
                }
              }}
              className="flex items-center space-x-2 border border-border-focus bg-fg px-4 py-2 text-xs text-bg hover:bg-bg hover:text-fg transition-all cursor-pointer font-bold"
            >
              <span>Explore Projects</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => setIsCliOpen(true)}
              className="flex items-center space-x-2 border border-border-custom bg-card-bg px-4 py-2 text-xs hover:border-border-focus text-fg hover:text-accent transition-all cursor-pointer"
            >
              <Terminal size={14} />
              <span>Launch CLI Console</span>
            </button>

            <div className="flex items-center space-x-2 sm:ml-auto pt-2 sm:pt-0">
              <a
                href="https://github.com/Dev-angPatil"
                target="_blank"
                rel="noreferrer"
                className="border border-border-custom bg-card-bg p-2 hover:border-border-focus text-muted hover:text-fg transition-all"
                aria-label="GitHub profile"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/devang-patil-b7556b350/"
                target="_blank"
                rel="noreferrer"
                className="border border-border-custom bg-card-bg p-2 hover:border-border-focus text-muted hover:text-fg transition-all"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:officialdevangpatil@gmail.com"
                className="border border-border-custom bg-card-bg p-2 hover:border-border-focus text-muted hover:text-fg transition-all"
                aria-label="Email Devang"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Keyboard shortcut footnote */}
        <div className="mt-6 border-t border-border-custom/50 pt-4 text-[10px] text-muted flex items-center justify-between">
          <span>SHORTCUT: PRESS <kbd className="border border-border-custom bg-bg px-1 py-0.5 rounded-sm font-bold text-fg">`</kbd> (BACKTICK) ON KEYBOARD TO TOGGLE CLI MODE ANYTIME</span>
          <span className="hidden sm:inline">LOC: Pune, India</span>
        </div>
      </div>
    </section>
  );
}
