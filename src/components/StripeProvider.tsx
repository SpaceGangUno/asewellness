import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Initialize Stripe with proper validation
const STRIPE_LIVE_KEY = 'pk_live_51QRm4KK5lbUQ861dyPUK8WmPImORGhDCjEBGRClBZUPPntisSSrrgfIAvH1dLcqEz52TYjnFBZoGi1IH84Cbn8vQ000GVA0Xpd';

if (!STRIPE_LIVE_KEY || typeof STRIPE_LIVE_KEY !== 'string' || !STRIPE_LIVE_KEY.startsWith('pk_')) {
  throw new Error('Invalid Stripe public key format');
}

let stripePromise: Promise<Stripe | null>;

try {
  console.log('Initializing Stripe...');
  stripePromise = loadStripe(STRIPE_LIVE_KEY);
} catch (error) {
  console.error('Error initializing Stripe:', error);
  stripePromise = Promise.reject(error);
}

interface StripeProviderProps {
  children: React.ReactNode;
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const [stripeError, setStripeError] = React.useState<string | null>(null);
  const [stripeLoaded, setStripeLoaded] = React.useState(false);
  const [stripe, setStripe] = React.useState<Stripe | null>(null);

  React.useEffect(() => {
    let mounted = true;

    const initializeStripe = async () => {
      try {
        console.log('Loading Stripe...');
        const stripeInstance = await stripePromise;
        console.log('Stripe loaded:', !!stripeInstance);

        if (!mounted) return;

        if (stripeInstance) {
          setStripe(stripeInstance);
          setStripeLoaded(true);
          setStripeError(null);
        } else {
          setStripeError('Failed to initialize Stripe payment system');
        }
      } catch (error) {
        console.error('Stripe initialization error:', error);
        if (mounted) {
          setStripeError(error instanceof Error ? error.message : 'Failed to initialize payment system');
        }
      }
    };

    initializeStripe();

    return () => {
      mounted = false;
    };
  }, []);

  if (stripeError) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">Payment System Error</h2>
          <p className="text-gray-600 mb-4">{stripeError}</p>
          <div className="text-sm text-gray-500">
            Please try refreshing the page or contact support if the issue persists.
          </div>
        </div>
      </div>
    );
  }

  if (!stripeLoaded || !stripe) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Elements stripe={stripe}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
