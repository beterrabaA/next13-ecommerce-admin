import Stripe from 'stripe'

const STRIPE_SECRET_KEY = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
  typescript: true,
})
