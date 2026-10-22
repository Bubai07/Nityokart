import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
  Leaf,
  Check,
  Star,
  Truck,
  PhoneCall,
  Mail,
  MapPin,
  Smartphone,
  QrCode,
  Download,
  Zap,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Heart,
  Share2,
  Percent,
  RefreshCw,
  Search,
  ExternalLink,
  Info
} from 'lucide-react';

import { Hero3DCanvas } from './components/Hero3DCanvas';
import { Brand3DBanner } from './components/Brand3DBanner';
import { AppDownloadModal } from './components/AppDownloadModal';
import { OfficialAdCampaigns, CAMPAIGN_ADS } from './components/OfficialAdCampaigns';
import { AdCampaignLightbox, CampaignAd } from './components/AdCampaignLightbox';

export default function App() {
  // Modal state
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<CampaignAd | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Open Ad lightbox by image
  const handleOpenAdByImage = (imagePath: string) => {
    const found = CAMPAIGN_ADS.find((a) => a.image === imagePath);
    if (found) {
      setSelectedAd(found);
    } else {
      setSelectedAd(CAMPAIGN_ADS[0]);
    }
  };

  // Quick SMS Link state in Hero
  const [heroPhone, setHeroPhone] = useState('');
  const [heroPhoneSent, setHeroPhoneSent] = useState(false);

  // Coverage Checker State
  const [pincodeQuery, setPincodeQuery] = useState('');
  const [coverageResult, setCoverageResult] = useState<{
    status: 'deliverable' | 'coming_soon' | null;
    areaName?: string;
    hubSpeed?: string;
    ridersAvailable?: number;
  }>({ status: null });

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3200);
  };

  const handleSendHeroLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroPhone.trim().length < 10) {
      showToast('Please enter a 10-digit mobile number');
      return;
    }
    setHeroPhoneSent(true);
    showToast(`Download link dispatched to +91 ${heroPhone}! Check your phone.`);
    setTimeout(() => setHeroPhoneSent(false), 4500);
  };

  const handleCheckCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincodeQuery.trim();
    if (cleanPin.length < 5) {
      showToast('Please enter a valid 6-digit postal PIN or locality name');
      return;
    }

    // Interactive coverage simulation
    if (cleanPin.startsWith('4') || cleanPin.startsWith('1') || cleanPin.startsWith('5') || cleanPin.toLowerCase().includes('mumbai') || cleanPin.toLowerCase().includes('delhi') || cleanPin.toLowerCase().includes('bengaluru')) {
      setCoverageResult({
        status: 'deliverable',
        areaName: cleanPin.length === 6 ? `Area Hub for PIN ${cleanPin}` : cleanPin.toUpperCase(),
        hubSpeed: '12-16 Minutes',
        ridersAvailable: 14,
      });
      showToast('⚡ Fantastic! Nityokart 10-20 min Express is live in your zone.');
    } else {
      setCoverageResult({
        status: 'deliverable',
        areaName: cleanPin.toUpperCase(),
        hubSpeed: '15-20 Minutes',
        ridersAvailable: 9,
      });
      showToast('⚡ Express Delivery Hub available! Your orders will arrive in under 20 mins.');
    }
  };

  const faqs = [
    {
      q: "How does Nityokart deliver fresh vegetables within 10-20 minutes?",
      a: "Unlike traditional supermarkets that store produce in central warehouses for days, Nityokart operates hyper-local micro-fulfillment hubs situated within 2 km of residential clusters. Harvest arrives at dawn directly from certified organic farms, is cold-packed immediately, and electric delivery partners deliver straight to your doorstep."
    },
    {
      q: "How is Nityokart different from normal quick-commerce apps?",
      a: "Most quick-commerce apps prioritize processed FMCG snacks and deliver stale produce from third-party wholesale markets. Nityokart is solely dedicated to ultra-fresh food: pesticide-free farm greens, unpasteurized cold-chain A2 milk, sourdough artisan breads, and freshly pressed oils directly from trusted farmers."
    },
    {
      q: "What is the 'No Questions Asked' Freshness Guarantee?",
      a: "If an avocado is slightly unripe, an apple has a surface blemish, or coriander isn't crisp, open the Nityokart app and tap 'Request Instant Credit'. Your wallet is refunded immediately in under 60 seconds without having to return the produce."
    },
    {
      q: "Is there a minimum order value for free delivery?",
      a: "New customers receive free doorstep delivery on their first 3 orders with coupon code FRESH50. For recurring members, orders above ₹199 enjoy unlimited free lightning delivery."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fbfcf9] text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Interactive App Download Modal */}
      <AppDownloadModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        onNotifySuccess={showToast}
      />

      {/* Official Ad Campaign Lightbox Modal */}
      <AdCampaignLightbox
        ad={selectedAd}
        onClose={() => setSelectedAd(null)}
        onOpenAppModal={() => setIsAppModalOpen(true)}
        onNotify={showToast}
      />

      {/* Top Promotional Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white px-4 py-2.5 text-xs sm:text-sm font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
              OFFER
            </span>
            <span className="font-semibold">
              Get <span className="underline decoration-amber-400 font-bold">50% OFF</span> on your first order with code <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded font-extrabold text-amber-200">FRESH50</span> on the Nityokart App!
            </span>
          </div>
          <button
            onClick={() => setIsAppModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 font-bold text-amber-300 hover:text-amber-200 hover:underline transition-all text-xs"
          >
            <span>Download Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Header / Navigation with Enlarged Prominent Logo */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* BIGGER LOGO BRANDING */}
            <a href="#" className="flex items-center gap-3.5 group">
              <div className="relative flex items-center justify-center p-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/public/assets/aistudio/NITYOKART_Fresh_Grocery_Delivery_Logo_402fd703.png"
                  alt="NITYOKART Brand Logo"
                  style={{ width: '192.559px', height: '79.9896px' }}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  NITYOKART
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold text-emerald-700 -mt-1">
                  Fresh Farm Delivery
                </span>
              </div>
            </a>

            {/* Navigation Links for Advertisement Website */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-700">
              <a href="#why-nityokart" className="hover:text-emerald-700 transition-colors">
                Why Nityokart
              </a>
              <a href="#campaign-gallery" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 text-emerald-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Ad Campaigns
              </a>
              <a href="#app-showcase" className="hover:text-emerald-700 transition-colors">
                Mobile App
              </a>
              <a
                href="#farm-journey"
                style={{ width: '83.6111px', height: '40.9653px' }}
                className="hover:text-emerald-700 transition-colors flex items-center"
              >
                Farm Sourcing
              </a>
              <a
                href="#coverage-radar"
                style={{ fontSize: '14px', height: '35.9653px', width: '88.7986px' }}
                className="hover:text-emerald-700 transition-colors flex items-center"
              >
                Coverage Radar
              </a>
              <a href="#testimonials" className="hover:text-emerald-700 transition-colors">
                Reviews
              </a>
              <a
                href="#faq"
                style={{ height: '19.9826px', width: '33.2222px' }}
                className="hover:text-emerald-700 transition-colors flex items-center"
              >
                FAQs
              </a>
            </nav>

            {/* Header Action Buttons */}
            <div
              style={{ width: '280.569px' }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => {
                  const elem = document.getElementById('coverage-radar');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{ fontSize: '12px', lineHeight: '13px', color: '#314158' }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold hover:text-emerald-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Check Delivery PIN</span>
              </button>

              <button
                onClick={() => setIsAppModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Smartphone className="w-4 h-4" />
                <span>Get the App</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section: High Impact Brand Advertisement */}
      <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Soft Organic Ambient Background Blobs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Compelling Brand Copy & Instant App Download Form */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>India's Premier Local Farm Grocery Delivery Network</span>
              </div>

              {/* Bold Editorial Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-bold text-slate-900 tracking-tight leading-[1.12]">
                Farm Fresh Produce <br />
                Delivered in <span className="italic text-emerald-700 underline decoration-amber-400 decoration-wavy decoration-2">10-20 Minutes</span>.
              </h1>

              {/* Description */}
              <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Forget dusty supermarket aisles and wilted warehouse greens. Nityokart rushes crisp morning harvests, fresh cold-chain dairy, and organic artisanal staples directly to your doorstep.
              </p>

              {/* Quick SMS App Link Input */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 max-w-xl mx-auto lg:mx-0">
                <div className="text-xs font-bold text-slate-700 mb-2.5 flex items-center justify-between">
                  <span>Enter your mobile number to get the app link instantly:</span>
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> FREE ₹150 BONUS
                  </span>
                </div>

                <form onSubmit={handleSendHeroLink} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      value={heroPhone}
                      onChange={(e) => setHeroPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>Get App Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {heroPhoneSent && (
                  <p className="mt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    SMS link sent! Please check your smartphone inbox now.
                  </p>
                )}

                {/* Direct Store Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <span>Available free on:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsAppModalOpen(true)}
                      className="flex items-center gap-1.5 font-bold text-slate-800 hover:text-emerald-700 transition-colors"
                    >
                      <span className="text-base leading-none"></span> App Store
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      onClick={() => setIsAppModalOpen(true)}
                      className="flex items-center gap-1.5 font-bold text-slate-800 hover:text-emerald-700 transition-colors"
                    >
                      <span className="text-xs text-emerald-600 leading-none">▶</span> Google Play
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      onClick={() => setIsAppModalOpen(true)}
                      className="flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                    >
                      <QrCode className="w-3.5 h-3.5" /> Scan QR
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Proof Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg mx-auto lg:mx-0">
                <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 text-center">
                  <div className="text-2xl font-editorial font-bold text-slate-900">12 Mins</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Avg Delivery</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 text-center">
                  <div className="text-2xl font-editorial font-bold text-slate-900">4.9 ★</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">100k+ Reviews</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 text-center">
                  <div className="text-2xl font-editorial font-bold text-slate-900">100%</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Farm Freshness</div>
                </div>
              </div>
            </div>

            {/* Right Column: Brand Showcase */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-[500px]">
                <Hero3DCanvas
                  onOpenAppModal={() => setIsAppModalOpen(true)}
                  onOpenAdLightbox={(img) => handleOpenAdByImage(img)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Animated Marquee with Big Nityokart Logos & 3D Tilt Cards */}
      <div id="why-nityokart">
        <Brand3DBanner onOpenAppModal={() => setIsAppModalOpen(true)} />
      </div>

      {/* Featured App Showcase Spotlight Section: Starring the new Poster_69520d88.png */}
      <section id="app-showcase" className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Interactive Spotlight Image displaying the newly uploaded Poster */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-100 group">
                <img
                  src="/public/assets/aistudio/Poster_69520d88.png"
                  alt="Nityokart Smartphone App Showcase with Fresh Vegetables"
                  className="w-full h-auto object-cover transform group-hover:scale-103 transition-transform duration-700"
                />

                {/* Floating Interactive Badge 1: Instant Freshness */}
                <div className="absolute top-6 left-6 z-10 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-300 shadow-xl flex items-center gap-2.5 animate-float">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Direct Mandi Sourced</div>
                    <div className="text-xs font-bold text-slate-900">Zero Middlemen Markups</div>
                  </div>
                </div>

                {/* Floating Interactive Badge 2: Live Tracking */}
                <div className="absolute bottom-6 right-6 z-10 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-300 shadow-xl flex items-center gap-2.5 animate-float-reverse">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Live Electric Rider GPS</div>
                    <div className="text-xs font-bold text-slate-900">Arriving in 11 Mins</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Key Value Propositions of the App */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-3">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>The Nityokart Mobile Experience</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-slate-900 leading-tight">
                  Your Kitchen's Best Friend in the Palm of Your Hand
                </h2>
                <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                  Engineered for lightning convenience. Open the app, see today's fresh dawn arrivals from nearby orchards, and receive your organic vegetables before your cooking oil gets hot.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Direct Mandi Real-Time Pricing</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Our app reflects live agricultural prices updated every morning at 5:00 AM, guaranteeing up to 35% savings over legacy retail chains.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">1-Tap Instant Freshness Refund</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      No customer support calls, no arguments. If any tomato or leaf isn't crisp, tap refund in the app and money is credited in seconds.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Scheduled Morning Milk & Bread Runs</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Set a repeat morning routine for fresh A2 milk, sourdough bread, and eggs delivered silently before 6:30 AM without ringing the doorbell.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsAppModalOpen(true)}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Nityokart App Now</span>
                </button>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Free • No Subscription Fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Advertisement Campaigns & Poster Showcase (Featuring all 9 campaign artworks) */}
      <OfficialAdCampaigns
        onSelectAd={(ad) => setSelectedAd(ad)}
        onOpenAppModal={() => setIsAppModalOpen(true)}
      />

      {/* Farm-to-Table Journey Section (Editorial Casa Tupka Inspiration) */}
      <section id="farm-journey" className="py-20 bg-emerald-950 text-white relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-800/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900 border border-emerald-600/50 text-emerald-300 text-xs font-bold tracking-widest uppercase mb-3">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Traceable Agriculture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold tracking-tight">
              The Journey of Your Food: From Dawn Dew to Your Door
            </h2>
            <p className="mt-4 text-emerald-200/80 text-base sm:text-lg leading-relaxed">
              We eliminated the 5 middlemen, 4 wholesale warehouses, and 3 days of transit that typical supermarket chains force on your vegetables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative p-6 rounded-3xl bg-emerald-900/60 border border-emerald-700/50 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="text-3xl font-editorial font-bold text-amber-400 mb-2">05:00 AM</div>
                <h3 className="text-xl font-bold text-white mb-2">Dawn Orchard Harvest</h3>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  Certified partner farmers pick ripened tomatoes, crisp greens, and orchard fruits at peak morning nutrient density.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-800/80 text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                Zero Chemical Storage
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-3xl bg-emerald-900/60 border border-emerald-700/50 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="text-3xl font-editorial font-bold text-amber-400 mb-2">06:30 AM</div>
                <h3 className="text-xl font-bold text-white mb-2">24-Point Quality Test</h3>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  Produce arrives at city gate centers where agronomists test for pesticide absence, blemish-free skin, and sweetness brix levels.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-800/80 text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                Ozone-Purified Water Wash
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-3xl bg-emerald-900/60 border border-emerald-700/50 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="text-3xl font-editorial font-bold text-amber-400 mb-2">07:00 AM</div>
                <h3 className="text-xl font-bold text-white mb-2">Micro-Hub Stocking</h3>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  Shelved in climate-controlled neighborhood micro-hubs located right in your residential sector, kept at pristine 4°C cellar chill.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-800/80 text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                Cold-Chain Maintained
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-3xl bg-emerald-900/60 border border-emerald-700/50 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="text-3xl font-editorial font-bold text-amber-400 mb-2">10-20 Mins</div>
                <h3 className="text-xl font-bold text-white mb-2">Electric Doorstep Drop</h3>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  As soon as you tap order on the Nityokart App, an electric bike courier delivers your food-grade insulated box.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-800/80 text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                100% Eco-Friendly EV Fleet
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Area / Delivery Hub Checker */}
      <section id="coverage-radar" className="py-20 bg-slate-50 relative border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/90 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-4">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real-Time Service Radar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-slate-900">
              Check If Nityokart Delivers to Your Locality
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
              Our electric micro-hubs are expanding daily across Mumbai, Bengaluru, Delhi-NCR, Pune, and Hyderabad. Check your delivery speed:
            </p>

            {/* Interactive Checker Form */}
            <form onSubmit={handleCheckCoverage} className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter 6-digit PIN code or Area (e.g. 400050, Bandra)"
                  value={pincodeQuery}
                  onChange={(e) => setPincodeQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-emerald-600/20 shrink-0"
              >
                Verify Speed
              </button>
            </form>

            {/* Coverage Result feedback */}
            {coverageResult.status && (
              <div className="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-lg mx-auto text-left animate-in fade-in duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-emerald-800">
                        Active Express Hub Online
                      </div>
                      <div className="text-sm font-bold text-slate-900">
                        {coverageResult.areaName}
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-200/80 text-emerald-900 font-bold text-xs">
                    Live
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200/80 flex items-center justify-between text-xs text-slate-700">
                  <span>⚡ Estimated Delivery: <strong className="text-emerald-800">{coverageResult.hubSpeed}</strong></span>
                  <span>🛵 Riders On-Road: <strong className="text-slate-900">{coverageResult.ridersAvailable} active</strong></span>
                </div>
              </div>
            )}

            {/* Popular Active Hubs Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold mr-1">Popular Live Zones:</span>
              {['Bandra West', 'Indiranagar', 'Koramangala', 'South Delhi', 'Gurugram Sec 54', 'Juhu', 'HSR Layout', 'Kharadi Pune'].map((zone, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setPincodeQuery(zone);
                    setCoverageResult({
                      status: 'deliverable',
                      areaName: zone,
                      hubSpeed: '10-15 Minutes',
                      ridersAvailable: 12 + i,
                    });
                    showToast(`Checked coverage for ${zone}! Delivery active.`);
                  }}
                  className="px-3 py-1 rounded-full bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-medium transition-colors"
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verified Customer Love & Word-of-Mouth */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold tracking-widest uppercase mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Loved by Over 100,000 Kitchens</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-slate-900">
              What Home Cooks Say About Nityokart
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Real feedback from chefs, working parents, and organic enthusiasts who refuse to settle for wilted supermarket food.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-3xl bg-[#fbfcf9] border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "The leafy greens are genuinely crisp—they still have that fresh garden scent. When they say 15 minutes, my doorbell rings in 12. Won’t ever buy vegetables from normal supermarkets again."
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                  PS
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Pooja Sharma</div>
                  <div className="text-xs text-slate-500">Home Chef • Bandra West</div>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-[#fbfcf9] border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "Their cold-chain dairy is top-notch. Unpasteurized A2 milk and fresh paneer that actually tastes like pure milk instead of rubber. The Nityokart app is smooth as butter."
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
                  RK
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Rohan Kapoor</div>
                  <div className="text-xs text-slate-500">Fitness Coach • Indiranagar</div>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-[#fbfcf9] border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "Once I received an avocado that wasn’t fully ripe. I tapped refund in the app and the money was credited to my wallet before I even closed the app! Honest brand integrity."
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
                  MD
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Meera Deshmukh</div>
                  <div className="text-xs text-slate-500">Nutritionist • South Delhi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Everything you need to know about the Nityokart app and farm grocery service.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 hover:text-emerald-700 transition-colors gap-4"
                  >
                    <span className="text-base sm:text-lg">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Promotional Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Limited Introductory Offer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold leading-tight">
            Ready to Taste True Farm Freshness?
          </h2>

          <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Download the Nityokart App today. Get 50% OFF your first order with coupon code <strong className="text-amber-300">FRESH50</strong> and experience groceries delivered in under 20 minutes.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsAppModalOpen(true)}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold text-sm tracking-wide shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Smartphone className="w-5 h-5 text-emerald-700" />
              <span>Get the Nityokart App Now</span>
            </button>
            <button
              onClick={() => setIsAppModalOpen(true)}
              className="px-6 py-4 rounded-2xl bg-emerald-900/60 hover:bg-emerald-900 text-white border border-emerald-400/40 font-bold text-sm tracking-wide transition-all flex items-center gap-2"
            >
              <QrCode className="w-5 h-5 text-amber-300" />
              <span>Scan QR Code</span>
            </button>
          </div>
        </div>
      </section>

      {/* Clean Light-Mode Footer with Large Brand Logo */}
      <footer className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Brand column with ENLARGED Logo */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm">
                  <img
                    src="/public/assets/aistudio/NITYOKART_Fresh_Grocery_Delivery_Logo_402fd703.png"
                    alt="Nityokart Logo"
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <div>
                  <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                    NITYOKART
                  </span>
                  <div className="text-[10px] uppercase font-bold tracking-[0.22em] text-emerald-700">
                    Fresh Farm Delivery
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
                Nityokart is India's premier hyper-local grocery delivery network, uniting conscious households with local organic farms in 10-20 minutes.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Certified Organic & Chemical-Free Quality</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Discover
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li><a href="#why-nityokart" className="hover:text-emerald-700 transition-colors">Why Nityokart</a></li>
                <li><a href="#app-showcase" className="hover:text-emerald-700 transition-colors">Mobile App</a></li>
                <li><a href="#farm-journey" className="hover:text-emerald-700 transition-colors">Farm Sourcing</a></li>
                <li><a href="#coverage-radar" className="hover:text-emerald-700 transition-colors">Coverage Radar</a></li>
                <li><a href="#faq" className="hover:text-emerald-700 transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Coverage Areas */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Active Hub Cities
              </h4>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-600" /> Mumbai (Bandra, Juhu, Powai, Thane)</li>
                <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-600" /> Bengaluru (Indiranagar, Koramangala, HSR)</li>
                <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-600" /> Delhi-NCR (South Delhi, Gurugram, Noida)</li>
                <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-600" /> Pune & Hyderabad (Select Sectors)</li>
              </ul>
            </div>

            {/* App Download Callout */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Get the App Free
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scan QR or click below to install the Nityokart App on iPhone or Android.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => setIsAppModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Download App • iOS & Android</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © {new Date().getFullYear()} NITYOKART Technologies Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-6 font-medium">
              <a href="#" className="hover:text-emerald-700">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-700">Terms of Service</a>
              <a href="#" className="hover:text-emerald-700">Farmer Partnership</a>
              <a href="#" className="hover:text-emerald-700">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
