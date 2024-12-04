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

export function usePoints(userId: string) {
  const [points, setPoints] = useState(0);
  const [nextAchievement, setNextAchievement] = useState<Achievement>({ name: '', pointsRequired: 0 });
  const [loading, setLoading] = useState(true);
  const [hasOrders, setHasOrders] = useState(false);

  useEffect(() => {
    const loadPoints = async () => {
      try {
        const orders = await getUserOrders(userId);
        const calculatedPoints = calculatePoints(orders);
        
        setHasOrders(orders.length > 0);
        setPoints(calculatedPoints);
        setNextAchievement(getNextAchievement(calculatedPoints));
      } catch (error) {
        console.error('Error fetching points:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadPoints();
    }
  }, [userId]);

  return { points, nextAchievement, loading, hasOrders };
}
