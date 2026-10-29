import React from 'react';
import { Zap, Droplet, Scissors, Bath, ChefHat, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ICON_MAP = {
  Zap,
  Droplet,
  Scissors,
  Bath,
  ChefHat,
};

export default function ServiceCategoryCard({ category, onClick, variant = 'standard' }) {
  const navigate = useNavigate();
  const Icon = ICON_MAP[category.iconName || category.icon] || Zap;

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(category);
    } else {
      navigate(`/services/${category.slug || category.id}`);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="group relative flex flex-col items-center justify-between p-3.5 sm:p-4 bg-white rounded-2xl border border-[#E7E7EB] hover:border-[#5669E8] shadow-[0_2px_10px_rgba(11,11,43,0.03)] hover:shadow-[0_8px_24px_rgba(86,105,232,0.12)] transition-all duration-200 active:scale-95 text-left w-full h-full"
      >
        <div className="w-full flex items-start justify-between mb-2">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
            style={{
              backgroundColor: category.bgColor || '#EEF0FF',
              color: category.accentColor || '#5669E8',
            }}
          >
            <Icon className="w-6 h-6 stroke-[2.2]" />
          </div>
          {category.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBFBF5] text-[#006644] tracking-tight">
              {category.badge}
            </span>
          )}
        </div>

        <div className="w-full">
          <h3 className="text-[14px] font-[800] text-[#0B0B2B] group-hover:text-[#5669E8] transition-colors leading-snug">
            {category.name}
          </h3>
          <p className="text-[11px] text-[#71717A] line-clamp-1 mt-0.5">
            {category.shortDescription || category.description}
          </p>
        </div>

        <div className="w-full mt-2.5 pt-2 border-t border-[#F0F2F5] flex items-center justify-between text-[11px]">
          <span className="font-bold text-[#5669E8]">
            From {category.startingPriceDisplay || `₹${category.startingPrice}`}
          </span>
          <span className="text-[#71717A] flex items-center gap-0.5 group-hover:text-[#5669E8] group-hover:translate-x-0.5 transition-all">
            Explore <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </button>
    );
  }

  // Full rich card
  return (
    <div
      onClick={handleClick}
      className="group relative bg-white rounded-2xl sm:rounded-[22px] overflow-hidden border border-[#E7E7EB] hover:border-[#5669E8]/50 shadow-[0_4px_16px_rgba(11,11,43,0.04)] hover:shadow-[0_16px_36px_rgba(86,105,232,0.12)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Category Image Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={category.heroImage || category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Floating Icon and Badge */}
        <div className="absolute top-3 left-3">
          <div
            className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center"
            style={{ color: category.accentColor || '#5669E8' }}
          >
            <Icon className="w-5 h-5 stroke-[2.4]" />
          </div>
        </div>

        {category.badge && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-[800] uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#0B0B2B] shadow-xs">
              {category.badge}
            </span>
          </div>
        )}

        {/* Price Tag in Bottom of Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-1 text-[11px] font-semibold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-[#F1D94C] text-[#F1D94C]" />
            <span>{category.rating || 4.9}</span>
            <span className="text-white/70">({category.reviewsCount || 500}+)</span>
          </div>

          <span className="text-[12px] font-[800] bg-[#5669E8] px-2.5 py-0.5 rounded-md shadow-xs">
            From {category.startingPriceDisplay || `₹${category.startingPrice}`}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-[17px] sm:text-[18px] font-[800] text-[#0B0B2B] group-hover:text-[#5669E8] transition-colors leading-tight">
            {category.name}
          </h3>
          <p className="text-[12px] text-[#71717A] line-clamp-2 mt-1.5 leading-relaxed">
            {category.shortDescription || category.description}
          </p>
        </div>

        {/* Action Link */}
        <div className="mt-4 pt-3 border-t border-[#F0F2F5] flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#71717A]">
            {category.subcategories?.length ? `${category.subcategories.length} Specialized Subservices` : 'Explore Services'}
          </span>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5669E8] group-hover:translate-x-1 transition-transform">
            <span>View Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
