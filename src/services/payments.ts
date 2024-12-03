import { loadStripe } from '@stripe/stripe-js';
import { v4 as uuidv4 } from 'uuid';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

interface PaymentRequest {
  amount: number;
  currency: string;
  idempotencyKey: string;
}

interface CreatePaymentParams {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

export async function createPaymentRequest(amount: number): Promise<PaymentRequest> {
  return {
    amount,
    currency: 'USD',
    idempotencyKey: uuidv4()
  };
}

export async function initializePayment(amount: number): Promise<void> {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'USD',
      }),
    });

    if (!response.ok) {
      throw new Error('Payment intent creation failed');
    }

    const { clientSecret } = await response.json();

    const cardElement = document.querySelector('#card-element');
    if (!cardElement) throw new Error('Card element not found');

    const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement as any, // Type assertion needed due to DOM element type mismatch
        billing_details: {
          name: 'Customer Name', // This should be dynamically set based on user input
        },
      },
    });

    if (confirmError) {
      throw confirmError;
    }
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw error;
  }
}

export async function createPayment(params: CreatePaymentParams): Promise<void> {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: params.total * 100, // Convert to cents
        currency: 'USD',
        items: params.items
      }),
    });

    if (!response.ok) {
      throw new Error('Payment intent creation failed');
    }

    const { clientSecret } = await response.json();

    const { error } = await stripe.confirmCardPayment(clientSecret);
    if (error) {
      throw error;
    }

    return;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
}
