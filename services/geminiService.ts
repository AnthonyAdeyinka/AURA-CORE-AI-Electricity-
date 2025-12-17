
import { GoogleGenAI, Type } from "@google/genai";
import { MeterData } from "../types";

export const analyzeMeterAnomaly = async (meter: MeterData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        Analyze this Nigerian prepaid meter's behavior for a DISCO (Distribution Company) engineer. 
        Meter ID: ${meter.id}
        Manufacturer: ${meter.manufacturer}
        Last Token Date: ${meter.lastTokenDate}
        Remaining Credit: ${meter.remainingCredit} kWh
        Avg Daily Usage: ${meter.avgDailyUsage} kWh
        Detected Anomalies: ${meter.detectedAnomalies.join(', ')}
        
        Provide a 2-sentence technical summary of why this meter is flagged and a recommended action for the field team.
      `,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI Engine offline. Please check connectivity.";
  }
};

export const getSmartOptimizationTip = async (loadHistory: number[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        The following load signature (hourly kW) was captured from a legacy meter bridge: [${loadHistory.join(', ')}].
        Provide one highly practical energy-saving tip specifically for a Nigerian household experiencing this curve.
      `,
    });
    return response.text || "Conserve energy during peak hours.";
  } catch (error) {
    return "Optimizing grid load...";
  }
};
