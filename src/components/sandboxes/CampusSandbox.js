"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { CreditCard, Wifi, ShieldAlert, Check } from "lucide-react";

export default function CampusSandbox() {
  const [authState, setAuthState] = useState("idle"); // "idle" | "tapping" | "success"
  const [txHash, setTxHash] = useState("");
  const containerRef = useRef(null);

  // Motion values for the 3D card tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Mouse move handler to compute tilt based on coordinates
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Map mouse position to degree rotation limits
    rotateX.set(-(mouseY / (height / 2)) * 15);
    rotateY.set((mouseX / (width / 2)) * 15);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const triggerNfcTap = () => {
    if (authState === "tapping") return;
    setAuthState("tapping");
    setTxHash("");

    setTimeout(() => {
      setAuthState("success");
      // Simulate Solana Transaction Signature
      const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
      let sig = "solSig";
      for (let i = 0; i < 12; i++) {
        sig += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setTxHash(sig);
    }, 1200);
  };

  return (
    <div className="border border-border-custom bg-bg p-3 rounded-sm text-xs font-mono flex flex-col h-full justify-between space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-custom/50 pb-1.5">
        <span className="text-[10px] text-muted font-bold uppercase flex items-center space-x-1">
          <Wifi size={10} className="animate-pulse text-accent" />
          <span>Solana NFC Identity Relay</span>
        </span>
        <span className="text-[9px] text-muted">[Perspective: Hover Card]</span>
      </div>

      {/* Interactive Arena */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-grow items-center min-h-[135px]">
        {/* Left Column: 3D ID Card */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 600 }}
          className="w-full flex justify-center py-1 select-none"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={triggerNfcTap}
            className="w-[145px] h-[92px] border border-border-focus bg-card-bg p-2.5 rounded-md flex flex-col justify-between cursor-pointer relative shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Front card layout */}
            <div className="flex items-start justify-between">
              <div className="text-[8px] font-bold text-fg tracking-tighter">CHAINCAMPUS ID</div>
              <Wifi size={10} className="text-accent rotate-90" />
            </div>
            
            <div className="my-1.5">
              <div className="text-[9px] font-extrabold text-fg uppercase truncate">Devang Patil</div>
              <div className="text-[7px] text-muted uppercase">B.Tech CS / VIT</div>
            </div>

            <div className="flex justify-between items-center text-[7px] border-t border-border-custom/50 pt-1">
              <span className="text-muted">SOLANA NET</span>
              <span className="text-fg font-bold tracking-tighter">[VERIFIED]</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: NFC Reader Console */}
        <div className="border border-border-custom bg-card-bg p-2 h-[100px] flex flex-col justify-between">
          <div className="text-[9px] text-muted font-bold border-b border-border-custom/50 pb-1 flex justify-between items-center">
            <span>NFC TERMINAL STATE:</span>
            <span className={`h-1.5 w-1.5 rounded-full ${
              authState === "idle" ? "bg-muted" : 
              authState === "tapping" ? "bg-accent animate-pulse" : 
              "bg-fg animate-ping"
            }`} />
          </div>

          <div className="flex-grow flex flex-col justify-center space-y-1 text-[9px]">
            {authState === "idle" && (
              <div className="text-muted italic text-center py-2">
                Click ID or tap button to transmit NFC signal
              </div>
            )}
            {authState === "tapping" && (
              <div className="text-accent space-y-0.5 animate-pulse font-semibold text-center">
                <div>[NFC]: Carrier wave detected...</div>
                <div>[SOL]: Registering block attendance...</div>
              </div>
            )}
            {authState === "success" && (
              <div className="space-y-1 text-fg">
                <div className="flex items-center space-x-1 text-fg font-bold">
                  <Check size={10} className="text-fg" />
                  <span>IDENTITY AUTHENTICATED</span>
                </div>
                <div className="text-muted text-[8px] truncate">
                  TX: <span className="text-fg font-mono">{txHash}</span>
                </div>
                <div className="text-muted text-[8px]">
                  LEDGER LOG: Sync Success (+1 Attn block)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Button Action */}
      <button
        disabled={authState === "tapping"}
        onClick={triggerNfcTap}
        className="w-full flex items-center justify-center space-x-2 border border-border-focus bg-fg text-bg hover:bg-bg hover:text-fg disabled:bg-border-custom disabled:text-muted py-2 px-3 text-xs font-bold transition-all cursor-pointer"
      >
        <CreditCard size={12} />
        <span>{authState === "tapping" ? "Transmitting..." : "Tap Student ID Card"}</span>
      </button>
    </div>
  );
}
