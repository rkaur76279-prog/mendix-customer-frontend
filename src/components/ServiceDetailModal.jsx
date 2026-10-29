import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const SAMPLE_SLOTS = [
  'Today, 02:00 PM - 04:00 PM',
  'Today, 05:00 PM - 07:00 PM',
  'Tomorrow, 10:00 AM - 12:00 PM',
  'Tomorrow, 02:00 PM - 04:00 PM',
];

export default function ServiceDetailModal({
  service,
  isOpen,
  onClose,
  onBookNow,
  userLocation = 'Mumbai',
}) {
  const [selectedSlot, setSelectedSlot] = useState(SAMPLE_SLOTS[0]);

  if (!isOpen || !service) return null;

  const priceDisplay = service.price
    ? (typeof service.price === 'number' ? `₹${service.price}` : service.price)
    : `₹${service.numericPrice || 499}`;

  const handleBook = () => {
    onClose();
    if (onBookNow) {
      onBookNow({
        ...service,
        title: service.title || service.name,
        preferredSlot: selectedSlot,
        price: priceDisplay,
        numericPrice: service.numericPrice || (typeof service.price === 'number' ? service.price : 499),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[92vh] bg-white rounded-[24px] sm:rounded-[28px] shadow-2xl overflow-hidden flex flex-col border border-[#E7E7EB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Service Hero */}
        <div className="relative aspect-[16/7] w-full bg-slate-100 overflow-hidden shrink-0">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Overlay titles */}
          <div className="absolute bottom-3.5 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-[#5669E8] text-[10px] font-bold uppercase tracking-wider">
                {service.subcategoryName || service.categoryName || 'Mendx Verified'}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-semibold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-md">
                <Star className="w-3 h-3 fill-[#F1D94C] text-[#F1D94C]" />
                <span>{service.rating || 4.9}</span>
                <span className="text-white/80">({service.reviewsCount || 200}+ reviews)</span>
              </div>
            </div>

            <h3 className="text-[20px] sm:text-[22px] font-[800] leading-tight">
              {service.name}
            </h3>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Price, Duration, and Location Banner */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F9FC] border border-[#E7E7EB]">
            <div>
              <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider block">Standard Price</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[22px] font-[800] text-[#0B0B2B]">{priceDisplay}</span>
                <span className="text-[11px] text-[#71717A]">inclusive of taxes</span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-xs font-semibold text-[#17172B]">
                <Clock className="w-3.5 h-3.5 text-[#5669E8]" />
                <span>{service.duration || '45 mins'}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#71717A] mt-0.5">
                <MapPin className="w-3 h-3 text-[#36C998]" />
                <span>{userLocation} doorstep</span>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h4 className="text-[14px] font-[800] text-[#0B0B2B] mb-1.5">
              Service Overview
            </h4>
            <p className="text-[13px] text-[#4A4A68] leading-relaxed">
              {service.fullDescription || service.description || service.shortDescription}
            </p>
          </div>

          {/* What's Included */}
          {Boolean(service.included && service.included.length > 0) && (
            <div>
              <h4 className="text-[14px] font-[800] text-[#0B0B2B] mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#36C998]" />
                <span>What's Included</span>
              </h4>
              <ul className="space-y-1.5 bg-[#EBFBF5]/50 border border-[#36C998]/20 p-3.5 rounded-2xl">
                {service.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#17172B]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#36C998] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What's Not Included */}
          {Boolean(service.notIncluded && service.notIncluded.length > 0) && (
            <div>
              <h4 className="text-[14px] font-[800] text-[#0B0B2B] mb-2 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-[#71717A]" />
                <span>What's Not Included</span>
              </h4>
              <ul className="space-y-1.5 bg-[#F8F9FC] border border-[#E7E7EB] p-3.5 rounded-2xl">
                {service.notIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#71717A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A1A1AA] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Slot Selection Preview */}
          <div>
            <h4 className="text-[14px] font-[800] text-[#0B0B2B] mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#5669E8]" />
              <span>Select Preferred Time Slot</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                    selectedSlot === slot
                      ? 'border-[#5669E8] bg-[#EEF0FF] text-[#5669E8] font-bold'
                      : 'border-[#E7E7EB] bg-white text-[#17172B] hover:border-[#5669E8]/30'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Mendx Assurance */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#EEF0FF] to-white border border-[#5669E8]/20 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#5669E8] shrink-0" />
            <div className="text-[11px] text-[#4A4A68]">
              <strong className="text-[#0B0B2B]">30-Day Reservice Guarantee:</strong> Free rework or full refund if you are not 100% delighted.
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer with Book Now Button */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E7E7EB] flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[11px] text-[#71717A] block leading-none">Total Payable</span>
            <span className="text-[20px] font-[800] text-[#0B0B2B] leading-tight">{priceDisplay}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#71717A] hover:bg-[#F8F9FC] transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleBook}
              className="px-6 py-2.5 rounded-xl bg-[#5669E8] hover:bg-[#4353c9] text-white text-xs font-[800] shadow-md shadow-[#5669E8]/20 flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
