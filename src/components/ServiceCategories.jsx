import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Droplet, 
  Scissors, 
  Bath, 
  ChefHat, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ICON_MAP = {
  Zap,
  Droplet,
  Scissors,
  Bath,
  ChefHat,
};

export default function ServiceCategories({ onSelectService }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch 5 primary categories directly from MongoDB
  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      try {
        const res = await api.categories.getAll();
        if (isMounted && res.categories) {
          setCategories(res.categories);
        }
      } catch (err) {
        console.error('[ServiceCategories] Failed to fetch from MongoDB:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadCategories();
    return () => { isMounted = false; };
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/services/${category.slug || category.id}`);
  };

  return (
    <section id="services-section" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF0FF] text-[#5669E8] text-xs font-bold uppercase tracking-wider mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mendx Certified Standards • MongoDB Powered</span>
          </div>
          <h2 className="text-[26px] sm:text-[34px] font-[800] text-[#0B0B2B] tracking-tight leading-tight">
            Services at Home
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#71717A] mt-1 max-w-[620px]">
            Transparent upfront pricing, background-checked specialists, and high-standard doorstep execution across our 5 core services.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/services')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#5669E8] hover:text-[#4353c9] transition-colors self-start md:self-end"
        >
          <span>Explore All 5 Categories</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5 Primary Categories Grid from MongoDB */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Zap;

          return (
            <div
              key={cat._id || cat.id}
              onClick={() => handleCategoryClick(cat)}
              className="bg-white rounded-2xl sm:rounded-[22px] p-3.5 sm:p-4 border border-[#E7E7EB] shadow-[0_4px_16px_rgba(11,11,43,0.03)] hover:shadow-[0_14px_32px_rgba(86,105,232,0.12)] hover:border-[#5669E8]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden active:scale-[0.98]"
            >
              {/* Category Image Header */}
              <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden mb-3 bg-[#F8F9FC]">
                <img
                  src={cat.heroImage || cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating Category Icon */}
                <div 
                  className="absolute top-2 left-2 w-8 h-8 rounded-lg flex items-center justify-center shadow-xs bg-[#EEF0FF] text-[#5669E8]"
                >
                  <Icon className="w-4 h-4 stroke-[2.4]" />
                </div>

                {/* Badge */}
                {cat.badge && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#0B0B2B] shadow-2xs">
                    {cat.badge}
                  </span>
                )}

                {/* Rating badge */}
                <div className="absolute bottom-1.5 left-2 flex items-center gap-1 text-[10px] font-bold text-white bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded">
                  <Star className="w-2.5 h-2.5 fill-[#F1D94C] text-[#F1D94C]" />
                  <span>{cat.rating || 4.9}</span>
                </div>
              </div>

              {/* Title & Short Description */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] sm:text-[16px] font-[800] text-[#0B0B2B] group-hover:text-[#5669E8] transition-colors leading-tight line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[11px] sm:text-[12px] text-[#71717A] mt-1 line-clamp-2 leading-relaxed">
                  {cat.shortDescription || cat.description}
                </p>
              </div>

              {/* Price & Action Row */}
              <div className="pt-2.5 mt-2.5 border-t border-[#F0F2F5] flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#71717A] block leading-none">Starting from</span>
                  <span className="text-[14px] sm:text-[15px] font-[800] text-[#0B0B2B] mt-0.5 block">
                    {cat.startingPriceDisplay || `₹${cat.startingPrice}`}
                  </span>
                </div>

                <div className="w-7 h-7 rounded-lg bg-[#EEF0FF] text-[#5669E8] group-hover:bg-[#5669E8] group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
