import React, { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShoppingCart, Sparkles, Leaf, Battery, Brain, Heart, Coffee, Moon, Sun } from 'lucide-react';
import { useCart } from '../context/CartContext';

type TabType = 'experience' | 'lifestyle';
type ExperienceLevel = 'first-timer' | 'balanced' | 'advanced';
type LifestyleType = 'on-the-go' | 'sedentary' | 'stressed' | 'balanced';

const experienceLevelPrograms = {
  "first-timer": {
    id: "first-timer",
    name: "First-Timer Detox",
    subtitle: "Perfect for beginners new to detoxing",
    description: "A gentle, easy-to-follow program that eases your body into detoxing.",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&q=80",
    duration: "1-3 days",
    price: 29.99,
    forWhom: "Beginners new to detoxing, likely with a sedentary or stressed lifestyle",
    focus: "Gentle, easy-to-follow programs that ease the body into detoxing",
    products: [
      {
        name: "Morning Starter Juice",
        price: 9.99,
        description: "Mild green juice with spinach, apple, and lemon to kickstart metabolism",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      },
      {
        name: "Digestive Support Tea",
        price: 9.99,
        description: "Peppermint and chamomile blend to soothe digestion",
        image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80"
      },
      {
        name: "Hydration Recovery Juice",
        price: 10.01,
        description: "Coconut water-based juice for hydration and minerals",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      }
    ]
  },
  "balanced": {
    id: "balanced",
    name: "Balanced Detox",
    subtitle: "For those seeking a periodic reset",
    description: "Intermediate-level detox to improve energy and digestion.",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80",
    duration: "3-5 days",
    price: 49.99,
    forWhom: "Customers with a relatively balanced lifestyle who need a boost or periodic reset",
    focus: "Intermediate-level detox to improve energy and digestion",
    products: [
      {
        name: "Total Cleanse Juice",
        price: 16.99,
        description: "Green juice with kale, cucumber, ginger, and parsley for detoxification",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      },
      {
        name: "Energy Booster Tea",
        price: 16.99,
        description: "Ginseng and matcha blend to sustain energy levels",
        image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80"
      },
      {
        name: "Evening Calm Juice",
        price: 16.01,
        description: "Beetroot and turmeric juice for anti-inflammatory benefits",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      }
    ]
  },
  "advanced": {
    id: "advanced",
    name: "Advanced Detox",
    subtitle: "Expert-level cleansing program",
    description: "Intensive, nutrient-packed detox designed to cleanse deeply and energize.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80",
    duration: "5-7 days",
    price: 79.99,
    forWhom: "Experienced detoxers or health enthusiasts with an active lifestyle",
    focus: "Intensive, nutrient-packed detox designed to cleanse deeply and energize",
    products: [
      {
        name: "Deep Cleanse Juice",
        price: 26.99,
        description: "Activated charcoal, lemon, and apple cider vinegar for toxin elimination",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      },
      {
        name: "Superfood Blend",
        price: 26.99,
        description: "Spirulina, chlorella, and wheatgrass-based juice",
        image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80"
      },
      {
        name: "Recovery Support Juice",
        price: 26.01,
        description: "Protein-rich juice with almond milk, dates, and cacao for post-detox recovery",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      }
    ]
  }
};

const lifestylePrograms = {
  "on-the-go": {
    id: "on-the-go",
    name: "On-the-Go Detox",
    subtitle: "Quick and portable solutions",
    description: "Portable bottles, quick energy, and hydration solutions.",
    icon: Coffee,
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&q=80",
    forWhom: "Busy individuals looking for quick, grab-and-go options",
    focus: "Portable bottles, quick energy, and hydration solutions",
    products: [
      {
        name: "Immunity Shot",
        price: 4.99,
        description: "Concentrated blend of ginger, turmeric, and citrus",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      },
      {
        name: "Energy Shot",
        price: 4.99,
        description: "Natural caffeine from green tea and guarana",
        image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80"
      },
      {
        name: "Detox Shot",
        price: 4.99,
        description: "Activated charcoal and lemon for quick cleansing",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      }
    ]
  },
  "sedentary": {
    id: "sedentary",
    name: "Sedentary Lifestyle Detox",
    subtitle: "Gentle digestion support",
    description: "Fiber-rich, digestion-enhancing juices to gently detox and improve gut health.",
    icon: Moon,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80",
    forWhom: "Customers with slower routines, possibly struggling with digestion or bloating",
    focus: "Fiber-rich, digestion-enhancing juices to gently detox and improve gut health",
    products: [
      {
        name: "Fiber Boost Juice",
        price: 11.99,
        description: "Chia seeds, apple, and celery blend",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      },
      {
        name: "Aloe Vera Cleanse",
        price: 11.99,
        description: "Soothing aloe vera with cucumber and mint",
        image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80"
      },
      {
        name: "Digestive Aid Tea",
        price: 11.99,
        description: "Ginger, fennel, and peppermint blend",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      }
    ]
  },
  "stressed": {
    id: "stressed",
    name: "Stressed and Tired Detox",
    subtitle: "Mental clarity and stress reduction",
    description: "Adaptogens and calming blends to balance stress and improve focus.",
    icon: Brain,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80",
    forWhom: "Overworked customers needing mental clarity and stress reduction",
    focus: "Adaptogens like ashwagandha and calming blends to balance stress",
    products: [
      {
        name: "Calm Mind Juice",
        price: 13.99,
        description: "Ashwagandha, blueberry, and lavender blend",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      },
      {
        name: "Anti-Inflammatory Elixir",
        price: 13.99,
        description: "Turmeric, ginger, and black pepper blend",
        image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80"
      },
      {
        name: "Sleep Support Tea",
        price: 13.99,
        description: "Chamomile, passionflower, and valerian root",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      }
    ]
  },
  "balanced": {
    id: "balanced",
    name: "Balanced Lifestyle Detox",
    subtitle: "Maintenance and optimization",
    description: "Maintenance-level detox to refresh and sustain energy.",
    icon: Sun,
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80",
    forWhom: "Individuals maintaining a healthy lifestyle but looking for periodic optimization",
    focus: "Maintenance-level detox to refresh and sustain energy",
    products: [
      {
        name: "Green Balance Juice",
        price: 12.99,
        description: "Spirulina, kale, and apple blend",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      },
      {
        name: "Daily Wellness Tea",
        price: 12.99,
        description: "Green tea, lemon, and honey blend",
        image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80"
      },
      {
        name: "Hydration Plus",
        price: 12.99,
        description: "Coconut water, aloe, and mint blend",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80"
      }
    ]
  }
};

// ... (keep the rest of the file the same)
