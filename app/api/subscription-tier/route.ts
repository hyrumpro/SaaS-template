import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const subscriptionId = searchParams.get('subscriptionId');

    if (!subscriptionId) {
        return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
    }

    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Check if the subscription is active
        if (subscription.status !== 'active') {
            return NextResponse.json({ tier: 'free' });
        }

        const priceId = subscription.items.data[0].price.id;

        // Map price IDs to tiers
        const tierMap: { [key: string]: string } = {
            'price_1PRhQ9Rx3Htmu8VkeCWj9DLX': 'basic',
            'price_1PRhRWRx3Htmu8VkORLaiwHy': 'pro',
            'price_1PRhU1Rx3Htmu8Vk0RXFZEsm': 'enterprise',
        };

        const tier = tierMap[priceId] || 'free';

        return NextResponse.json({
            tier,
            isSubscribed: tier !== 'free',
            canAccessBasic: ['basic', 'pro', 'enterprise'].includes(tier),
            canAccessPro: ['pro', 'enterprise'].includes(tier),
            canAccessEnterprise: tier === 'enterprise'
        });
    } catch (error) {
        console.error('Error fetching subscription:', error);
        return NextResponse.json({ error: 'Error fetching subscription information' }, { status: 500 });
    }
}
