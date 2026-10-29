import React from 'react';
import { X, Check } from 'lucide-react';
import { SHOP_CATEGORIES } from '../../data/shopProducts';

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSelectSort,
  onResetFilters,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200 md:hidden">
      <div className="w-full max-h-[85vh] bg-white rounded-t-[28px] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#F0E8E8]">
          <h3 className="text-[17px] font-bold text-[#2D1A22]">Filters &amp; Sorting</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#5C3B47]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          
          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-[#5C3B47] uppercase tracking-wider mb-2.5">
              Categories
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {SHOP_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`h-10 px-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#FFF0F3] text-[#C8556A] border-[#C8556A]'
                        : 'bg-[#FAF7F2] text-[#5C3B47] border-[#E9DFD2]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#C8556A]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h4 className="text-xs font-bold text-[#5C3B47] uppercase tracking-wider mb-2.5">
              Sort By
            </h4>
            <div className="space-y-2">
              {[
                { id: 'featured', label: 'Featured & Popular' },
                { id: 'price-low', label: 'Price: Low to High' },
                { id: 'price-high', label: 'Price: High to Low' },
                { id: 'rating', label: 'Highest Customer Rating' },
              ].map((sort) => {
                const isSelected = sortBy === sort.id;
                return (
                  <button
                    key={sort.id}
                    onClick={() => onSelectSort(sort.id)}
                    className={`w-full h-11 px-3.5 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#FFF0F3] text-[#C8556A] border-[#C8556A]'
                        : 'bg-[#FAF7F2] text-[#5C3B47] border-[#E9DFD2]'
                    }`}
                  >
                    <span>{sort.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#C8556A]" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-[#F0E8E8] flex items-center gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <button
            onClick={onResetFilters}
            className="flex-1 h-12 bg-[#FAF7F2] hover:bg-[#E9DFD2] text-[#5C3B47] text-xs font-bold rounded-xl transition-all"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-12 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            style={{
              background: 'linear-gradient(135deg, #C8556A 0%, #9B3A4F 100%)',
            }}
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
}
