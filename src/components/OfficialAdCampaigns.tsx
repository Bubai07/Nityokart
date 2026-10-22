import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Maximize2,
  ShieldCheck,
  Truck,
  CreditCard,
  Layers,
  Smartphone,
  Star,
  CheckCircle2,
  Leaf
} from 'lucide-react';
import { CampaignAd } from './AdCampaignLightbox';

export const CAMPAIGN_ADS: CampaignAd[] = [
  {
    id: 'master-poster',
    title: 'Groceries Made Easy!',
    subtitle: 'Fresh Products • Best Quality • Fast Delivery • Great Prices',
    image: '/public/assets/aistudio/Nityokart_Fresh_Groceries_Delivery_Poster_8013b917.png',
    tag: 'Flagship Campaign',
    description: 'Our national campaign showcasing happy households experiencing pure farm-to-table groceries delivered in under 20 minutes without ever visiting crowded markets.',
    features: [
      'Handpicked directly from regional orchards',
      'Direct-to-consumer honest mandi pricing',
      'Food-safe temperature shielded packaging',
      'Zero questions asked instant freshness refund',
    ],
  },
  {
    id: 'freshness-trust',
    title: 'Freshness You Can Trust',
    subtitle: 'From Farm To Your Home Everyday',
    image: '/public/assets/aistudio/3_9b95acd3.png',
    tag: 'Purity Guarantee',
    description: 'Every vegetable, fruit, and artisan bread is freshly harvested at dawn, triple-inspected for crispness, and hygienically packed with zero chemical preservatives.',
    features: [
      'Freshly Sourced: Direct from local organic growers',
      'Quality Checked: 24-point agronomist inspection',
      'Hygienically Packed: Ozone-sanitized water wash',
      'Zero storage lag from harvest to kitchen',
    ],
  },
  {
    id: 'fast-reliable-delivery',
    title: 'Fast & Reliable Delivery',
    subtitle: 'Local Area & Selected PIN Codes',
    image: '/public/assets/aistudio/4_a63dd749.png',
    tag: 'Express Speed',
    description: 'Hyper-local electric micro-hubs located right in your sector ensure your orders arrive at your doorstep on time, every time.',
    features: [
      '10-20 Minute average doorstep delivery',
      '100% Eco-friendly Electric Vehicle (EV) fleet',
      'Live GPS rider tracking on the Nityokart App',
      'Order today, unpack in minutes',
    ],
  },
  {
    id: 'secure-payments',
    title: 'Safe & Secure Payments',
    subtitle: 'Your Trust Matters To Us',
    image: '/public/assets/aistudio/6_cc4c9f16.png',
    tag: '100% Secure',
    description: 'Seamless, encrypted payments supporting all popular Indian digital rails including Instant UPI, Credit/Debit cards, Net Banking, and Cash on Delivery.',
    features: [
      '100% Secure 256-bit encrypted transactions',
      'Instant UPI (Google Pay, PhonePe, Paytm)',
      'Multiple payment options & Saved Cards',
      'Cash on Delivery (COD) always available',
    ],
  },
  {
    id: 'shop-by-category',
    title: 'Shop by Category',
    subtitle: 'Everything You Need, Whenever You Need It',
    image: '/public/assets/aistudio/2_452d859a.png',
    tag: 'Pantry Variety',
    description: 'Over 1,500 daily essentials curated across Vegetables, Fruits, Grocery & Staples, Dairy & Eggs, Beverages, Snacks & Biscuits, Personal Care, Home Care, and Artisan Bakery.',
    features: [
      'Farm Vegetables & Exotic Greens',
      'Unpasteurized A2 Milk & Artisanal Dairy',
      'Heritage Pulses & Cold-Pressed Oils',
      'Daily Snacks & Fresh Hearth Breads',
    ],
  },
  {
    id: 'shop-smarter',
    title: 'Shop Smarter, Live Better',
    subtitle: 'All in One Intuitive Mobile App',
    image: '/public/assets/aistudio/Nityokart_Fresh_Grocery_Shopping_App_Banner_ee29cb9b.png',
    tag: 'Smart Shopping',
    description: 'Experience an ultra-smooth grocery app built for speed. Simple category navigation, 1-tap reordering, real-time tracking, and 24/7 dedicated support.',
    features: [
      'Clean, clutter-free intuitive mobile design',
      'Real-time order progress & live rider tracking',
      'Instant customer support within the app',
      '50% OFF first order welcome coupon',
    ],
  },
  {
    id: 'fresh-to-door',
    title: 'Fresh to Your Door',
    subtitle: 'Groceries Just a Tap Away',
    image: '/public/assets/aistudio/Gemini_Generated_Image_nrhsganrhsganrhs_4a1b05e0.png',
    tag: 'Everyday Partner',
    description: 'Designed to turn a chore into sheer delight. View live daily mandi price charts, pick your breakfast fruits, and have them on your kitchen counter in 15 minutes.',
    features: [
      'Live daily mandi market rates',
      'No subscription or membership fee required',
      'Contactless safe doorstep handoff',
      'Special morning milk delivery schedules',
    ],
  },
];

interface OfficialAdCampaignsProps {
  onSelectAd: (ad: CampaignAd) => void;
  onOpenAppModal: () => void;
}

export const OfficialAdCampaigns: React.FC<OfficialAdCampaignsProps> = ({
  onSelectAd,
  onOpenAppModal,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'delivery' | 'quality' | 'app'>('all');

  const filteredAds = CAMPAIGN_ADS.filter((ad) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'delivery') return ad.id.includes('delivery') || ad.id.includes('door');
    if (activeTab === 'quality') return ad.id.includes('freshness') || ad.id.includes('category');
    if (activeTab === 'app') return ad.id.includes('app') || ad.id.includes('secure') || ad.id.includes('master');
    return true;
  });

  return (
    <section id="campaign-gallery" className="py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white border-y border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Advertisement Campaigns</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-slate-900 tracking-tight leading-tight">
            See the Story Behind <span className="italic text-emerald-700">Nityokart</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Explore our official brand advertising campaigns highlighting our core promises: farm freshness, hyper-local speed, secure payments, and honest farmer relationships.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Ad Campaigns' },
              { id: 'quality', label: 'Freshness & Quality' },
              { id: 'delivery', label: '10-20 Min Delivery' },
              { id: 'app', label: 'Mobile App & Payments' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/25'
                    : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Banner: Master Landscape Poster (1536x1024) */}
        <div className="mb-14">
          <div
            onClick={() => onSelectAd(CAMPAIGN_ADS[0])}
            className="group relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-emerald-500/30 shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-[0_25px_60px_rgba(22,163,74,0.22)]"
          >
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[520px] overflow-hidden">
              <img
                src="/public/assets/aistudio/Nityokart_Fresh_Groceries_Delivery_Poster_8013b917.png"
                alt="Nityokart Master Campaign - Groceries Made Easy"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent sm:hidden" />

              {/* Floating Expand Badge */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 text-white border border-white/20 backdrop-blur-md text-xs font-bold shadow-lg group-hover:bg-emerald-600 transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Tap to Inspect Campaign</span>
              </div>

              {/* Bottom Feature Strip on Large Screens */}
              <div className="absolute bottom-4 left-4 right-4 hidden sm:flex items-center justify-between p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-200/80 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Groceries Made Easy! — Nationwide Campaign</h4>
                    <p className="text-xs text-slate-600">Fresh Products • Best Quality • Fast Delivery • Direct Mandi Prices</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAppModal();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1.5"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Get App Free</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid of Campaign Posters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAds.slice(1).map((ad) => (
            <div
              key={ad.id}
              onClick={() => onSelectAd(ad)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Tag Badge */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/95 border border-emerald-500/30 text-emerald-800 text-[11px] font-bold tracking-wider uppercase backdrop-blur-md shadow-xs">
                  {ad.tag}
                </div>

                {/* Hover Inspect Overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <div className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>View Campaign Ad</span>
                  </div>
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-700 tracking-wider uppercase mb-1">
                    {ad.subtitle}
                  </div>
                  <h3 className="text-xl font-editorial font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {ad.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {ad.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Official Creative</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
