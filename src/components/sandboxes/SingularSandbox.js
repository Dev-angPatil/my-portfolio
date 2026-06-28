"use client";

import { useState, useEffect } from "react";
import { Play, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";

export default function SingularSandbox() {
  const [selectedInvoice, setSelectedInvoice] = useState("A"); // "A" | "B"
  const [status, setStatus] = useState("idle"); // "idle" | "scanning" | "done"
  const [logs, setLogs] = useState([]);
  const [parsedData, setParsedData] = useState(null);

  const invoices = {
    A: {
      id: "INV-2026-0042",
      vendor: "Acme Cloud Services",
      date: "2026-06-25",
      subtotal: 10000.0,
      taxExpected: 1800.0, // 18%
      taxClaimed: 1800.0,  // Match
      total: 11800.0,
      currency: "INR",
      status: "Verified"
    },
    B: {
      id: "INV-2026-0043",
      vendor: "Wayne Enterprises",
      date: "2026-06-26",
      subtotal: 10000.0,
      taxExpected: 1800.0, // 18%
      taxClaimed: 500.0,   // Anomaly!
      total: 10500.0,
      currency: "INR",
      status: "Flagged"
    }
  };

  const runSentinel = () => {
    setStatus("scanning");
    setLogs([]);
    setParsedData(null);
  };

  useEffect(() => {
    if (status !== "scanning") return;

    const logSequence = [
      { text: "⚡ [SENTINEL-01]: Node initialized on thread #4", delay: 100 },
      { text: "📥 [SENTINEL-01]: Loading receipt OCR raw text...", delay: 600 },
      { text: "🤖 [SENTINEL-01]: Querying Gemini LLM node for JSON schemas extraction...", delay: 1200 },
      { text: "⚙️ [SENTINEL-01]: Extracting: { Subtotal, TaxAmount, Vendor }", delay: 1800 },
      { 
        text: `🔍 [SENTINEL-01]: Validating arithmetic: Subtotal * 0.18 = ${invoices[selectedInvoice].taxExpected} GST`, 
        delay: 2400 
      },
      selectedInvoice === "A"
        ? { text: "✅ [SENTINEL-01]: Check passed. Claimed tax matches expected tax.", delay: 3000 }
        : { text: "❌ [WARNING]: Arithmetic anomaly! Claimed Tax (500.00) != Expected Tax (1800.00)", delay: 3000 },
      selectedInvoice === "A"
        ? { text: "🏆 [SYSTEM]: Transaction verified. Appending ledger block...", delay: 3600 }
        : { text: "⚠️ [SYSTEM]: Fraud Sentinel halted process. Writing anomaly log...", delay: 3600 }
    ];

    logSequence.forEach((item) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, item.text]);
      }, item.delay);
    });

    // Complete scan
    setTimeout(() => {
      setStatus("done");
      setParsedData(invoices[selectedInvoice]);
    }, 4200);

  }, [status, selectedInvoice]);

  return (
    <div className="border border-border-custom bg-bg p-3 rounded-sm text-xs font-mono flex flex-col h-full justify-between space-y-3">
      {/* Selector Options */}
      <div className="flex items-center justify-between border-b border-border-custom/50 pb-2">
        <span className="text-[10px] text-muted font-bold uppercase">Select Receipt:</span>
        <div className="flex space-x-1">
          <button
            disabled={status === "scanning"}
            onClick={() => { setSelectedInvoice("A"); setStatus("idle"); setParsedData(null); setLogs([]); }}
            className={`px-2 py-0.5 border rounded-sm transition-all cursor-pointer ${
              selectedInvoice === "A" 
                ? "border-border-focus bg-fg text-bg" 
                : "border-border-custom text-muted hover:text-fg"
            }`}
          >
            Invoice A (Valid)
          </button>
          <button
            disabled={status === "scanning"}
            onClick={() => { setSelectedInvoice("B"); setStatus("idle"); setParsedData(null); setLogs([]); }}
            className={`px-2 py-0.5 border rounded-sm transition-all cursor-pointer ${
              selectedInvoice === "B" 
                ? "border-accent bg-accent/10 text-accent font-bold" 
                : "border-border-custom text-muted hover:text-fg"
            }`}
          >
            Invoice B (Anomaly)
          </button>
        </div>
      </div>

      {/* Simulator Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-grow min-h-[140px]">
        {/* Logs Console */}
        <div className="border border-border-custom bg-card-bg p-2 h-[130px] overflow-y-auto space-y-1 text-[10px] text-fg/80 leading-snug">
          {logs.length === 0 && status === "idle" && (
            <div className="text-muted italic flex items-center justify-center h-full">
              Click 'Deploy Sentinel' to audit receipt
            </div>
          )}
          {logs.map((log, i) => (
            <div key={i} className={log.includes("❌") || log.includes("⚠️") ? "text-accent font-bold" : ""}>
              {log}
            </div>
          ))}
          {status === "scanning" && (
            <div className="text-accent animate-pulse font-bold">Scanning...</div>
          )}
        </div>

        {/* JSON Metadata Output */}
        <div className="border border-border-custom bg-card-bg p-2 h-[130px] overflow-y-auto flex flex-col justify-between">
          <div className="text-[9px] text-muted font-bold border-b border-border-custom/50 pb-1 mb-1">
            PARSED METADATA SCHEMA:
          </div>
          {parsedData ? (
            <pre className="text-[9px] text-fg leading-tight overflow-x-auto flex-grow">
              {JSON.stringify(parsedData, null, 2)}
            </pre>
          ) : (
            <div className="flex-grow flex items-center justify-center text-[10px] text-muted italic">
              Awaiting scan data
            </div>
          )}
          
          {parsedData && (
            <div className="mt-1 border-t border-border-custom/50 pt-1 flex items-center space-x-1 text-[10px]">
              {parsedData.status === "Verified" ? (
                <>
                  <CheckCircle size={10} className="text-fg" />
                  <span className="font-bold text-fg">VERIFICATION APPROVED</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={10} className="text-accent" />
                  <span className="font-bold text-accent">FLAGGED BY AGENT</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Deploy Actions */}
      <button
        disabled={status === "scanning"}
        onClick={runSentinel}
        className="w-full flex items-center justify-center space-x-2 border border-border-focus bg-fg text-bg hover:bg-bg hover:text-fg disabled:bg-border-custom disabled:text-muted py-2 px-3 text-xs font-bold transition-all cursor-pointer"
      >
        {status === "scanning" ? (
          <>
            <RefreshCw size={14} className="animate-spin" />
            <span>Auditing Ledger...</span>
          </>
        ) : (
          <>
            <Play size={12} />
            <span>Deploy Invoice Sentinel</span>
          </>
        )}
      </button>
    </div>
  );
}
