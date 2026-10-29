import React from 'react';
import { ArrowRight } from 'lucide-react';
import MobileProductCard from './MobileProductCard';

export default function MobileProductSection({
  title,
  subtitle,
  products = [],
  wishlistIds = new Set(),
  addedIds = new Set(),
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onViewAll,
}) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full px-4 py-3">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-[18px] sm:text-[20px] font-[750] text-[#2D1A22] tracking-tight leading-none">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-[#9B8C93] mt-1 font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-[12px] font-bold text-[#C8556A] hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 2-Column Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <MobileProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlistIds.has(product.id)}
            isAddedToCart={addedIds.has(product.id)}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onClick={() => onSelectProduct(product)}
          />
        ))}
      </div>
    </section>
  );
}
