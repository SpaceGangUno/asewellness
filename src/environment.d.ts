/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLIC_KEY: string
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_MEASUREMENT_ID: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Global definitions
declare const __STRIPE_KEY__: string;

// Google Maps types
declare interface Window {
  google: {
    maps: {
      places: {
        Autocomplete: new (
          input: HTMLInputElement,
          options?: google.maps.places.AutocompleteOptions
        ) => google.maps.places.Autocomplete;
      };
      event: {
        clearInstanceListeners: (instance: any) => void;
      };
    };
  };
}

declare namespace google.maps {
  namespace places {
    interface AutocompleteOptions {
      componentRestrictions?: {
        country: string | string[];
      };
      fields?: string[];
      types?: string[];
    }

    interface Autocomplete {
      addListener: (event: string, handler: () => void) => void;
      getPlace: () => {
        address_components?: {
          long_name: string;
          short_name: string;
          types: string[];
        }[];
        formatted_address?: string;
      };
    }
  }
}
