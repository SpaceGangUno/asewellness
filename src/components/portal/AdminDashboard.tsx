import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { Product, Order } from '../../types/models';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (db) {
      fetchProducts();
      fetchOrders();
    }
  }, []);

  const fetchProducts = async () => {
    if (!db) return;
    
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    if (!db) return;
    
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSaveProduct = async () => {
    if (!editingProduct || !db) return;

    try {
      if (editingProduct.id) {
        // Update existing product
        await setDoc(doc(db, 'products', editingProduct.id), {
          ...editingProduct,
          updatedAt: Timestamp.now()
        });
      } else {
        // Add new product
        await addDoc(collection(db, 'products'), {
          ...editingProduct,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }
      fetchProducts();
      setEditingProduct(null);
      setIsAddingProduct(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!db || !confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteDoc(doc(db, 'products', productId));
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    if (!db) return;

    try {
      await setDoc(doc(db, 'orders', orderId), {
        status,
        updatedAt: Timestamp.now()
      }, { merge: true });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const formatDate = (timestamp: Timestamp | Date) => {
    if (timestamp instanceof Date) {
      return timestamp.toLocaleString();
    }
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900/90 via-blue-900/90 to-blue-950/90 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'products'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-cyan-900/50 text-cyan-100 hover:bg-cyan-900/70'
              }`}
            >
              <Package className="h-5 w-5 inline-block mr-2" />
              <span>Products</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'orders'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-cyan-900/50 text-cyan-100 hover:bg-cyan-900/70'
              }`}
            >
              <ShoppingBag className="h-5 w-5 inline-block mr-2" />
              <span>Orders</span>
            </button>
          </div>
        </div>

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsAddingProduct(true);
                  setEditingProduct({
                    name: '',
                    description: '',
                    price: 0,
                    category: '',
                    image: '',
                    benefits: [],
                    ingredients: [],
                    nutrition: {
                      calories: 0,
                      protein: 0,
                      carbs: 0,
                      fiber: 0
                    },
                    tags: [],
                    inStock: true
                  });
                }}
                className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Product
              </button>
            </div>

            {(editingProduct || isAddingProduct) && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white text-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                      {isAddingProduct ? 'Add Product' : 'Edit Product'}
                    </h2>
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setIsAddingProduct(false);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={editingProduct?.name || ''}
                        onChange={e => setEditingProduct(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={editingProduct?.description || ''}
                        onChange={e => setEditingProduct(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="number"
                        value={editingProduct?.price || 0}
                        onChange={e => setEditingProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image URL</label>
                      <input
                        type="text"
                        value={editingProduct?.image || ''}
                        onChange={e => setEditingProduct(prev => ({ ...prev, image: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <input
                        type="text"
                        value={editingProduct?.category || ''}
                        onChange={e => setEditingProduct(prev => ({ ...prev, category: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => {
                          setEditingProduct(null);
                          setIsAddingProduct(false);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProduct}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map(product => (
                <div
                  key={product.id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4"
                >
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-cyan-100">{product.description}</p>
                  <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-2 text-cyan-400 hover:text-cyan-300 transition"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                    <p className="text-cyan-100">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <select
                    value={order.status}
                    onChange={e => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                    className="bg-cyan-900/50 text-white border border-cyan-700 rounded-lg px-3 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-white/5 rounded-lg p-3"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-cyan-100">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                  <p className="text-cyan-100">Total Items: {order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                  <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
