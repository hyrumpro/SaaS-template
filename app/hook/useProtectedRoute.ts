// hooks/useProtectedRoute.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUser from '@/app/hook/useUser';

type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise';

interface Subscription {
    created_at: string;
    customer_id: string | null;
    subscription_id: string | null;
    end_at: string | null;
}

export function useProtectedRoute(requiredTier: SubscriptionTier) {
    const router = useRouter();
    const { data: user, isFetching } = useUser();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        console.log('useEffect triggered. User:', user, 'isFetching:', isFetching);
        if (!isFetching) {
            if (!user) {
                console.log('No user found. Redirecting to /auth');
                router.push('/auth');
            } else if (!user.subscription) {
                console.log('No subscription found. Redirecting to /#pricing');
                router.push('/#pricing');
            } else {
                console.log('User and subscription found. Checking subscription status');
                checkSubscriptionStatus(user.subscription);
            }
        }
    }, [user, isFetching, router, requiredTier]);

    const checkSubscriptionStatus = async (subscription: Subscription) => {
        try {
            // Check if subscription has expired
            if (subscription.end_at && new Date(subscription.end_at) < new Date()) {
                console.log('Subscription has expired. Redirecting to /#pricing');
                router.push('/#pricing');
                return;
            }

            // Fetch current subscription tier
            console.log('Fetching subscription tier for ID:', subscription.subscription_id);
            const res = await fetch(`/api/subscription-tier?subscriptionId=${subscription.subscription_id}`);
            if (!res.ok) {
                throw new Error('Failed to fetch subscription tier');
            }
            const data = await res.json();
            console.log('Fetched subscription tier:', data.tier);

            const tierHierarchy = ['free', 'basic', 'pro', 'enterprise'];
            const userTierIndex = tierHierarchy.indexOf(data.tier);
            const requiredTierIndex = tierHierarchy.indexOf(requiredTier);

            if (userTierIndex === -1 || userTierIndex < requiredTierIndex) {
                console.log(`User tier (${data.tier}) is insufficient for required tier (${requiredTier})`);
                if (data.tier === 'free') {
                    router.push('/#pricing');
                } else {
                    router.push('/upgrade');
                }
            } else {
                setIsAuthorized(true);
            }
        } catch (error) {
            console.error('Error checking subscription status:', error);
            router.push('/auth');
        }
    };

    return { isAuthorized, isLoading: isFetching || isAuthorized === null };
}