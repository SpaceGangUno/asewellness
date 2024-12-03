import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemName: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Debug logging for cart state changes
  useEffect(() => {
    console.log('Cart items updated:', items);
    console.log('Cart total:', items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, [items]);

  const addToCart = (newItem: CartItem) => {
    console.log('Adding to cart:', newItem);
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.name === newItem.name);
      if (existingItem) {
        console.log('Updating existing item quantity');
        const updatedItems = currentItems.map(item =>
          item.name === newItem.name
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
        console.log('Updated cart items:', updatedItems);
        return updatedItems;
      }
      console.log('Adding new item to cart');
      const updatedItems = [...currentItems, newItem];
      console.log('Updated cart items:', updatedItems);
      return updatedItems;
    });
  };

  const removeFromCart = (itemName: string) => {
    console.log('Removing from cart:', itemName);
    setItems(currentItems => {
      const updatedItems = currentItems.filter(item => item.name !== itemName);
      console.log('Updated cart items after removal:', updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    total
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
