import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error(`Webhook Error: ${errorMessage}`);
        return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
    }

    try {
        switch (event.type) {
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                await handleSubscriptionChange(event.data.object as Stripe.Subscription);
                break;
            case 'invoice.payment_succeeded':
                await handleSuccessfulPayment(event.data.object as Stripe.Invoice);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
    const supabase = await supabaseAdmin();
    const customerId = subscription.customer as string;
    const subscriptionId = subscription.id;

    try {
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) {
            throw new Error('Customer has been deleted');
        }

        const email = customer.email;
        if (!email) {
            throw new Error('Customer email not found');
        }

        const subscriptionData = {
            email,
            customer_id: customerId,
            subscription_id: subscriptionId,
            end_at: new Date(subscription.current_period_end * 1000).toISOString(),
        };

        if (subscription.status === 'canceled') {
            subscriptionData.end_at = new Date().toISOString();
        }

        const { error } = await supabase
            .from('subscription')
            .upsert(subscriptionData)
            .eq('email', email);

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        console.log(`Subscription ${subscriptionId} updated for customer ${customerId}`);
    } catch (error) {
        console.error('Error handling subscription change:', error);
        throw error;
    }
}

async function handleSuccessfulPayment(invoice: Stripe.Invoice) {
    const supabase = await supabaseAdmin();
    const customerId = invoice.customer as string;
    const subscriptionId = invoice.subscription as string;

    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const email = invoice.customer_email;

        if (!email) {
            throw new Error('Customer email not found in invoice');
        }

        console.log(`Updating subscription for email: ${email}`);

        const { error, data } = await supabase
            .from('subscription')
            .update({
                end_at: new Date(subscription.current_period_end * 1000).toISOString(),
                customer_id: customerId,
                subscription_id: subscriptionId
            })
            .eq('email', email)
            .select();

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        if (data && data.length === 0) {
            console.error('No subscription found for email:', email);
            throw new Error('No subscription found');
        }

        console.log(`Subscription updated for customer ${customerId} after successful payment`);
    } catch (error) {
        console.error('Error handling successful payment:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        throw error;
    }
}







