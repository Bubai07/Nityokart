import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Clock, MapPin, Sparkles, Check, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Product } from '../data/products';
import { formatIndianCurrency } from '../utils/cartCalculations';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: number, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [qty, setQty] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product.id, qty);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-stone-900 border border-emerald-500/25 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white rounded-full bg-stone-950/70 border border-emerald-500/30 backdrop-blur-md transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative h-72 md:h-full min-h-[340px] bg-stone-950">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent md:hidden" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-950/80 border border-emerald-500/40 text-emerald-300 backdrop-blur-md">
                  {product.badge}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/90 border border-emerald-500/30 text-emerald-400 backdrop-blur-md">
                {product.organicCert}
              </span>
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="absolute bottom-4 left-4 p-2.5 rounded-full bg-stone-950/80 border border-emerald-500/30 backdrop-blur-md text-white hover:text-rose-400 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-amber-400 block mb-1">
                  {product.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white">
                  {product.name}
                </h3>
                <span className="text-xs text-zinc-400 mt-1 block font-medium">
                  {product.unit}
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-emerald-400">
                  {formatIndianCurrency(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm line-through text-zinc-500">
                    {formatIndianCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-bold">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </div>

              {/* Farm Origin & Freshness */}
              <div className="p-3.5 rounded-xl bg-stone-950 border border-emerald-500/15 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span><strong>Origin:</strong> {product.farmOrigin}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span><strong>Harvest Status:</strong> {product.harvestInfo}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Storage Tip */}
              <div className="text-xs text-zinc-400 bg-stone-950/60 p-3 rounded-lg border border-emerald-500/10">
                <strong className="text-emerald-400">Cellar Storage: </strong>
                {product.storageTip}
              </div>

              {/* Nutrition Highlights */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-stone-950 border border-emerald-500/10">
                  <span className="text-zinc-500 block text-[10px]">Calories</span>
                  <span className="font-bold text-white">{product.nutrition.calories}</span>
                </div>
                <div className="p-2 rounded-lg bg-stone-950 border border-emerald-500/10">
                  <span className="text-zinc-500 block text-[10px]">Protein</span>
                  <span className="font-bold text-white">{product.nutrition.protein}</span>
                </div>
                <div className="p-2 rounded-lg bg-stone-950 border border-emerald-500/10">
                  <span className="text-zinc-500 block text-[10px]">Carbs</span>
                  <span className="font-bold text-white">{product.nutrition.carbs}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-emerald-500/15 space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-emerald-500/30 rounded-xl bg-stone-950 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2.5 text-zinc-300 hover:bg-stone-800 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-white">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3.5 py-2.5 text-zinc-300 hover:bg-stone-800 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-stone-950" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-stone-950" />
                      <span>Add to Basket • {formatIndianCurrency(product.price * qty)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
