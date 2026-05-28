/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  Terminal, 
  Activity, 
  Layers, 
  Clock, 
  RefreshCw, 
  Sliders, 
  Lock, 
  Unlock, 
  ShieldCheck,
  Server,
  HelpCircle,
  HelpCircleIcon
} from "lucide-react";
import { SecurityShields, SimulationLog } from "./types";
import { ArchitectureDiagram } from "./components/ArchitectureDiagram";
import { HackingConsole } from "./components/HackingConsole";
import { SecurityMetrics } from "./components/SecurityMetrics";
import { MarketReport } from "./components/MarketReport";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"command" | "siem" | "market">("command");
  const [utcTime, setUtcTime] = useState("");

  // Global security shields status
  const [shields, setShields] = useState<SecurityShields>({
    ingressShield: true,
    vectorGuard: false,
    dualLlmVerification: false,
    rbacTools: true,
    egressFilter: false,
  });

  // Global scans counters
  const [scansCount, setScansCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);

  // Simulation steps tracking
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false);

  // Global SIEM warning log cache
  const [logs, setLogs] = useState<SimulationLog[]>([]);

  // Initialize live-feel UTC clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pre-seed baseline activity logs
  useEffect(() => {
    const defaultLogs: SimulationLog[] = [
      {
        timestamp: "06:14:15",
        source: "SYSTEM",
        type: "success",
        message: "AegisAgent C2 Security Core v3.4a online and fully synchronized."
      },
      {
        timestamp: "06:14:16",
        source: "SECURE_SANDBOX",
        type: "info",
        message: "gVisor isolation sandbox cluster (microVM host instance) reporting nominal CPU levels."
      },
      {
        timestamp: "06:14:17",
        source: "SEMANTIC_ENGINE",
        type: "info",
        message: "Semantec Vector drift memory database loaded. 14,500 cosine benchmark dimensions initialized."
      },
      {
        timestamp: "06:14:18",
        source: "INGRESS_GATE",
        type: "success",
        message: "Ingress LLM-WAF heuristic rules updated against OWASP top 2026 injection signatures."
      }
    ];
    setLogs(defaultLogs);
  }, []);

  const handlePushLog = (source: SimulationLog["source"], type: SimulationLog["type"], message: string) => {
    const now = new Date();
    const ts = now.toTimeString().split(" ")[0];
    const newLog: SimulationLog = {
      timestamp: ts,
      source,
      type,
      message
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleToggleShield = (key: keyof SecurityShields) => {
    setShields(prev => {
      const updated = !prev[key];
      handlePushLog(
        "SYSTEM", 
        updated ? "success" : "warning", 
        `Security Guardrail [${key}] was manually ${updated ? "PLUGGED IN (ARMED)" : "PLUGGED OUT (DISARMED)"}.`
      );
      return { ...prev, [key]: updated };
    });
  };

  const handleFlushLogs = () => {
    setLogs([]);
    handlePushLog("SYSTEM", "info", "Security event records logs flushed by current C2 operator key.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors relative antialiased selección">
      {/* Absolute matrix wire grid visual elements - cyber hacking aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* HEADER SECTION */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-500/25 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-mono font-black tracking-tight text-slate-100 uppercase">
                AEGISAGENT <span className="text-emerald-400 font-medium">C2 CONTROL</span>
              </h1>
              <span className="text-[10px] bg-emerald-950 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold animate-pulse">
                SYS_ONLINE
              </span>
            </div>
            <p className="text-3xs text-slate-500 font-mono mt-0.5 tracking-wider uppercase">
              Next-Gen Autonomous Shield, Threat Simulator & Trust Architecture
            </p>
          </div>
        </div>

        {/* Status panel */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 font-mono text-2xs self-stretch md:self-auto justify-between border-t border-slate-900 md:border-t-0 pt-3 md:pt-0">
          <div className="flex items-center gap-2 text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-850">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{utcTime || "00:00:00 UTC"}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-850">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>microVM Node-ID: <span className="text-cyan-400 font-bold">AG-Secure-C2</span></span>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS RAIL */}
      <nav className="border-b border-slate-900 bg-slate-950/65 px-6 py-2.5 flex justify-start gap-4">
        <button
          onClick={() => setActiveTab("command")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === "command"
              ? "bg-slate-900 text-slate-100 border border-slate-800 shadow"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Terminal className="w-4 h-4" />
          COMMAND CENTER
        </button>

        <button
          onClick={() => setActiveTab("siem")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === "siem"
              ? "bg-slate-900 text-slate-100 border border-slate-800 shadow"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Activity className="w-4 h-4" />
          SIEM LOGS & RECHARTS
        </button>

        <button
          onClick={() => setActiveTab("market")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === "market"
              ? "bg-slate-900 text-slate-100 border border-slate-800 shadow"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Layers className="w-4 h-4" />
          ENTERPRISE SPECS
        </button>
      </nav>

      {/* CORE WORKSPACE CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <AnimatePresence mode="wait">
          {activeTab === "command" && (
            <motion.div
              key="command-tab"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Architecture map - showing active shields */}
              <ArchitectureDiagram 
                shields={shields} 
                onToggleShield={handleToggleShield}
                activeStep={activeStep}
                simulationRunning={simulationRunning}
              />

              {/* Hacking Simulator console */}
              <HackingConsole 
                shields={shields}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                simulationRunning={simulationRunning}
                setSimulationRunning={setSimulationRunning}
                logs={logs}
                setLogs={setLogs}
                onPushLog={handlePushLog}
                onIncrementBlocks={() => setBlockedCount(prev => prev + 1)}
                onIncrementScans={() => setScansCount(prev => prev + 1)}
                setActiveTab={setActiveTab}
              />
            </motion.div>
          )}

          {activeTab === "siem" && (
            <motion.div
              key="siem-tab"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <SecurityMetrics 
                scansCount={scansCount}
                blockedCount={blockedCount}
                logs={logs}
                onClearLogs={handleFlushLogs}
              />
            </motion.div>
          )}

          {activeTab === "market" && (
            <motion.div
              key="market-tab"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <MarketReport />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* COMPREHENSIVE FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-5 px-6 flex flex-col md:flex-row justify-between items-center text-4xs font-mono text-slate-500 gap-3">
        <div className="flex items-center gap-2">
          <span>© 2026 AegisAgent Cybersecurity. All Rights Reserved.</span>
        </div>
        <div className="flex gap-4">
          <span className="hover:text-slate-400 transition-colors">SECURE_CREDENTIAL_HASH: SHA-512</span>
          <span className="text-emerald-500">GUARDIAN PROBABILITY ENGINE ACTIVE</span>
        </div>
      </footer>
    </div>
  );
}
