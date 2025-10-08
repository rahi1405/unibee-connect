import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      departments: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          role: 'student' | 'teacher' | 'cr' | 'admin';
          department_id: string;
          batch: string | null;
          is_verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role?: 'student' | 'teacher' | 'cr' | 'admin';
          department_id: string;
          batch?: string | null;
          is_verified?: boolean;
          created_at?: string;
        };
      };
      notices: {
        Row: {
          id: string;
          title: string;
          content: string;
          department_id: string;
          level: number;
          term: number;
          uploaded_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          department_id: string;
          level: number;
          term: number;
          uploaded_by: string;
          created_at?: string;
        };
      };
      resources: {
        Row: {
          id: string;
          title: string;
          type: string;
          url: string;
          folder: string;
          department_id: string;
          level: number;
          term: number;
          uploaded_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          type: string;
          url: string;
          folder: string;
          department_id: string;
          level: number;
          term: number;
          uploaded_by: string;
          created_at?: string;
        };
      };
    };
  };
};
