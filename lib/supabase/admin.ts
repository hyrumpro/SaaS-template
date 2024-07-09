"use server";

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseAdminInstance: SupabaseClient | null = null;

export async function supabaseAdmin(): Promise<SupabaseClient> {
    if (supabaseAdminInstance) {
        return supabaseAdminInstance;
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_ADMIN!,
        {
            auth: {
                autoRefreshToken: true,
                persistSession: false
            }
        }
    );

    supabaseAdminInstance = supabase;
    return supabase;
}
