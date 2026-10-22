import React from 'react';
import { X, Download, Share2, Sparkles, Check, Smartphone, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export interface CampaignAd {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  description: string;
  features: string[];
}

interface AdCampaignLightboxProps {
  ad: CampaignAd | null;
  onClose: () => void;
  onOpenAppModal: () => void;
  onNotify: (msg: string) => void;
}

export const AdCampaignLightbox: React.FC<AdCampaignLightboxProps> = ({
  ad,
  onClose,
  onOpenAppModal,
  onNotify,
}) => {
  if (!ad) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Nityokart: ${ad.title}`,
        text: `${ad.subtitle} - Download Nityokart App for fresh groceries in 10-20 mins!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onNotify('Website link copied to clipboard!');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-slate-100 text-slate-700 shadow-md transition-colors"
          aria-label="Close poster view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Poster Image View */}
        <div className="w-full md:w-7/12 bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden relative">
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Ad Details & Action Panel */}
        <div className="w-full md:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold tracking-wider uppercase">
                {ad.tag}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                Official Ad Campaign
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 leading-tight">
              {ad.title}
            </h3>
            <p className="text-sm font-semibold text-emerald-700 mt-1">
              {ad.subtitle}
            </p>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {ad.description}
            </p>

            {/* Campaign Highlights Checklist */}
            <div className="mt-6 space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Key Campaign Highlights:
              </div>
              {ad.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
            <button
              onClick={() => {
                onClose();
                onOpenAppModal();
              }}
              className="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Smartphone className="w-4 h-4" />
              <span>Get Nityokart App Free</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Campaign</span>
              </button>
              <a
                href={ad.image}
                download
                className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                title="Download Poster Asset"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Poster</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
