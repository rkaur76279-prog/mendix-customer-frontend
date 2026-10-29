import React from 'react';
import { ArrowRight, Star, Clock, Sparkles } from 'lucide-react';

const FALLBACK_POPULAR = [
  {
    _id: 'pop-1',
    name: 'Full Home Deep Cleaning',
    title: 'Full Home Deep Cleaning',
    category: 'Home Cleaning',
    description: 'Mechanized floor scrubbing, sanitization, cobweb removal, and balcony cleaning.',
    price: '₹1,499',
    numericPrice: 1499,
    duration: '4-5 hrs',
    rating: 4.92,
    reviewsCount: 384,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    tag: 'Bestseller',
  },
  {
    _id: 'pop-2',
    name: 'Bathroom Deep Cleaning & Sanitization',
    title: 'Bathroom Deep Cleaning & Sanitization',
    category: 'Bathroom Cleaning',
    description: 'Stubborn hard-water descaling, steam sanitation, fixture polish & anti-bacterial scrub.',
    price: '₹499',
    numericPrice: 499,
    duration: '1-2 hrs',
    rating: 4.89,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80',
    tag: 'High Demand',
  },
  {
    _id: 'pop-3',
    name: 'Modular Kitchen Deep Degreasing',
    title: 'Modular Kitchen Deep Degreasing',
    category: 'Kitchen Cleaning',
    description: 'Exhaust, chimney filter, tile backsplash, gas range, and cabinet deep grease removal.',
    price: '₹899',
    numericPrice: 899,
    duration: '2-3 hrs',
    rating: 4.94,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    tag: 'Top Rated',
  },
  {
    _id: 'pop-4',
    name: 'Leak Detection & Pipe Repair',
    title: 'Leak Detection & Pipe Repair',
    category: 'Plumbing Services',
    description: 'Acoustic pipe inspection, tap & valve fixes, concealed leak sealing, and drain clearing.',
    price: '₹299',
    numericPrice: 299,
    duration: '1-2 hrs',
    rating: 4.88,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
    tag: 'Fast Response',
  },
];

export default function PopularServices({ services = [], onSelectService, onExploreAll }) {
  const displayServices = services && services.length >= 4 
    ? services.slice(0, 4) 
    : FALLBACK_POPULAR;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
        <div className="max-w-[580px]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF0FF] text-[#5669E8] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#5669E8]" />
            <span>Most Booked Services</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] font-[800] text-[#0B0B2B] tracking-tight leading-tight">
            Popular Home Services
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#71717A] mt-2">
            Top rated by 50,000+ happy households across the nation. Book online with instant confirmation.
          </p>
        </div>

        <button
          onClick={onExploreAll}
          className="inline-flex items-center gap-2 h-11 px-5 bg-[#0B0B2B] hover:bg-[#5669E8] active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-200 shrink-0 group shadow-sm self-start lg:self-auto"
        >
          <span>View All Services</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayServices.map((service) => {
          const serviceTitle = service.name || service.title;
          const displayPrice = service.price 
            ? (service.price.startsWith('₹') ? service.price : `₹${service.numericPrice || service.price}`) 
            : `₹${service.numericPrice || 499}`;

          return (
            <div
              key={service._id || service.id || serviceTitle}
              onClick={() => onSelectService(service)}
              className="bg-white rounded-[22px] border border-[#E7E7EB] overflow-hidden shadow-[0_4px_24px_rgba(11,11,43,0.04)] hover:shadow-[0_16px_36px_rgba(86,105,232,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Image banner */}
              <div className="relative w-full h-48 bg-[#F8F9FC] overflow-hidden">
                <img
                  src={service.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'}
                  alt={serviceTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-[#F1D94C] text-[#F1D94C]" />
                  <span className="text-xs font-bold text-[#0B0B2B]">{service.rating || 4.9}</span>
                  {service.reviewsCount && (
                    <span className="text-[10px] text-[#71717A]">({service.reviewsCount})</span>
                  )}
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
                  <Clock className="w-3 h-3 text-[#36C998]" />
                  <span>{service.duration || '1-2 hrs'}</span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#5669E8] uppercase tracking-wider mb-1 block">
                    {service.category || 'Home Service'}
                  </span>
                  <h3 className="text-[18px] font-bold text-[#17172B] group-hover:text-[#5669E8] transition-colors leading-snug">
                    {serviceTitle}
                  </h3>
                  <p className="text-[13px] text-[#71717A] mt-1.5 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Price and Book Now button */}
                <div className="pt-4 mt-4 border-t border-[#F0F2F5] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#71717A] block leading-none">Price</span>
                    <span className="text-[19px] font-[800] text-[#0B0B2B]">{displayPrice}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(service);
                    }}
                    className="h-9 px-4 rounded-xl bg-[#5669E8] hover:bg-[#3938AD] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
