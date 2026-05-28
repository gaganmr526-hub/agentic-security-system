/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Building, 
  TrendingUp, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Network, 
  Server, 
  FileCheck, 
  ChevronRight, 
  ChevronDown,
  Info,
  DollarSign
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const MarketReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"market" | "architecture" | "scalability" | "owasp">("market");
  const [expandedOwasp, setExpandedOwasp] = useState<string | null>("llm-01");

  const owaspItems = [
    {
      id: "llm-01",
      vuln: "OWASP LLM-01: Indirect Prompt Injection",
      desc: "Adversarial instructions ingested via untrusted external files (emails, PDF, web scrapes) which hijack the context window.",
      impact: "High risk of unauthorized funds transfer, data erasure, or identity theft.",
      solution: "Aegis Semantic Vector Guard & Dual-LLM validation."
    },
    {
      id: "llm-02",
      vuln: "OWASP LLM-02: Insecure Output Handling",
      desc: "Agent outputs directly downstream to system shells, databases, or client web browsers without escaping.",
      impact: "SQL injections, cross-site scripting (XSS), or remote shell code executions.",
      solution: "Aegis DLP Egress filters & secure gVisor parsing sandboxes."
    },
    {
      id: "llm-06",
      vuln: "OWASP LLM-06: Sensitive Information Disclosure",
      desc: "Agent is tricked into leaking its underlying base system instructions, proprietary templates, or secure developer API keys.",
      impact: "Exfiltration of competitive intellectual property and cloud backend keys.",
      solution: "Aegis Instruction Exfiltration Scanners with prompt heuristics."
    },
    {
      id: "llm-07",
      vuln: "OWASP LLM-07: Insecure Plugin Design",
      desc: "Integrations/plugins accept unvalidated string arguments from LLMs without double verification.",
      impact: "Privilege escalations, system prompt overrides via plugins, or directory traversals on core VMs.",
      solution: "Aegis Role-Based Access Control (RBAC) scopes strictly applied to plugin boundaries."
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl relative">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-slate-800 pb-4 mb-6">
        <div>
          <h2 className="text-sm font-mono text-slate-100 font-bold uppercase tracking-wider flex items-center gap-2">
            <Layers className="text-blue-400 w-4.5 h-4.5" />
            AEGIS MARKET CORE & ARCHITECTURAL DEPTH
          </h2>
          <p className="text-4xs text-slate-500 font-sans mt-0.5">
            Comprehensive business, system, and industry threat profiles built for AI agents and autonomous ecosystems.
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex gap-2 mt-4 xl:mt-0 bg-slate-950 p-1 rounded-lg border border-slate-850 self-start xl:self-auto">
          {(["market", "architecture", "scalability", "owasp"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded text-4xs font-mono font-bold uppercase transition-all ${
                activeTab === tab
                  ? "bg-slate-900 text-slate-100 border border-slate-800 shadow shadow-slate-950"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab === "owasp" ? "OWASP Vectors" : tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: MARKET & GTM UNDERSTANDING */}
        {activeTab === "market" && (
          <motion.div
            key="market-tab"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                The Agent Security Market Landscape
              </h3>
              <p className="font-sans text-2xs text-slate-400 leading-relaxed font-light">
                As software moves from static APIs to autonomous, decision-making AI Agents, a critical threat vector emerges. CISOs around the globe face a challenge: <strong>how do you secure a system that acts probabilistically on natural language?</strong> 
              </p>
              <p className="font-sans text-2xs text-slate-400 leading-relaxed font-light">
                Aegis represents the pioneering <strong>Autonomous Agent Firewall (AAF)</strong> category. Unlike conventional network firewalls that inspect packets, Aegis actively inspects, verifies, and bounds dynamic agent chains in real time, serving as a vital trust framework for enterprises scaling their AI operations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-850">
                  <h4 className="text-[10px] font-mono font-bold text-slate-300 mb-1 uppercase tracking-wider flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-blue-400" /> Target Markets & Customers
                  </h4>
                  <ul className="space-y-1.5 font-sans text-3xs text-slate-400 list-disc list-inside">
                    <li><strong className="text-slate-300">Financial Services AI:</strong> Defending lending decisioners, automated portfolio rebalancers.</li>
                    <li><strong className="text-slate-300">Enterprise CRM Automations:</strong> Safeguarding email summaries and automated calendar dispatchers.</li>
                    <li><strong className="text-slate-300">Defense & Logistics:</strong> Verifying command directives in microVM deployments.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-850">
                  <h4 className="text-[10px] font-mono font-bold text-slate-300 mb-1 uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Financial Projections (TAM)
                  </h4>
                  <ul className="space-y-1.5 font-sans text-3xs text-slate-400 list-disc list-inside">
                    <li><strong className="text-slate-300">CAGR Projections:</strong> AI security tools market expanding at 34.2% YoY CAGR.</li>
                    <li><strong className="text-slate-200">TAM Estimate:</strong> Expected to reach $18.5 Billion by 2030.</li>
                    <li><strong className="text-slate-300">GTM Strategy:</strong> API-first SaaS licensing with self-hosted Kubernetes microVM options.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-950 rounded-xl p-4 border border-slate-850/80 flex flex-col justify-between font-mono text-2xs">
              <div>
                <span className="text-[10px] font-bold text-slate-300 mb-3 block border-b border-slate-900 pb-2">
                  MARKET FORCES & MOAT
                </span>
                <div className="space-y-3">
                  <div>
                    <span className="text-emerald-400 block font-bold text-3xs">01. SEMANTIC MOAT</span>
                    <p className="text-4xs text-slate-400 font-sans leading-normal">
                      Deep context indexing vector engine blocks injections before model execution, cutting costly GPU overhead.
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-400 block font-bold text-3xs">02. COMPLIANCE ACCELERATOR</span>
                    <p className="text-4xs text-slate-400 font-sans leading-normal">
                      Enables rapid adoption of SOC2, HIPAA, and GDPR certifications for companies deploying generative agents.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-4xs font-sans text-slate-400 leading-relaxed mt-4">
                <strong>Why now?</strong> Standard security tools cannot read the semantics of prompt attacks. Aegis is built solely for this language-to-action transition.
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: SYSTEM ARCHITECTURE & PIPELINE */}
        {activeTab === "architecture" && (
          <motion.div
            key="arch-tab"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            <div className="md:col-span-8 space-y-4 font-sans text-2xs text-slate-400">
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
                <Network className="w-4 h-4 text-cyan-400" />
                SYSTEM ARCHITECTURE DESIGN & DUAL-PIPELINE TRUST
              </h3>
              <p className="leading-relaxed font-light">
                Aegis operates on a decoupled dual-pipeline trust model. The security platform intercepts all inputs at boundary layers (Ingress Front) and validates agent execution steps inside high-performance microVM sandboxes before sending outputs to the user.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center font-mono">
                <div className="p-3 rounded-lg border border-slate-850 bg-slate-950/40">
                  <div className="p-1.5 rounded-full bg-cyan-950/30 text-cyan-400 w-fit mx-auto mb-2">
                    <Server className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-3xs text-slate-200 uppercase mb-1">IN-LINE INTERCEPTOR</h4>
                  <p className="text-4xs text-slate-500 leading-normal font-sans">
                    Stateless WAF sitting chronologically between client triggers and model API boundaries to scan raw prompts.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-850 bg-slate-950/40">
                  <div className="p-1.5 rounded-full bg-amber-950/30 text-amber-400 w-fit mx-auto mb-2">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-3xs text-slate-200 uppercase mb-1">SEMANTIC EMBEDDINGS</h4>
                  <p className="text-4xs text-slate-500 leading-normal font-sans">
                    Vector proximity check analyzes intent drift in database and flags suspicious semantic patterns dynamically.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-850 bg-slate-950/40">
                  <div className="p-1.5 rounded-full bg-emerald-950/30 text-emerald-400 w-fit mx-auto mb-2">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-3xs text-slate-200 uppercase mb-1">PLAN AUDITOR ENGINES</h4>
                  <p className="text-4xs text-slate-500 leading-normal font-sans">
                    Secondary specialized validation LLMs doublecheck agent generated plans, blocking loop actions if privilege scopes are violated.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-950 rounded-xl p-4 border border-slate-850/80 flex flex-col justify-between font-mono text-2xs">
              <div>
                <span className="text-[10px] font-bold text-slate-300 mb-3 block border-b border-slate-900 pb-2">
                  INTERNAL SECURITY FLOW
                </span>
                <p className="text-4xs text-slate-400 font-sans leading-normal">
                  Our system architecture is modular, keeping execution entirely sandbox-isolated. Security shields can be toggled without breaking primary system availability.
                </p>
                <div className="mt-4 p-3 bg-slate-900 border border-slate-800 rounded text-4xs text-slate-400 space-y-1.5 font-sans leading-relaxed">
                  <div><strong>Ingress Gate:</strong> Safe regex + token analyzer.</div>
                  <div><strong>Vector Guard:</strong> Out-of-bounds intention checker.</div>
                  <div><strong>Egress Guard:</strong> Mask secret keys & block instructions leakage.</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: SCALABILITY & PROTOTYPE READINESS */}
        {activeTab === "scalability" && (
          <motion.div
            key="scale-tab"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                ENTERPRISE SCALABILITY & PROTOTYPE READINESS
              </h3>
              <p className="font-sans text-2xs text-slate-400 leading-relaxed font-light">
                Aegis is engineered for seamless horizontal auto-scaling inside standard Kubernetes environments. The sandbox uses virtual microVM runtimes that spin up in under 5ms, handling millions of client agent actions daily.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-3.5 rounded-lg border border-slate-850 bg-slate-950/50">
                  <span className="text-3xs text-emerald-400 font-bold block mb-1 font-mono uppercase tracking-wider">
                    Infrastructure readiness metrics
                  </span>
                  <ul className="space-y-1.5 font-sans text-3xs text-slate-400">
                    <li><strong className="text-slate-300">Average Guard Latency:</strong> &lt; 22ms average, preserving system experience.</li>
                    <li><strong className="text-slate-300">Ingress Stateless Scalability:</strong> Autoscale horizontally inside GCP Cloud Run with zero cold boots.</li>
                    <li><strong className="text-slate-300">Distributed Semantic Store:</strong> Employs high-speed memory-cached vector indexing for rapid queries.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-850 bg-slate-950/50">
                  <span className="text-3xs text-blue-400 font-bold block mb-1 font-mono uppercase tracking-wider">
                    Prototype readiness parameters
                  </span>
                  <ul className="space-y-1.5 font-sans text-3xs text-slate-400">
                    <li><strong className="text-slate-300">Standard API Compatibility:</strong> Out-of-the-box support for LangChain, LlamaIndex, and AutoGen pipelines.</li>
                    <li><strong className="text-slate-300">Telemetry Exportable:</strong> Integration-ready logs output compatible with Datadog, Prometheus, Splunk.</li>
                    <li><strong className="text-slate-300">Zero Trust Model:</strong> API endpoints verify client keys with hashed system token parameters.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-950 rounded-xl p-4 border border-slate-850/80 flex flex-col justify-between font-mono text-2xs">
              <div>
                <span className="text-[10px] font-bold text-slate-300 mb-3 block border-b border-slate-900 pb-2">
                  ENTERPRISE DEPLOYMENT Blueprints
                </span>
                <p className="text-4xs text-slate-400 font-sans leading-normal mb-2">
                  Our system architecture is certified for enterprise hosting topologies, keeping private databases safe.
                </p>
                <div className="p-2.5 rounded border border-slate-800 bg-slate-900 text-slate-400 text-4xs space-y-1">
                  <div className="text-slate-200 font-semibold mb-1 uppercase tracking-wide">SECURE BOUNDS INTEGRITY:</div>
                  <div>• Docker microVMs</div>
                  <div>• Redis semantic token pool</div>
                  <div>• Symmetric AES encryption layers</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: OWASP FOR LLM VECTORS */}
        {activeTab === "owasp" && (
          <motion.div
            key="owasp-tab"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                CRITICAL AGENT THREATS MATRIX (OWASP TOP 10)
              </h3>
              <span className="text-[9px] font-mono text-slate-500 font-semibold bg-slate-950 px-2 py-0.5 rounded border border-slate-850">
                Category Reference V2
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {owaspItems.map((item) => {
                const isExpanded = expandedOwasp === item.id;
                return (
                  <div 
                    key={item.id} 
                    className={`rounded-lg border font-mono text-2xs p-3 transition-all ${
                      isExpanded 
                        ? "bg-slate-950 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.05)]" 
                        : "bg-slate-950/45 border-slate-800/80 hover:border-slate-800 hover:bg-slate-950/80"
                    }`}
                  >
                    <button
                      onClick={() => setExpandedOwasp(isExpanded ? null : item.id)}
                      className="w-full flex items-center justify-between font-bold text-xs text-slate-200 cursor-pointer"
                    >
                      <span className="text-3xs tracking-wide">{item.vuln}</span>
                      {isExpanded ? <ChevronDown className="w-4.5 h-4.5 text-blue-400" /> : <ChevronRight className="w-4.5 h-4.5 text-slate-600" />}
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-2 pt-2 border-t border-slate-900/60 font-sans text-3xs text-slate-400 space-y-1.5"
                        >
                          <p><strong className="text-slate-300 font-mono text-4xs">Vulnerability:</strong> {item.desc}</p>
                          <p><strong className="text-red-400 font-mono text-4xs uppercase">Business Impact:</strong> {item.impact}</p>
                          <p className="text-emerald-400"><strong className="text-slate-300 font-mono text-4xs uppercase">Aegis Rule Guardrail:</strong> {item.solution}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
