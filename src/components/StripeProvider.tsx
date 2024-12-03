import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Initialize Stripe with the public key
const stripeKey = 'pk_live_51QRm4KK5lbUQ861dyPUK8WmPImORGhDCjEBGRClBZUPPntisSSrrgfIAvH1dLcqEz52TYjnFBZoGi1IH84Cbn8vQ000GVA0Xpd';
const stripePromise = loadStripe(stripeKey);

interface StripeProviderProps {
  children: React.ReactNode;
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const [stripeError, setStripeError] = React.useState<string | null>(null);
  const [stripeLoaded, setStripeLoaded] = React.useState(false);

  React.useEffect(() => {
    // Verify Stripe initialization
    stripePromise.then((stripe: Stripe | null) => {
      if (stripe) {
        setStripeLoaded(true);
        setStripeError(null);
      } else {
        setStripeError('Failed to initialize Stripe');
      }
    }).catch((error) => {
      setStripeError(error.message);
    });
  }, []);

  if (stripeError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="max-w-md p-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-red-600 mb-2">Payment System Error</h1>
          <p className="text-gray-600">{stripeError}</p>
        </div>
      </div>
    );
  }

  if (!stripeLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
