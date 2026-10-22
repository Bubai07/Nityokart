import React, { useState } from 'react';
import { X, MapPin, Check, Navigation, Search } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (location: string) => void;
}

const POPULAR_HUBS = [
  { name: 'Bandra West, Mumbai', pin: '400050', eta: '22 Mins', status: 'Express Active' },
  { name: 'Indiranagar, Bengaluru', pin: '560038', eta: '25 Mins', status: 'Express Active' },
  { name: 'Koregaon Park, Pune', pin: '411001', eta: '18 Mins', status: 'Dawn Dispatch' },
  { name: 'Vasant Vihar, New Delhi', pin: '110057', eta: '28 Mins', status: 'Express Active' },
  { name: 'Jubilee Hills, Hyderabad', pin: '500033', eta: '24 Mins', status: 'Express Active' },
  { name: 'Alwarpet, Chennai', pin: '600018', eta: '30 Mins', status: 'Express Active' },
];

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [customInput, setCustomInput] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onSelectLocation(customInput.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-stone-900 border border-emerald-500/25 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-emerald-500/15 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
                Delivery Hub
              </span>
              <h3 className="font-editorial text-lg font-bold text-white">
                Select Your Neighborhood
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="Close location selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Custom Search/PIN */}
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Enter area, society or 6-digit PIN..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-stone-950 border border-emerald-500/20 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 text-stone-950 font-bold text-xs uppercase hover:bg-emerald-400 transition-all"
            >
              Update
            </button>
          </form>

          {/* Popular Hubs */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
              Active Fresh Micro-Hubs
            </span>
            <div className="space-y-1.5 max-h-60 overflow-y-auto">
              {POPULAR_HUBS.map((hub) => {
                const isSelected = currentLocation.includes(hub.name);
                return (
                  <button
                    key={hub.name}
                    type="button"
                    onClick={() => {
                      onSelectLocation(`${hub.name} (${hub.pin})`);
                      onClose();
                    }}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                        : 'bg-stone-950 border-stone-800 text-zinc-300 hover:border-emerald-500/30'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{hub.name}</span>
                        <span className="text-[10px] text-zinc-400 font-mono">#{hub.pin}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                        ⚡ {hub.eta} • {hub.status}
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
