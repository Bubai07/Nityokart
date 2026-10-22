import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, Check, ArrowRight, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../data/products';
import {
  CartItem,
  calculateCartSubtotal,
  calculateTotalQuantity,
  applyPromoCode,
  calculateDeliveryFee,
  calculateFinalTotal,
  formatIndianCurrency,
  FREE_DELIVERY_THRESHOLD,
} from '../utils/cartCalculations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Record<number, number>;
  products: Product[];
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  products,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [riderTip, setRiderTip] = useState(20);
  const [deliveryNote, setDeliveryNote] = useState('Leave at front doorstep');

  if (!isOpen) return null;

  // Build items list
  const cartEntries: (CartItem & { product: Product })[] = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([idStr, qty]) => {
      const id = Number(idStr);
      const product = products.find((p) => p.id === id)!;
      return {
        id,
        name: product?.name || '',
        price: product?.price || 0,
        quantity: qty,
        product,
      };
    })
    .filter((entry) => Boolean(entry.product));

  const subtotal = calculateCartSubtotal(cartEntries);
  const totalQty = calculateTotalQuantity(cartEntries);
  const deliveryFee = calculateDeliveryFee(subtotal);

  // Re-evaluate applied promo if subtotal changes
  let currentDiscount = 0;
  if (appliedPromo) {
    const promoCheck = applyPromoCode(appliedPromo.code, subtotal);
    if (promoCheck.valid) {
      currentDiscount = promoCheck.discountAmount;
    } else {
      currentDiscount = 0;
    }
  }

  const finalCalc = calculateFinalTotal({
    subtotal,
    discountAmount: currentDiscount,
    deliveryFee,
    tipAmount: riderTip,
  });

  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput, subtotal);
    if (res.valid) {
      setAppliedPromo({ code: res.code, discount: res.discountAmount });
      setPromoMessage({ text: res.message, error: false });
    } else {
      setPromoMessage({ text: res.message, error: true });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          className="w-screen max-w-md bg-stone-900 border-l border-emerald-500/20 shadow-2xl flex flex-col z-10"
          aria-label="Shopping Cart Drawer"
        >
          {/* Header */}
          <div className="p-5 border-b border-emerald-500/15 flex items-center justify-between bg-stone-950">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
                  Your Basket
                </span>
                <h3 className="font-editorial text-lg font-bold text-white">
                  Shopping Cart ({totalQty})
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="px-5 py-3 bg-stone-950/60 border-b border-emerald-500/10">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {remainingForFreeDelivery === 0 ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Free Priority Delivery Unlocked!
                </span>
              ) : (
                <span className="text-zinc-300">
                  Add <strong className="text-amber-400">{formatIndianCurrency(remainingForFreeDelivery)}</strong> more for Free Delivery
                </span>
              )}
              <span className="text-[11px] text-zinc-400">{formatIndianCurrency(subtotal)} / {formatIndianCurrency(FREE_DELIVERY_THRESHOLD)}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-stone-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartEntries.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-stone-950 border border-emerald-500/20 flex items-center justify-center">
                  <img
                    src="/public/assets/aistudio/NITYOKART_Fresh_Grocery_Delivery_Logo_402fd703.png"
                    alt="Empty Cart Logo"
                    className="w-12 h-12 object-contain opacity-50"
                  />
                </div>
                <div>
                  <h4 className="font-editorial text-lg font-bold text-white">Your cart is empty</h4>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                    Explore our crisp harvest fruits, fresh mountain vegetables, and artisanal bakes.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-stone-950 font-bold text-xs tracking-wider uppercase hover:bg-emerald-400 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartEntries.map(({ id, quantity, product }) => (
                <div
                  key={id}
                  className="flex gap-3 p-3 rounded-xl bg-stone-950/70 border border-emerald-500/10 hover:border-emerald-500/20 transition-all"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-stone-900"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-editorial text-sm font-bold text-white line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(id)}
                          className="text-zinc-500 hover:text-red-400 p-1"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-zinc-400 block">{product.unit}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-emerald-400">
                        {formatIndianCurrency(product.price * quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-emerald-500/30 rounded-lg bg-stone-900 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(id, -1)}
                          className="px-2 py-1 text-zinc-300 hover:bg-stone-800 transition-colors"
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(id, 1)}
                          className="px-2 py-1 text-zinc-300 hover:bg-stone-800 transition-colors"
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls & Summary if cart has items */}
          {cartEntries.length > 0 && (
            <div className="p-5 border-t border-emerald-500/15 bg-stone-950 space-y-4">
              {/* Promo Code Input */}
              <div>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Promo code (FRESH20 or NITYO50)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-stone-900 border border-emerald-500/20 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-emerald-300 border border-emerald-500/30"
                  >
                    Apply
                  </button>
                </form>

                {appliedPromo && (
                  <div className="mt-2 flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Code <strong>{appliedPromo.code}</strong> applied (-{formatIndianCurrency(currentDiscount)})
                    </span>
                    <button
                      onClick={handleRemovePromo}
                      className="text-xs text-zinc-400 hover:text-white underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoMessage && !appliedPromo && (
                  <p className={`text-[11px] mt-1.5 ${promoMessage.error ? 'text-red-400' : 'text-emerald-400'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Rider Tip */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Harvest Runner Tip:</span>
                <div className="flex gap-1.5">
                  {[0, 20, 30, 50].map((tip) => (
                    <button
                      key={tip}
                      type="button"
                      onClick={() => setRiderTip(tip)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        riderTip === tip
                          ? 'bg-emerald-500 text-stone-950 font-bold border-emerald-400'
                          : 'bg-stone-900 text-zinc-300 border-stone-800 hover:border-emerald-500/30'
                      }`}
                    >
                      {tip === 0 ? 'None' : `₹${tip}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-emerald-500/10 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Cart Subtotal</span>
                  <span className="text-white">{formatIndianCurrency(finalCalc.subtotal)}</span>
                </div>
                {finalCalc.discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Special Promo Discount</span>
                    <span>-{formatIndianCurrency(finalCalc.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Priority Delivery</span>
                  <span>
                    {finalCalc.delivery === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      formatIndianCurrency(finalCalc.delivery)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>GST & Harvest Packaging (5%)</span>
                  <span>{formatIndianCurrency(finalCalc.gst)}</span>
                </div>
                {finalCalc.tip > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Rider Tip</span>
                    <span>{formatIndianCurrency(finalCalc.tip)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-emerald-500/20">
                  <span>To Pay</span>
                  <span className="text-emerald-400 text-lg">
                    {formatIndianCurrency(finalCalc.total)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onOpenCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:opacity-95 text-stone-950 font-bold text-sm tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
