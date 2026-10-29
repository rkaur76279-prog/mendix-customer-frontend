import React, { useState } from 'react';
import { ArrowRight, Sparkles, Gift } from 'lucide-react';

const BANNERS = [
  {
    id: 'coach',
    badge: 'New Collection',
    badgeIcon: Sparkles,
    title: 'Coach Bags\nAre Here',
    subtitle: 'Iconic leather goods crafted with American craft heritage.',
    cta: 'Shop Coach',
    ctaCategory: 'bags',
    discount: 'Up to 30% Off',
    accentColor: '#C8556A',
    bgFrom: '#FFF0F3',
    bgTo: '#FFF7F4',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'beauty',
    badge: 'Beauty Edit',
    badgeIcon: Gift,
    title: 'Glow Up\nThis Season',
    subtitle: 'Luxury makeup and skincare from the world\'s best brands.',
    cta: 'Shop Makeup',
    ctaCategory: 'makeup',
    discount: 'Free Gift ≥ $50',
    accentColor: '#7B5EA7',
    bgFrom: '#F5EFF9',
    bgTo: '#FFF7F4',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80',
  },
];

export default function MobileHeroBanner({ onShopCollection }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const banner = BANNERS[activeIdx];
  const BadgeIcon = banner.badgeIcon;

  return (
    <div className="w-full px-4 pt-3 pb-2 space-y-2">

      {/* Main Promotional Banner */}
      <div
        className="relative rounded-[22px] overflow-hidden border border-[#E9DFD2]/60 shadow-[0_4px_20px_rgba(200,85,106,0.08)]"
        style={{ background: `linear-gradient(135deg, ${banner.bgFrom} 0%, ${banner.bgTo} 100%)` }}
      >
        {/* Soft aura blobs */}
        <div
          className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-40"
          style={{ backgroundColor: banner.accentColor }}
        />
        <div className="absolute top-2 right-14 w-16 h-16 rounded-full bg-[#F4B740]/20 blur-xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-12 gap-2 items-center p-5">

          {/* Left Text & CTA (7 cols) */}
          <div className="col-span-7">
            {/* Badge pill */}
            <div
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white mb-2.5 shadow-sm"
              style={{ backgroundColor: banner.accentColor }}
            >
              <BadgeIcon className="w-3 h-3" />
              <span>{banner.badge}</span>
            </div>

            <h2 className="text-[21px] font-[800] text-[#2D1A22] leading-[1.1] tracking-tight whitespace-pre-line">
              {banner.title}
            </h2>

            <p className="text-[11px] text-[#8B6E78] mt-1.5 leading-snug line-clamp-2">
              {banner.subtitle}
            </p>

            <button
              onClick={() => onShopCollection(banner.ctaCategory)}
              className="mt-3.5 inline-flex items-center gap-1.5 h-9 px-4 text-white text-[12px] font-bold rounded-xl shadow-md transition-all active:scale-95"
              style={{
                backgroundColor: banner.accentColor,
                boxShadow: `0 4px 14px ${banner.accentColor}44`,
              }}
            >
              <span>{banner.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Product Image (5 cols) */}
          <div className="col-span-5 flex justify-center relative">
            <div className="relative w-[112px] h-[120px]">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover rounded-2xl shadow-lg rotate-2 transition-transform duration-500 hover:rotate-0"
              />
              {/* Discount pill */}
              <div
                className="absolute -bottom-1.5 -left-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold text-white shadow-sm border border-white/30"
                style={{ backgroundColor: banner.accentColor }}
              >
                {banner.discount}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="relative z-10 flex justify-center gap-1.5 pb-3">
          {BANNERS.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setActiveIdx(i)}
              className="transition-all duration-200 rounded-full"
              style={{
                width: i === activeIdx ? 20 : 6,
                height: 6,
                backgroundColor: i === activeIdx ? banner.accentColor : '#D5C8CC',
              }}
            />
          ))}
        </div>
      </div>

      {/* Quick Category Pills Row */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { label: '🛍 Coach Bags', cat: 'bags' },
          { label: '💄 Makeup', cat: 'makeup' },
          { label: '🌿 Skincare', cat: 'skincare' },
          { label: '🛁 Body Care', cat: 'body-care' },
        ].map((chip) => (
          <button
            key={chip.cat}
            onClick={() => onShopCollection(chip.cat)}
            className="shrink-0 h-8 px-3.5 bg-white border border-[#E9DFD2] rounded-full text-[11px] font-semibold text-[#5C3B47] hover:bg-[#F5DDE3] hover:border-[#C8556A] transition-all active:scale-95"
          >
            {chip.label}
          </button>
        ))}
      </div>

    </div>
  );
}
