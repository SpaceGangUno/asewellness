import { useEffect, useRef } from 'react';

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
  useEffect(() => {
    if (!inputRef.current || !window.google) return;

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
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [inputRef, onSelect]);
};
