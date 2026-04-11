import { supabase } from "@/integrations/supabase/client";
import { ScanResult, FaceScores } from "./scoring";

export interface SurveyData {
  ageRange: string;
  gender: string;
  skinType: string;
  hairType: string;
  goals: string[];
  lifestyle: string;
}

// ---- Scans ----

export const saveScan = async (scan: ScanResult, userId: string) => {
  const { error } = await supabase.from("scans").insert({
    id: scan.id,
    user_id: userId,
    scan_date: scan.date,
    image_url: scan.imageUrl,
    scores: scan.scores as unknown as Record<string, unknown>,
    overall: scan.overall,
  });
  if (error) throw error;
};

export const getScans = async (userId: string): Promise<ScanResult[]> => {
  const { data, error } = await supabase
    .from("scans")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    date: row.scan_date,
    imageUrl: row.image_url,
    scores: row.scores as unknown as FaceScores,
    overall: row.overall,
  }));
};

// ---- Survey ----

export const saveSurvey = async (data: SurveyData, userId: string) => {
  const { error } = await supabase.from("surveys").upsert({
    user_id: userId,
    age_range: data.ageRange,
    gender: data.gender,
    skin_type: data.skinType,
    hair_type: data.hairType,
    goals: data.goals,
    lifestyle: data.lifestyle,
  }, { onConflict: "user_id" });
  if (error) throw error;
};

export const getSurvey = async (userId: string): Promise<SurveyData | null> => {
  const { data, error } = await supabase
    .from("surveys")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return null;

  return {
    ageRange: data.age_range,
    gender: data.gender,
    skinType: data.skin_type,
    hairType: data.hair_type,
    goals: data.goals,
    lifestyle: data.lifestyle,
  };
};

// ---- Onboarding (still localStorage since it's a UI flag) ----
const ONBOARDED_KEY = "luminaface_onboarded";
export const isOnboarded = () => localStorage.getItem(ONBOARDED_KEY) === "true";
export const setOnboarded = () => localStorage.setItem(ONBOARDED_KEY, "true");
