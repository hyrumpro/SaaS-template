"use server";

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface CheckoutResponse {
    success: boolean;
    url?: string | null;
    error?: string;
}

export async function checkout(email: string, priceId: string, redirectTo: string): Promise<CheckoutResponse> {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${redirectTo}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${redirectTo}`,
            customer_email: email,
        });

        return {
            success: true,
            url: session.url,
        };
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}