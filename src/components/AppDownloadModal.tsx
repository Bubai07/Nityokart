import React, { useState } from 'react';
import { X, Smartphone, QrCode, CheckCircle2, ArrowRight, ShieldCheck, Star, Sparkles, Copy, Check } from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotifySuccess: (msg: string) => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  onNotifySuccess,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [channel, setChannel] = useState<'sms' | 'whatsapp'>('whatsapp');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setSentSuccess(true);
    onNotifySuccess(`App download link sent via ${channel === 'whatsapp' ? 'WhatsApp' : 'SMS'} to +91 ${phoneNumber}!`);
    setTimeout(() => {
      setSentSuccess(false);
    }, 4000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FRESH50');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
    onNotifySuccess('Coupon FRESH50 copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Brand Visual & QR Code */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Mobile Exclusive</span>
            </div>
            <h3 className="text-2xl font-editorial font-bold leading-snug">
              Get 50% OFF Your First Grocery Box
            </h3>
            <p className="mt-2 text-xs text-emerald-100/90 leading-relaxed">
              Order fresh greens, artisan breads, and morning dairy with free doorstep delivery.
            </p>
          </div>

          {/* Interactive QR Code Mock */}
          <div className="my-6 bg-white p-4 rounded-2xl shadow-xl flex flex-col items-center text-center">
            <div className="w-36 h-36 border-2 border-dashed border-emerald-500/40 rounded-xl p-2 flex items-center justify-center bg-slate-50 relative group">
              <img
                src="/public/assets/aistudio/NITYOKART_Fresh_Grocery_Delivery_Logo_402fd703.png"
                alt="Nityokart QR Logo"
                className="w-10 h-10 absolute z-10 bg-white p-1 rounded-lg shadow-md"
              />
              <QrCode className="w-28 h-28 text-slate-800" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-2">
              Scan with camera to install
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-emerald-200">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              4.9 ★ (120k+ reviews)
            </span>
            <span>iOS & Android</span>
          </div>
        </div>

        {/* Right Side: Direct Link Input & App Badges */}
        <div className="w-full md:w-7/12 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 p-1 flex items-center justify-center shadow-xs">
                <img
                  src="/public/assets/aistudio/NITYOKART_Fresh_Grocery_Delivery_Logo_402fd703.png"
                  alt="Nityokart Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h4 className="font-editorial text-xl font-bold text-slate-900">
                  Install Nityokart App
                </h4>
                <p className="text-xs text-slate-500">10-20 min lightning fresh grocery delivery</p>
              </div>
            </div>

            {/* Promo Voucher banner */}
            <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  New Customer Promo
                </div>
                <div className="text-sm font-bold text-slate-900">Use code: <span className="font-mono text-emerald-700 font-extrabold">FRESH50</span></div>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-xl bg-amber-200/70 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all flex items-center gap-1"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Send Link Form */}
            <form onSubmit={handleSendLink} className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Receive App download link directly:
              </label>

              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setChannel('whatsapp')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    channel === 'whatsapp' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setChannel('sms')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    channel === 'sms' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  SMS Text
                </button>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <span>Send</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {sentSuccess && (
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Download link sent successfully! Check your phone now.</span>
                </div>
              )}
            </form>
          </div>

          {/* App Store Buttons */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Or download directly from:
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="#app-store"
                onClick={(e) => {
                  e.preventDefault();
                  onNotifySuccess('Opening Apple App Store (simulated)...');
                }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  
                </div>
                <div className="text-left">
                  <div className="text-[9px] text-slate-500 font-semibold leading-tight">Download on</div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">App Store</div>
                </div>
              </a>

              <a
                href="#google-play"
                onClick={(e) => {
                  e.preventDefault();
                  onNotifySuccess('Opening Google Play Store (simulated)...');
                }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  ▶
                </div>
                <div className="text-left">
                  <div className="text-[9px] text-slate-500 font-semibold leading-tight">Get it on</div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
