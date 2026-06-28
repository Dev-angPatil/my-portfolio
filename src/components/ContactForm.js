"use client";

import { useState } from "react";
import { Send, Copy, Check, Download, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState("idle"); // "idle" | "submitting" | "success" | "success-simulated" | "error"
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("officialdevangpatil@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setFormState("submitting");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Simulate successful transmission if keys are not set up yet
      setTimeout(() => {
        setFormState("success-simulated");
      }, 2000);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        publicKey
      );
      setFormState("success");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 border-x border-b border-border-custom bg-bg overflow-hidden">
      <div className="space-y-8 font-mono">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3 border-b border-border-custom pb-4"
        >
          <Mail size={18} className="text-accent" />
          <h2 className="text-lg font-bold uppercase tracking-wider text-fg">Establish Connection</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left Column: Form / Console Output */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 border border-border-custom bg-card-bg p-5 rounded-sm relative overflow-hidden"
          >
            {formState === "idle" ? (
              /* ACTIVE FORM */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold uppercase">Name:</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Recruiter Name"
                      className="w-full bg-bg border border-border-custom px-3 py-2 text-xs text-fg focus:border-border-focus focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold uppercase">Email:</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@company.dev"
                      className="w-full bg-bg border border-border-custom px-3 py-2 text-xs text-fg focus:border-border-focus focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-muted font-bold uppercase">Message:</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe internship opportunity or request full CV..."
                    className="w-full bg-bg border border-border-custom px-3 py-2 text-xs text-fg focus:border-border-focus focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 border border-border-focus bg-fg text-bg hover:bg-bg hover:text-fg py-2.5 px-4 text-xs font-bold transition-all cursor-pointer active:scale-98"
                >
                  <Send size={12} />
                  <span>TRANSMIT CONNECTION PAYLOAD</span>
                </button>
              </form>
            ) : (
              /* SHELL LOG EXECUTION TERMINAL */
              <div className="space-y-2 h-[225px] overflow-y-auto text-[10px] bg-bg border border-border-custom p-3 rounded-sm leading-snug">
                <div className="text-muted"># Dispatched API Request pipeline...</div>
                <div className="text-fg">
                  $ curl -X POST https://devang.dev/api/contact \<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;-d &#123;"name": "{formData.name}", "email": "{formData.email}"&#125;
                </div>
                
                {formState === "submitting" ? (
                  <div className="text-accent animate-pulse font-bold mt-2">
                    ⌛ Transmitting TCP packet frame to EmailJS nodes...
                  </div>
                ) : formState === "success" ? (
                  <div className="space-y-1 mt-2">
                    <div className="text-fg font-bold">HTTP/1.1 200 OK</div>
                    <div className="text-muted">Content-Type: application/json</div>
                    <div className="text-muted">Date: {new Date().toUTCString()}</div>
                    <div className="text-fg mt-1">
                      &#123;<br />
                      &nbsp;&nbsp;"status": "success",<br />
                      &nbsp;&nbsp;"message": "Connection established. Message sent successfully!"<br />
                      &#125;
                    </div>
                    <button
                      onClick={() => { setFormState("idle"); setFormData({ name: "", email: "", message: "" }); }}
                      className="mt-4 border border-border-focus bg-fg text-bg px-3 py-1 text-[9px] font-bold hover:bg-bg hover:text-fg transition-all cursor-pointer"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                ) : formState === "success-simulated" ? (
                  <div className="space-y-1 mt-2">
                    <div className="text-fg font-bold">HTTP/1.1 200 OK (SIMULATED)</div>
                    <div className="text-muted">Content-Type: application/json</div>
                    <div className="text-muted">Date: {new Date().toUTCString()}</div>
                    <div className="text-accent mt-1">
                      &#123;<br />
                      &nbsp;&nbsp;"status": "simulated",<br />
                      &nbsp;&nbsp;"message": "EmailJS environment variables not configured. Simulation success!"<br />
                      &#125;
                    </div>
                    <div className="text-neutral-500 mt-2 text-[9px] leading-relaxed">
                      💡 DEV TIP: To make this form fully functional, create a `.env.local` file in the project root with:<br />
                      <span className="text-fg select-all">
                        NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id<br />
                        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id<br />
                        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
                      </span>
                    </div>
                    <button
                      onClick={() => { setFormState("idle"); setFormData({ name: "", email: "", message: "" }); }}
                      className="mt-4 border border-border-focus bg-fg text-bg px-3 py-1 text-[9px] font-bold hover:bg-bg hover:text-fg transition-all cursor-pointer"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 mt-2">
                    <div className="text-accent font-bold">HTTP/1.1 500 Internal Server Error</div>
                    <div className="text-muted">Content-Type: application/json</div>
                    <div className="text-fg mt-1">
                      &#123;<br />
                      &nbsp;&nbsp;"status": "error",<br />
                      &nbsp;&nbsp;"message": "Failed to transmit payload. Please check EmailJS configuration."<br />
                      &#125;
                    </div>
                    <button
                      onClick={() => setFormState("idle")}
                      className="mt-4 border border-border-focus bg-fg text-bg px-3 py-1 text-[9px] font-bold hover:bg-bg hover:text-fg transition-all cursor-pointer"
                    >
                      TRY AGAIN
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Right Column: Direct Info Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-2 space-y-4"
          >
            {/* Quick Actions Grid */}
            <div className="border border-border-custom bg-card-bg p-4 rounded-sm space-y-4">
              <div className="text-[10px] text-muted font-bold tracking-widest uppercase">DIRECT CONTACTS:</div>
              
              <div className="space-y-2 text-xs">
                {/* Copy Email Action */}
                <button
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-between border border-border-custom bg-bg px-3 py-2 text-fg hover:border-border-focus hover:text-accent transition-all cursor-pointer text-left font-mono active:scale-99"
                >
                  <div className="flex items-center space-x-2">
                    <Mail size={14} />
                    <span>Copy Email</span>
                  </div>
                  {copied ? <Check size={14} className="text-fg" /> : <Copy size={14} className="text-muted" />}
                </button>

                {/* Resume Download Action */}
                <a
                  href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/resume.pdf`}
                  download="Devang_Patil_Resume.pdf"
                  className="w-full flex items-center justify-between border border-border-custom bg-bg px-3 py-2 text-fg hover:border-border-focus hover:text-accent transition-all text-left font-mono active:scale-99"
                >
                  <div className="flex items-center space-x-2">
                    <Download size={14} />
                    <span>Download Resume PDF</span>
                  </div>
                  <Download size={14} className="text-muted" />
                </a>
              </div>
            </div>

            {/* Quick Card info */}
            <div className="border border-border-custom bg-card-bg p-4 rounded-sm text-[10px] text-muted leading-relaxed font-sans">
              <span className="font-mono text-accent font-bold uppercase tracking-wider block mb-1">Recruiter Notice:</span>
              I am actively seeking B.Tech B-term / Summer frontend internships starting in 2026/2027. Available for remote roles or hybrid roles in Pune/Bangalore.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
