import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  Menu, 
  X, 
  Wrench, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Droplet, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  User, 
  LogOut, 
  Calendar, 
  ShieldAlert,
  CalendarCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenWaitlist, onOpenBooking, onOpenAuth, onOpenMyBookings, onOpenAdmin }) {
  const { user, isAuthenticated, logout, isAdmin, isWorker } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleBookServiceClick = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onOpenBooking) {
      onOpenBooking({ title: 'Full Home Deep Cleaning', category: 'Home Cleaning', price: '₹1,499', numericPrice: 1499 });
    }
  };

  const handleServiceSelect = (serviceTitle, category, price, numericPrice) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onOpenBooking) {
      onOpenBooking({ title: serviceTitle, category, price, numericPrice });
    }
  };

  return (
    <header className="relative w-full z-50 pt-3 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto" ref={navRef}>
      <nav 
        className="bg-white/90 backdrop-blur-md h-[72px] sm:h-[80px] rounded-[20px] px-4 sm:px-8 flex items-center justify-between shadow-[0_4px_20px_rgba(11,11,43,0.04)] border border-[#E7E7EB] transition-all duration-300"
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <a 
          href="/" 
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#5669E8] rounded-lg p-1"
          aria-label="Mendx Home"
        >
          <div className="w-9 h-9 rounded-[11px] bg-[#5669E8] flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
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
          <span className="text-[24px] sm:text-[26px] font-[800] text-[#0B0B2B] tracking-tight leading-none">
            Mendx
          </span>
        </a>

        {/* Desktop Navigation Links: Home, Services, About Us, Contact, My Bookings */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <a
            href="/"
            className="px-3.5 py-2 rounded-xl text-[14px] font-semibold text-[#17172B] hover:text-[#5669E8] hover:bg-[#EEF0FF]/50 transition-colors"
          >
            Home
          </a>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('services')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[14px] font-semibold transition-colors ${
                activeDropdown === 'services' 
                  ? 'text-[#5669E8] bg-[#EEF0FF]' 
                  : 'text-[#17172B] hover:text-[#5669E8] hover:bg-[#EEF0FF]/50'
              }`}
            >
              <span>Services</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'services' ? 'rotate-180 text-[#5669E8]' : 'text-[#71717A]'
                }`} 
              />
            </button>

            {activeDropdown === 'services' && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-[420px] bg-white rounded-[20px] p-4 shadow-[0_16px_40px_rgba(11,11,43,0.12)] border border-[#E7E7EB] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-xs font-bold uppercase tracking-wider text-[#71717A] px-3 pb-2 border-b border-[#F0F2F5] flex items-center justify-between">
                  <span>5 Primary Home Categories</span>
                  <a href="/services" className="text-[#5669E8] text-[11px] font-bold hover:underline">View All</a>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a 
                    href="/services/electrician"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-[#F8F9FC] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EEF0FF] text-[#5669E8] flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#17172B] group-hover:text-[#5669E8]">Electrician</div>
                      <div className="text-[11px] text-[#71717A]">From ₹249</div>
                    </div>
                  </a>

                  <a 
                    href="/services/plumber"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-[#F8F9FC] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EBFBF5] text-[#36C998] flex items-center justify-center shrink-0">
                      <Droplet className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#17172B] group-hover:text-[#5669E8]">Plumber</div>
                      <div className="text-[11px] text-[#71717A]">From ₹299</div>
                    </div>
                  </a>

                  <a 
                    href="/services/salon"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-[#F8F9FC] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EEF0FF] text-[#5669E8] flex items-center justify-center shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#17172B] group-hover:text-[#5669E8]">Salon & Beauty</div>
                      <div className="text-[11px] text-[#71717A]">From ₹499</div>
                    </div>
                  </a>

                  <a 
                    href="/services/bathroom"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-[#F8F9FC] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EBFBF5] text-[#36C998] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#17172B] group-hover:text-[#5669E8]">Bathroom Cleaning</div>
                      <div className="text-[11px] text-[#71717A]">From ₹499</div>
                    </div>
                  </a>

                  <a 
                    href="/services/kitchen"
                    onClick={() => setActiveDropdown(null)}
                    className="col-span-2 flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-[#F8F9FC] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EEF0FF] text-[#5669E8] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#17172B] group-hover:text-[#5669E8]">Kitchen Services</div>
                      <div className="text-[11px] text-[#71717A]">From ₹599 • Deep cleaning & chimney services</div>
                    </div>
                  </a>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[#F0F2F5] flex items-center justify-between px-2 text-xs">
                  <a 
                    href="/services"
                    onClick={() => setActiveDropdown(null)}
                    className="text-[#5669E8] font-bold hover:underline flex items-center gap-1"
                  >
                    Explore Dedicated Services Page <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>

          <a
            href="#trust-section"
            className="px-3.5 py-2 rounded-xl text-[14px] font-semibold text-[#17172B] hover:text-[#5669E8] hover:bg-[#EEF0FF]/50 transition-colors"
          >
            About Us
          </a>

          <a
            href="/contact"
            className="px-3.5 py-2 rounded-xl text-[14px] font-semibold text-[#17172B] hover:text-[#5669E8] hover:bg-[#EEF0FF]/50 transition-colors"
          >
            Contact
          </a>

          <button
            onClick={onOpenMyBookings}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[14px] font-semibold text-[#17172B] hover:text-[#5669E8] hover:bg-[#EEF0FF]/50 transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#5669E8]" />
            <span>My Bookings</span>
          </button>
        </div>

        {/* Right side actions: Login/Sign Up + Book a Service */}
        <div className="flex items-center gap-3">
          
          {isAuthenticated ? (
            /* User profile dropdown pill */
            <div className="relative">
              <button
                onClick={() => toggleDropdown('user')}
                className="flex items-center gap-2 h-10 px-3 rounded-xl bg-[#F8F9FC] hover:bg-white border border-[#E7E7EB] text-xs font-bold text-[#0B0B2B] transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#5669E8] text-white flex items-center justify-center text-[10px] font-bold">
                  {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
                <span className="hidden sm:inline-block max-w-[100px] truncate">{user.fullName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#71717A]" />
              </button>

              {activeDropdown === 'user' && (
                <div className="absolute top-[calc(100%+6px)] right-0 w-[220px] bg-white rounded-[16px] p-2 shadow-[0_12px_32px_rgba(11,11,43,0.15)] border border-[#E7E7EB] z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-2 border-b border-[#F0F2F5]">
                    <div className="text-xs font-bold text-[#0B0B2B] truncate">{user.fullName}</div>
                    <div className="text-[11px] text-[#71717A] truncate">{user.email}</div>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EEF0FF] text-[#5669E8]">
                      Role: {user.role}
                    </span>
                  </div>

                  <div className="pt-1 space-y-0.5">
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        onOpenMyBookings();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#17172B] hover:bg-[#F8F9FC] rounded-lg text-left"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#5669E8]" />
                      <span>My Bookings</span>
                    </button>

                    {(isAdmin || isWorker) && (
                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          onOpenAdmin();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#17172B] hover:bg-[#F8F9FC] rounded-lg text-left"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-[#5669E8]" />
                        <span>{isAdmin ? 'Admin Console' : 'Worker Console'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#FF4D4D] hover:bg-[#FF4D4D]/10 rounded-lg text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="h-10 px-3.5 sm:px-4 rounded-xl bg-transparent hover:bg-[#EEF0FF]/60 text-xs sm:text-[14px] font-bold text-[#0B0B2B] hover:text-[#5669E8] transition-colors"
            >
              Login / Sign Up
            </button>
          )}

          {/* Book a Service Primary CTA */}
          <button
            onClick={handleBookServiceClick}
            id="nav-book-service-btn"
            className="hidden sm:inline-flex items-center gap-2 h-11 px-5 bg-[#5669E8] hover:bg-[#3938AD] active:scale-[0.98] text-white text-[14px] font-bold rounded-xl shadow-[0_4px_16px_rgba(86,105,232,0.35)] transition-all duration-200 group"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book a Service</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[#F8F9FC] text-[#0B0B2B] hover:text-[#5669E8] hover:bg-white transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white rounded-[20px] p-5 shadow-[0_16px_40px_rgba(11,11,43,0.14)] border border-[#E7E7EB] z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="space-y-4">
            {isAuthenticated ? (
              <div className="p-3.5 rounded-xl bg-[#F8F9FC] border border-[#E7E7EB] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0B0B2B]">{user.fullName}</div>
                  <div className="text-[11px] text-[#71717A]">{user.email} ({user.role})</div>
                </div>
                <button
                  onClick={logout}
                  className="text-xs font-bold text-[#FF4D4D] hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full h-11 bg-[#F8F9FC] border border-[#E7E7EB] text-xs font-bold text-[#0B0B2B] rounded-xl flex items-center justify-center gap-2 hover:bg-[#EEF0FF]"
              >
                <User className="w-4 h-4 text-[#5669E8]" />
                <span>Login / Sign Up</span>
              </button>
            )}

            {/* Mobile Nav Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#17172B]">
              <a 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#F8F9FC] text-center hover:bg-[#EEF0FF]"
              >
                Home
              </a>
              <a 
                href="/services" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#F8F9FC] text-center hover:bg-[#EEF0FF] text-[#5669E8] font-bold"
              >
                Services
              </a>
              <a 
                href="#trust-section" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#F8F9FC] text-center hover:bg-[#EEF0FF]"
              >
                About Us
              </a>
              <a 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#F8F9FC] text-center hover:bg-[#EEF0FF]"
              >
                Contact
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-[#F8F9FC] text-[#0B0B2B] text-xs font-bold hover:bg-[#EEF0FF]"
            >
              <Calendar className="w-4 h-4 text-[#5669E8]" />
              <span>Track / View My Bookings</span>
            </button>

            {/* Mobile Book a Service button */}
            <button
              onClick={handleBookServiceClick}
              className="w-full flex items-center justify-center gap-2 h-12 bg-[#5669E8] hover:bg-[#3938AD] text-white text-[14px] font-bold rounded-xl shadow-md transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book a Service</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
