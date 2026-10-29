import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function StatsSection({ onCardClick }) {
  const handleClick = (topic) => {
    if (onCardClick) onCardClick(topic);
  };

  return (
    <section id="stats-section" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
      
      {/* 2-Column Multi-Row Grid with ~8px gaps */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-2.5">
        
        {/* ROW 1 - LEFT: Warm off-white editorial card (#F5EFE8) - 5 cols */}
        <div 
          onClick={() => handleClick('Speed and Reliability')}
          className="md:col-span-5 bg-[#F5EFE8] rounded-[14px] sm:rounded-[16px] p-6 sm:p-8 flex flex-col justify-between min-h-[290px] sm:min-h-[340px] cursor-pointer group transition-all duration-300 hover:shadow-md"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#686975] block mb-4">
              Our Core Promise
            </span>
            <h3 className="text-[34px] sm:text-[40px] lg:text-[42px] font-[600] text-[#111111] leading-[1.12] tracking-tight">
              The secret to happy customers? Speed and reliability.
            </h3>
          </div>

          <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between">
            <span className="text-[15px] sm:text-[16px] font-medium text-[#111111]">
              Instant service, every time
            </span>
            <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* ROW 1 - RIGHT: Wide indigo statistics card (#3938AD) - 7 cols */}
        <div 
          onClick={() => handleClick('Cities Served')}
          className="md:col-span-7 bg-[#3938AD] rounded-[14px] sm:rounded-[16px] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[290px] sm:min-h-[340px] cursor-pointer group shadow-sm"
        >
          {/* Decorative Mint Curved Shapes in background (#8BECC0) */}
          <div className="absolute -right-8 -top-8 w-60 h-60 rounded-full bg-[#8BECC0]/25 blur-sm pointer-events-none transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute right-12 bottom-0 w-44 h-44 rounded-full bg-[#8BECC0]/40 pointer-events-none" />
          
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8BECC0]">
              Nationwide Expansion
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#3938AD] transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="relative z-10 my-auto">
            <div className="text-white text-[100px] sm:text-[135px] lg:text-[155px] font-[750] leading-none tracking-tight select-none">
              48
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-white/95 text-[17px] sm:text-[19px] font-medium max-w-[420px] leading-snug">
              That's how many cities we're serving (and counting!)
            </p>
          </div>
        </div>

        {/* ROW 2 - LEFT: Coral statistics card (#FF795B) - 6 cols */}
        <div 
          onClick={() => handleClick('24/7 Availability')}
          className="md:col-span-6 bg-[#FF795B] rounded-[14px] sm:rounded-[16px] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[280px] sm:min-h-[320px] cursor-pointer group shadow-sm"
        >
          {/* Large Translucent Curved Decorative Shape */}
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/20 pointer-events-none transition-transform duration-500 group-hover:scale-105" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-black/75">
              Round the Clock
            </span>
            <div className="w-8 h-8 rounded-full bg-black/10 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="relative z-10 my-auto py-2">
            <div className="text-black text-[90px] sm:text-[120px] lg:text-[140px] font-[750] leading-none tracking-tight select-none">
              24/7
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-black text-[17px] sm:text-[19px] font-medium leading-snug">
              Available anytime, anywhere you need us.
            </p>
          </div>
        </div>

        {/* ROW 2 - RIGHT: Pink statistics card (#F2B5D3) - 6 cols */}
        <div 
          onClick={() => handleClick('Homes Revitalized')}
          className="md:col-span-6 bg-[#F2B5D3] rounded-[14px] sm:rounded-[16px] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[280px] sm:min-h-[320px] cursor-pointer group shadow-sm"
        >
          {/* Subtle Oversized Pink/Peach Decorative Shape */}
          <div className="absolute -left-12 -bottom-12 w-80 h-80 rounded-full bg-[#FF795B]/20 pointer-events-none transition-transform duration-500 group-hover:scale-105" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#510D31]">
              Proven Track Record
            </span>
            <div className="w-8 h-8 rounded-full bg-black/10 text-black flex items-center justify-center group-hover:bg-[#510D31] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="relative z-10 my-auto py-2">
            <div className="text-black text-[90px] sm:text-[115px] lg:text-[135px] font-[750] leading-none tracking-tight select-none">
              2K+
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-black text-[17px] sm:text-[19px] font-medium leading-snug">
              Homes Revitalized with high-touch craftsmanship.
            </p>
          </div>
        </div>

        {/* ROW 3 - LEFT: Wide Mint-Green message card (#2FC493) - 7 cols */}
        <div 
          onClick={() => handleClick('Service Quality')}
          className="md:col-span-7 bg-[#2FC493] rounded-[14px] sm:rounded-[16px] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[270px] sm:min-h-[310px] cursor-pointer group shadow-sm"
        >
          {/* Indigo abstract corner shapes */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-3xl bg-[#3938AD]/20 rotate-12 pointer-events-none transition-transform duration-500 group-hover:rotate-45" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#3938AD]/15 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#003D2E]">
              Quality Assurance
            </span>
            <div className="w-8 h-8 rounded-full bg-black/10 text-[#001D16] flex items-center justify-center group-hover:bg-[#001D16] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="relative z-10 my-auto py-4">
            <h3 className="text-[#001D16] text-[32px] sm:text-[40px] lg:text-[44px] font-[600] leading-[1.14] tracking-tight max-w-[500px]">
              Top-rated pros, fast response, & fair pricing
            </h3>
          </div>

          <div className="relative z-10">
            <span className="text-xs font-semibold text-[#003D2E] uppercase tracking-wider">
              No hidden fees · Upfront quotes · Licensed & insured
            </span>
          </div>
        </div>

        {/* ROW 3 - RIGHT: Burgundy trust card (#510D31) - 5 cols */}
        <div 
          onClick={() => handleClick('Trust and Safety')}
          className="md:col-span-5 bg-[#510D31] rounded-[14px] sm:rounded-[16px] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[270px] sm:min-h-[310px] cursor-pointer group shadow-sm"
        >
          {/* Large Coral curved shape near right edge */}
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-52 h-52 rounded-full bg-[#FF795B]/40 blur-xs pointer-events-none transition-transform duration-500 group-hover:scale-110" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF795B]">
              Safety First
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:bg-[#FF795B] group-hover:text-[#510D31] transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="relative z-10 my-auto py-3">
            <h3 className="text-white text-[34px] sm:text-[42px] lg:text-[46px] font-[650] leading-[1.1] tracking-tight">
              Trust over<br />Everything
            </h3>
          </div>

          <div className="relative z-10">
            <p className="text-white/85 text-[16px] sm:text-[18px] font-normal leading-relaxed">
              Safety-first approach<br />
              <span className="text-[#FF795B] font-semibold">Verified pros only</span>
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
