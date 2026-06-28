"use client";

import { useRef } from "react";
import { Calendar, GraduationCap, Award, Briefcase } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const timelineItems = [
    {
      id: 1,
      type: "education",
      icon: <GraduationCap size={14} />,
      date: "2025 — 2029",
      title: "B.Tech in Computer Science",
      institution: "Vishwakarma Institute of Technology (VIT), Pune",
      details: [
        "Focus on Systems Programming, Data Structures & Algorithms, and AI integrations.",
        "Targeting 9.5+ CGPA while participating in open-source development and university technical clubs."
      ]
    },
    {
      id: 2,
      type: "experience",
      icon: <Briefcase size={14} />,
      date: "2025 — Present",
      title: "Research Volunteer",
      institution: "Vishwaconclave (National Student Symposium)",
      details: [
        "Helped research for prospective event speakers and compiled background dossiers.",
        "Designed and formatted PowerPoint presentation decks used during live speaker sessions."
      ]
    },
    {
      id: 3,
      type: "milestone",
      icon: <Award size={14} />,
      date: "Mid 2026",
      title: "Singular Platform Launch",
      institution: "Independent AI Project",
      details: [
        "Architected cooperative multi-agent node network executing automated invoice auditing and receipt bookkeeping.",
        "Published source code and deployed full stack to Render and Supabase with automated CI/CD pipelines."
      ]
    },
    {
      id: 4,
      type: "milestone",
      icon: <Award size={14} />,
      date: "Early 2026",
      title: "Zero-to-Brand & ChainCampus Deployments",
      institution: "Academic & Hackathon Projects",
      details: [
        "ChainCampus: Built NFC mobile-to-desktop session login relay with Solana Rust/Anchor contracts.",
        "Zero-to-Brand: Built Solarpunk Campaign Engine integrating Gemini 2.5 Flash visual parsing, Imagen 3.0, and Web Audio API."
      ]
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="timeline" 
      className="mx-auto max-w-5xl px-4 py-16 sm:px-6 border-x border-border-custom bg-bg overflow-hidden"
    >
      <div className="space-y-8 font-mono">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3 border-b border-border-custom pb-4"
        >
          <Calendar size={18} className="text-accent" />
          <h2 className="text-lg font-bold uppercase tracking-wider text-fg">Resume & Timeline</h2>
        </motion.div>

        {/* Timeline Path */}
        <div className="relative ml-4 pl-6 space-y-10 py-2">
          {/* Static Background Line */}
          <div className="absolute left-[15.5px] top-2 bottom-2 w-[1px] bg-border-custom" />
          
          {/* Dynamic Scroll-Drawn Active Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[15.5px] top-2 bottom-2 w-[1px] bg-accent"
          />

          {timelineItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative group"
            >
              {/* Timeline Dot Indicator */}
              <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-sm border border-border-focus bg-bg text-fg group-hover:border-accent group-hover:text-accent transition-colors z-10">
                {item.icon}
              </span>

              {/* Card Container */}
              <div className="border border-border-custom bg-card-bg p-4 rounded-sm hover:border-border-focus transition-all group-hover:shadow-[0_0_15px_rgba(234,88,12,0.03)]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-custom/50 pb-2 mb-3">
                  <span className="text-xs text-accent font-bold tracking-widest">{item.date}</span>
                  <span className="text-[10px] bg-bg px-2 py-0.5 border border-border-custom text-muted font-bold uppercase rounded-sm">
                    {item.type}
                  </span>
                </div>
                
                <h3 className="text-sm font-bold text-fg uppercase">{item.title}</h3>
                <div className="text-xs text-muted font-semibold mt-0.5">{item.institution}</div>
                
                <ul className="mt-3 space-y-1.5 font-sans">
                  {item.details.map((bullet, idx) => (
                    <li key={idx} className="flex items-start text-xs text-muted leading-normal">
                      <span className="font-mono text-accent text-[9px] mr-2 mt-0.5 select-none">▪</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
