// Stripe configuration
const STRIPE_CONFIG = {
  // Try multiple ways to get the key
  publicKey: __STRIPE_KEY__ || import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
};

// Debug logging
console.log('Stripe Config:', {
  keyExists: !!STRIPE_CONFIG.publicKey,
  keyLength: STRIPE_CONFIG.publicKey.length,
  envValue: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  globalValue: __STRIPE_KEY__
});

if (!STRIPE_CONFIG.publicKey) {
  console.error(
    'Missing Stripe public key. Ensure VITE_STRIPE_PUBLIC_KEY is set in your .env file.'
  );
}

export default STRIPE_CONFIG;
