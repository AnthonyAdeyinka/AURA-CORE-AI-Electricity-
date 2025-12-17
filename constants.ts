
import { MeterStatus, MeterData } from './types';

export const NIGERIA_LOCATIONS = ['Lagos Island', 'Ikeja', 'Abuja Central', 'Port Harcourt', 'Kano Metro', 'Enugu South'];

export const MOCK_METERS: MeterData[] = [
  {
    id: 'MOJ-4502-001',
    manufacturer: 'Mojec',
    location: 'Ikeja, Lagos',
    lastTokenDate: '2024-05-15',
    remainingCredit: 12.5,
    avgDailyUsage: 8.2,
    status: MeterStatus.CRITICAL,
    loadSignature: [2, 5, 8, 12, 15, 12, 8, 5, 3, 2],
    detectedAnomalies: ['Persistent Load during Zero Balance'],
    predictionDate: '2024-05-24'
  },
  {
    id: 'HEX-8821-094',
    manufacturer: 'Hexing',
    location: 'Lagos Island',
    lastTokenDate: '2024-05-20',
    remainingCredit: 145.2,
    avgDailyUsage: 12.5,
    status: MeterStatus.HEALTHY,
    loadSignature: [1, 2, 4, 15, 20, 18, 10, 5, 2, 1],
    detectedAnomalies: [],
    predictionDate: '2024-06-02'
  },
  {
    id: 'SEC-1029-443',
    manufacturer: 'Secure',
    location: 'Abuja Central',
    lastTokenDate: '2024-03-01',
    remainingCredit: 0.2,
    avgDailyUsage: 15.0,
    status: MeterStatus.WARNING,
    loadSignature: [10, 10, 11, 12, 10, 11, 10, 10, 10, 10],
    detectedAnomalies: ['Bypass Suspected: High load with 3-month recharge gap'],
    predictionDate: '2024-03-02'
  }
];
