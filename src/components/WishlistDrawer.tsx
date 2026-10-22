import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { formatIndianCurrency } from '../utils/cartCalculations';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: number[];
  products: Product[];
  onRemoveFromWishlist: (id: number) => void;
  onAddToCart: (id: number) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-stone-900 border-l border-emerald-500/20 shadow-2xl flex flex-col z-10">
          {/* Header */}
          <div className="p-5 border-b border-emerald-500/15 flex items-center justify-between bg-stone-950">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-400 block">
                  Saved For Later
                </span>
                <h3 className="font-editorial text-lg font-bold text-white">
                  Wishlist ({wishlistedProducts.length})
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <Heart className="w-12 h-12 text-zinc-600" />
                <h4 className="font-editorial text-lg font-bold text-white">Your wishlist is empty</h4>
                <p className="text-xs text-zinc-400 max-w-xs">
                  Save your favorite farm produce, artisan cheeses, and cold-pressed juices to track fresh arrivals.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-stone-950 font-bold text-xs uppercase"
                >
                  Explore Store
                </button>
              </div>
            ) : (
              wishlistedProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex gap-3 p-3 rounded-xl bg-stone-950/70 border border-emerald-500/15"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-editorial text-sm font-bold text-white line-clamp-1">
                          {p.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(p.id)}
                          className="text-zinc-500 hover:text-rose-400 p-1"
                          aria-label={`Remove ${p.name} from wishlist`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-zinc-400 block">{p.unit}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-emerald-400">
                        {formatIndianCurrency(p.price)}
                      </span>
                      <button
                        onClick={() => {
                          onAddToCart(p.id);
                          onRemoveFromWishlist(p.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Basket</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
