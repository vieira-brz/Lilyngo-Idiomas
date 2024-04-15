import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers"
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body, signature, process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook error: ${error.message}`, {
            status: 400
        })
    }

    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === 'checkout.session.completed') {
        const subs = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        if (!session?.metadata?.userId) {
            return new NextResponse('User ID is required', { status: 400 })
        }

        await db.insert(userSubscription).values({
            userId: session.metadata.userId,
            stripSubscriptionId: subs.id,
            stripCustomerId: subs.customer as string,
            stripPriceId: subs.items.data[0].price.id,
            stripCurrentPeriodEnd: new Date(
                subs.current_period_end * 1000
            )
        })
    }

    if (event.type === "invoice.payment_succeeded") {
        const subs = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        await db.update(userSubscription).set({
            stripPriceId: subs.items.data[0].price.id,
            stripCurrentPeriodEnd: new Date(
                subs.current_period_end * 1000
            )
        }).where(
            eq(userSubscription.stripSubscriptionId, subs.id)
        )
    }

    return new NextResponse(null, { status: 200 })
}