import { v4 as uuidv4 } from 'uuid';

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
  paymentMethodId: string;
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
    // Create a payment intent on your server
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
      throw new Error('Failed to create payment intent');
    }

    const { clientSecret } = await response.json();
    return clientSecret;
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw error;
  }
}

export async function createPayment(params: CreatePaymentParams): Promise<void> {
  try {
    const response = await fetch('/api/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId: params.paymentMethodId,
        amount: params.total * 100, // Convert to cents
        currency: 'USD',
        idempotencyKey: uuidv4(),
        items: params.items
      }),
    });

    if (!response.ok) {
      throw new Error('Payment processing failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
}
