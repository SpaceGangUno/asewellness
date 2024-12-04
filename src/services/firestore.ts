import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  Timestamp,
  addDoc,
  FirestoreError
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, Order, Product } from '../types/models';

const handleFirestoreError = (error: FirestoreError, operation: string) => {
  console.error(`Firestore ${operation} error:`, error);
  throw error;
};

const getDB = (): any => {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  return db;
};

// User Services
export const createUser = async (userId: string, userData: Partial<User>) => {
  try {
    const database = getDB();
    const userRef = doc(database, 'users', userId);
    const userDoc = await getDoc(userRef);
    const now = Timestamp.now();

    // If user exists, merge new data with existing data
    if (userDoc.exists()) {
      const existingData = userDoc.data();
      await setDoc(userRef, {
        ...existingData,
        ...userData,
        updatedAt: now
      }, { merge: true });
    } else {
      // If user doesn't exist, create new user with default values
      await setDoc(userRef, {
        id: userId,
        email: userData.email || '',
        name: userData.name || '',
        points: 0,
        createdAt: now,
        updatedAt: now,
        ...userData
      }, { merge: true });
    }
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'createUser');
  }
};

export const getUser = async (userId: string) => {
  try {
    const database = getDB();
    const userRef = doc(database, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      // If user doesn't exist, return null and let the calling code handle creation
      return null;
    }
    
    return userSnap.data() as User;
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'getUser');
    return null;
  }
};

export const updateUser = async (userId: string, userData: Partial<User>) => {
  try {
    const database = getDB();
    const userRef = doc(database, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // If user doesn't exist, create it first
      await createUser(userId, userData);
    } else {
      // Update existing user
      await setDoc(userRef, {
        ...userDoc.data(),
        ...userData,
        updatedAt: Timestamp.now()
      }, { merge: true });
    }
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'updateUser');
  }
};

// Order Services
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const database = getDB();
    const now = Timestamp.now();
    const orderRef = await addDoc(collection(database, 'orders'), {
      ...orderData,
      createdAt: now,
      updatedAt: now
    });
    return orderRef.id;
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'createOrder');
    return null;
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const database = getDB();
    const orderRef = doc(database, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);
    return orderSnap.exists() ? orderSnap.data() as Order : null;
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'getOrder');
    return null;
  }
};

export const getUserOrders = async (userId: string) => {
  try {
    const database = getDB();
    const ordersRef = collection(database, 'orders');
    const q = query(
      ordersRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
  } catch (error) {
    console.warn('No orders found for user:', userId);
    return [];
  }
};

export const updateOrder = async (orderId: string, orderData: Partial<Order>) => {
  try {
    const database = getDB();
    const orderRef = doc(database, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      throw new Error('Order not found');
    }

    await setDoc(orderRef, {
      ...orderDoc.data(),
      ...orderData,
      updatedAt: Timestamp.now()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'updateOrder');
  }
};

// Product Services
export const getAllProducts = async () => {
  try {
    const database = getDB();
    const productsRef = collection(database, 'products');
    const q = query(productsRef, where('inStock', '==', true));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'getAllProducts');
    return [];
  }
};
