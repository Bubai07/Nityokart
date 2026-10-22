import React from 'react';
import { Leaf, Clock, ShieldCheck, Sparkles, Smartphone, Download, Star } from 'lucide-react';

interface HeroBrandShowcaseProps {
  onOpenAppModal?: () => void;
  onOpenAdLightbox?: (imagePath: string) => void;
}

export const Hero3DCanvas: React.FC<HeroBrandShowcaseProps> = ({ onOpenAppModal, onOpenAdLightbox }) => {
  return (
    <div
      className="relative w-full flex items-center justify-center py-4"
      aria-label="Nityokart Official Campaign Hero Showcase"
    >
      {/* Soft warm ambient backdrops */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-emerald-100/70 blur-3xl pointer-events-none -z-10" />
      <div className="absolute w-64 h-64 rounded-full bg-amber-100/60 blur-2xl pointer-events-none -z-10 translate-x-14 -translate-y-10" />

      {/* Main Campaign Poster Frame */}
      <div className="relative group rounded-3xl overflow-hidden bg-white border-2 border-emerald-500/30 shadow-[0_20px_50px_rgba(22,163,74,0.18)] transition-all duration-300 hover:shadow-[0_28px_60px_rgba(22,163,74,0.26)] max-w-md w-full mx-2">
        {/* Clickable Campaign Master Artwork */}
        <div
          className="relative cursor-pointer overflow-hidden bg-slate-900"
          onClick={() => {
            if (onOpenAdLightbox) {
              onOpenAdLightbox('/public/assets/aistudio/Nityokart_Fresh_Groceries_Delivered_ef42a142.png');
            } else if (onOpenAppModal) {
              onOpenAppModal();
            }
          }}
        >
          <img
            src="/public/assets/aistudio/Nityokart_Fresh_Groceries_Delivered_ef42a142.png"
            alt="Nityokart Master Campaign - Groceries, Freshness & More Just a Tap Away"
            className="w-full h-auto object-cover transform group-hover:scale-103 transition-transform duration-700"
          />

          {/* Quick Hover Inspect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
            <div className="flex items-center justify-between w-full text-white text-xs font-bold">
              <span className="flex items-center gap-1.5 bg-emerald-600/90 px-3 py-1.5 rounded-xl backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Tap to View Full Poster</span>
              </span>
              <span className="bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-md">
                10-20 Min Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Footer Sub-strip on the Hero Card */}
        <div className="p-4 bg-emerald-50/80 border-t border-emerald-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/public/assets/aistudio/NITYOKART_Fresh_Grocery_Delivery_Logo_402fd703.png"
              alt="Nityokart Logo"
              className="w-8 h-8 object-contain bg-white rounded-xl p-0.5 shadow-xs"
            />
            <div>
              <div className="text-xs font-extrabold text-slate-900">Official Mobile App</div>
              <div className="text-[10px] text-emerald-800 font-bold">Rated 4.9 ★ by 100k+ Users</div>
            </div>
          </div>

          <button
            onClick={onOpenAppModal}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-sm transition-colors flex items-center gap-1"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
        </div>
      </div>

      {/* Floating Accent Badges around Card */}
      <div className="hidden sm:flex absolute -top-1 -right-2 z-20 items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white border border-emerald-200 text-xs font-bold text-emerald-800 shadow-lg animate-float">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Farm Gate Direct</span>
      </div>

      <div className="hidden sm:flex absolute -bottom-2 -left-2 z-20 items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white border border-emerald-200 text-xs font-bold text-slate-800 shadow-lg animate-float-reverse">
        <Clock className="w-3.5 h-3.5 text-amber-600" />
        <span>10-20 Mins Express</span>
      </div>
    </div>
  );
};
