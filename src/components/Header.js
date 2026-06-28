"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Terminal } from "lucide-react";

export default function Header({ isCliOpen, setIsCliOpen, activeSection, setActiveSection }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Sync theme on mount
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navItems = [
    { id: "bio", label: "Bio" },
    { id: "projects", label: "Projects" },
    { id: "timeline", label: "Timeline" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-custom bg-bg/85 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-sm font-bold tracking-widest text-fg hover:text-accent transition-colors"
        >
          [DEVANG.DEV]
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative px-3 py-1.5 font-mono text-xs font-medium text-muted hover:text-fg transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-sm border border-border-focus bg-bg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* CLI Mode Button */}
          <button
            onClick={() => setIsCliOpen(true)}
            className="flex items-center space-x-1 border border-border-custom bg-card-bg px-3 py-1.5 font-mono text-xs hover:border-border-focus active:bg-accent/10 active:border-accent text-fg hover:text-accent transition-all cursor-pointer"
            title="Open Developer Console (CLI)"
          >
            <Terminal size={14} />
            <span className="hidden sm:inline">CLI Mode</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="border border-border-custom bg-card-bg p-1.5 hover:border-border-focus active:border-accent hover:text-accent text-muted hover:text-fg transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
