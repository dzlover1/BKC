export interface UserProfile {
  name: string;
  heightCm: number;
}

export interface WeeklyEntry {
  id: number;
  week: number;
  weightKg: number;
  bmi: number;
  bodyFatPercentage?: number;
  muscleMassKg?: number;
  visceralFatLevel?: number;
}

export interface AllProfiles {
  [key: string]: UserProfile;
}

export interface AllEntries {
  [key: string]: WeeklyEntry[];
}
