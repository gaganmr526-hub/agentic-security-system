/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  ArrowRight, 
  Database, 
  Cpu, 
  Compass, 
  Key, 
  FileCheck2, 
  Send,
  EyeOff
} from "lucide-react";
import { SecurityShields } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ArchitectureDiagramProps {
  shields: SecurityShields;
  onToggleShield: (key: keyof SecurityShields) => void;
  activeStep: number; // For step-by-step trace simulation
  simulationRunning: boolean;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  shields,
  onToggleShield,
  activeStep,
  simulationRunning
}) => {
  const pipelineNodes = [
    {
      id: "ingress",
      name: "Ingress WAF",
      shieldKey: "ingressShield" as keyof SecurityShields,
      icon: ShieldCheck,
      description: "Detects jailbreaks & adversarial inputs.",
      details: "Inspects incoming tokens for system override prompt sequences."
    },
    {
      id: "vector",
      name: "Vector Guard",
      shieldKey: "vectorGuard" as keyof SecurityShields,
      icon: Compass,
      description: "Blocks semantic drift anomalies.",
      details: "Performs real-time cosine distance checks on query intents."
    },
    {
      id: "audit",
      name: "Plan Auditor",
      shieldKey: "dualLlmVerification" as keyof SecurityShields,
      icon: FileCheck2,
      description: "Dual-LLM plan verification.",
      details: "Secondary specialized LLM reviews generated tool execution paths."
    },
    {
      id: "rbac",
      name: "RBAC Tool Gate",
      shieldKey: "rbacTools" as keyof SecurityShields,
      icon: Key,
      description: "Role-Based Tool Boundaries.",
      details: "Validates caller certificates before starting file-system or shell write actions."
    },
    {
      id: "egress",
      name: "DLP Egress",
      shieldKey: "egressFilter" as keyof SecurityShields,
      icon: EyeOff,
      description: "Exfiltration Prevention.",
      details: "Scans agent raw output text for API secrets, PII, and instruction blocks."
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl relative overflow-hidden">
      {/* Background design elements to fit cyber/hacking theme */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-mono text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            SECURE AGENT PIPELINE ARCHITECTURE
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Interactive System Topology. Click any shield node below to hot-plug or hot-unplug secure guardrails.
          </p>
        </div>
        <div className="mt-3 md:mt-0 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-2xs text-slate-300">
          Shields Plugged: <span className="text-emerald-400 font-bold">
            {Object.values(shields).filter(Boolean).length}/5
          </span>
        </div>
      </div>

      {/* Main Flow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-3 py-4 relative">
        {pipelineNodes.map((node, idx) => {
          const isShieldOn = shields[node.shieldKey];
          const isNodeEvaluating = simulationRunning && activeStep === idx;

          return (
            <div key={node.id} className="relative flex flex-col items-center">
              {/* Connector line for large screens */}
              {idx < pipelineNodes.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[80%] w-[40%] h-[2px] bg-slate-800 z-0">
                  {simulationRunning && activeStep > idx && (
                    <motion.div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_12px_#10b981]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </div>
              )}

              {/* Node Card */}
              <motion.div
                layoutId={`node-card-${node.id}`}
                className={`w-full relative z-10 p-4 rounded-xl border transition-all cursor-pointer font-mono select-none flex flex-col justify-between h-48 ${
                  isShieldOn
                    ? "bg-slate-950/90 border-emerald-500/40 hover:border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                    : "bg-slate-950/45 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40"
                } ${isNodeEvaluating ? "ring-2 ring-blue-500 scale-102" : ""}`}
                onClick={() => onToggleShield(node.shieldKey)}
                whileHover={{ y: -2 }}
              >
                {/* Node Execution Indicator */}
                AnimatePresence
                {isNodeEvaluating && (
                  <motion.div
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-blue-600 text-slate-100 rounded text-3xs font-bold uppercase animate-pulse border border-blue-400 z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    Scanning...
                  </motion.div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xs font-bold tracking-widest text-slate-500">
                      STEP 0{idx + 1}
                    </span>
                    <button
                      className={`p-1 rounded-md transition-colors ${
                        isShieldOn 
                          ? "bg-emerald-950 border border-emerald-500/40 text-emerald-400" 
                          : "bg-slate-900 border border-slate-800 text-slate-400"
                      }`}
                      title={isShieldOn ? "Plugs out this guard" : "Plugs in this guard"}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleShield(node.shieldKey);
                      }}
                    >
                      {isShieldOn ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-2 rounded-lg ${
                      isShieldOn 
                        ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/20" 
                        : "bg-slate-900 text-slate-500 border border-slate-800"
                    }`}>
                      <node.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-bold leading-tight ${isShieldOn ? "text-slate-100" : "text-slate-400"}`}>
                      {node.name}
                    </span>
                  </div>

                  <p className="text-4xs font-sans text-slate-400 leading-normal">
                    {node.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-900 flex justify-between items-center text-3xs">
                  <span className={`font-semibold ${isShieldOn ? "text-emerald-500" : "text-slate-500"}`}>
                    {isShieldOn ? "ACTIVE" : "BYPASSED"}
                  </span>
                  <span className="text-slate-600 hover:text-slate-400 transition-colors" title={node.details}>
                    Info
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Internal Agent Work Area Node */}
      <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="font-mono flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-950 border border-blue-500/20 text-blue-400">
            <Cpu className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-200">ISOLATED SECURE APP VM</h3>
            <p className="text-3xs text-blue-400">MicroVM gVisor Sandbox Instance: running (v3.2a)</p>
          </div>
        </div>
        <div className="text-3xs font-sans text-slate-400 leading-relaxed md:border-l md:border-slate-800 md:pl-4">
          All tools and database connections reside inside a hardware-virtualized gVisor sandbox container. Security rules apply scope barriers. If an attack leaks credential keys, the sandbox restricts outbound malicious domains dynamically.
        </div>
      </div>
    </div>
  );
};
