import React, { useState, useCallback, useEffect } from 'react';
import { Star, ShoppingCart, Filter, Search, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  benefits: string[];
  ingredients: string[];
  rating: number;
  reviews: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
  };
  tags: string[];
}

const products: Product[] = [
  {
    id: '1',
    name: 'Green Glow',
    category: 'Signature Blends',
    description: 'A refreshing blend of greens and fruits for natural energy and vitality.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80',
    benefits: ['Natural Energy', 'Digestive Health', 'Immune Support'],
    ingredients: ['Apple', 'Pineapple', 'Spinach', 'Ginger'],
    rating: 4.8,
    reviews: 156,
    nutrition: {
      calories: 110,
      protein: 2,
      carbs: 22,
      fiber: 4
    },
    tags: ['Bestseller', 'Organic', 'Vegan']
  },
  {
    id: '2',
    name: 'Golden Zest',
    category: 'Antioxidant Rich',
    description: 'A vibrant blend of tropical fruits and ginger for a natural energy boost.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80',
    benefits: ['Energy Boost', 'Immune Support', 'Anti-inflammatory'],
    ingredients: ['Pineapple', 'Carrot', 'Ginger'],
    rating: 4.9,
    reviews: 112,
    nutrition: {
      calories: 130,
      protein: 1,
      carbs: 26,
      fiber: 3
    },
    tags: ['Popular', 'Organic', 'No Added Sugar']
  },
  {
    id: '3',
    name: 'Heart Beet',
    category: 'Wellness Blends',
    description: 'A powerful blend of beets and greens for cardiovascular health and natural energy.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80',
    benefits: ['Heart Health', 'Athletic Performance', 'Blood Flow'],
    ingredients: ['Beets', 'Apple', 'Carrot', 'Spinach', 'Lemon'],
    rating: 4.8,
    reviews: 98,
    nutrition: {
      calories: 120,
      protein: 2,
      carbs: 24,
      fiber: 5
    },
    tags: ['Heart Health', 'Athletic', 'Organic']
  }
];

const categories = ['All', 'Signature Blends', 'Wellness Blends', 'Antioxidant Rich', 'Wellness Shots', 'Seasonal'];

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Products component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <h2>Something went wrong.</h2>
          <pre className="mt-2 text-sm">{this.state.error?.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, items } = useCart();
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  // Debug logging for cart state
  useEffect(() => {
    console.log('Current cart items:', items);
  }, [items]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = useCallback((product: Product, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('Add to Cart clicked for:', product.name);
    console.log('Click event:', {
      target: event.target,
      currentTarget: event.currentTarget,
      type: event.type
    });
    
    try {
      const cartItem = {
        name: product.name,
        price: product.price,
        quantity: 1
      };
      
      console.log('Adding item to cart:', cartItem);
      addToCart(cartItem);
      
      setAddedToCart(prev => {
        const newState = { ...prev, [product.id]: true };
        console.log('Updated addedToCart state:', newState);
        return newState;
      });
      
      setTimeout(() => {
        setAddedToCart(prev => {
          const newState = { ...prev, [product.id]: false };
          console.log('Reset addedToCart state:', newState);
          return newState;
        });
      }, 2000);

      setError(null);
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
    }
  }, [addToCart]);

  return (
    <ErrorBoundary>
      <main className="flex-1 bg-gradient-to-br from-emerald-50 to-cyan-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="mb-12">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4 text-center">Our Products</h2>
            <p className="text-emerald-600 text-center max-w-2xl mx-auto">
              Discover our range of cold-pressed juices, carefully crafted to support your wellness journey.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-emerald-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-full border border-emerald-200 px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-emerald-900">{product.name}</h3>
                      <p className="text-emerald-600">{product.category}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{product.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-emerald-900 mb-2">Ingredients:</h4>
                    <p className="text-gray-600">{product.ingredients.join(', ')}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-emerald-900">${product.price.toFixed(2)}</span>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition ${
                        addedToCart[product.id]
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {addedToCart[product.id] ? (
                        <>
                          <Check className="h-5 w-5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-5 w-5" />
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
      </main>
    </ErrorBoundary>
  );
}

export default Products;
