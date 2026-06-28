"use client";

import { useEffect, useState } from "react";
import { Terminal, Mail, ArrowRight } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { motion } from "framer-motion";

export default function Hero({ setIsCliOpen }) {
  const [typedText, setTypedText] = useState("");
  const specialties = [
    "Multi-Agent AI Workflows",
    "Responsive Full-Stack Architectures",
    "Linux Kernel & Shell Scripting",
    "Distributed Systems & WebSockets"
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
      <motion.div 
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="border border-border-custom bg-card-bg p-6 md:p-8 font-mono relative overflow-hidden"
      >
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
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2"
          >
            <div className="text-xs text-accent font-bold tracking-widest">[B.TECH CS / VIT PUNE]</div>
            <h1 className="text-3xl font-extrabold tracking-tight text-fg sm:text-5xl">
              DEVANG PATIL
            </h1>
            <p className="text-sm font-semibold text-muted">
              Timeline: 2025 — 2029 • Pune, MH
            </p>
          </motion.div>

          {/* Typing Focus */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-12 border-l-2 border-accent pl-4 flex items-center bg-bg/50"
          >
            <div>
              <span className="text-xs text-muted block uppercase tracking-wider text-[10px]">Active Focus:</span>
              <span className="text-sm sm:text-md text-fg font-bold typing-caret">
                {typedText}
              </span>
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-muted leading-relaxed max-w-2xl font-sans"
          >
            I am a B.Tech Computer Science student at Vishwakarma Institute of Technology, Pune. I build high-fidelity frontend systems that bridge the gap between complex mathematical models, autonomous AI agent layers, and web interfaces.
          </motion.p>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border border-border-custom bg-bg p-4 rounded-sm"
          >
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
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3 pt-2"
          >
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
              className="flex items-center space-x-2 border border-border-focus bg-fg px-4 py-2 text-xs text-bg hover:bg-bg hover:text-fg transition-all cursor-pointer font-bold active:scale-98"
            >
              <span>Explore Projects</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => setIsCliOpen(true)}
              className="flex items-center space-x-2 border border-border-custom bg-card-bg px-4 py-2 text-xs hover:border-border-focus text-fg hover:text-accent transition-all cursor-pointer active:scale-98"
            >
              <Terminal size={14} />
              <span>Launch Sandbox CLI [Ctrl+`]</span>
            </button>
          </motion.div>

          {/* Socials Banner */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border-t border-border-custom/50 pt-4 flex items-center justify-between text-xs text-muted"
          >
            <div className="flex items-center space-x-4">
              <span>SOCIALS:</span>
              <a 
                href="https://github.com/Dev-angPatil" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-fg transition-colors p-1"
                title="GitHub profile"
              >
                <Github size={16} />
              </a>
              <a 
                href="https://www.linkedin.com/in/devang-patil-b7556b350/" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-fg transition-colors p-1"
                title="LinkedIn profile"
              >
                <Linkedin size={16} />
              </a>
            </div>
            <div className="text-[10px] text-neutral-600 hidden sm:block">
              SECURE_TLS // AES_256_GCM
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
