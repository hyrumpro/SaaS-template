"use client";

import React, { useState, useEffect } from "react";
import useUser from "@/app/hook/useUser";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { checkout } from "@/lib/actions/stripe";

interface CheckoutProps {
    priceId: string;
    className?: string;
    children?: React.ReactNode;
}

export default function Checkout({ priceId, className, children }: CheckoutProps) {
    const { data: user } = useUser();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const checkSubscriptionStatus = () => {
            if (user?.subscription?.subscription_id && user.subscription.end_at) {
                const endDate = new Date(user.subscription.end_at);
                const currentDate = new Date();
                setIsSubscribed(endDate > currentDate);
            } else {
                setIsSubscribed(false);
            }
        };

        checkSubscriptionStatus();
    }, [user]);

    const handleCheckout = async () => {
        if (!user) {
            router.push('/auth');
            return;
        }

        setIsLoading(true);
        try {
            const response = await checkout(
                user.email,
                priceId,
                window.location.origin
            );

            if (response.success && response.url) {
                window.location.href = response.url;
            } else {
                throw new Error(response.error || 'Failed to create checkout session');
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            router.push('/'); // Redirect to home page on error
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubscribed) {
        return (
            <Button
                className={className}
                disabled={true}
            >
                Currently Subscribed
            </Button>
        );
    }

    return (
        <Button
            className={className}
            onClick={handleCheckout}
            disabled={isLoading}
        >
            {isLoading ? 'Processing...' : children || 'Get Started'}
        </Button>
    );
}