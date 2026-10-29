import React from 'react';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Heart 
} from 'lucide-react';

export default function Footer({ onOpenWaitlist, onOpenBooking }) {
  const handleLinkClick = (e, name) => {
    e.preventDefault();
    if (name.includes('Waitlist') || name.includes('Sign Up')) {
      if (onOpenWaitlist) onOpenWaitlist();
    } else {
      if (onOpenBooking) onOpenBooking({ title: name });
    }
  };

  return (
    <footer className="w-full bg-[#080821] text-white pt-20 pb-10 px-6 sm:px-10 lg:px-16 mt-16 border-t border-white/5 relative overflow-hidden">
      
      {/* Subtle oversized Mendx initials watermark in the background */}
      <div className="absolute right-[-20px] bottom-[-20px] text-[180px] lg:text-[240px] font-black text-white/[0.02] select-none pointer-events-none leading-none">
        MENDX
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Top Branding & Social Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-14 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-[#6475E8] flex items-center justify-center text-white shadow-sm">
              <svg 
                className="w-5 h-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M4 19V5L12 13L20 5V19" 
                  stroke="currentColor" 
                  strokeWidth="2.8" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>
            <div>
              <span className="text-[28px] font-bold text-white tracking-tight leading-none block">
                Mendx
              </span>
              <span className="text-xs text-[#A3A3B5] tracking-wide">
                Premium Home Services & Verified Pro Platform
              </span>
            </div>
          </div>

          {/* Social Icons (#191932 circle, hover #6475E8) */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Mendx on Facebook"
              className="w-10 h-10 rounded-full bg-[#191932] hover:bg-[#6475E8] text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Mendx on X"
              className="w-10 h-10 rounded-full bg-[#191932] hover:bg-[#6475E8] text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Mendx on LinkedIn"
              className="w-10 h-10 rounded-full bg-[#191932] hover:bg-[#6475E8] text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Mendx on Instagram"
              className="w-10 h-10 rounded-full bg-[#191932] hover:bg-[#6475E8] text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 5 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 py-14">
          
          {/* Column 1 — Support */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[#A3A3B5] mb-5">
              Support
            </h4>
            <ul className="space-y-3 text-[15px] font-normal text-white/80">
              <li><a href="#help" onClick={(e) => handleLinkClick(e, 'Help & Support')} className="hover:text-white transition-colors">Help & Support</a></li>
              <li><a href="#terms" onClick={(e) => handleLinkClick(e, 'Terms of Use')} className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#privacy" onClick={(e) => handleLinkClick(e, 'Privacy Policy')} className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#info" onClick={(e) => handleLinkClick(e, 'More Information')} className="hover:text-white transition-colors">More Information</a></li>
            </ul>
          </div>

          {/* Column 2 — About */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[#A3A3B5] mb-5">
              About
            </h4>
            <ul className="space-y-3 text-[15px] font-normal text-white/80">
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#blog" onClick={(e) => handleLinkClick(e, 'Blog & News')} className="hover:text-white transition-colors">Blog & News</a></li>
              <li><a href="#partnerships" onClick={(e) => handleLinkClick(e, 'Partnerships')} className="hover:text-white transition-colors">Partnerships</a></li>
              <li><a href="#investors" onClick={(e) => handleLinkClick(e, 'Investor Relations')} className="hover:text-white transition-colors">Investor Relations</a></li>
            </ul>
          </div>

          {/* Column 3 — Why Mendx */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[#A3A3B5] mb-5">
              Why Mendx
            </h4>
            <ul className="space-y-3 text-[15px] font-normal text-white/80">
              <li><a href="#stories" onClick={(e) => handleLinkClick(e, 'Success Stories')} className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#founding" onClick={(e) => handleLinkClick(e, 'Founding Stories')} className="hover:text-white transition-colors">Founding Stories</a></li>
              <li><a href="#tips" onClick={(e) => handleLinkClick(e, 'Tips and Guide')} className="hover:text-white transition-colors">Tips and Guide</a></li>
              <li><a href="#faq" onClick={(e) => handleLinkClick(e, 'FAQ')} className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#mission" onClick={(e) => handleLinkClick(e, 'Mission')} className="hover:text-white transition-colors">Mission</a></li>
              <li><a href="#career" onClick={(e) => handleLinkClick(e, 'Career')} className="hover:text-white transition-colors">Career</a></li>
            </ul>
          </div>

          {/* Column 4 — Professionals */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[#A3A3B5] mb-5">
              Professionals
            </h4>
            <ul className="space-y-3 text-[15px] font-normal text-white/80">
              <li><a href="#pro" onClick={(e) => handleLinkClick(e, 'Mendx Pro')} className="hover:text-white transition-colors">Mendx Pro</a></li>
              <li><a href="#how" onClick={(e) => handleLinkClick(e, 'How It Works')} className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#fees" onClick={(e) => handleLinkClick(e, 'Fee and Commission')} className="hover:text-white transition-colors">Fee and Commission</a></li>
              <li><a href="#rewards" onClick={(e) => handleLinkClick(e, 'Referral and Reward')} className="hover:text-white transition-colors">Referral and Reward</a></li>
              <li><a href="#communities" onClick={(e) => handleLinkClick(e, 'Communities')} className="hover:text-white transition-colors">Communities</a></li>
              <li><a href="#mobile" onClick={(e) => handleLinkClick(e, 'Mobile App')} className="hover:text-white transition-colors">Mobile App</a></li>
            </ul>
          </div>

          {/* Column 5 — Customers */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[#A3A3B5] mb-5">
              Customers
            </h4>
            <ul className="space-y-3 text-[15px] font-normal text-white/80">
              <li><a href="#customer-how" onClick={(e) => handleLinkClick(e, 'How Mendx Works')} className="hover:text-white transition-colors">How Mendx Works</a></li>
              <li><a href="#signup" onClick={(e) => handleLinkClick(e, 'Sign Up')} className="hover:text-white transition-colors">Sign Up</a></li>
              <li><a href="#download" onClick={(e) => handleLinkClick(e, 'Download App')} className="hover:text-white transition-colors">Download App</a></li>
              <li><a href="#nearby" onClick={(e) => handleLinkClick(e, 'Nearby Jobs')} className="hover:text-white transition-colors">Nearby Jobs</a></li>
              <li><a href="#estimates" onClick={(e) => handleLinkClick(e, 'Cost Estimates')} className="hover:text-white transition-colors">Cost Estimates</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Brand Card & Legal Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Small "Visit Website" Brand Card */}
          <div className="flex items-center gap-3 bg-[#191932] px-4 py-2 rounded-xl border border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2FC493]" />
            <span className="text-xs font-semibold text-white">Mendx Platform v2.4 Live</span>
            <a 
              href="/" 
              className="text-xs text-[#6475E8] hover:text-white flex items-center gap-1 font-semibold ml-2"
            >
              <span>Visit website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="text-xs text-[#A3A3B5] text-center md:text-right">
            <p>© {new Date().getFullYear()} Mendx Technologies Inc. All rights reserved.</p>
            <p className="mt-1 text-[11px] text-white/40">
              Licensed, bonded, and insured home maintenance network across 48 metropolitan regions.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
