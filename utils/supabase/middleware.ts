import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://knpcnaanzirifithdgbj.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable__CUZ4G-cRJkBGKqaC3tuLA_PCqDKb9A";

export const createClient = (request: any) => {
  let response = {
    headers: request?.headers || {},
    cookies: {
      set: () => {},
    },
  };

  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request?.cookies?.getAll ? request.cookies.getAll() : [];
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            if (request?.cookies?.set) {
              request.cookies.set(name, value);
            }
          });
        },
      },
    },
  );

  return { supabase, response };
};
