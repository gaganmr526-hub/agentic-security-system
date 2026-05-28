/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SecurityShields {
  ingressShield: boolean;      // LLM Application Firewall (WAF)
  vectorGuard: boolean;       // Semantic Drift / Out-of-Distribution filter
  dualLlmVerification: boolean; // Verification LLM reviews intermediate plans
  rbacTools: boolean;         // Role-Based Access Control on action tools
  egressFilter: boolean;      // PII, secret, and target instruction leak filter
}

export interface AttackScenario {
  id: string;
  name: string;
  category: "Prompt Injection" | "Jailbreaker" | "Privilege Escalation" | "Intellectual Property Leak" | "Adversarial Poisoning";
  payload: string;
  objective: string;
  targetAsset: string;
  attackerProfile: string;
  logs: string[]; // Steps showing what happens without defenses
  impactSeverity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

export interface SecurityReport {
  intercepted: boolean;
  threatScore: number;
  payloadSignature: string;
  reason: string;
  leakageDetected: boolean;
  remediation: string;
}

export interface LiveScanResult {
  isAttack: boolean;
  confidenceScore: number;
  category: string;
  explanation: string;
  sanitizedPrompt: string;
}

export interface SimulationLog {
  timestamp: string;
  source: "PROMPT_SCAN" | "INGRESS_GATE" | "SEMANTIC_ENGINE" | "SECURE_SANDBOX" | "ACCESS_CONTROL" | "EGRESS_FILTER" | "SYSTEM";
  type: "info" | "success" | "warning" | "alert" | "error";
  message: string;
}

export interface MetricPoint {
  time: string;
  scans: number;
  threatsBlocked: number;
  latencyMs: number;
  leakageRate: number;
}
