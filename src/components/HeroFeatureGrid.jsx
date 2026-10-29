import React from 'react';
import { ArrowUpRight, Star, Heart } from 'lucide-react';

export default function HeroFeatureGrid({ onSelectCard }) {
  const handleCardClick = (title) => {
    if (onSelectCard) {
      onSelectCard({ title });
    }
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-3.5">
        
        {/* Left Column (approx 47% -> 5.5 cols or 6 cols on md) */}
        <div 
          onClick={() => handleCardClick('Skilled Handyman & Carpentry')}
          className="md:col-span-6 lg:col-span-6 relative h-[360px] sm:h-[420px] lg:h-[460px] rounded-[16px] sm:rounded-[18px] overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(8,8,33,0.06)]"
        >
          <img 
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80" 
            alt="Skilled Expert in Workshop" 
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          {/* Subtle bottom gradient overlay for typography readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080821]/85 via-[#080821]/30 to-transparent" />

          {/* Top pro badge */}
          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8BECC0] animate-pulse" />
            Verified Workshop Pro
          </div>

          {/* Bottom Headline and Action */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <h3 className="text-white text-[24px] sm:text-[28px] font-semibold tracking-tight leading-tight">
              Skilled Experts,<br />Reliable Service
            </h3>

            {/* Circular Arrow Button */}
            <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-[#6475E8] border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>

        {/* Center Column (approx 29% -> 3.5 cols on md) */}
        <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-3 sm:gap-3.5">
          
          {/* Center Upper Card: Pro with Customer */}
          <div 
            onClick={() => handleCardClick('Instant Booking Support')}
            className="relative h-[210px] sm:h-[240px] lg:h-[265px] rounded-[16px] sm:rounded-[18px] overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(8,8,33,0.06)]"
          >
            <img 
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" 
              alt="Service pro interacting with customer" 
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080821]/85 via-[#080821]/25 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <h3 className="text-white text-[19px] sm:text-[22px] font-semibold tracking-tight leading-tight">
                Fast Booking,<br />Instant Help
              </h3>

              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-[#6475E8] border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>

          {/* Center Lower Card: Customer Satisfaction Statistics */}
          <div 
            onClick={() => handleCardClick('Customer Reviews & Ratings')}
            className="relative h-[140px] sm:h-[165px] lg:h-[181px] rounded-[16px] sm:rounded-[18px] bg-[#6475E8] p-5 flex flex-col justify-between group cursor-pointer shadow-[0_6px_22px_rgba(100,117,232,0.25)] transition-all duration-300 hover:bg-[#3938AD]"
          >
            <div className="flex items-center justify-between">
              {/* Avatars */}
              <div className="flex -space-x-2">
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                  alt="Customer avatar" 
                />
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" 
                  alt="Customer avatar" 
                />
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" 
                  alt="Customer avatar" 
                />
              </div>

              {/* Mint star badge */}
              <div className="flex items-center gap-1 bg-[#8BECC0] text-[#00462F] px-2.5 py-0.5 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-[#00462F]" />
                <span>4.9 / 5</span>
              </div>
            </div>

            <div>
              <div className="text-white text-[38px] sm:text-[44px] font-bold leading-none tracking-tight">
                98%
              </div>
              <div className="text-[#8BECC0] text-xs sm:text-[13px] font-medium tracking-wide mt-1">
                Customer satisfaction rate
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (approx 24% -> 3 cols on md) */}
        <div 
          onClick={() => handleCardClick('On-Demand Certified Repair')}
          className="md:col-span-3 lg:col-span-3 relative h-[360px] sm:h-[420px] lg:h-[460px] rounded-[16px] sm:rounded-[18px] overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(8,8,33,0.06)]"
        >
          <img 
            src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80" 
            alt="Professional performing home repair" 
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080821]/85 via-[#080821]/30 to-transparent" />

          {/* Top guarantee tag */}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/25 px-2.5 py-1 rounded-full text-white text-[11px] font-semibold flex items-center gap-1">
            <Heart className="w-3 h-3 text-[#FF795B] fill-[#FF795B]" />
            Mendx Guarantee
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <h3 className="text-white text-[22px] sm:text-[25px] font-semibold tracking-tight leading-tight">
              Safe, Easy,<br />On Demand
            </h3>

            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-[#6475E8] border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
