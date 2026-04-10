import { ScanResult } from "./scoring";

const SCANS_KEY = "luminaface_scans";
const SURVEY_KEY = "luminaface_survey";
const ONBOARDED_KEY = "luminaface_onboarded";

export interface SurveyData {
  ageRange: string;
  gender: string;
  skinType: string;
  hairType: string;
  goals: string[];
  lifestyle: string;
}

export const saveScan = (scan: ScanResult) => {
  const scans = getScans();
  scans.unshift(scan);
  localStorage.setItem(SCANS_KEY, JSON.stringify(scans));
};

export const getScans = (): ScanResult[] => {
  try {
    return JSON.parse(localStorage.getItem(SCANS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveSurvey = (data: SurveyData) => {
  localStorage.setItem(SURVEY_KEY, JSON.stringify(data));
};

export const getSurvey = (): SurveyData | null => {
  try {
    const d = localStorage.getItem(SURVEY_KEY);
    return d ? JSON.parse(d) : null;
  } catch {
    return null;
  }
};

export const isOnboarded = () => localStorage.getItem(ONBOARDED_KEY) === "true";
export const setOnboarded = () => localStorage.setItem(ONBOARDED_KEY, "true");
