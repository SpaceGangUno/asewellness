import React, { useEffect } from 'react';
import { X, Loader } from 'lucide-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPaymentComplete: () => void;
}

const cardElementOptions: StripeCardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      '::placeholder': {
        color: '#aab7c4',
      },
      ':focus': {
        color: '#424770',
      },
    },
    invalid: {
      color: '#9e2146',
      iconColor: '#9e2146',
    },
  },
  hidePostalCode: true,
};

export default function CheckoutModal({ isOpen, onClose, total, onPaymentComplete }: CheckoutModalProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [cardComplete, setCardComplete] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setCardComplete(false);
    }
  }, [isOpen]);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Payment system is not ready. Please try again.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card element not found');
      return;
    }

    if (!cardComplete) {
      setError('Please complete card details');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (stripeError) {
        throw stripeError;
      }

      // Here you would typically send paymentMethod.id to your server
      console.log('Payment method created:', paymentMethod.id);
      
      // For testing purposes, we'll just simulate success
      setTimeout(() => {
        onPaymentComplete();
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Secure Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handlePayment} className="space-y-4">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-bold text-emerald-600">${total.toFixed(2)}</span>
          </div>

          <div className="p-4 border rounded-lg bg-white">
            <CardElement 
              options={cardElementOptions}
              onChange={(e) => {
                setCardComplete(e.complete);
                if (e.error) {
                  setError(e.error.message);
                } else {
                  setError(null);
                }
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !stripe || !cardComplete}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin h-5 w-5 mr-2" />
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Secured by Stripe. Your payment information is encrypted and secure.
          </p>
        </form>
      </div>
    </div>
  );
}
