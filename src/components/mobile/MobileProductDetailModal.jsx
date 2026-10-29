import React, { useState } from 'react';
import { X, Star, Heart, ShieldCheck, Truck, RefreshCw, ShoppingBag, Plus, Minus, Check, Leaf } from 'lucide-react';

export default function MobileProductDetailModal({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
}) {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const savePct = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200 md:hidden">
      <div className="w-full max-h-[93vh] bg-white rounded-t-[28px] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">

        {/* Top drag handle + brand header */}
        <div className="px-4 pt-3 pb-2.5 flex flex-col items-center gap-2 border-b border-[#F0E8E8]">
          <div className="w-10 h-1 rounded-full bg-[#E9DFD2]" />
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-bold text-[#C8556A] uppercase tracking-wider">
              {product.brand || 'Mendx Beauty'}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#5C3B47]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Hero Image */}
          <div className="relative w-full aspect-[4/3] bg-[#FAF7F2] rounded-[22px] overflow-hidden flex items-center justify-center">
            {product.badge && (
              <span
                style={{ backgroundColor: product.badgeColor || '#C8556A' }}
                className="absolute top-3 left-3 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10"
              >
                {product.badge}
              </span>
            )}
            {savings > 0 && (
              <span className="absolute top-3 right-14 bg-[#5A8A6E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                -{savePct}%
              </span>
            )}
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xs shadow-sm transition-all z-10 ${
                isWishlisted ? 'bg-[#FFF0F3] text-[#C8556A]' : 'bg-white text-[#9B8C93]'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#C8556A] text-[#C8556A]' : ''}`} />
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title, Rating & Price */}
          <div>
            <h2 className="text-[19px] font-bold text-[#2D1A22] leading-tight">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-[#FFF0F3] px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-[#F4B740] text-[#F4B740]" />
                <span className="text-xs font-bold text-[#2D1A22]">{product.rating}</span>
              </div>
              <span className="text-xs text-[#9B8C93]">{product.reviews} reviews</span>
              <span className="text-xs font-semibold text-[#5A8A6E] ml-auto flex items-center gap-0.5">
                <Leaf className="w-3 h-3" /> In Stock
              </span>
            </div>

            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="text-[26px] font-[800] text-[#2D1A22]">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-[#9B8C93] line-through">${product.originalPrice}</span>
                  <span className="text-xs font-bold text-[#C8556A] bg-[#FFF0F3] px-2 py-0.5 rounded-full">
                    Save ${savings}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E9DFD2]">
            <h4 className="text-xs font-bold text-[#5C3B47] uppercase tracking-wider mb-1.5">
              About This Product
            </h4>
            <p className="text-[12.5px] text-[#7A5263] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Ingredients / Features */}
          {product.specs && (
            <div>
              <h4 className="text-xs font-bold text-[#5C3B47] uppercase tracking-wider mb-2">
                Key Highlights
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white border border-[#E9DFD2] text-[11px] font-medium text-[#5C3B47] flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8556A] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F0E8E8] text-center">
            <div className="p-2 bg-[#FAF7F2] rounded-xl flex flex-col items-center gap-0.5">
              <ShieldCheck className="w-4 h-4 text-[#C8556A]" />
              <span className="text-[10px] font-bold text-[#5C3B47]">Authentic</span>
            </div>
            <div className="p-2 bg-[#FAF7F2] rounded-xl flex flex-col items-center gap-0.5">
              <Truck className="w-4 h-4 text-[#C8556A]" />
              <span className="text-[10px] font-bold text-[#5C3B47]">Free Shipping</span>
            </div>
            <div className="p-2 bg-[#FAF7F2] rounded-xl flex flex-col items-center gap-0.5">
              <RefreshCw className="w-4 h-4 text-[#C8556A]" />
              <span className="text-[10px] font-bold text-[#5C3B47]">30-Day Returns</span>
            </div>
          </div>

        </div>

        {/* Sticky Bottom Actions */}
        <div className="p-4 bg-white border-t border-[#F0E8E8] flex items-center gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">

          {/* Quantity Selector */}
          <div className="flex items-center h-12 bg-[#FAF7F2] rounded-xl border border-[#E9DFD2] px-2 shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#5C3B47] active:scale-90"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-[#2D1A22]">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#5C3B47] active:scale-90"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Bag */}
          <button
            onClick={handleAdd}
            className={`flex-1 h-12 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98 ${
              addedAnimation
                ? 'bg-[#5A8A6E] text-white shadow-md'
                : 'bg-[#2D1A22] text-white hover:bg-[#1A0E14]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </>
            )}
          </button>

          {/* Buy Now */}
          <button
            onClick={() => {
              onAddToCart(product, quantity);
              if (onBuyNow) onBuyNow();
            }}
            className="flex-1 h-12 rounded-xl text-white text-xs font-bold flex items-center justify-center transition-all active:scale-98"
            style={{
              background: 'linear-gradient(135deg, #C8556A 0%, #9B3A4F 100%)',
              boxShadow: '0 4px 14px rgba(200, 85, 106, 0.35)',
            }}
          >
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}
