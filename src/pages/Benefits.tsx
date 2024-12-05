import React, { useRef, useState, useEffect } from 'react';
import { Heart, Brain, Battery, Shield, Leaf, Sparkles, Scale, Sun, ArrowRight, Check, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Benefits.module.css';

interface Stat {
  value: string;
  label: string;
}

interface Benefit {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  color: string;
  bgColor: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const stats: Stat[] = [
  { value: "92%", label: "Customer Satisfaction" },
  { value: "30+", label: "Natural Ingredients" },
  { value: "24hrs", label: "Fresh Pressed" },
  { value: "100%", label: "Organic Produce" }
];

const benefits: Benefit[] = [
  {
    icon: Heart,
    title: "Heart Health",
    description: "Support cardiovascular health with antioxidant-rich ingredients that promote healthy blood flow and circulation.",
    features: ["Reduces inflammation", "Supports healthy blood pressure", "Rich in omega-3 fatty acids"],
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20"
  },
  {
    icon: Brain,
    title: "Mental Clarity",
    description: "Enhance cognitive function and focus with nutrient-dense superfoods and natural nootropics.",
    features: ["Improves concentration", "Boosts memory", "Reduces brain fog"],
    color: "text-blue-400",
    bgColor: "bg-blue-500/20"
  },
  {
    icon: Battery,
    title: "Energy Boost",
    description: "Natural, sustained energy without crashes, powered by vitamin-rich fruits and vegetables.",
    features: ["No caffeine crashes", "Sustained energy release", "Enhanced stamina"],
    color: "text-teal-400",
    bgColor: "bg-teal-500/20"
  },
  {
    icon: Shield,
    title: "Immune Support",
    description: "Strengthen your immune system with vitamin C and antioxidant-rich ingredients.",
    features: ["Boosts immune response", "Rich in antioxidants", "Natural vitamin C"],
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20"
  },
  {
    icon: Scale,
    title: "Weight Management",
    description: "Support healthy weight management with nutrient-dense, low-calorie options.",
    features: ["Controls cravings", "Supports metabolism", "Natural appetite control"],
    color: "text-blue-400",
    bgColor: "bg-blue-500/20"
  },
  {
    icon: Sun,
    title: "Skin Health",
    description: "Promote radiant skin with collagen-supporting ingredients and antioxidants.",
    features: ["Natural glow", "Anti-aging properties", "Hydration support"],
    color: "text-teal-400",
    bgColor: "bg-teal-500/20"
  }
];

const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Fitness Enthusiast",
    quote: "After 30 days on Asé Juices, my energy levels have skyrocketed and my post-workout recovery is noticeably faster!",
    rating: 5
  },
  {
    name: "David L.",
    role: "Business Professional",
    quote: "The mental clarity blend has transformed my workday. I'm more focused, productive, and feel amazing!",
    rating: 5
  },
  {
    name: "Emma R.",
    role: "Yoga Instructor",
    quote: "My clients notice the difference in my energy and vitality. These juices are now an essential part of my daily routine!",
    rating: 5
  }
];

export default function Benefits() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < maxScroll - 5);

    const cardWidth = 280 + 16; // card width + gap
    const currentIndex = Math.round(scrollLeft / cardWidth);
    setActiveCardIndex(currentIndex);
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = 280 + 16; // card width + gap
    const currentScroll = container.scrollLeft;
    const targetScroll = direction === 'left' 
      ? currentScroll - cardWidth
      : currentScroll + cardWidth;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/products');
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-900/90 via-emerald-800/80 to-blue-900/90 text-white py-16 sm:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80"
            alt="Fresh juices background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf className="h-16 w-16 mx-auto mb-6 text-cyan-400 animate-bounce" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Life,<br />One Sip at a Time
          </h1>
          <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto mb-8">
            Experience the power of nature's finest ingredients, carefully crafted to enhance your wellbeing and vitality.
          </p>
          <div className="flex justify-center items-center -mx-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex-1 px-4 min-w-[80px]">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-cyan-100 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-cyan-50 via-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-cyan-900 mb-4">
              Nature's Power in Every Bottle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cold-pressed juices are crafted with purpose, combining the finest organic ingredients 
              to deliver maximum health benefits and exceptional taste.
            </p>
          </div>
          <div className={styles.scrollWrapper}>
            {showLeftArrow && (
              <button 
                className={`${styles.scrollButton} ${styles.left}`}
                onClick={() => scrollTo('left')}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-cyan-600" />
              </button>
            )}
            {showRightArrow && (
              <button 
                className={`${styles.scrollButton} ${styles.right}`}
                onClick={() => scrollTo('right')}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-cyan-600" />
              </button>
            )}
            <div ref={scrollContainerRef} className={styles.scrollContainer}>
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className={`${styles.card} p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm border border-white/20 group hover:-translate-y-1`}
                  >
                    <div className={`${benefit.bgColor} p-4 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-cyan-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {benefit.description}
                    </p>
                    <ul className="space-y-2">
                      {benefit.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-700">
                          <Check className="h-4 w-4 text-cyan-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className={styles.scrollIndicator}>
              {benefits.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.dot} ${index === activeCardIndex ? styles.active : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same */}
    </main>
  );
}
