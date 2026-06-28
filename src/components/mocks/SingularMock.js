"use client";

import { useState } from "react";
import { Play, CheckCircle2, AlertTriangle, Cpu } from "lucide-react";

export default function SingularMock() {
  const [invoices, setInvoices] = useState([
    { id: "INV-042", vendor: "OpenAI Corp", amount: "$1,200.00", gst: "$216.00", status: "Verified" },
    { id: "INV-043", vendor: "Vercel Inc", amount: "$850.00", gst: "$153.00", status: "Verified" },
    { id: "INV-044", vendor: "Google Cloud", amount: "$3,400.00", gst: "$680.00", status: "Anomaly" }
  ]);
  const [selectedInv, setSelectedInv] = useState("INV-044");
  const [auditLogs, setAuditLogs] = useState([]);
  const [isAuditing, setIsAuditing] = useState(false);

  const startAudit = () => {
    setIsAuditing(true);
    setAuditLogs([]);
    const lines = [
      "Connecting to Gemini-1.5-Pro API node...",
      "Downloading invoice attachment payload...",
      "Extracting raw OCR text structure...",
      "Matching key-value pairs (Subtotal, GST, Total)...",
      "Validating arithmetic consistency...",
      "ERROR: Calculated GST (18%) = $612.00. Declared = $680.00.",
      "CRITICAL: Tax discrepancy of $68.00 flagged!"
    ];

    lines.forEach((line, idx) => {
      setTimeout(() => {
        setAuditLogs((prev) => [...prev, line]);
        if (idx === lines.length - 1) {
          setIsAuditing(false);
        }
      }, (idx + 1) * 400);
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 h-full text-[10px]">
      {/* Invoice Database */}
      <div className="sm:col-span-3 border border-border-custom bg-bg p-3 rounded-sm flex flex-col justify-between">
        <div>
          <div className="text-[9px] text-muted font-bold tracking-widest uppercase mb-2">Invoice Registry</div>
          <div className="space-y-1.5">
            {invoices.map((inv) => (
              <div 
                key={inv.id} 
                onClick={() => !isAuditing && setSelectedInv(inv.id)}
                className={`p-2 border transition-all cursor-pointer flex items-center justify-between rounded-sm ${
                  selectedInv === inv.id 
                    ? "border-accent bg-accent/5 text-fg font-bold" 
                    : "border-border-custom bg-card-bg/50 text-muted hover:border-border-focus hover:text-fg"
                }`}
              >
                <span>{inv.id} - {inv.vendor}</span>
                <span className="flex items-center space-x-1.5">
                  <span className="font-mono">{inv.amount}</span>
                  {inv.status === "Verified" ? (
                    <CheckCircle2 size={10} className="text-neutral-400" />
                  ) : (
                    <AlertTriangle size={10} className="text-accent" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={startAudit}
          disabled={isAuditing}
          className="w-full mt-3 border border-border-focus bg-fg text-bg py-1.5 rounded-sm font-bold hover:bg-bg hover:text-fg disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center space-x-1"
        >
          <Cpu size={10} className={isAuditing ? "animate-spin" : ""} />
          <span>{isAuditing ? "RUNNING SENTINEL AUDIT..." : "AUDIT SELECTED INVOICE"}</span>
        </button>
      </div>

      {/* Live Auditor Logs Console */}
      <div className="sm:col-span-2 border border-border-custom bg-[#070605] p-3 rounded-sm flex flex-col justify-between min-h-[140px] font-mono text-[#ededec] h-[190px]">
        <div className="text-[8px] text-neutral-500 border-b border-neutral-900 pb-1 flex justify-between">
          <span>AI_SENTINEL_LOG.DAT</span>
          <span className={isAuditing ? "text-accent animate-pulse" : "text-neutral-500"}>
            {isAuditing ? "● AUDITING" : "○ READY"}
          </span>
        </div>
        
        <div className="flex-grow overflow-y-auto mt-2 space-y-1.5 leading-snug">
          {auditLogs.length === 0 ? (
            <div className="text-neutral-600 italic">Select an invoice and click Audit to trigger Gemini parsing logs...</div>
          ) : (
            auditLogs.map((log, idx) => {
              const isError = log.startsWith("ERROR") || log.startsWith("CRITICAL");
              return (
                <div key={idx} className={isError ? "text-accent font-bold" : "text-neutral-400"}>
                  {log.startsWith("CRITICAL") ? "⚡ " : log.startsWith("ERROR") ? "⚠ " : "⚙ "}
                  {log}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
