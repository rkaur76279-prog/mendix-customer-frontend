import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TESTIMONIALS_DATA = [
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    location: 'Chicago, IL',
    service: 'Home Office Electrical Setup',
    quote: 'I needed an electrical fix for my home office, and Mendx did it in just 1 hour. The process was super easy, and everything works perfectly!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    location: 'Austin, TX',
    service: 'Custom Shelving & Storage',
    quote: 'From booking through the app to having our custom pantry shelving installed in under three hours — Mendx exceeded all my expectations for home craftsmanship.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    location: 'Seattle, WA',
    service: 'Smart Thermostat & Climate Tuning',
    quote: 'Our smart thermostat installation was seamless. The pro verified our dual-zone HVAC system and even showed us how to optimize temperature schedules to cut energy costs.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'david-miller',
    name: 'David Miller',
    location: 'Denver, CO',
    service: 'Emergency Pipe Leak Detection',
    quote: 'A basement pipe started hissing on a Sunday evening. Within 40 minutes, a certified Mendx technician arrived with acoustic gear and sealed the pressure valve cleanly.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const current = TESTIMONIALS_DATA[currentIndex];

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnimating]);

  return (
    <section id="testimonials-section" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
      
      {/* Section Heading */}
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-[26px] sm:text-[32px] md:text-[34px] font-[600] text-[#111111] tracking-tight flex items-center justify-center gap-2">
          <span>✦</span>
          <span>People like you trust our service</span>
          <span>✦</span>
        </h2>
      </div>

      {/* Large Midnight Navy Testimonial Panel */}
      <div className="bg-[#080821] rounded-[16px] sm:rounded-[20px] p-6 sm:p-10 lg:p-12 min-h-[440px] relative overflow-hidden shadow-[0_20px_50px_rgba(8,8,33,0.3)]">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6475E8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Portrait with overlapping pink & indigo decorative panels */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-[240px] sm:w-[270px] h-[300px] sm:h-[330px]">
              
              {/* Overlapping Pink Decorative Panel */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-full h-full rounded-[16px] bg-[#F2B5D3] -rotate-3 transition-transform duration-500 ease-out" />
              
              {/* Overlapping Indigo Decorative Panel */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full rounded-[16px] bg-[#6475E8] rotate-2 transition-transform duration-500 ease-out" />

              {/* Main Portrait Card */}
              <div className={`relative w-full h-full rounded-[14px] overflow-hidden shadow-xl border-2 border-white/20 transition-opacity duration-300 ${isAnimating ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}`}>
                <img 
                  src={current.image} 
                  alt={current.name} 
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Verified client pill */}
                <div className="absolute bottom-3 left-3 bg-[#080821]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-[#8BECC0]" />
                  Verified Customer
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quote, Name, Location & Carousel Controls */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full pt-4 lg:pt-0">
            
            {/* Rating Stars & Service Tag */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1 text-[#F1D94C]">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F1D94C]" />
                ))}
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-[#8BECC0] border border-white/10">
                {current.service}
              </span>
            </div>

            {/* Testimonial Quote in white */}
            <div className={`relative transition-all duration-300 ${isAnimating ? 'opacity-40 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <Quote className="w-10 h-10 text-[#6475E8]/40 mb-3" />
              <blockquote className="text-white text-[22px] sm:text-[26px] lg:text-[29px] font-normal leading-[1.38] tracking-tight">
                "{current.quote}"
              </blockquote>
            </div>

            {/* Customer Name, Location & Carousel Controls Row */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h3 className="text-white text-[28px] sm:text-[34px] font-[700] tracking-tight leading-none">
                  {current.name}
                </h3>
                <p className="text-[#A3A3B5] text-[18px] sm:text-[22px] font-normal mt-1">
                  {current.location}
                </p>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-medium text-[#A3A3B5] mr-2">
                  0{currentIndex + 1} / 0{TESTIMONIALS_DATA.length}
                </span>

                {/* Previous Button (dark gray-purple) */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-[48px] h-[48px] rounded-full bg-[#1F1E38] hover:bg-[#2A294C] active:scale-95 text-white flex items-center justify-center transition-all duration-200 border border-white/10 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Button (#6475E8) */}
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-[48px] h-[48px] rounded-full bg-[#6475E8] hover:bg-[#3938AD] active:scale-95 text-white flex items-center justify-center transition-all duration-200 shadow-[0_4px_16px_rgba(100,117,232,0.4)]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
