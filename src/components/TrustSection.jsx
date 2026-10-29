import React from 'react';
import { ShieldCheck, Award, CheckCircle2, ArrowRight } from 'lucide-react';

const TRUST_CARDS = [
  {
    id: 'trust-always',
    title: 'Trust Mendx Always',
    description: 'Build peace of mind with our trusted home service experts who prioritize your satisfaction and safety in every task.',
    icon: ShieldCheck,
    iconColor: '#2FC493',
    iconBg: '#2FC4931A',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    tag: '100% Insured & Bonded'
  },
  {
    id: 'expertise-needed',
    title: 'Expertise You Need',
    description: 'Benefit from skilled professionals with deep expertise to handle all your home tasks efficiently and expertly.',
    icon: Award,
    iconColor: '#6475E8',
    iconBg: '#6475E81A',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
    tag: 'Master Certified Pros'
  },
  {
    id: 'reliability-every-time',
    title: 'Reliability Every Time',
    description: 'Count on our reliable team to deliver timely, consistent, and high-quality service every time you need us.',
    icon: CheckCircle2,
    iconColor: '#FF795B',
    iconBg: '#FF795B1A',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    tag: 'On-Time Guaranteed'
  }
];

export default function TrustSection({ onSelectCard, onOpenWaitlist }) {
  return (
    <section id="trust-section" className="w-full bg-[#080821] py-16 sm:py-20 lg:py-24 text-white">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main Heading */}
        <div className="text-center max-w-[680px] mx-auto mb-14 sm:mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#8BECC0] mb-3">
            Why Homeowners Choose Mendx
          </span>
          <h2 className="text-[38px] sm:text-[48px] lg:text-[54px] font-[600] text-white leading-[1.08] tracking-tight">
            We treat your home like our own.
          </h2>
        </div>

        {/* Three Trust Cards in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {TRUST_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onSelectCard && onSelectCard({ title: card.title })}
                className="bg-white rounded-[14px] p-6 sm:p-7 min-h-[390px] sm:min-h-[410px] text-[#10101B] flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <div>
                  {/* Card Icon */}
                  <div 
                    style={{ backgroundColor: card.iconBg, color: card.iconColor }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  >
                    <Icon className="w-7 h-7 stroke-[2.2]" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-[28px] sm:text-[32px] font-[700] text-[#10101B] tracking-tight leading-snug mb-3.5">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-[16px] text-[#686975] leading-[1.55]">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Cropped Equipment Image Strip */}
                <div className="mt-8">
                  <div className="h-[60px] rounded-[8px] overflow-hidden relative shadow-inner">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-1.5 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-[#10101B]">
                      {card.tag}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Supporting Area */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="md:col-span-7">
            <p className="text-[20px] sm:text-[23px] text-white/90 font-normal leading-[1.5] max-w-[620px]">
              Reliable, skilled, and efficient—our experts ensure every home task is completed perfectly, saving you time and hassle.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={onOpenWaitlist}
                className="inline-flex items-center gap-2 px-6 h-11 bg-[#6475E8] hover:bg-[#3938AD] text-white text-sm font-semibold rounded-lg transition-all shadow-md group"
              >
                <span>Get Mendx Coverage</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-xs text-[#A3A3B5]">Zero upfront commitment</span>
            </div>
          </div>

          {/* Right Supporting Illustration (Person with Laptop) */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-[220px] sm:w-[260px] opacity-95">
              <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-lg">
                <circle cx="120" cy="100" r="85" fill="#3938AD" fillOpacity="0.4" />
                {/* Desk Base */}
                <rect x="20" y="150" width="200" height="12" rx="6" fill="#191932" />
                {/* Character */}
                <rect x="80" y="75" width="80" height="80" rx="24" fill="#6475E8" />
                <circle cx="120" cy="45" r="26" fill="#FFC9A2" />
                <path d="M94 40C98 20 142 20 146 40C140 32 130 30 120 30C110 30 100 32 94 40Z" fill="#F1D94C" />
                {/* Laptop on desk */}
                <polygon points="75,150 165,150 155,105 85,105" fill="#FFFFFF" stroke="#8BECC0" strokeWidth="3" />
                <polygon points="80,147 160,147 152,110 88,110" fill="#080821" />
                {/* Mendx screen check */}
                <path d="M112 128L118 134L128 124" stroke="#8BECC0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Check pill */}
                <g transform="translate(145, 60)">
                  <rect width="60" height="28" rx="8" fill="#FFFFFF" />
                  <circle cx="14" cy="14" r="6" fill="#2FC493" />
                  <path d="M11 14L13 16L17 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="25" y1="14" x2="50" y2="14" stroke="#080821" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
