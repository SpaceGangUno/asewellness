import { useEffect, useRef, useState } from 'react';

interface AddressComponent {
  street_number?: string;
  route?: string;
  locality?: string;
  administrative_area_level_1?: string;
  postal_code?: string;
  country?: string;
}

interface AutocompleteResult {
  formattedAddress: string;
  components: AddressComponent;
}

const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      console.log('Google Maps already loaded');
      resolve();
      return;
    }

    console.log('Loading Google Maps script...');
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is missing');
      reject(new Error('Google Maps API key is missing'));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onerror = (error) => {
      console.error('Failed to load Google Maps script:', error);
      reject(new Error('Failed to load Google Maps script'));
    };
    script.onload = () => {
      console.log('Google Maps script loaded successfully');
      resolve();
    };
    document.head.appendChild(script);
  });
};

export const useAddressAutocomplete = (
  inputRef: React.RefObject<HTMLInputElement>,
  onSelect: (result: AutocompleteResult) => void
) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    console.log('Initializing address autocomplete...');
    loadGoogleMapsScript()
      .then(() => {
        console.log('Script loaded, setting state...');
        setIsScriptLoaded(true);
      })
      .catch((err) => {
        console.error('Error loading script:', err);
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !inputRef.current || error) {
      console.log('Conditions not met for autocomplete initialization:', {
        isScriptLoaded,
        hasInput: !!inputRef.current,
        error
      });
      return;
    }

    try {
      console.log('Creating autocomplete instance...');
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'us' },
        fields: ['address_components', 'formatted_address'],
        types: ['address']
      });

      autocompleteRef.current = autocomplete;

      const handlePlaceSelect = () => {
        console.log('Place selected, getting details...');
        const place = autocomplete.getPlace();
        if (!place.address_components) {
          console.warn('No address components found in selected place');
          return;
        }

        const addressComponents: AddressComponent = {};
        
        place.address_components.forEach((component) => {
          const type = component.types[0];
          switch (type) {
            case 'street_number':
              addressComponents.street_number = component.long_name;
              break;
            case 'route':
              addressComponents.route = component.long_name;
              break;
            case 'locality':
              addressComponents.locality = component.long_name;
              break;
            case 'administrative_area_level_1':
              addressComponents.administrative_area_level_1 = component.short_name;
              break;
            case 'postal_code':
              addressComponents.postal_code = component.long_name;
              break;
            case 'country':
              addressComponents.country = component.long_name;
              break;
          }
        });

        console.log('Calling onSelect with formatted address:', place.formatted_address);
        onSelect({
          formattedAddress: place.formatted_address || '',
          components: addressComponents
        });
      };

      autocomplete.addListener('place_changed', handlePlaceSelect);

      return () => {
        if (window.google && autocompleteRef.current) {
          console.log('Cleaning up autocomplete instance...');
          window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }
      };
    } catch (err) {
      console.error('Error initializing autocomplete:', err);
      setError('Failed to initialize address autocomplete');
    }
  }, [isScriptLoaded, inputRef, onSelect, error]);

  return { error };
};
