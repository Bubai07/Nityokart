import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Truck, PackageCheck, Clock, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { OrderDetails } from './CheckoutModal';
import { formatIndianCurrency } from '../utils/cartCalculations';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDetails | null;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const [activeStage, setActiveStage] = useState(2); // 0: Placed, 1: Packing, 2: Out for delivery, 3: Delivered
  const [minutesLeft, setMinutesLeft] = useState(18);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setMinutesLeft((m) => Math.max(1, m - 1));
    }, 15000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const stages = [
    { label: 'Order Received', desc: 'Order verified & payment logged', time: order.placedAt },
    { label: 'Harvest Pack & Chilled', desc: 'Packed in insulated chill-crate at 4°C', time: '10 mins ago' },
    { label: 'Out for Express Delivery', desc: 'Rider Vikram S. dispatched on EV scooter', time: 'En Route' },
    { label: 'Doorstep Handover', desc: 'Contactless handover at address', time: `ETA ~${minutesLeft} mins` },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-stone-900 border border-emerald-500/25 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 border-b border-emerald-500/15 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Truck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Live Delivery Radar</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-white">
                Tracking Order #{order.orderId}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="Close tracking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* ETA Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 via-stone-950 to-emerald-950/80 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-400 block">Estimated Arrival</span>
              <div className="text-2xl font-editorial font-bold text-emerald-300">
                {minutesLeft} Minutes
              </div>
              <span className="text-[11px] text-zinc-400">Cold-chain guaranteed below 5°C</span>
            </div>
            <div className="text-right">
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-semibold inline-block">
                On Schedule
              </span>
            </div>
          </div>

          {/* Timeline Stages */}
          <div className="space-y-4">
            {stages.map((stage, idx) => {
              const isPast = idx < activeStage;
              const isCurrent = idx === activeStage;
              return (
                <div key={stage.label} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPast
                          ? 'bg-emerald-500 text-stone-950'
                          : isCurrent
                          ? 'bg-emerald-400 text-stone-950 ring-4 ring-emerald-500/20'
                          : 'bg-stone-800 text-zinc-500 border border-stone-700'
                      }`}
                    >
                      {isPast ? '✓' : idx + 1}
                    </div>
                    {idx < stages.length - 1 && (
                      <div
                        className={`w-0.5 h-10 my-1 ${
                          isPast ? 'bg-emerald-500' : 'bg-stone-800'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold ${
                          isCurrent ? 'text-emerald-400' : isPast ? 'text-white' : 'text-zinc-500'
                        }`}
                      >
                        {stage.label}
                      </h4>
                      <span className="text-xs text-zinc-400">{stage.time}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Courier Card */}
          <div className="p-4 rounded-xl bg-stone-950 border border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-stone-800 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400">
                VS
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Vikram S.</h4>
                <p className="text-xs text-zinc-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Nityokart Express Fleet (Vaccinated & Inspected)
                </p>
              </div>
            </div>
            <a
              href={`tel:${order.phone}`}
              className="px-3.5 py-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-900 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Rider</span>
            </a>
          </div>

          {/* Delivery Details */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-emerald-500/10 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-zinc-400">Destination:</span>
              <span className="text-white text-right max-w-xs">{order.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Items:</span>
              <span className="text-zinc-300">
                {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
              </span>
            </div>
            <div className="flex justify-between font-bold pt-1 border-t border-emerald-500/10">
              <span className="text-zinc-300">Paid via:</span>
              <span className="text-emerald-400">{order.paymentMethod} • {formatIndianCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
