"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import SupabaseBrowser from "@/lib/supabase/browser";

const initUser = {
    created_at: "",
    display_name: "",
    email: "",
    id: "",
    image_url: "",
    subscription: null
}

export default function useUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            console.log("Starting user query function");
            const supabase = SupabaseBrowser();

            try {
                console.log("Fetching session data");
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                console.log("Session data:", sessionData);

                if (sessionData.session?.user) {
                    console.log("User found in session, fetching profile data");
                    const { data: user, error: profileError } = await supabase
                        .from("profiles")
                        .select(`
                            *,
                            subscription (
                                created_at,
                                customer_id,
                                subscription_id,
                                end_at
                            )
                        `)
                        .eq("id", sessionData.session.user.id)
                        .single();
                    console.log("Profile data:", user);
                    return user;
                } else {
                    console.log("No user session found, returning initUser");
                    return initUser;
                }
            } catch (error) {
                console.error("Unexpected error in useUser query function:", error);
                throw error;
            }
        }
    });
}
