import { createClient } from '@supabase/supabase-js';

// ان دونوں متغیرات کی اقدار Vercel میں 'Environment Variables' کے ذریعے دی جائیں گی
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // اگر متغیرات موجود نہیں ہیں تو یہ ایرر آئے گا
  throw new Error('Supabase integration failed: URL or Anon Key is missing in Environment Variables.');
}

// سپابیس کا کلائنٹ بنائیں
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
