import React from 'react';
import { Heart, Star, Plus, ShoppingBag, Check } from 'lucide-react';

export default function MobileProductCard({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onAddToCart,
  onClick,
  isAddedToCart = false,
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[18px] border border-[#EDE4E7] p-2.5 flex flex-col justify-between shadow-[0_2px_12px_rgba(200,85,106,0.04)] transition-all duration-200 active:scale-[0.98] cursor-pointer group relative overflow-hidden"
    >
      {/* Product Image Box */}
      <div className="relative w-full aspect-square rounded-[13px] bg-[#FAF7F2] overflow-hidden flex items-center justify-center mb-2.5">

        {/* Badge */}
        {product.badge && (
          <span
            style={{ backgroundColor: product.badgeColor || '#C8556A' }}
            className="absolute top-2 left-2 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm z-10"
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-xs transition-all z-10 active:scale-90 ${
            isWishlisted
              ? 'bg-[#FFF0F3] text-[#C8556A] shadow-sm'
              : 'bg-white/80 text-[#9B8C93] hover:text-[#C8556A] hover:bg-white'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isWishlisted ? 'fill-[#C8556A] text-[#C8556A] scale-110' : ''
            }`}
          />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col">
        {product.brand && (
          <span className="text-[10px] font-bold text-[#C8556A] uppercase tracking-wider mb-0.5">
            {product.brand}
          </span>
        )}

        <h3 className="text-[12.5px] sm:text-[13px] font-semibold text-[#2D1A22] line-clamp-2 leading-snug tracking-tight mb-1.5">
          {product.name}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-[#F4B740] text-[#F4B740]" />
          <span className="text-[11px] font-bold text-[#2D1A22]">{product.rating}</span>
          <span className="text-[10px] text-[#9B8C93]">({product.reviews})</span>
        </div>
      </div>

      {/* Price & Add to Bag */}
      <div className="pt-2 border-t border-[#EDE4E7]/80 flex items-center justify-between mt-auto">
        <div>
          <div className="text-[15px] sm:text-[16px] font-[800] text-[#2D1A22] leading-none">
            ${product.price}
          </div>
          {product.originalPrice && (
            <div className="text-[11px] text-[#9B8C93] line-through leading-none mt-0.5">
              ${product.originalPrice}
            </div>
          )}
        </div>

        {/* Add to Bag Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          aria-label="Add to bag"
          className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
            isAddedToCart
              ? 'bg-[#5A8A6E] text-white'
              : 'bg-[#C8556A] text-white hover:bg-[#A63D56] shadow-[0_2px_8px_rgba(200,85,106,0.35)]'
          }`}
        >
          {isAddedToCart ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
        </button>
      </div>
    </div>
  );
}
