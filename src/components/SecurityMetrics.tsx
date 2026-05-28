/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  ShieldAlert, 
  CheckCircle, 
  Activity, 
  Cpu, 
  Database,
  RefreshCw,
  Clock,
  Unlock,
  AlertTriangle,
  Flame,
  Binary
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts";
import { SimulationLog, MetricPoint } from "../types";

interface SecurityMetricsProps {
  scansCount: number;
  blockedCount: number;
  logs: SimulationLog[];
  onClearLogs: () => void;
}

export const SecurityMetrics: React.FC<SecurityMetricsProps> = ({
  scansCount,
  blockedCount,
  logs,
  onClearLogs
}) => {
  // Mock standard history data points for Recharts SIEM chart
  const telemetryData: MetricPoint[] = [
    { time: "05:00", scans: 140, threatsBlocked: 14, latencyMs: 35, leakageRate: 0 },
    { time: "05:10", scans: 180, threatsBlocked: 18, latencyMs: 38, leakageRate: 0 },
    { time: "05:20", scans: 240, threatsBlocked: 25, latencyMs: 44, leakageRate: 0.1 },
    { time: "05:30", scans: 310, threatsBlocked: 36, latencyMs: 48, leakageRate: 0 },
    { time: "05:40", scans: 450, threatsBlocked: 58, latencyMs: 52, leakageRate: 0 },
    { time: "05:50", scans: scansCount + 520, threatsBlocked: blockedCount + 74, latencyMs: 49, leakageRate: 0 }
  ];

  // Defensive block rate calculations
  const calculateBlockRatio = () => {
    const defaultBlocked = 74;
    const defaultScans = 520;
    const totalScans = scansCount + defaultScans;
    const totalBlocked = blockedCount + defaultBlocked;
    return ((totalBlocked / totalScans) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6 w-full">
      {/* SECTION 1: HIGH FIDELITY SIEM STATUS METRIC PANELS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Core scanned */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between font-mono relative overflow-hidden shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-4xs text-slate-500 font-bold uppercase tracking-wider">
              Total Safe Guard Inspections
            </span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-200">
              {scansCount + 520}
            </span>
            <span className="text-4xs text-slate-500 block mt-1 font-sans">
              100% continuous coverage active
            </span>
          </div>
        </div>

        {/* Threats BLocked */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between font-mono relative overflow-hidden shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-4xs text-slate-500 font-bold uppercase tracking-wider">
              Adversarial Threats Isolated
            </span>
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-2xl font-bold text-emerald-400">
              {blockedCount + 74}
            </span>
            <span className="text-4xs text-slate-500 block mt-1 font-sans">
              Injects, exfiltrators, shell attacks
            </span>
          </div>
        </div>

        {/* Core Block Rate */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between font-mono relative overflow-hidden shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-4xs text-slate-500 font-bold uppercase tracking-wider">
              Mitigation Mitigation Core Rate
            </span>
            <Binary className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-200">
              {calculateBlockRatio()}%
            </span>
            <span className="text-4xs text-slate-500 block mt-1 font-sans">
              Industry standard: &lt; 92.5%
            </span>
          </div>
        </div>

        {/* Dynamic Trust score */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between font-mono relative overflow-hidden shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-4xs text-slate-500 font-bold uppercase tracking-wider">
              PII Exfiltration Prevention
            </span>
            <CheckCircle className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <span className="text-2xl font-bold text-emerald-400">
              100.0%
            </span>
            <span className="text-4xs text-slate-500 block mt-1 font-sans">
              0 exfiltration leak claims
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: GRAPH VISUALIZATION & EVENT STREAM GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Trajectory SIEM Recharts Area Chart */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow flex flex-col justify-between h-[360px]">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                  TELEMETRY TRAFFIC ANALYSIS (ACTIONS VS. ATTACKS DETECTED)
                </h3>
                <span className="text-4xs text-slate-500 font-sans">
                  Real-time bandwidth logging of neural-network security evaluations in ms.
                </span>
              </div>
              <span className="text-4xs font-mono text-cyan-400 font-semibold uppercase bg-cyan-950/20 py-1 px-2 rounded">
                Live Sink: 10/10 nodes
              </span>
            </div>

            <div className="h-60 w-full font-mono text-3xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#020617", borderColor: "#334155" }}
                    labelStyle={{ color: "#94a3b8" }}
                  />
                  <Area type="monotone" dataKey="scans" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorScans)" name="Evaluated Inspections" />
                  <Area type="monotone" dataKey="threatsBlocked" stroke="#10b981" fillOpacity={1} fill="url(#colorThreats)" name="Blocked Attackers" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* EVENT STREAM FEED */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow flex flex-col justify-between h-[360px]">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-850 mb-3">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                SYSTEM AUDIT EVENT STREAM
              </h3>
              <button 
                onClick={onClearLogs}
                className="text-4xs font-mono text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
                title="Flush events database"
              >
                <RefreshCw className="w-3 h-3" /> F_FLUSH
              </button>
            </div>

            <div className="h-64 overflow-y-auto space-y-2.5 pr-1 font-mono text-4xs leading-relaxed max-h-[260px] scrollbar-thin">
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center py-12">
                  <Clock className="w-8 h-8 mb-1 opacity-20" />
                  <span>STREAM SILENT</span>
                  <span className="text-[10px] font-sans mt-0.5 max-w-[160px] text-slate-600 leading-normal">
                    Trigger threats or use custom scanners to populate dynamic telemetry traces.
                  </span>
                </div>
              ) : (
                logs.map((log, index) => {
                  let badgeColors = "bg-slate-950 text-slate-400 border border-slate-800";
                  let textColors = "text-slate-300";

                  if (log.type === "success") {
                    badgeColors = "bg-emerald-950/60 border-emerald-500/20 text-emerald-400";
                    textColors = "text-emerald-300/95";
                  } else if (log.type === "warning") {
                    badgeColors = "bg-cyan-950/60 border-cyan-500/20 text-cyan-400";
                  } else if (log.type === "alert") {
                    badgeColors = "bg-amber-950/60 border-amber-500/20 text-amber-400";
                    textColors = "text-amber-200/90";
                  } else if (log.type === "error") {
                    badgeColors = "bg-red-950/60 border-red-500/20 text-red-400";
                    textColors = "text-red-300";
                  }

                  return (
                    <div key={index} className="flex flex-col border-b border-slate-850 pb-2">
                      <div className="flex items-center justify-between font-mono tracking-widest text-[8px] mb-1">
                        <span className={`px-1 rounded py-0.5 font-bold uppercase ${badgeColors}`}>
                          [{log.source}]
                        </span>
                        <span className="text-slate-500">{log.timestamp}</span>
                      </div>
                      <p className={`text-4xs ${textColors} leading-relaxed break-all`}>
                        {log.message}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
