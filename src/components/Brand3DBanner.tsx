import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Clock, Award, Leaf, ArrowRight, Smartphone, Zap, Truck } from 'lucide-react';

interface TiltState {
  x: number;
  y: number;
}

interface Brand3DBannerProps {
  onOpenAppModal: () => void;
}

export const Brand3DBanner: React.FC<Brand3DBannerProps> = ({ onOpenAppModal }) => {
  const [tiltIndex, setTiltIndex] = useState<number | null>(null);
  const [tiltAngle, setTiltAngle] = useState<TiltState>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTiltIndex(index);
    setTiltAngle({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTiltIndex(null);
    setTiltAngle({ x: 0, y: 0 });
  };

  const showcaseCards = [
    {
      title: "Direct Mandi & Farm Crates",
      tagline: "Harvested At Dawn • In Kitchen By Breakfast",
      // Real cart asset with fresh groceries
      image: "/public/assets/aistudio/vecteezy_shopping-cart-filled-with-fresh-produce-bread-dairy_69690426_96a1833f.jpeg",
      desc: "Every vegetable, fruit, and artisan staple is hand-selected from vetted regional growers at 5:00 AM daily.",
      badge: "Pure Farm-to-Fork",
      highlight: "Zero Storage Lag",
    },
    {
      title: "Protected Eco-Pantry Baskets",
      tagline: "Insulated & Temperature Shielded",
      // Real basket asset
      image: "/public/assets/aistudio/vecteezy_a-basket-filled-with-food-items_65443328_ee652d03.jpeg",
      desc: "Chilled fresh milk, stone-ground flours, and organic greens transported in dedicated food-safe containers.",
      badge: "Triple Quality Verified",
      highlight: "100% Damage-Proof",
    },
    {
      title: "The All-New Nityokart App",
      tagline: "Ultra-Fast Ordering At Your Fingertips",
      // REPLACED WITH NEW POSTER ASSET
      image: "/public/assets/aistudio/Poster_69520d88.png",
      desc: "Tap, track, and unpack. Experience real-time live GPS delivery tracking and instant zero-hassle freshness refunds.",
      badge: "Now On iOS & Android",
      highlight: "Rated 4.9 ★ by 100k+ Users",
    },
  ];

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white border-y border-emerald-100">
      {/* Dynamic Continuous Moving Brand Marquee with Enlarged Logo */}
      <div className="relative w-full overflow-hidden py-4 bg-emerald-900 text-white shadow-md mb-14">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 text-sm font-semibold tracking-wider uppercase text-emerald-100">
              <span className="flex items-center gap-3">
                <img
                  src="/public/assets/aistudio/NITYOKART_Fresh_Grocery_Delivery_Logo_402fd703.png"
                  alt="Nityokart Logo"
                  className="w-8 h-8 object-contain inline-block bg-white rounded-full p-0.5 shadow-sm"
                />
                <span className="text-white font-extrabold text-base tracking-wide">NITYOKART</span>
                <span className="text-amber-300 font-bold">10-20 MIN DELIVERY</span>
              </span>
              <span className="text-emerald-400 font-black">•</span>
              <span className="flex items-center gap-2 text-emerald-100">
                <Leaf className="w-4 h-4 text-emerald-300" />
                100% CHEMICAL-FREE GREENS
              </span>
              <span className="text-emerald-400 font-black">•</span>
              <span className="flex items-center gap-2 text-emerald-100">
                <Clock className="w-4 h-4 text-amber-300" />
                DOORSTEP DELIVERY IN MINUTES
              </span>
              <span className="text-emerald-400 font-black">•</span>
              <span className="flex items-center gap-2 text-emerald-100">
                <Award className="w-4 h-4 text-emerald-300" />
                DIRECT FARMER FAIR PRICE
              </span>
              <span className="text-emerald-400 font-black">•</span>
              <span className="flex items-center gap-2 text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-300" />
                USE CODE: FRESH50 FOR 50% OFF
              </span>
              <span className="text-emerald-400 font-black">•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading inspired by Casa Tupka */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>The Nityokart Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-slate-900 tracking-tight leading-tight">
            Why Thousands of Families Switch to <span className="italic text-emerald-700">Nityokart</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Eliminating lengthy warehouse storage. Nityokart connects you directly with fresh produce orchards, dairies, and regional staples at wholesale farm gate honesty.
          </p>
        </div>

        {/* 3D Tilting Advertisement Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {showcaseCards.map((card, idx) => {
            const isHovered = tiltIndex === idx;
            return (
              <div
                key={idx}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: isHovered
                    ? `perspective(1000px) rotateX(${tiltAngle.x}deg) rotateY(${tiltAngle.y}deg) translateY(-8px)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
                  transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_50px_rgba(22,163,74,0.16)] transition-all duration-300 preserve-3d flex flex-col"
              >
                {/* Image Container with high quality photography */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3.5 py-1 rounded-full bg-white/95 border border-emerald-500/40 text-[11px] font-bold tracking-wider text-emerald-800 backdrop-blur-md uppercase shadow-sm">
                    {card.badge}
                  </div>

                  {/* Pill Highlight */}
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-amber-500 text-white text-[11px] font-bold tracking-wide shadow-md">
                    {card.highlight}
                  </div>

                  {/* 3D Light Sheen overlay */}
                  {isHovered && (
                    <div
                      className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                      style={{
                        transform: `translate(${tiltAngle.y * 2.5}px, ${tiltAngle.x * 2.5}px)`,
                      }}
                    />
                  )}
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-amber-700 tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      <span>{card.tagline}</span>
                    </div>
                    <h3 className="text-2xl font-editorial font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Verified Quality
                    </span>
                    <button
                      onClick={onOpenAppModal}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Get the App</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Proposition Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">10-20 Min Express</h4>
              <p className="text-xs text-slate-600 mt-1">Micro-fulfillment hubs within 2 km of your neighborhood.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Direct From Farmers</h4>
              <p className="text-xs text-slate-600 mt-1">Directly sourced harvest ensuring true crispness and fair farmer returns.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">No-Questions Refund</h4>
              <p className="text-xs text-slate-600 mt-1">If an apple has a speckle or milk isn't chilled, 1-tap refund.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Live Driver GPS</h4>
              <p className="text-xs text-slate-600 mt-1">Track your electric delivery rider on a real-time live map.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
