"use client";

import { useState, useRef } from "react";
import { CreditCard, Wifi, ShieldAlert } from "lucide-react";

export default function CampusMock() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [logs, setLogs] = useState([
    { signature: "3h7w...c1a", action: "Session Init", status: "SECURE" }
  ]);
  const [isTapping, setIsTapping] = useState(false);
  const cardRef = useRef(null);

  // Mouse move tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Divide by divisor to restrict range of angle rotation
    setRotateY(x / 10);
    setRotateX(-y / 6);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const triggerNfcTap = () => {
    if (isTapping) return;
    setIsTapping(true);
    
    // Simulate NFC login verification sequence
    setTimeout(() => {
      const hexChars = "0123456789abcdef";
      let sig = "";
      for (let i = 0; i < 8; i++) {
        sig += hexChars[Math.floor(Math.random() * 16)];
      }
      
      setLogs((prev) => [
        { signature: `${sig}...tap`, action: "NFC Attendance Verified", status: "SOLANA_OK" },
        ...prev
      ]);
      setIsTapping(false);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 h-full text-[10px]">
      {/* 3D Student ID Card View */}
      <div className="sm:col-span-2 border border-border-custom bg-bg p-3 rounded-sm flex flex-col justify-between items-center min-h-[160px]">
        <div className="text-[8px] text-muted font-bold tracking-widest uppercase text-left w-full">ID Card (3D Tilt-tracked)</div>
        
        {/* Tilt Card Wrapper */}
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={triggerNfcTap}
          style={{
            transform: `perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: isTapping ? "transform 0.2s" : "none"
          }}
          className={`w-[140px] h-[90px] bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-700/60 rounded-md p-2 flex flex-col justify-between select-none cursor-pointer shadow-lg relative ${
            isTapping ? "scale-95 border-accent" : ""
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[7px] text-accent font-bold tracking-wider">VIT CAMPUS</span>
              <span className="text-[5px] text-neutral-500 font-bold">SOLANA_ID_NET</span>
            </div>
            <Wifi size={8} className={`${isTapping ? "text-accent animate-pulse" : "text-neutral-500"}`} />
          </div>
          
          <div className="flex items-center space-x-1.5 mt-1">
            <div className="h-4 w-4 bg-neutral-800 rounded-full border border-neutral-700 flex items-center justify-center font-bold text-[5px] text-neutral-400 select-none">
              DP
            </div>
            <div className="flex flex-col">
              <span className="text-[6px] text-neutral-300 font-bold">Devang Patil</span>
              <span className="text-[4px] text-neutral-500 font-mono">ID: 25-CS-42</span>
            </div>
          </div>
          
          <div className="border-t border-neutral-800/80 pt-1 flex justify-between items-center text-[4px] font-mono text-neutral-600">
            <span>SIG: SOL_AUTH_OK</span>
            <span>NFC CHIP: ACTIVE</span>
          </div>
        </div>

        <button
          onClick={triggerNfcTap}
          className="w-full border border-border-focus bg-fg text-bg py-1 text-[8px] rounded-sm font-bold hover:bg-bg hover:text-fg transition-all cursor-pointer"
        >
          {isTapping ? "SCANNING NFC BEACON..." : "SIMULATE CARD NFC TAP"}
        </button>
      </div>

      {/* Solana Ledger Logs */}
      <div className="sm:col-span-3 border border-border-custom bg-card-bg/40 p-3 rounded-sm flex flex-col justify-between h-[190px]">
        <div className="text-[8px] text-muted font-bold tracking-widest uppercase border-b border-border-custom/50 pb-1.5 flex justify-between select-none">
          <span>Solana Ledger Receipts (Devnet)</span>
          <span className="text-accent">RPC: ONLINE</span>
        </div>

        <div className="flex-grow overflow-y-auto mt-2 space-y-1.5 font-mono text-[9px] leading-snug">
          {logs.map((log, idx) => (
            <div key={idx} className="flex justify-between border-b border-border-custom/30 pb-1 text-neutral-400">
              <span className="text-neutral-500">TX: {log.signature}</span>
              <span className="font-semibold text-fg">{log.action}</span>
              <span className="text-[8px] text-accent bg-accent/5 px-1 border border-accent/20 rounded-sm">
                {log.status}
              </span>
            </div>
          ))}
        </div>

        <div className="text-[7px] text-muted text-right font-mono mt-1 select-none">
          Rust/Anchor Smart Contract v1.2.0 • WebSockets Connected
        </div>
      </div>
    </div>
  );
}
