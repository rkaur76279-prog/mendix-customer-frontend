import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

const ESSENTIAL_SERVICES = [
  {
    id: 'burner-service',
    title: 'Burner Service',
    bgColor: '#6475E8',
    textColor: '#FFFFFF',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    price: 'from $69',
    rating: 4.9
  },
  {
    id: 'kitchen-cleaning',
    title: 'Kitchen Cleaning',
    bgColor: '#E8B77E',
    textColor: '#111111',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    price: 'from $89',
    rating: 4.95
  },
  {
    id: 'drywall-repair',
    title: 'Drywall Repair',
    bgColor: '#FF795B',
    textColor: '#FFFFFF',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    price: 'from $75',
    rating: 4.88
  },
  {
    id: 'bathroom-sanitization',
    title: 'Bathroom Sanitization',
    bgColor: '#78B3E8',
    textColor: '#111111',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80',
    price: 'from $99',
    rating: 4.97
  },
  {
    id: 'plumbing-services',
    title: 'Plumbing Services',
    bgColor: '#F1D94C',
    textColor: '#111111',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
    price: 'from $85',
    rating: 4.92
  },
  {
    id: 'electrical-services',
    title: 'Electrical Services',
    bgColor: '#F2B5D3',
    textColor: '#510D31',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    price: 'from $95',
    rating: 4.94
  },
  {
    id: 'ac-maintenance',
    title: 'AC Maintenance',
    bgColor: '#2FC493',
    textColor: '#002B1F',
    image: 'https://images.unsplash.com/photo-1631545830691-d8ec11ec5e96?auto=format&fit=crop&w=600&q=80',
    price: 'from $109',
    rating: 4.93
  }
];

export default function ServiceCarousel({ onSelectService }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6475E8] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Services</span>
          </div>
          <h2 className="text-[38px] sm:text-[48px] lg:text-[54px] font-[700] text-[#111111] leading-[1.08] tracking-tight">
            Home care<br />essentials
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <p className="text-[16px] sm:text-[17px] text-[#686975] max-w-[450px] leading-[1.6]">
            Explore Mendx home care essentials — expert cleaning, plumbing, AC maintenance, painting, and more. Fast, reliable doorstep service.
          </p>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full bg-white hover:bg-[#F0F2F5] active:scale-95 border border-[#E7E7EB] text-[#10101B] flex items-center justify-center transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full bg-[#080821] hover:bg-[#3938AD] active:scale-95 text-white flex items-center justify-center transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Row */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
      >
        {ESSENTIAL_SERVICES.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectService && onSelectService(item)}
            style={{ backgroundColor: item.bgColor }}
            className="w-[240px] sm:w-[260px] h-[330px] sm:h-[350px] rounded-[12px] p-2.5 sm:p-3 flex flex-col justify-between shrink-0 cursor-pointer group transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl relative"
          >
            {/* Service Title at Top */}
            <div className="px-1.5 pt-1 flex items-center justify-between">
              <h3 
                style={{ color: item.textColor }}
                className="text-[18px] sm:text-[20px] font-[700] tracking-tight leading-snug truncate"
              >
                {item.title}
              </h3>
              <div 
                style={{ color: item.textColor }}
                className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Large Photograph underneath */}
            <div className="w-full h-[240px] sm:h-[260px] rounded-[8px] overflow-hidden relative shadow-inner mt-2">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Bottom Tag */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <span className="bg-black/75 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  {item.price}
                </span>
                <span className="bg-white/90 backdrop-blur-md text-[#10101B] text-[10px] font-semibold px-2 py-0.5 rounded">
                  ★ {item.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
