import React from 'react';
import { Star, Clock, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export default function ServiceCard({
  service,
  onViewDetails,
  onBookNow,
}) {
  const priceDisplay = service.price
    ? (typeof service.price === 'number' ? `₹${service.price}` : service.price)
    : `₹${service.numericPrice || 499}`;

  return (
    <div
      onClick={() => onViewDetails && onViewDetails(service)}
      className="group bg-white rounded-2xl border border-[#E7E7EB] hover:border-[#5669E8]/40 shadow-[0_2px_10px_rgba(11,11,43,0.03)] hover:shadow-[0_12px_28px_rgba(86,105,232,0.1)] transition-all duration-200 p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer"
    >
      <div className="flex gap-3 sm:gap-4 items-start">
        {/* Service Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-[#F0F2F5]">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 fill-[#F1D94C] text-[#F1D94C]" />
            <span>{service.rating || 4.9}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-[#71717A] mb-0.5">
            <Clock className="w-3 h-3 text-[#5669E8]" />
            <span>{service.duration || '30-45 mins'}</span>
            {Boolean(service.reviewsCount) && (
              <>
                <span className="text-[#D1D5DB]">•</span>
                <span>{service.reviewsCount} reviews</span>
              </>
            )}
          </div>

          <h4 className="text-[14px] sm:text-[15px] font-[800] text-[#0B0B2B] group-hover:text-[#5669E8] transition-colors leading-snug line-clamp-1">
            {service.name}
          </h4>

          <p className="text-[11px] sm:text-[12px] text-[#71717A] line-clamp-2 mt-1 leading-relaxed">
            {service.shortDescription || service.description}
          </p>
        </div>
      </div>

      {/* Footer with Price and Action Buttons */}
      <div className="mt-3.5 pt-3 border-t border-[#F0F2F5] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold text-[#71717A] block uppercase tracking-wider">Starting at</span>
          <span className="text-[16px] sm:text-[17px] font-[800] text-[#0B0B2B] leading-none">
            {priceDisplay}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onViewDetails) onViewDetails(service);
            }}
            className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-[#5669E8] hover:bg-[#EEF0FF] transition-colors"
          >
            Details
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onBookNow) onBookNow(service);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#5669E8] hover:bg-[#4353c9] text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
