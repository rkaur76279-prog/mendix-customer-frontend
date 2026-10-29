import React from 'react';
import Navbar from './Navbar';
import HeroSearch from './HeroSearch';
import { ShieldCheck, Star, Users, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ onOpenWaitlist, onOpenBooking, onSearchSubmit, onOpenAuth, onOpenMyBookings, onOpenAdmin }) {
  return (
    <section className="relative w-full px-3 sm:px-6 lg:px-10 pt-3 pb-8">
      {/* Outer Container */}
      <div className="relative w-full max-w-[1440px] mx-auto bg-gradient-to-b from-[#F8F9FC] via-[#EEF0FF]/40 to-[#F8F9FC] rounded-[24px] sm:rounded-[36px] overflow-hidden pb-12 sm:pb-16 border border-[#E7E7EB]/80 shadow-[0_4px_30px_rgba(86,105,232,0.04)]">
        
        {/* Navigation Bar inside top of Hero */}
        <Navbar 
          onOpenWaitlist={onOpenWaitlist} 
          onOpenBooking={onOpenBooking} 
          onOpenAuth={onOpenAuth}
          onOpenMyBookings={onOpenMyBookings}
          onOpenAdmin={onOpenAdmin}
        />

        {/* Hero Grid Container: Left Headline/Search + Right Hero Image */}
        <div className="relative z-10 px-4 sm:px-8 lg:px-12 mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (Headline, description, search input) */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E7EB] text-xs font-bold text-[#5669E8] shadow-xs w-fit mb-5">
              <ShieldCheck className="w-4 h-4 text-[#36C998]" />
              <span>India's Leading Home Services Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[34px] sm:text-[48px] lg:text-[58px] xl:text-[64px] font-[800] text-[#0B0B2B] tracking-[-0.03em] leading-[1.08] sm:leading-[1.05]">
              Expert Home Services, <br className="hidden sm:inline" />
              <span className="text-[#5669E8]">Right at Your Doorstep</span>
            </h1>

            {/* Description */}
            <p className="mt-4 sm:mt-5 text-[#71717A] text-[15px] sm:text-[17px] leading-[1.6] max-w-[580px]">
              Book trusted professionals for cleaning, repairs, plumbing, electrical work, and everyday home maintenance—all in one place.
            </p>

            {/* Location + Service Search Bar */}
            <div className="mt-6 sm:mt-8 w-full max-w-[620px]">
              <HeroSearch 
                onSearchSubmit={onSearchSubmit} 
                onSelectService={(service) => onOpenBooking(service)} 
              />
            </div>

            {/* Key Service Highlights */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs sm:text-[13px] text-[#17172B] font-semibold">
              <span className="text-[#71717A]">Quick Book:</span>
              {[
                { name: 'Deep Cleaning', cat: 'Home Cleaning' },
                { name: 'Bathroom Care', cat: 'Bathroom Cleaning' },
                { name: 'Pipe Leaks', cat: 'Plumbing Services' },
                { name: 'AC Jet Clean', cat: 'AC Installation and Repair' },
                { name: 'Salon for Women', cat: 'Salon at Home' },
              ].map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => onOpenBooking({ title: item.name, category: item.cat, price: '₹499', numericPrice: 499 })}
                  className="px-3 py-1 rounded-full bg-white hover:bg-[#5669E8] hover:text-white text-[#17172B] border border-[#E7E7EB] shadow-xs transition-all text-xs font-semibold"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-8 pt-6 border-t border-[#E7E7EB]/70 flex items-center gap-6 sm:gap-10">
              <div>
                <div className="text-[22px] sm:text-[26px] font-[800] text-[#0B0B2B]">4.9 / 5</div>
                <div className="flex items-center gap-1 text-xs text-[#71717A] mt-0.5">
                  <div className="flex text-[#F1D94C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span>(12k+ reviews)</span>
                </div>
              </div>

              <div className="h-9 w-px bg-[#E7E7EB]" />

              <div>
                <div className="text-[22px] sm:text-[26px] font-[800] text-[#0B0B2B]">50,000+</div>
                <div className="text-xs text-[#71717A] mt-0.5">Homes Serviced</div>
              </div>

              <div className="hidden sm:block h-9 w-px bg-[#E7E7EB]" />

              <div className="hidden sm:block">
                <div className="text-[22px] sm:text-[26px] font-[800] text-[#36C998]">100%</div>
                <div className="text-xs text-[#71717A] mt-0.5">Verified Pros</div>
              </div>
            </div>

          </div>

          {/* Right Column (Attractive professional home-service image with floating badges) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Background Glow */}
            <div className="absolute w-[320px] h-[320px] rounded-full bg-[#5669E8]/15 blur-3xl -z-10" />

            {/* Main Featured Image Card */}
            <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(86,105,232,0.18)] border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
                alt="Expert technician repairing modern home"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B2B]/75 via-transparent to-transparent" />

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#36C998] text-[#0B0B2B] text-xs font-bold mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certified Expert
                </div>
                <div className="text-lg font-bold">Standard 30-Day Service Guarantee</div>
                <p className="text-xs text-white/80 mt-0.5">Trained, insured, and background-checked technicians.</p>
              </div>
            </div>

            {/* Floating Top Badge */}
            <div className="absolute -top-3 -right-2 sm:-right-4 bg-white rounded-2xl p-3 shadow-[0_12px_30px_rgba(0,0,0,0.1)] border border-[#E7E7EB] flex items-center gap-3 animate-bounce duration-1000">
              <div className="w-10 h-10 rounded-xl bg-[#EEF0FF] text-[#5669E8] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B0B2B]">Fixed Upfront Pricing</div>
                <div className="text-[11px] text-[#36C998] font-semibold">No Hidden Charges</div>
              </div>
            </div>

            {/* Floating Bottom Left Badge */}
            <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white rounded-2xl p-3 shadow-[0_12px_30px_rgba(0,0,0,0.1)] border border-[#E7E7EB] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#36C998]/20 text-[#006644] flex items-center justify-center font-bold text-sm">
                60m
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B0B2B]">Express Doorstep Arrival</div>
                <div className="text-[11px] text-[#71717A]">Under 60 mins in metro areas</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
