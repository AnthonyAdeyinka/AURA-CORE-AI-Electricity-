
export enum MeterStatus {
  HEALTHY = 'HEALTHY',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
  OFFLINE = 'OFFLINE'
}

export interface MeterData {
  id: string;
  manufacturer: string;
  location: string;
  lastTokenDate: string;
  remainingCredit: number; // in kWh
  avgDailyUsage: number;
  status: MeterStatus;
  loadSignature: number[];
  detectedAnomalies: string[];
  predictionDate: string; // Date when credit will hit zero
}

export interface LeakageReport {
  meterId: string;
  location: string;
  probability: number;
  reason: string;
  estimatedLoss: number;
}
