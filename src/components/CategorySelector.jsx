import React from 'react';
import { Zap, Droplet, Scissors, Bath, ChefHat } from 'lucide-react';

const ICON_MAP = {
  Zap,
  Droplet,
  Scissors,
  Bath,
  ChefHat,
};

export default function CategorySelector({
  categories = [],
  selectedCategorySlug,
  onSelectCategory,
}) {
  return (
    <div className="w-full">
      {/* Category selector row with smooth horizontal scroll on mobile */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => {
          const isSelected = (cat.slug || cat.id) === selectedCategorySlug;
          const Icon = ICON_MAP[cat.iconName || cat.icon] || Zap;

          return (
            <button
              key={cat.id || cat.slug}
              type="button"
              onClick={() => onSelectCategory(cat.slug || cat.id)}
              className={`group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-2xl shrink-0 transition-all duration-200 border text-left active:scale-95 ${
                isSelected
                  ? 'bg-[#5669E8] text-white border-[#5669E8] shadow-[0_6px_20px_rgba(86,105,232,0.28)]'
                  : 'bg-white text-[#17172B] border-[#E7E7EB] hover:border-[#5669E8]/40 hover:bg-[#F8F9FC] shadow-[0_2px_8px_rgba(11,11,43,0.02)]'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-[#EEF0FF] text-[#5669E8] group-hover:scale-105'
                }`}
              >
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>

              <div>
                <div
                  className={`text-[13px] font-[800] leading-none whitespace-nowrap ${
                    isSelected ? 'text-white' : 'text-[#0B0B2B]'
                  }`}
                >
                  {cat.name}
                </div>
                <div
                  className={`text-[10px] font-semibold mt-0.5 leading-none ${
                    isSelected ? 'text-white/80' : 'text-[#71717A]'
                  }`}
                >
                  From {cat.startingPriceDisplay || `₹${cat.startingPrice}`}
                </div>
              </div>

              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-white ml-1 shrink-0 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
