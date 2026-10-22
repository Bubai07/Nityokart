import React, { useState } from 'react';
import { X, User, Calendar, Package, Sparkles, MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle, Trash2 } from 'lucide-react';
import { ConfirmedReservation } from '../types/reservation';
import { OrderDetails } from './CheckoutModal';
import { formatIndianCurrency } from '../utils/cartCalculations';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: ConfirmedReservation[];
  orders: OrderDetails[];
  onOpenOrderTracking: (order: OrderDetails) => void;
  onCancelReservation: (bookingId: string) => void;
  currentLocation: string;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  reservations,
  orders,
  onOpenOrderTracking,
  onCancelReservation,
  currentLocation,
}) => {
  const [activeTab, setActiveTab] = useState<'reservations' | 'orders' | 'profile'>('reservations');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-emerald-500/25 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 border-b border-emerald-500/15 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <User className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Nityokart Member Hub
              </span>
              <h3 className="font-editorial text-lg font-bold text-white">
                My Grocery Pass & Orders
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="Close account modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-emerald-500/15 bg-stone-950/60 px-5">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'reservations'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Active Reservations ({reservations.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Past Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Member Info</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[460px] overflow-y-auto space-y-4">
          {activeTab === 'reservations' && (
            <div className="space-y-3">
              {reservations.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <Calendar className="w-10 h-10 text-zinc-600 mx-auto" />
                  <h4 className="font-editorial text-base font-bold text-white">No active reservations yet</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Reserve priority Dawn Harvest delivery slots, book a table for our artisan food tastings, or secure seasonal mango crates.
                  </p>
                </div>
              ) : (
                reservations.map((res) => (
                  <div
                    key={res.bookingId}
                    className="p-4 rounded-xl bg-stone-950 border border-emerald-500/20 relative space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-400">
                            #{res.bookingId}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-semibold uppercase">
                            {res.status}
                          </span>
                        </div>
                        <h4 className="font-editorial text-base font-bold text-white mt-1">
                          {res.experienceTitle}
                        </h4>
                      </div>
                      <button
                        onClick={() => onCancelReservation(res.bookingId)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                        title="Cancel reservation"
                        aria-label="Cancel reservation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-emerald-500/10">
                      <div>
                        <span className="text-zinc-500 block">Date</span>
                        <span className="text-white font-medium">{res.date}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Slot</span>
                        <span className="text-emerald-300 font-medium">{res.timeSlot}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Party / Crates</span>
                        <span className="text-white font-medium">{res.guestsOrQuantity} Pax</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-zinc-400 pt-1">
                      Reserved under <strong>{res.name}</strong> • Phone: {res.phone}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <Package className="w-10 h-10 text-zinc-600 mx-auto" />
                  <h4 className="font-editorial text-base font-bold text-white">No orders placed yet</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Fill your basket with crisp organic produce and experience 30-minute doorstep harvest delivery.
                  </p>
                </div>
              ) : (
                orders.map((o) => (
                  <div
                    key={o.orderId}
                    className="p-4 rounded-xl bg-stone-950 border border-emerald-500/20 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs font-bold text-amber-400">
                          #{o.orderId}
                        </span>
                        <span className="text-xs text-zinc-400 ml-2">Placed at {o.placedAt}</span>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-semibold">
                        {o.status}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-300">
                      <strong>Items ({o.items.length}):</strong>{' '}
                      {o.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-emerald-500/10">
                      <div className="text-xs">
                        <span className="text-zinc-400">Total: </span>
                        <span className="font-bold text-emerald-400">{formatIndianCurrency(o.total)}</span>
                        <span className="text-zinc-500 ml-1">({o.paymentMethod})</span>
                      </div>
                      <button
                        onClick={() => {
                          onOpenOrderTracking(o);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1.5"
                      >
                        <span>Live Radar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-stone-950 border border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center font-editorial font-bold text-emerald-400 text-lg">
                    NK
                  </div>
                  <div>
                    <h4 className="font-editorial text-base font-bold text-white">Nityokart Gold Patron</h4>
                    <p className="text-xs text-zinc-400">VIP Farm Harvest Tier • Priority Delivery Active</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-emerald-500/10 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Default Delivery Hub: <strong>{currentLocation}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Registered Phone: <strong>+91 98765 43210</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Communication: <strong>patron@nityokart.in</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
