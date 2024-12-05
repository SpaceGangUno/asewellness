import React, { useRef, useState, useEffect } from 'react';
import { Heart, Brain, Battery, Shield, Leaf, Droplets, ThermometerSun, Timer, Sparkles, Scale, Sun, ArrowRight, Check, Star, Quote, ChevronLeft, ChevronRight, ShieldCheck, Award, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './About.module.css';

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

interface ProcessStep {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}

interface QualityStep {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}

interface ScrollableSectionProps {
  title: string;
  description: string;
  items: any[];
  scrollRef: React.RefObject<HTMLDivElement>;
  showLeft: boolean;
  showRight: boolean;
  activeIndex: number;
  bgColor?: string;
  textColor?: string;
  cardStyle?: string;
  bgImage?: string;
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

const steps: ProcessStep[] = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We source only the finest organic produce from local farmers"
  },
  {
    icon: Droplets,
    title: "Cold Pressed",
    description: "Our hydraulic press extracts every drop of goodness"
  },
  {
    icon: ThermometerSun,
    title: "Never Heated",
    description: "Raw nutrients preserved through cold processing"
  },
  {
    icon: Timer,
    title: "Same Day Delivery",
    description: "From press to your door within hours"
  }
];

const qualityAssurance: QualityStep[] = [
  {
    icon: ShieldCheck,
    title: "Quality Control",
    description: "Rigorous testing and monitoring at every step of production"
  },
  {
    icon: Award,
    title: "Certified Organic",
    description: "100% organic ingredients certified by trusted authorities"
  },
  {
    icon: Zap,
    title: "Peak Freshness",
    description: "Advanced cold chain logistics ensure maximum nutrient retention"
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Eco-friendly practices from sourcing to packaging"
  }
];

const ScrollableSection: React.FC<ScrollableSectionProps> = ({
  title,
  description,
  items,
  scrollRef,
  showLeft,
  showRight,
  activeIndex,
  bgColor = "bg-gradient-to-br from-cyan-50 via-emerald-50 to-blue-50",
  textColor = "text-cyan-900",
  cardStyle = "bg-white/80",
  bgImage
}) => (
  <section className={`relative py-16 sm:py-20 ${bgColor} overflow-hidden`}>
    {bgImage && (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={bgImage}
          alt="Section background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
    )}
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className={`text-4xl font-bold ${textColor} mb-4`}>
          {title}
        </h2>
        <p className={`text-xl ${textColor === 'text-white' ? 'text-gray-200' : 'text-gray-600'} max-w-3xl mx-auto`}>
          {description}
        </p>
      </div>
      <div className={styles.scrollWrapper}>
        {showLeft && (
          <button 
            className={`${styles.scrollButton} ${styles.left}`}
            onClick={() => scrollRef.current?.scrollBy({ left: -296, behavior: 'smooth' })}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-cyan-600" />
          </button>
        )}
        {showRight && (
          <button 
            className={`${styles.scrollButton} ${styles.right}`}
            onClick={() => scrollRef.current?.scrollBy({ left: 296, behavior: 'smooth' })}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-cyan-600" />
          </button>
        )}
        <div ref={scrollRef} className={styles.scrollContainer}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`${styles.card} p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${cardStyle} backdrop-blur-sm border border-white/20 group hover:-translate-y-1`}
              >
                <div className={`${item.bgColor || 'bg-cyan-500/20'} p-4 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${item.color || 'text-cyan-300'}`} />
                </div>
                <h3 className={`text-xl font-semibold ${textColor} mb-2`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${textColor === 'text-white' ? 'text-gray-200' : 'text-gray-600'} mb-4`}>
                  {item.description}
                </p>
                {item.features && (
                  <ul className="space-y-2">
                    {item.features.map((feature: string) => (
                      <li key={feature} className={`flex items-center text-sm ${textColor === 'text-white' ? 'text-gray-200' : 'text-gray-700'}`}>
                        <Check className="h-4 w-4 text-cyan-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.scrollIndicator}>
          {items.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default function About() {
  const navigate = useNavigate();
  const benefitsScrollRef = useRef<HTMLDivElement>(null);
  const processScrollRef = useRef<HTMLDivElement>(null);
  const qualityScrollRef = useRef<HTMLDivElement>(null);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const [activeQualityIndex, setActiveQualityIndex] = useState(0);
  const [showLeftArrows, setShowLeftArrows] = useState({ benefits: false, process: false, quality: false });
  const [showRightArrows, setShowRightArrows] = useState({ benefits: true, process: true, quality: true });

  const handleScroll = (
    container: HTMLDivElement,
    setActiveIndex: (index: number) => void,
    setShowLeft: (show: boolean) => void,
    setShowRight: (show: boolean) => void,
    itemWidth: number
  ) => {
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft < maxScroll - 5);

    const currentIndex = Math.round(scrollLeft / (itemWidth + 16)); // width + gap
    setActiveIndex(currentIndex);
  };

  useEffect(() => {
    const benefitsContainer = benefitsScrollRef.current;
    const processContainer = processScrollRef.current;
    const qualityContainer = qualityScrollRef.current;

    if (benefitsContainer) {
      const handleBenefitsScroll = () => handleScroll(
        benefitsContainer,
        setActiveBenefitIndex,
        (show) => setShowLeftArrows(prev => ({ ...prev, benefits: show })),
        (show) => setShowRightArrows(prev => ({ ...prev, benefits: show })),
        280
      );
      benefitsContainer.addEventListener('scroll', handleBenefitsScroll);
      handleBenefitsScroll();
      return () => benefitsContainer.removeEventListener('scroll', handleBenefitsScroll);
    }

    if (processContainer) {
      const handleProcessScroll = () => handleScroll(
        processContainer,
        setActiveProcessIndex,
        (show) => setShowLeftArrows(prev => ({ ...prev, process: show })),
        (show) => setShowRightArrows(prev => ({ ...prev, process: show })),
        280
      );
      processContainer.addEventListener('scroll', handleProcessScroll);
      handleProcessScroll();
      return () => processContainer.removeEventListener('scroll', handleProcessScroll);
    }

    if (qualityContainer) {
      const handleQualityScroll = () => handleScroll(
        qualityContainer,
        setActiveQualityIndex,
        (show) => setShowLeftArrows(prev => ({ ...prev, quality: show })),
        (show) => setShowRightArrows(prev => ({ ...prev, quality: show })),
        280
      );
      qualityContainer.addEventListener('scroll', handleQualityScroll);
      handleQualityScroll();
      return () => qualityContainer.removeEventListener('scroll', handleQualityScroll);
    }
  }, []);

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

      {/* Benefits Section */}
      <ScrollableSection
        title="Nature's Power in Every Bottle"
        description="Our cold-pressed juices are crafted with purpose, combining the finest organic ingredients to deliver maximum health benefits and exceptional taste."
        items={benefits}
        scrollRef={benefitsScrollRef}
        showLeft={showLeftArrows.benefits}
        showRight={showRightArrows.benefits}
        activeIndex={activeBenefitIndex}
        bgImage="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80"
      />

      {/* Process Section */}
      <ScrollableSection
        title="Our Cold Press Process"
        description="Experience the meticulous journey from farm to bottle, ensuring every sip delivers maximum nutrition and flavor."
        items={steps}
        scrollRef={processScrollRef}
        showLeft={showLeftArrows.process}
        showRight={showRightArrows.process}
        activeIndex={activeProcessIndex}
        bgColor="bg-gradient-to-br from-cyan-900/95 via-emerald-800/95 to-blue-900/95"
        textColor="text-white"
        cardStyle="bg-black/40 hover:bg-black/50"
        bgImage="https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80"
      />

      {/* Quality Assurance Section */}
      <ScrollableSection
        title="Quality Assurance"
        description="Our commitment to excellence ensures every bottle meets the highest standards of quality and purity."
        items={qualityAssurance}
        scrollRef={qualityScrollRef}
        showLeft={showLeftArrows.quality}
        showRight={showRightArrows.quality}
        activeIndex={activeQualityIndex}
        bgImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
      />

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-cyan-900/90 via-emerald-800/80 to-blue-900/90 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&q=80"
            alt="Juice bottles background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Start Your Wellness Journey Today</h2>
          <p className="text-xl text-cyan-100 mb-12 max-w-2xl mx-auto">
            Experience the transformative power of our cold-pressed juices and feel the difference in your body and mind.
          </p>
          <button
            onClick={() => navigate('/products')}
            style={{
              backgroundImage: 'linear-gradient(135deg, rgb(52 211 153) 0%, rgb(45 212 191) 25%, rgb(56 189 248) 75%, rgb(59 130 246) 100%)'
            }}
            className="inline-flex items-center px-8 py-4 text-white rounded-full text-lg font-semibold transition-all duration-200 shadow-sm hover:shadow hover:opacity-90 active:opacity-100"
          >
            Explore Our Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </main>
  );
}
