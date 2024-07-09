"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useUser from "../hook/useUser";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import SupabaseBrowser from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut, Crown, Star, Zap, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DEFAULT_IMAGE_URL = "/images/default-avatar.png";

type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise';





export default function Profile() {
    const { isFetching, data: user } = useUser();
    const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('free');
    const [isLoadingPortal, setIsLoadingPortal] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();
    const supabase = SupabaseBrowser();

    useEffect(() => {
        if (user?.subscription?.subscription_id) {
            fetchSubscriptionTier(user.subscription.subscription_id);
        }
    }, [user]);

    const fetchSubscriptionTier = async (subscriptionId: string | null) => {
        if (!subscriptionId) {
            console.error('No subscription ID provided');
            return;
        }

        try {
            const response = await fetch(`/api/subscription-tier?subscriptionId=${subscriptionId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSubscriptionTier(data.tier);
        } catch (error) {
            console.error('Error fetching subscription tier:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            queryClient.clear();
            router.push('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleManageSubscription = async () => {
        setIsLoadingPortal(true);
        try {
            const response = await fetch('/api/create-portal-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer_id: user?.subscription?.customer_id ?? '',
                    return_url: window.location.href,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create portal session');
            }

            const { url } = await response.json();
            window.location.href = url;
        } catch (error) {
            console.error('Error creating portal session:', error);
        } finally {
            setIsLoadingPortal(false);
        }
    };

    if (isFetching) {
        return <LoadingSpinner />;
    }

    if (!user?.id) {
        return <SignInPrompt />;
    }

    const subscriptionBadge = () => {
        switch (subscriptionTier) {
            case 'basic':
                return <Badge className="bg-blue-500"><Star className="w-4 h-4 mr-1" /> Basic</Badge>;
            case 'pro':
                return <Badge className="bg-purple-500"><Crown className="w-4 h-4 mr-1" /> Pro</Badge>;
            case 'enterprise':
                return <Badge className="bg-gold-500"><Zap className="w-4 h-4 mr-1" /> Enterprise</Badge>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center relative">
                    {subscriptionTier !== 'free' && (
                        <div className="absolute -top-4 -right-4">
                            {subscriptionBadge()}
                        </div>
                    )}
                    <Image
                        src={user.image_url || DEFAULT_IMAGE_URL}
                        alt={user.display_name || "User"}
                        width={120}
                        height={120}
                        className="mx-auto rounded-full border-4 border-blue-500"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{user.display_name || "User"}</h2>
                    <p className="mt-2 text-sm text-gray-600">{user.email}</p>
                </div>

                <div className="mt-8 space-y-6">
                    {user.subscription ? (
                        <Button
                            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white flex items-center justify-center"
                            onClick={handleManageSubscription}
                            disabled={isLoadingPortal}
                        >
                            <CreditCard className="w-5 h-5 mr-2" />
                            {isLoadingPortal ? 'Loading...' : 'Manage Subscription'}
                        </Button>
                    ) : (
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white" onClick={() => router.push('/#pricing')}>
                            Get a Subscription
                        </Button>
                    )}
                    <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => router.push('/settings')}>
                        <Settings className="w-5 h-5 mr-2" />
                        Account Settings
                    </Button>
                    <Button variant="destructive" className="w-full flex items-center justify-center" onClick={handleSignOut}>
                        <LogOut className="w-5 h-5 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </div>
    );
}



function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
}

function SignInPrompt() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
                <User className="mx-auto h-12 w-12 text-blue-500"/>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Please sign in to view your profile
                </p>
                <div className="mt-8">
                    <Link href="/auth">
                        <Button className="w-full flex items-center justify-center">
                            Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}