
export type EntryType = 'dream' | 'emotion';

export interface DreamEntry {
  id: string;
  user_id: string;
  created_at: string;
  entry_type: 'dream';
  text: string;
  voice_url?: string;
  ai_summary?: string;
  tags?: string[];
  insights?: Record<string, unknown>;
}

export interface EmotionEntry {
  id: string;
  user_id: string;
  created_at: string;
  entry_type: 'emotion';
  mood: string; // This is not directly in the DB but we map from text or mood field
  text?: string;
  tags?: string[];
  insights?: Record<string, unknown>;
}

export type Entry = DreamEntry | EmotionEntry;

export interface ReminderPreference {
  id: string;
  user_id: string;
  type: 'reality_check' | 'mood_check';
  frequency: 'hourly' | 'daily' | 'custom';
  days_active: number[];
  start_time: string;
  end_time: string; 
  custom_hours?: number[];
  message: string;
  enabled: boolean;
  last_sent?: string;
}

export interface Pattern {
  id: string;
  user_id: string;
  top_tags: string[];
  insights: Record<string, unknown>; // This maps to correlations in the database
  updated_at: string;
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  streak_days: number;
  last_entry_date?: string;
  settings?: Record<string, unknown>;
}
