export interface AnalysisResult {
  interestLevel: string;
  flirtingScore: string;
  redFlags: string;
  mood: string;
  ghostingRisk: string;
  insights: string;
}

export interface AnalysisError {
  message: string;
  code?: string;
  details?: string;
}