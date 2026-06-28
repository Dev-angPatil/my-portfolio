"use client";

import { Calendar, GraduationCap, Award, Briefcase } from "lucide-react";

export default function Timeline() {
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
    <section id="timeline" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 border-x border-border-custom bg-bg">
      <div className="space-y-8 font-mono scroll-reveal">
        {/* Section Header */}
        <div className="flex items-center space-x-3 border-b border-border-custom pb-4">
          <Calendar size={18} className="text-accent" />
          <h2 className="text-lg font-bold uppercase tracking-wider text-fg">Resume & Timeline</h2>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-border-custom ml-4 pl-6 space-y-10 py-2">
          {timelineItems.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Dot Indicator */}
              <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-sm border border-border-focus bg-bg text-fg group-hover:border-accent group-hover:text-accent transition-colors">
                {item.icon}
              </span>

              {/* Card Container */}
              <div className="border border-border-custom bg-card-bg p-4 rounded-sm hover:border-border-focus transition-all">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
