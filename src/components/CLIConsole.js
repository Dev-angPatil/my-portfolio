"use client";

import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

export default function CLIConsole({ isOpen, onClose }) {
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const availableCommands = ["help", "cat bio.txt", "projects", "resume", "contact", "clear", "exit"];

  // Initialize terminal text on open
  useEffect(() => {
    if (isOpen) {
      setHistory([
        { type: "sys", text: "DEVANG.DEV [Version 1.0.42-release]" },
        { type: "sys", text: `(c) ${new Date().getFullYear()} Devang Patil. All rights reserved.` },
        { type: "sys", text: "" },
        { type: "sys", text: "■ Booting local environment nodes..." },
        { type: "sys", text: "■ Solana RPC: ACTIVE (Devnet / Mainnet-Beta)" },
        { type: "sys", text: "■ Supabase cluster status: SECURE / CONNECTED" },
        { type: "sys", text: `■ Current terminal timestamp: ${new Date().toString()}` },
        { type: "sys", text: "" },
        { type: "sys", text: "Type 'help' to see list of available commands." },
        { type: "sys", text: "" }
      ]);
      
      // Focus input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Scroll to bottom when output changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input when clicking console
  const handleConsoleClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmedCmd = inputVal.trim();
      if (!trimmedCmd) return;

      const newHistory = [...history, { type: "cmd", text: `devang@vit-pune:~$ ${trimmedCmd}` }];
      
      // Update command history queue
      setCmdHistory((prev) => [trimmedCmd, ...prev]);
      setHistoryIndex(-1);

      // Process Command
      const args = trimmedCmd.toLowerCase().split(" ");
      const mainCmd = args[0];

      switch (trimmedCmd.toLowerCase()) {
        case "help":
          newHistory.push(
            { type: "output", text: "Available commands in this shell:" },
            { type: "output", text: "  help          - Display this instruction panel" },
            { type: "output", text: "  cat bio.txt   - Display developer bio, specs, and GPA targets" },
            { type: "output", text: "  projects      - Print portfolio projects overview & stack" },
            { type: "output", text: "  resume        - Initiate download of resume PDF" },
            { type: "output", text: "  contact       - Output email coordinates and socials" },
            { type: "output", text: "  clear         - Empty terminal screen logs" },
            { type: "output", text: "  exit          - Close CLI console overlay" }
          );
          break;

        case "cat bio.txt":
          newHistory.push(
            { type: "output", text: "==================================================" },
            { type: "output", text: "DEVANG PATIL | B.TECH COMPUTER SCIENCE STUDENT" },
            { type: "output", text: "==================================================" },
            { type: "output", text: "• Institution: Vishwakarma Institute of Technology (VIT), Pune" },
            { type: "output", text: "• Focus areas: Cooperative AI systems, Biophysical models, Smart Contracts" },
            { type: "output", text: "• GPA Targets: 9.5+ CGPA" },
            { type: "output", text: "• Core Frontend: React, Next.js, Tailwind CSS, Framer Motion" },
            { type: "output", text: "• Core Systems/Backend: Solana, Anchor, Rust, Supabase, Python, Java" },
            { type: "output", text: "• Location: Pune, Maharashtra, India" }
          );
          break;

        case "projects":
          newHistory.push(
            { type: "output", text: "1. SINGULAR (Cooperative AI Agent Platform)" },
            { type: "output", text: "   └ Stack: React, Vite, Supabase, Gemini API, Render API" },
            { type: "output", text: "   └ Desc: Multi-agent nodes automating invoice auditing and OCR." },
            { type: "output", text: "2. ECOSYSTEMAI (Biophysical Digital Twin Simulator)" },
            { type: "output", text: "   └ Stack: Next.js, Vercel, Gemini API, Aurora DSQL" },
            { type: "output", text: "   └ Desc: Lotka-Volterra dynamics solver and Socratic coaching." },
            { type: "output", text: "3. CHAINCAMPUS (Decentralized Solana Identity)" },
            { type: "output", text: "   └ Stack: React, Solana, Rust/Anchor, Android SDK, NFC API" },
            { type: "output", text: "   └ Desc: On-chain attendance smart contracts with mobile NFC authentication." },
            { type: "output", text: "4. AEROMESH 3D (Swarm Telemetry Control Engine)" },
            { type: "output", text: "   └ Stack: Next.js, React Three Fiber, Three.js, FastAPI, Python" },
            { type: "output", text: "   └ Desc: APF swarm coordination deconfliction & 3D telemetry cockpit." }
          );
          break;

        case "resume":
          newHistory.push({ type: "output", text: "✔ Initializing resume download sequence..." });
          setTimeout(() => {
            const link = document.createElement("a");
            link.href = "/resume.pdf";
            link.download = "Devang_Patil_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 300);
          break;

        case "contact":
          newHistory.push(
            { type: "output", text: "📡 TRANSMISSION COORDS:" },
            { type: "output", text: "  • Email    : officialdevangpatil@gmail.com" },
            { type: "output", text: "  • GitHub   : github.com/Dev-angPatil" },
            { type: "output", text: "  • LinkedIn : linkedin.com/in/devang-patil-b7556b350" },
            { type: "output", text: "  * NOTE: To send a custom form payload, exit the CLI and submit the contact form." }
          );
          break;

        case "clear":
          setHistory([]);
          setInputVal("");
          return;

        case "exit":
          onClose();
          setInputVal("");
          return;

        default:
          newHistory.push({ 
            type: "error", 
            text: `Command not found: '${trimmedCmd}'. Type 'help' to see list of valid operations.` 
          });
      }

      setHistory(newHistory);
      setInputVal("");
    }

    // Tab autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const currentInput = inputVal.toLowerCase();
      if (!currentInput) return;

      const matches = availableCommands.filter((cmd) => cmd.startsWith(currentInput));
      if (matches.length === 1) {
        setInputVal(matches[0]);
      } else if (matches.length > 1) {
        // Log possible matches
        setHistory((prev) => [
          ...prev,
          { type: "cmd", text: `devang@vit-pune:~$ ${inputVal}` },
          { type: "output", text: matches.join("    ") }
        ]);
      }
    }

    // Command history traversal (Arrow Up / Down)
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      
      const nextIndex = historyIndex + 1;
      if (nextIndex < cmdHistory.length) {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }

    // Close terminal on Escape
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={handleConsoleClick}
      className="fixed inset-0 z-50 bg-[#070605] text-[#ededec] font-mono p-4 md:p-6 overflow-y-auto flex flex-col justify-between crt-overlay crt-scanline"
    >
      {/* Top Console Bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-[#ea580c]" />
          <span className="text-xs text-neutral-400 font-bold uppercase select-none">B.Tech Shell v1.0.42-Stable</span>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="border border-neutral-800 bg-neutral-900/50 p-1 text-neutral-400 hover:text-white hover:border-neutral-500 transition-all cursor-pointer"
          title="Exit Terminal (Esc)"
        >
          <X size={14} />
        </button>
      </div>

      {/* Terminal Output history */}
      <div className="flex-grow space-y-2 overflow-y-auto pr-2 text-xs leading-normal select-text">
        {history.map((line, index) => {
          let style = "text-neutral-300";
          if (line.type === "cmd") style = "text-white font-bold";
          if (line.type === "sys") style = "text-neutral-500";
          if (line.type === "error") style = "text-accent font-bold";
          if (line.type === "output") style = "text-neutral-300";

          return (
            <div key={index} className={`${style} whitespace-pre-wrap`}>
              {line.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Bottom Command Prompt */}
      <div className="mt-4 border-t border-neutral-900 pt-3 flex items-center text-xs">
        <span className="text-white font-bold select-none mr-2">devang@vit-pune:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent text-white focus:outline-none border-none caret-[#ea580c]"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
