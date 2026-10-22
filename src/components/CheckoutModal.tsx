import React, { useState } from 'react';
import { X, CheckCircle, MapPin, Phone, User, CreditCard, ShieldCheck, Clock, ArrowRight, Sparkles, Navigation, AlertCircle } from 'lucide-react';
import { Product } from '../data/products';
import {
  CartItem,
  calculateCartSubtotal,
  calculateDeliveryFee,
  calculateFinalTotal,
  formatIndianCurrency,
} from '../utils/cartCalculations';

export interface OrderDetails {
  orderId: string;
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  pinCode: string;
  deliverySlot: string;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  items: { id: number; name: string; quantity: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  placedAt: string;
  estimatedDeliveryTime: string;
  status: 'Received' | 'Harvest Packing' | 'Out for Delivery' | 'Delivered';
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Record<number, number>;
  products: Product[];
  onOrderSuccess: (order: OrderDetails) => void;
  onOpenTracking?: (order: OrderDetails) => void;
  defaultLocation?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  products,
  onOrderSuccess,
  onOpenTracking,
  defaultLocation = 'Bandra West, Mumbai - 400050',
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pinCode, setPinCode] = useState('400050');
  const [deliverySlot, setDeliverySlot] = useState('Express (Under 30 Mins)');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const cartEntries: CartItem[] = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([idStr, qty]) => {
      const id = Number(idStr);
      const product = products.find((p) => p.id === id);
      return {
        id,
        name: product?.name || '',
        price: product?.price || 0,
        quantity: qty,
      };
    })
    .filter((e) => Boolean(e.name));

  const subtotal = calculateCartSubtotal(cartEntries);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const finalBill = calculateFinalTotal({
    subtotal,
    discountAmount: 0,
    deliveryFee,
    tipAmount: 20,
  });

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (step === 1) {
      if (!name.trim() || name.trim().length < 2) {
        setErrorMsg('Please enter your full name');
        return;
      }
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        setErrorMsg('Please enter a valid 10-digit mobile number');
        return;
      }
      if (!address.trim() || address.trim().length < 5) {
        setErrorMsg('Please provide a complete delivery address (House/Flat/Street)');
        return;
      }
      if (!pinCode || pinCode.length < 6) {
        setErrorMsg('Please provide a valid 6-digit postal PIN code');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Validate payment
      if (paymentMethod === 'UPI' && upiId && !upiId.includes('@')) {
        setErrorMsg('Please enter a valid UPI ID (e.g. mobile@upi)');
        return;
      }
      if (paymentMethod === 'Card') {
        if (cardNumber.replace(/\s/g, '').length < 12) {
          setErrorMsg('Please enter a valid card number');
          return;
        }
      }

      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        const order: OrderDetails = {
          orderId: `NYK-${Math.floor(10000 + Math.random() * 90000)}`,
          name: name.trim(),
          phone: phone.trim(),
          address: `${address.trim()}${landmark ? `, Near ${landmark.trim()}` : ''}, PIN: ${pinCode}`,
          landmark: landmark.trim(),
          pinCode,
          deliverySlot,
          paymentMethod,
          items: cartEntries,
          subtotal: finalBill.subtotal,
          deliveryFee: finalBill.delivery,
          total: finalBill.total,
          placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          estimatedDeliveryTime: '28 minutes',
          status: 'Received',
        };
        setCompletedOrder(order);
        onOrderSuccess(order);
      }, 1200);
    }
  };

  const handleCloseAndReset = () => {
    setCompletedOrder(null);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-stone-900 border border-emerald-500/25 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-500/15 bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
                Secure Express Checkout
              </span>
              <h3 className="font-editorial text-lg font-bold text-white">
                {completedOrder ? 'Order Placed Successfully!' : 'Complete Your Grocery Order'}
              </h3>
            </div>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* Order Confirmation View */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Fresh Harvest In Motion
              </span>
              <h4 className="text-2xl font-editorial font-bold text-white mt-1">
                Thank You, {completedOrder.name}!
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Order Tracking ID: <span className="font-mono font-bold text-amber-400">{completedOrder.orderId}</span>
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-950 border border-emerald-500/20 text-left space-y-3 text-xs">
              <div className="flex justify-between pb-3 border-b border-emerald-500/15">
                <span className="text-zinc-400">Estimated Delivery:</span>
                <span className="text-emerald-300 font-bold">{completedOrder.estimatedDeliveryTime}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-emerald-500/15">
                <span className="text-zinc-400">Delivery Address:</span>
                <span className="text-white text-right max-w-xs">{completedOrder.address}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-emerald-500/15">
                <span className="text-zinc-400">Payment Option:</span>
                <span className="text-amber-300 font-semibold">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-1">
                <span>Total Amount:</span>
                <span className="text-emerald-400">{formatIndianCurrency(completedOrder.total)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (completedOrder && onOpenTracking) {
                    onOpenTracking(completedOrder);
                  }
                  handleCloseAndReset();
                }}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
              >
                Track Live Order & Return
              </button>
            </div>
          </div>
        ) : (
          /* Step Flow */
          <form onSubmit={handleNextStep} className="p-6 sm:p-8 space-y-5">
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-4 border-b border-emerald-500/15">
              {[
                { s: 1, label: 'Delivery Address' },
                { s: 2, label: 'Time Slot' },
                { s: 3, label: 'Payment' },
              ].map(({ s, label }) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === s
                        ? 'bg-emerald-500 text-stone-950'
                        : step > s
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : 'bg-stone-800 text-zinc-500'
                    }`}
                  >
                    {step > s ? '✓' : s}
                  </div>
                  <span
                    className={`text-xs hidden sm:inline ${
                      step === s ? 'text-white font-semibold' : 'text-zinc-500'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 1: Address */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aryan Kapoor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-zinc-300">
                      House / Flat / Building / Street *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAddress('Apt 402, Green Meadows Tower, 14th Road');
                        setLandmark('Opposite Organic Park');
                        setPinCode('400050');
                      }}
                      className="text-[11px] text-emerald-400 hover:underline"
                    >
                      Autofill Sample Address
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Flat 301, Rosewood Heights, 16th Cross"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Near Community Center"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Postal PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Time Slot */}
            {step === 2 && (
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Select Delivery Schedule
                </label>
                <div className="space-y-2.5">
                  {[
                    {
                      slot: 'Express (Under 30 Mins)',
                      badge: '⚡ Live Courier Ready',
                      desc: 'Packed right now at nearest local cold-hub',
                    },
                    {
                      slot: 'Dawn Harvest (6:30 AM - 8:00 AM)',
                      badge: '🍃 Farm-Fresh Morning',
                      desc: 'Plucked at 4:30 AM, directly to your doorstep',
                    },
                    {
                      slot: 'Midday Window (12:00 PM - 2:00 PM)',
                      badge: '☀️ Lunch Prep',
                      desc: 'Crisp greens and dairy prepared for afternoon cooking',
                    },
                    {
                      slot: 'Evening Chill (6:00 PM - 8:00 PM)',
                      badge: '🌙 Post-Work Dinner',
                      desc: 'Delivered fresh before family dinner time',
                    },
                  ].map((s) => {
                    const isSelected = deliverySlot === s.slot;
                    return (
                      <button
                        type="button"
                        key={s.slot}
                        onClick={() => setDeliverySlot(s.slot)}
                        className={`w-full p-3.5 text-left rounded-xl border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-950/70 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                            : 'bg-stone-950 border-stone-800 hover:border-emerald-500/30'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{s.slot}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300">
                              {s.badge}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-0.5">{s.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-emerald-400 bg-emerald-500' : 'border-zinc-600'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-stone-950" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'UPI' as const, title: 'Instant UPI', icon: Sparkles },
                    { id: 'Card' as const, title: 'Card', icon: CreditCard },
                    { id: 'COD' as const, title: 'Cash / COD', icon: ShieldCheck },
                  ].map(({ id, title, icon: Icon }) => (
                    <button
                      type="button"
                      key={id}
                      onClick={() => setPaymentMethod(id)}
                      className={`p-3 text-center rounded-xl border transition-all ${
                        paymentMethod === id
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'bg-stone-950 border-stone-800 text-zinc-400 hover:border-emerald-500/30'
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                      <span className="text-xs font-bold block">{title}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="p-4 rounded-xl bg-stone-950 border border-emerald-500/20 space-y-3">
                    <span className="text-xs text-zinc-300 block">Enter UPI ID (Google Pay, PhonePe, Paytm):</span>
                    <input
                      type="text"
                      placeholder="e.g. mobile@okaxis or name@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                    />
                    <div className="flex gap-2">
                      {['9876543210@paytm', 'grocery@okicici', 'user@okhdfcbank'].map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setUpiId(id)}
                          className="px-2 py-1 rounded bg-stone-800 text-[10px] text-zinc-300 hover:text-white"
                        >
                          {id}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="p-4 rounded-xl bg-stone-950 border border-emerald-500/20 space-y-3">
                    <input
                      type="text"
                      placeholder="Card Number (4242 •••• •••• 4242)"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400 font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="px-3.5 py-2 rounded-xl bg-stone-900 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="px-3.5 py-2 rounded-xl bg-stone-900 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div className="p-3.5 rounded-xl bg-stone-950 border border-emerald-500/20 text-xs text-zinc-400">
                    💡 Pay cash or scan courier QR on delivery. Exact change or UPI welcomed.
                  </div>
                )}

                {/* Bill Summary */}
                <div className="p-3.5 rounded-xl bg-stone-950 border border-emerald-500/15 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-zinc-400 block">Total Payable:</span>
                    <span className="text-base font-bold text-emerald-400">
                      {formatIndianCurrency(finalBill.total)}
                    </span>
                  </div>
                  <span className="text-zinc-400">Includes GST & Harvest Packaging</span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as 1 | 2)}
                  className="px-5 py-3 rounded-xl bg-stone-800 text-zinc-300 font-semibold text-xs hover:bg-stone-700"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-stone-950 font-bold text-sm tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{step === 3 ? 'Place Order Now' : 'Continue'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
