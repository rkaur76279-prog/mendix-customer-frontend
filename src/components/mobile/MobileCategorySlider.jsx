import React from 'react';
import {
  LayoutGrid,
  ShoppingBag,
  Sparkles,
  Droplets,
  Heart,
} from 'lucide-react';
import { SHOP_CATEGORIES } from '../../data/shopProducts';

const ICON_MAP = {
  all:        LayoutGrid,
  bags:       ShoppingBag,
  makeup:     Sparkles,
  skincare:   Droplets,
  'body-care': Heart,
};

export default function MobileCategorySlider({ selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full bg-white pt-1 pb-3 px-4 border-b border-[#EAEAEA]/60">
      <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 -mx-4 px-4">
        {SHOP_CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.id] || LayoutGrid;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
            >
              {/* Circular Icon Container */}
              <div
                className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'bg-[#C8556A] text-white shadow-[0_4px_12px_rgba(200,85,106,0.35)] ring-2 ring-[#C8556A] ring-offset-2'
                    : 'bg-[#FAF7F2] text-[#7A5263] border border-[#E9DFD2] group-hover:bg-[#F5DDE3] group-hover:text-[#C8556A]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.9]'}`} />
              </div>

              {/* Short Label */}
              <span
                className={`text-[11px] font-medium tracking-tight text-center whitespace-nowrap transition-colors ${
                  isActive ? 'text-[#C8556A] font-bold' : 'text-[#9B8C93] group-hover:text-[#3D1F2B]'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
