import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
    try {
        const { customer_id, return_url } = await request.json();

        const session = await stripe.billingPortal.sessions.create({
            customer: customer_id,
            return_url,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Error creating portal session:', error);
        return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
    }
}