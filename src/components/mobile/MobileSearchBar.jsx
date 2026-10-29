import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function MobileSearchBar({ searchTerm, onSearchChange, onOpenFilter, activeFilterCount = 0 }) {
  return (
    <div className="w-full px-4 pt-3 pb-2 bg-white">
      <div className="flex items-center gap-2">
        {/* Search Input Container */}
        <div className="flex-1 relative flex items-center h-11 bg-[#FAF7F2] rounded-[14px] px-3.5 border border-[#E9DFD2] transition-all focus-within:border-[#C8556A]/50 focus-within:bg-white focus-within:shadow-[0_2px_12px_rgba(200,85,106,0.08)]">
          <Search className="w-4 h-4 text-[#9B8C93] shrink-0 mr-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search bags, makeup, skincare..."
            className="w-full bg-transparent text-[13px] sm:text-[14px] text-[#2D1A22] placeholder-[#9B8C93] focus:outline-none"
            aria-label="Search products"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="p-1 rounded-full text-[#9B8C93] hover:text-[#2D1A22]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <button
          onClick={onOpenFilter}
          aria-label="Filter products"
          className={`h-11 w-11 rounded-[14px] flex items-center justify-center shrink-0 border transition-all active:scale-95 ${
            activeFilterCount > 0
              ? 'bg-[#C8556A] text-white border-[#C8556A] shadow-sm'
              : 'bg-[#FAF7F2] text-[#5C3B47] border-[#E9DFD2] hover:bg-white'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
