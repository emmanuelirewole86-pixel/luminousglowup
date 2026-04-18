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

export interface ScanRecommendations {
  hairstyles: { name: string; why: string }[];
  skincare: { step: string; product_type: string; tip: string }[];
  lifestyle: string[];
}

export interface ScanDetails {
  eye_color?: string | null;
  hair_color?: string | null;
  skin_tone?: string | null;
  face_shape?: string | null;
  recommendations?: ScanRecommendations | null;
}

export type FullScan = ScanResult & ScanDetails;

// ---- Scans ----

export const saveScan = async (
  scan: ScanResult,
  userId: string,
  details?: ScanDetails,
): Promise<string> => {
  const { data, error } = await supabase.from("scans").insert([{
    id: scan.id,
    user_id: userId,
    scan_date: scan.date,
    image_url: scan.imageUrl,
    scores: JSON.parse(JSON.stringify(scan.scores)),
    overall: scan.overall,
    eye_color: details?.eye_color ?? null,
    hair_color: details?.hair_color ?? null,
    skin_tone: details?.skin_tone ?? null,
    face_shape: details?.face_shape ?? null,
    recommendations: details?.recommendations
      ? JSON.parse(JSON.stringify(details.recommendations))
      : null,
  }]).select("id").single();
  if (error) throw error;
  return data!.id as string;
};

export const updateScanDetails = async (scanId: string, details: ScanDetails) => {
  const { error } = await supabase.from("scans").update({
    eye_color: details.eye_color,
    hair_color: details.hair_color,
    skin_tone: details.skin_tone,
    face_shape: details.face_shape,
    recommendations: details.recommendations
      ? JSON.parse(JSON.stringify(details.recommendations))
      : null,
  }).eq("id", scanId);
  if (error) throw error;
};

const rowToScan = (row: any): FullScan => ({
  id: row.id,
  date: row.scan_date,
  imageUrl: row.image_url,
  scores: row.scores as FaceScores,
  overall: row.overall,
  eye_color: row.eye_color,
  hair_color: row.hair_color,
  skin_tone: row.skin_tone,
  face_shape: row.face_shape,
  recommendations: row.recommendations as ScanRecommendations | null,
});

export const getScans = async (userId: string): Promise<FullScan[]> => {
  const { data, error } = await supabase
    .from("scans")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map(rowToScan);
};

export const getScanById = async (id: string): Promise<FullScan | null> => {
  const { data, error } = await supabase.from("scans").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return rowToScan(data);
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

// ---- Profile ----
export interface ProfileData {
  display_name: string | null;
  avatar_url: string | null;
}

export const getProfile = async (userId: string): Promise<ProfileData | null> => {
  const { data } = await supabase.from("profiles").select("display_name, avatar_url").eq("user_id", userId).maybeSingle();
  return data ?? null;
};

// ---- Onboarding ----
const ONBOARDED_KEY = "luminaface_onboarded";
export const isOnboarded = () => localStorage.getItem(ONBOARDED_KEY) === "true";
export const setOnboarded = () => localStorage.setItem(ONBOARDED_KEY, "true");
