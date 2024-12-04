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

export const useAddressAutocomplete = (
  inputRef: React.RefObject<HTMLInputElement>,
  onSelect: (result: AutocompleteResult) => void
) => {
  const [error, setError] = useState<string | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Google Maps script
  useEffect(() => {
    const script = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (!script) {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        setError('Google Maps API key is missing');
        return;
      }

      const newScript = document.createElement('script');
      newScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      newScript.async = true;
      newScript.defer = true;
      newScript.onload = () => setIsInitialized(true);
      newScript.onerror = () => setError('Failed to load Google Maps script');
      document.head.appendChild(newScript);
    } else {
      setIsInitialized(true);
    }
  }, []);

  // Initialize autocomplete
  useEffect(() => {
    if (!isInitialized || !inputRef.current || error) {
      return;
    }

    try {
      // Initialize the autocomplete instance
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'us' },
        fields: ['address_components', 'formatted_address'],
        types: ['address']
      });

      autocompleteRef.current = autocomplete;

      // Handle place selection
      const handlePlaceSelect = () => {
        const place = autocomplete.getPlace();
        if (!place.address_components) {
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

        // Build the formatted address if not provided
        let formattedAddress = place.formatted_address || '';
        if (!formattedAddress && addressComponents.street_number && addressComponents.route) {
          formattedAddress = `${addressComponents.street_number} ${addressComponents.route}`;
          if (addressComponents.locality) {
            formattedAddress += `, ${addressComponents.locality}`;
          }
          if (addressComponents.administrative_area_level_1) {
            formattedAddress += `, ${addressComponents.administrative_area_level_1}`;
          }
          if (addressComponents.postal_code) {
            formattedAddress += ` ${addressComponents.postal_code}`;
          }
        }

        onSelect({
          formattedAddress,
          components: addressComponents
        });
      };

      // Add the place_changed event listener
      autocomplete.addListener('place_changed', handlePlaceSelect);

      // Cleanup function
      return () => {
        if (window.google && autocompleteRef.current) {
          window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
          autocompleteRef.current = null;
        }
      };
    } catch (err) {
      console.error('Error initializing autocomplete:', err);
      setError('Failed to initialize address autocomplete');
    }
  }, [isInitialized, inputRef, onSelect, error]);

  // Prevent form submission on enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement === inputRef.current) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [inputRef]);

  return { error };
};
