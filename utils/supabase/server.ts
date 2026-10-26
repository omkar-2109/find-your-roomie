import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://knpcnaanzirifithdgbj.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable__CUZ4G-cRJkBGKqaC3tuLA_PCqDKb9A";

// Generic cookie store interface compatible with Next.js cookies() or custom store
interface CookieStore {
  getAll: () => Array<{ name: string; value: string }> | Record<string, string>;
  set?: (name: string, value: string, options?: any) => void;
  [key: string]: any;
}

export const createClient = (cookieStore: CookieStore) => {
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return typeof cookieStore.getAll === 'function' ? cookieStore.getAll() : [];
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              if (typeof cookieStore.set === 'function') {
                cookieStore.set(name, value, options);
              }
            });
          } catch {
            // Ignored if called from a Server Component
          }
        },
      },
    },
  );
};
