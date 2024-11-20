import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Check, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: "1",
    name: "Zen TFO",
    description: "A balanced blend of fruits and greens for focus and mental clarity",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    name: "Premium Detox Blend",
    description: "A powerful blend of activated charcoal, herbs, and antioxidants",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    name: "Golden Zest",
    description: "A vibrant blend of tropical fruits and ginger for a natural energy boost",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80"
  }
];

export default function Products() {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({});

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      name: product.name,
      price: product.price,
      quantity: 1
    });
    
    // Show added confirmation
    setAddedToCart({ ...addedToCart, [product.id]: true });
    setTimeout(() => {
      setAddedToCart({ ...addedToCart, [product.id]: false });
    }, 2000);
  };

  return (
    <section id="products" className="py-12 sm:py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-emerald-900 mb-8 sm:mb-12">
          Our Signature Collection
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold text-emerald-900 mb-2">{product.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow">{product.description}</p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                  <span className="text-lg font-bold text-emerald-600">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full text-sm sm:text-base font-medium transition-colors duration-200 ${
                      addedToCart[product.id]
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800'
                    }`}
                  >
                    {addedToCart[product.id] ? (
                      <>
                        <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
