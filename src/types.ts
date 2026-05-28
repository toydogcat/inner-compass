/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Option {
  id: string; // e.g. "A", "B", "C", "D"
  text: string;
  trait: string; // Key trait category represented: e.g., "creator", "analyzer", "organizer", "empath"
}

export interface Question {
  id: number;
  text: string;
  category: "work-style" | "decision-making" | "energy-source" | "focus-area" | "conflict-handling" | "learning-preference" | "ideal-weekend" | "problem-solving" | "team-role" | "daily-motivation";
  options: Option[];
}

export interface AnalysisResult {
  personalityTalents: {
    title: string;
    description: string;
    keywords: string[];
    strengths: string[];
  };
  suitableCareers: {
    title: string;
    industries: string[];
    roles: string[];
    reasons: string;
  };
  suitableMajors: {
    title: string;
    majors: string[];
    skillsToDevelop: string[];
    reasons: string;
  };
  bodyAdvice: {
    energyState: string;
    dietAndExercise: string[];
    stressPhysicalManifestation: string;
  };
  mindAdvice: {
    coreBelief: string;
    mindfulnessPractice: string;
    growthFocus: string;
  };
  holisticSummary: string;
  mbtiProfile?: {
    code: string; // e.g. "INFJ"
    name: string; // e.g. "提倡者 (Advocate)"
    description: string;
    traitsBreakdown: { E_I: number; S_N: number; T_F: number; J_P: number }; // Values of Extraversion (E), Intuition (N), Feeling (F), Perceiving (P) from 0 to 100
  };
  discProfile?: {
    code: string; // e.g. "I"
    name: string; // e.g. "影響型 (Influence)"
    description: string;
    stylePercentages: { D: number; I: number; S: number; C: number }; // Dominance, Influence, Steadiness, Conscientiousness percentages summing up to 100 (approximately)
  };
}
