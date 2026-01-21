import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CartItem } from '../types';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.error('Stripe publishable key is not configured');
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export const isStripeConfigured = (): boolean => {
  return !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
};

export interface CreateCheckoutSessionParams {
  items: CartItem[];
  customerEmail?: string;
}

export const createCheckoutSession = async (params: CreateCheckoutSessionParams): Promise<{ sessionId: string; url: string }> => {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create checkout session');
  }

  return response.json();
};

export const redirectToCheckout = async (params: CreateCheckoutSessionParams): Promise<void> => {
  try {
    const { url } = await createCheckoutSession(params);
    
    if (!url) {
      throw new Error('No checkout URL returned from server');
    }
    
    // Redirect directly to the Stripe Checkout URL
    window.location.href = url;
  } catch (error: any) {
    console.error('Checkout error:', error);
    throw new Error(error.message || 'Failed to redirect to checkout');
  }
};

