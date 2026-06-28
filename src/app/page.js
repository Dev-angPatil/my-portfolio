"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Timeline from "@/components/Timeline";
import ContactForm from "@/components/ContactForm";
import CLIConsole from "@/components/CLIConsole";
import { motion } from "framer-motion";

export default function Home() {
  const [isCliOpen, setIsCliOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("bio");

  // Keyboard shortcut listener: Press backtick (`) to toggle CLI mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "`") {
        e.preventDefault();
        setIsCliOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // IntersectionObserver to auto-update active nav tab on scroll
  useEffect(() => {
    const sections = ["bio", "projects", "timeline", "contact"];
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-45% 0px -45% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push({ observer, el });
    });

    return () => {
      observers.forEach(({ observer, el }) => observer.unobserve(el));
    };
  }, []);

  const projectsData = [
    {
      title: "Singular",
      tagline: "Cooperative AI Agent Platform",
      stack: ["React", "Vite", "Supabase", "Gemini API", "Render API", "JSON"],
      role: "Designed cooperative AI agent nodes to automate invoicing, bookkeeping, and receipt auditing for solopreneurs. Engineered an 'Invoice Sentinel' parser using LLM prompts to extract structured JSON data and flag tax anomalies.",
      github: "https://github.com/Dev-angPatil/Singular",
      liveUrl: "https://singular-ocr.onrender.com",
      mockupImg: "/screenshots/singular.png",
      impact: [
        "Automated bookkeeping pipeline processing 100+ simulated invoices per minute.",
        "Integrated Gemini LLM metadata extraction achieving 98% accuracy on anomalous receipts.",
        "Constructed secure Supabase database layer and Render-based automated CI/CD deployments."
      ]
    },
    {
      title: "Zero-to-Brand",
      tagline: "Solarpunk Multi-Product Campaign Engine",
      stack: ["Next.js", "Tailwind CSS", "Gemini 2.5 Flash", "Imagen 3.0", "Web Audio API", "JSON Database"],
      role: "Architected an autonomous design co-pilot and marketing engine helping artisan makers turn raw craft photos into complete brand-aligned storytelling campaign storefronts with Gemini 2.5 Flash visual parsing and Imagen 3.0 image rendering.",
      github: "https://github.com/Dev-angPatil/Zero-to-Brand",
      liveUrl: "https://zero-to-brand.vercel.app",
      mockupImg: "/screenshots/zerotobrand.png",
      impact: [
        "Built visual description parsers using Gemini 2.5 Flash to automatically extract textures, materials, and styles.",
        "Engineered visual conditioning prompt refiners utilizing Imagen 3.0 to render high-fidelity brand campaign banners.",
        "Created procedural sonic branding identifiers structuring chord scales and tempo plucks using the browser Web Audio API."
      ]
    },
    {
      title: "ChainCampus",
      tagline: "Decentralized Solana Identity System",
      stack: ["React", "Solana", "Rust/Anchor", "Android SDK", "NFC API", "Framer Motion"],
      role: "Programmed custom Rust/Anchor smart contracts to register on-chain student accounts, attendance, and scholarship transactions. Developed NFC mobile-to-desktop session login relay.",
      github: "https://github.com/Dev-angPatil/ChainCampus",
      liveUrl: "https://chain-campus.vercel.app",
      mockupImg: "/screenshots/campus.png",
      impact: [
        "Developed Anchor smart contracts on Solana for transparent, on-chain attendance verification.",
        "Built NFC login relay using Android SDK enabling card-tapped desktop session login.",
        "Created responsive React frontends featuring cursor-tracked 3D student cards (Framer Motion)."
      ]
    },
    {
      title: "AeroMesh 3D",
      tagline: "Swarm Telemetry Control Engine & Real-Time 3D Cockpit",
      stack: ["Next.js", "React Three Fiber", "Three.js", "FastAPI", "Python", "WebSockets"],
      role: "Engineered pathfinding algorithms utilizing Artificial Potential Fields (APF) and tangential vortex forces for drone deconfliction. Built real-time 3D telemetry visualization cockpits with React Three Fiber.",
      github: "https://github.com/Dev-angPatil/AirSwarm-3D",
      liveUrl: "https://aeromesh-3d.onrender.com",
      mockupImg: "/screenshots/aeromesh.png",
      impact: [
        "Simulated 10+ autonomous drones with real-time collision-free path deconfliction.",
        "Broadcast telemetry at 20Hz over WebSockets to three-dimensional control HUDs.",
        "Passed safety-critical E2E test suites enforcing strict min-distance limits (>= 0.5)."
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <Header 
        isCliOpen={isCliOpen} 
        setIsCliOpen={setIsCliOpen} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Areas (Visual Mode) */}
      <main className="flex-grow">
        {/* Hero Area */}
        <Hero setIsCliOpen={setIsCliOpen} />

        {/* Projects Showcase Area */}
        <section id="projects" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 border-x border-border-custom bg-bg overflow-hidden">
          <div className="space-y-8 font-mono">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3 border-b border-border-custom pb-4"
            >
              <span className="text-fg font-bold">●</span>
              <h2 className="text-lg font-bold uppercase tracking-wider text-fg">Engineering Showcase</h2>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projectsData.map((project, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="h-full"
                >
                  <ProjectCard 
                    title={project.title}
                    tagline={project.tagline}
                    stack={project.stack}
                    role={project.role}
                    github={project.github}
                    liveUrl={project.liveUrl}
                    impact={project.impact}
                    mockupImg={project.mockupImg}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Area */}
        <Timeline />

        {/* Contact Form Area */}
        <ContactForm />
      </main>

      {/* Footer Area */}
      <footer className="w-full border-t border-border-custom py-8 bg-bg transition-colors duration-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-muted gap-4">
          <div>
            DESIGNED & ENGINEEERED BY DEVANG PATIL • {new Date().getFullYear()}
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setIsCliOpen(true)}
              className="hover:text-fg hover:underline transition-all cursor-pointer"
            >
              LAUNCH CONSOLE [Ctrl+`]
            </button>
            <span>•</span>
            <a 
              href="https://github.com/Dev-angPatil" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-fg hover:underline transition-all"
            >
              GITHUB
            </a>
            <span>•</span>
            <a 
              href="https://www.linkedin.com/in/devang-patil-b7556b350/" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-fg hover:underline transition-all"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </footer>

      {/* Full-Screen CLI Console Overlay */}
      <CLIConsole isOpen={isCliOpen} onClose={() => setIsCliOpen(false)} />
    </div>
  );
}
