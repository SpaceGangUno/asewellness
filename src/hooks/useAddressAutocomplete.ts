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
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Failed to load Google Maps script'));
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

export const useAddressAutocomplete = (
  inputRef: React.RefObject<HTMLInputElement>,
  onSelect: (result: AutocompleteResult) => void
) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => setIsScriptLoaded(true))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !inputRef.current || error) return;

    try {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'us' },
        fields: ['address_components', 'formatted_address'],
        types: ['address']
      });

      const handlePlaceSelect = () => {
        const place = autocomplete.getPlace();
        if (!place.address_components) return;

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

        onSelect({
          formattedAddress: place.formatted_address || '',
          components: addressComponents
        });
      };

      autocomplete.addListener('place_changed', handlePlaceSelect);

      return () => {
        if (window.google) {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        }
      };
    } catch (err) {
      setError('Failed to initialize address autocomplete');
    }
  }, [isScriptLoaded, inputRef, onSelect, error]);

  return { error };
};
