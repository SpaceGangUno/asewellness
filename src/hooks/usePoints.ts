import { useState, useEffect } from 'react';
import { getUserOrders } from '../services/firestore';
import { Order } from '../types/models';

interface Achievement {
  name: string;
  pointsRequired: number;
}

const ACHIEVEMENTS: Achievement[] = [
  { name: "Silver Status", pointsRequired: 500 },
  { name: "Gold Status", pointsRequired: 1000 },
  { name: "Platinum Status", pointsRequired: 2000 }
];

const calculatePoints = (orders: Order[]): number => {
  // Only count completed (delivered) orders
  const completedOrders = orders.filter(order => order.status === 'delivered');
  
  // Calculate total spent from completed orders
  const totalSpent = completedOrders.reduce((sum, order) => sum + order.total, 0);
  
  // Convert dollars to points ($1 = 10 points)
  return Math.floor(totalSpent * 10);
};

const getNextAchievement = (currentPoints: number): Achievement => {
  // Find the next achievement that hasn't been reached
  const nextAchievement = ACHIEVEMENTS.find(achievement => 
    achievement.pointsRequired > currentPoints
  );
  
  // If all achievements completed, return the highest one
  return nextAchievement || ACHIEVEMENTS[ACHIEVEMENTS.length - 1];
};

export function usePoints(userId: string | undefined) {
  const [points, setPoints] = useState(0);
  const [nextAchievement, setNextAchievement] = useState<Achievement>(ACHIEVEMENTS[0]);
  const [loading, setLoading] = useState(true);
  const [hasOrders, setHasOrders] = useState(false);

  useEffect(() => {
    const loadPoints = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const orders = await getUserOrders(userId);
        // No orders is a valid state, not an error
        setHasOrders(orders.length > 0);
        
        if (orders.length > 0) {
          const calculatedPoints = calculatePoints(orders);
          setPoints(calculatedPoints);
          setNextAchievement(getNextAchievement(calculatedPoints));
        } else {
          // Reset to initial state for new users
          setPoints(0);
          setNextAchievement(ACHIEVEMENTS[0]);
        }
      } catch (error) {
        // Log error but don't treat it as a fatal condition
        console.warn('Error fetching points:', error);
        // Reset to safe defaults
        setPoints(0);
        setNextAchievement(ACHIEVEMENTS[0]);
      } finally {
        setLoading(false);
      }
    };

    loadPoints();
  }, [userId]);

  return { 
    points, 
    nextAchievement, 
    loading, 
    hasOrders,
    pointsToNext: nextAchievement.pointsRequired - points,
    progress: Math.min((points / nextAchievement.pointsRequired) * 100, 100)
  };
}
