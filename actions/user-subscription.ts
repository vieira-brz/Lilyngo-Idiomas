"use server"

import { getUserSubs } from '@/db/queries';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { auth, currentUser } from '@clerk/nextjs';

const returnUrl = absoluteUrl('/shop')

export const createStripeUrl = async () => {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
        throw new Error('Unauthorized')
    }

    const userSubs = await getUserSubs()

    if (userSubs && userSubs.stripCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubs.stripCustomerId,
            return_url: returnUrl
        })

        return { data: stripeSession.url }
    }

    const stripeSession = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "BRL",
                    product_data: {
                        name: "Lilyngo Pro",
                        description: 'Unlimited Hearts',
                    },
                    unit_amount: 10000, // R$ 100.00 BRL
                    recurring: {
                        interval: 'month',
                    }
                }
            }
        ],
        metadata: {
            userId,
        },
        success_url: returnUrl,
        cancel_url: returnUrl
    })

    return { data: stripeSession.url }
}