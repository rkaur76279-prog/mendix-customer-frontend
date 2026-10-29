import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  Sparkles, 
  Star, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Tag, 
  Calendar, 
  User, 
  Home as HomeIcon, 
  SlidersHorizontal, 
  ChevronDown, 
  PhoneCall, 
  Percent, 
  Award,
  Zap,
  Bath,
  ChefHat,
  Droplet,
  Scissors,
  X
} from 'lucide-react';
import api from '../../services/api';

const ICON_MAP = {
  Zap,
  Droplet,
  Scissors,
  Bath,
  ChefHat,
};

const CITIES = ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata'];

const PROMO_SLIDES = [
  {
    id: 1,
    title: 'Salon & Spa at Home',
    subtitle: 'Mono-dose sealed kits & luxury beauticians',
    tag: 'FLAT ₹150 OFF',
    code: 'WELCOME100',
    price: '₹699',
    category: 'Salon at Home',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    bgGradient: 'from-[#5669E8] to-[#3938AD]',
  },
  {
    id: 2,
    title: 'Full Home Deep Cleaning',
    subtitle: 'Mechanized scrubbing & 100% hospital-grade sanitization',
    tag: 'MOST POPULAR',
    code: 'MENDX20',
    price: '₹1,499',
    category: 'Home Cleaning',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    bgGradient: 'from-[#0B0B2B] to-[#1E1E4B]',
  },
  {
    id: 3,
    title: 'AC Jet Cleaning & Gas Refill',
    subtitle: '2X deeper cooling with anti-bacterial foam jet spray',
    tag: 'SUMMER SPECIAL',
    code: 'COOL50',
    price: '₹599',
    category: 'AC Installation and Repair',
    image: 'https://images.unsplash.com/photo-1631545830691-d8ec11ec5e96?auto=format&fit=crop&w=600&q=80',
    bgGradient: 'from-[#0B0B2B] via-[#36C998]/80 to-[#0B0B2B]',
  },
];

const VALUE_COMBOS = [
  {
    id: 'combo-1',
    title: 'Deep Home Clean + Kitchen Degrease',
    category: 'Home Cleaning',
    description: 'Mechanized scrubbing for all rooms plus kitchen chimney and slab degreasing.',
    originalPrice: 2398,
    price: 1999,
    savings: 399,
    rating: 4.95,
    reviews: 640,
    duration: '5-6 hrs',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'combo-2',
    title: 'Bathroom Descaling + Tap Leak Fix',
    category: 'Bathroom Cleaning',
    description: 'Hard-water tile descaling & pressure wash with plumber valve inspection.',
    originalPrice: 798,
    price: 649,
    savings: 149,
    rating: 4.88,
    reviews: 412,
    duration: '2-3 hrs',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'combo-3',
    title: 'Glow Facial + Pedicure + Hair Spa',
    category: 'Salon at Home',
    description: 'Custom herbal facial, therapeutic head massage & spa pedicure at home.',
    originalPrice: 1599,
    price: 1199,
    savings: 400,
    rating: 4.97,
    reviews: 890,
    duration: '2-3 hrs',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80',
  },
];

export default function MobileView({ onOpenBooking, onOpenAuth, onOpenMyBookings }) {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [cityDropdown, setCityDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveSearchResults, setLiveSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [activeSlide, setActiveSlide] = useState(0);

  // Fetch 5 primary categories directly from MongoDB backend
  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      try {
        const res = await api.categories.getAll();
        if (isMounted && res.categories) {
          setCategories(res.categories);
        }
      } catch (e) {
        console.error('[MobileView] MongoDB categories fetch error:', e);
      }
    };
    loadCategories();
    return () => { isMounted = false; };
  }, []);

  // Live search from MongoDB backend API
  useEffect(() => {
    if (!searchQuery.trim()) {
      setLiveSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await api.services.search(searchQuery.trim());
        if (res.services) {
          setLiveSearchResults(res.services);
        }
      } catch (e) {}
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Auto carousel rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % PROMO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleServiceClick = (service) => {
    if (onOpenBooking) {
      onOpenBooking({
        title: service.title || service.name,
        category: service.category,
        price: service.price ? (typeof service.price === 'number' ? `₹${service.price}` : service.price) : '₹499',
        numericPrice: service.numericPrice || service.price || 499,
        duration: service.duration || '1-2 hrs',
        description: service.description || '',
      });
    }
  };

  return (
    <div className="w-full bg-[#F8F9FC] text-[#17172B] min-h-screen pb-24 font-sans select-none">
      
      {/* ── 1. YES MADAM STYLE STICKY APP HEADER ─────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md px-4 pt-3 pb-3 border-b border-[#E7E7EB] shadow-[0_2px_12px_rgba(11,11,43,0.03)]">
        
        {/* Top Row: Location Selector & User Profile */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="relative">
            <button
              onClick={() => setCityDropdown(!cityDropdown)}
              className="flex items-center gap-1.5 text-left group"
            >
              <div className="w-8 h-8 rounded-full bg-[#EEF0FF] text-[#5669E8] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#5669E8]" />
              </div>
              <div>
                <div className="flex items-center gap-1 leading-none">
                  <span className="text-[13px] font-[800] text-[#0B0B2B]">{selectedCity}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#71717A] transition-transform ${cityDropdown ? 'rotate-180' : ''}`} />
                </div>
                <div className="text-[10px] text-[#71717A] font-medium leading-tight mt-0.5">
                  Delivering to doorstep
                </div>
              </div>
            </button>

            {/* City Dropdown Menu */}
            {cityDropdown && (
              <div className="absolute top-11 left-0 w-44 bg-white rounded-2xl shadow-xl border border-[#E7E7EB] p-1.5 z-50 animate-in fade-in duration-150">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] px-2.5 py-1">
                  Select Your City
                </div>
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setSelectedCity(c);
                      setCityDropdown(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                      selectedCity === c ? 'bg-[#EEF0FF] text-[#5669E8]' : 'hover:bg-[#F8F9FC] text-[#17172B]'
                    }`}
                  >
                    <span>{c}</span>
                    {selectedCity === c && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Brand Logo & Account Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 pr-1">
              <div className="w-6 h-6 rounded-[7px] bg-[#5669E8] flex items-center justify-center text-white font-bold text-xs">
                M
              </div>
              <span className="text-[15px] font-[800] tracking-tight text-[#0B0B2B]">Mendx</span>
            </div>

            <button
              onClick={onOpenAuth}
              className="w-8 h-8 rounded-full bg-[#F8F9FC] border border-[#E7E7EB] flex items-center justify-center text-[#0B0B2B] active:scale-90"
              aria-label="User Account"
            >
              <User className="w-4 h-4 text-[#5669E8]" />
            </button>
          </div>
        </div>

        {/* Search Bar (Functional) */}
        <div className="relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
              } else {
                navigate('/services');
              }
            }}
          >
            <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search 'bathroom cleaning', 'facial', 'leak'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-9 bg-[#F8F9FC] border border-[#E7E7EB] rounded-xl text-xs text-[#17172B] placeholder:text-[#71717A] focus:outline-none focus:border-[#5669E8] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Quick live search dropdown preview if typing */}
          {Boolean(searchQuery.trim()) && (
            <div className="absolute top-11 left-0 right-0 bg-white rounded-2xl shadow-xl border border-[#E7E7EB] p-2 z-50 animate-in fade-in duration-150 max-h-60 overflow-y-auto">
              <div className="text-[10px] font-bold text-[#71717A] px-2 py-1 uppercase tracking-wider flex items-center justify-between">
                <span>Matching Services (MongoDB)</span>
                <span className="text-[#5669E8]">Tap to view</span>
              </div>
              {liveSearchResults.slice(0, 4).map((srv) => (
                <button
                  key={srv._id || srv.id}
                  type="button"
                  onClick={() => {
                    navigate(`/services/${srv.categorySlug || 'electrician'}`);
                  }}
                  className="w-full text-left px-2.5 py-2 hover:bg-[#F8F9FC] rounded-xl flex items-center justify-between transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold text-[#0B0B2B]">{srv.name}</div>
                    <div className="text-[10px] text-[#71717A]">{srv.category || srv.categoryName} • {srv.duration}</div>
                  </div>
                  <span className="text-xs font-bold text-[#5669E8]">
                    {srv.price ? (typeof srv.price === 'number' ? `₹${srv.price}` : srv.price) : '₹499'}
                  </span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`)}
                className="w-full text-center py-2 mt-1 border-t border-[#F0F2F5] text-xs font-bold text-[#5669E8]"
              >
                View all results for "{searchQuery}" →
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ── 2. PROMO OFFER TICKER BANNER (Yes Madam Signature) ───────── */}
      <div className="bg-[#0B0B2B] px-4 py-2 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#36C998] text-[#0B0B2B] flex items-center justify-center">
            <Percent className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="text-[11px] font-semibold tracking-tight">
            Use <strong className="text-[#36C998] font-bold">WELCOME100</strong> for Flat ₹100 OFF
          </span>
        </div>
        <button
          onClick={() => handleServiceClick({ title: 'Full Home Deep Cleaning', category: 'Home Cleaning', price: 1499 })}
          className="text-[10px] font-bold text-[#EEF0FF] underline tracking-wider"
        >
          CLAIM NOW
        </button>
      </div>

      {/* ── 3. HERO SLIDING PROMO BANNER ─────────────────────────────── */}
      <div className="px-4 pt-3.5">
        <div className="relative rounded-[22px] overflow-hidden shadow-[0_6px_20px_rgba(86,105,232,0.12)]">
          <div 
            className={`w-full aspect-[16/8] bg-gradient-to-r ${PROMO_SLIDES[activeSlide].bgGradient} p-4 text-white flex items-center justify-between relative overflow-hidden`}
          >
            {/* Background image preview with soft gradient mask */}
            <img
              src={PROMO_SLIDES[activeSlide].image}
              alt={PROMO_SLIDES[activeSlide].title}
              className="absolute right-0 top-0 w-1/2 h-full object-cover mask-gradient opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            {/* Banner Copy */}
            <div className="relative z-10 max-w-[65%]">
              <span className="inline-block px-2 py-0.5 rounded-full bg-[#36C998] text-[#0B0B2B] text-[9px] font-[800] uppercase tracking-wider mb-1">
                {PROMO_SLIDES[activeSlide].tag}
              </span>
              <h3 className="text-[16px] font-[800] leading-tight drop-shadow-sm">
                {PROMO_SLIDES[activeSlide].title}
              </h3>
              <p className="text-[10px] text-white/85 line-clamp-1 mt-0.5">
                {PROMO_SLIDES[activeSlide].subtitle}
              </p>

              <button
                onClick={() => handleServiceClick({
                  title: PROMO_SLIDES[activeSlide].title,
                  category: PROMO_SLIDES[activeSlide].category,
                  price: PROMO_SLIDES[activeSlide].price,
                })}
                className="mt-2.5 h-7 px-3 rounded-lg bg-white text-[#0B0B2B] text-[10px] font-[800] flex items-center gap-1 shadow-sm active:scale-95"
              >
                <span>Book from {PROMO_SLIDES[activeSlide].price}</span>
                <ArrowRight className="w-3 h-3 text-[#5669E8]" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 right-3 z-10 flex gap-1">
            {PROMO_SLIDES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === i ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. SERVICES AT HOME (5 Core Categories) ────────────────── */}
      <div className="px-4 pt-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[16px] font-[800] text-[#0B0B2B] tracking-tight">
              Services at Home
            </h2>
            <p className="text-[11px] text-[#71717A]">5 core categories, verified experts</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/services')}
            className="text-[11px] font-bold text-[#5669E8] flex items-center gap-0.5"
          >
            <span>See All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 2-Column Responsive Card Grid powered by MongoDB */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, idx) => {
            const Icon = ICON_MAP[cat.icon] || Zap;
            const isWide = idx === 4; // 5th card spans full 2 columns for a balanced layout

            return (
              <div
                key={cat._id || cat.id}
                onClick={() => navigate(`/services/${cat.slug}`)}
                className={`bg-white rounded-2xl border border-[#E7E7EB] p-3 shadow-[0_2px_10px_rgba(11,11,43,0.03)] active:scale-[0.98] transition-all cursor-pointer flex ${
                  isWide ? 'col-span-2 flex-row items-center justify-between gap-3' : 'flex-col justify-between'
                }`}
              >
                <div className={`flex ${isWide ? 'items-center gap-3' : 'flex-col'}`}>
                  {/* Category icon and image */}
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-2xs bg-[#EEF0FF] text-[#5669E8]"
                    >
                      <Icon className="w-5 h-5 stroke-[2.3]" />
                    </div>

                    {!isWide && cat.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#EBFBF5] text-[#006644]">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Short description */}
                  <div>
                    <h3 className="text-[13px] font-[800] text-[#0B0B2B] leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] text-[#71717A] mt-0.5 leading-snug line-clamp-1">
                      {cat.shortDescription || cat.description}
                    </p>
                  </div>
                </div>

                {/* Price and tap indicator */}
                <div className={`flex items-center justify-between ${isWide ? 'shrink-0 gap-3' : 'mt-2.5 pt-2 border-t border-[#F0F2F5]'}`}>
                  <div>
                    <span className="text-[9px] text-[#71717A] block leading-none">From</span>
                    <span className="text-[12px] font-[800] text-[#5669E8]">
                      {cat.startingPriceDisplay || `₹${cat.startingPrice}`}
                    </span>
                  </div>

                  <div className="w-6 h-6 rounded-lg bg-[#EEF0FF] text-[#5669E8] flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 5. VALUE COMBOS / CURATED PACKAGES (Yes Madam App Feature) ─── */}
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[15px] font-[800] text-[#0B0B2B] tracking-tight">
              Value Combo Packages
            </h2>
            <p className="text-[11px] text-[#71717A]">Multi-service savings crafted for your home</p>
          </div>
          <span className="text-[10px] font-bold bg-[#EBFBF5] text-[#006644] px-2 py-0.5 rounded-full">
            Save up to ₹400
          </span>
        </div>

        <div className="space-y-3">
          {VALUE_COMBOS.map((combo) => (
            <div
              key={combo.id}
              onClick={() => handleServiceClick({
                title: combo.title,
                category: combo.category,
                price: combo.price,
                duration: combo.duration,
                description: combo.description,
              })}
              className="bg-white rounded-[20px] p-3 border border-[#E7E7EB] shadow-[0_2px_12px_rgba(11,11,43,0.03)] flex gap-3 items-center active:scale-[0.99] transition-all cursor-pointer"
            >
              <img
                src={combo.image}
                alt={combo.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#36C998]">
                  <Star className="w-3 h-3 fill-[#F1D94C] text-[#F1D94C]" />
                  <span className="text-[#0B0B2B]">{combo.rating}</span>
                  <span className="text-[#71717A]">({combo.reviews})</span>
                </div>

                <h4 className="text-[13px] font-[800] text-[#0B0B2B] leading-snug line-clamp-1 mt-0.5">
                  {combo.title}
                </h4>

                <p className="text-[10px] text-[#71717A] line-clamp-1 mt-0.5">
                  {combo.description}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[14px] font-[800] text-[#0B0B2B]">₹{combo.price}</span>
                    <span className="text-[10px] text-[#71717A] line-through">₹{combo.originalPrice}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick({
                        title: combo.title,
                        category: combo.category,
                        price: combo.price,
                        duration: combo.duration,
                      });
                    }}
                    className="h-7 px-3 rounded-lg bg-[#5669E8] text-white text-[10px] font-bold flex items-center gap-1 shadow-xs"
                  >
                    <span>ADD</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. WHY CHOOSE MENDX (Yes Madam Safety Standard) ─────────── */}
      <div className="px-4 pt-6">
        <div className="p-4 rounded-[22px] bg-gradient-to-br from-[#0B0B2B] to-[#1E1E4B] text-white">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-[#36C998]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#36C998]">The Mendx Assurance</span>
          </div>
          <h3 className="text-[16px] font-[800] leading-tight">
            Fair Upfront Pricing & Mono-Dose Sealed Products
          </h3>
          <p className="text-[11px] text-white/80 mt-1">
            Just like Yes Madam, we bring hygienic sealed consumables with zero spill and no duplicate products.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-white/10 text-[10px]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#36C998] shrink-0" />
              <span>100% Verified Experts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#36C998] shrink-0" />
              <span>30-Day Reservice Warranty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#36C998] shrink-0" />
              <span>Free Reschedule/Cancel</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#36C998] shrink-0" />
              <span>On-Time Arrival (or ₹100 off)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 7. VERIFIED CUSTOMER REVIEWS (App Carousel) ─────────────── */}
      <div className="px-4 pt-6">
        <h2 className="text-[15px] font-[800] text-[#0B0B2B] tracking-tight mb-2.5">
          Real Reviews from Happy Homes
        </h2>
        
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {[
            { name: 'Priya Sharma', loc: 'Bandra West, Mumbai', service: 'Full Home Deep Cleaning', text: 'The cleaners brought heavy-duty vacuum machines and eco chemicals. Whole flat feels 5-star new!' },
            { name: 'Ananya Verma', loc: 'South Ext, Delhi', service: 'Salon & Spa at Home', text: 'Sealed product sachet opened right in front of me. Super hygienic and polite therapist.' },
            { name: 'Karthik Rao', loc: 'Indiranagar, Bengaluru', service: 'AC Foam Jet Service', text: 'Fixed the leakage and cleaned coils completely. Cooling restored immediately.' },
          ].map((rev, i) => (
            <div
              key={i}
              className="w-[260px] shrink-0 bg-white rounded-2xl p-3 border border-[#E7E7EB] shadow-[0_2px_8px_rgba(11,11,43,0.02)]"
            >
              <div className="flex items-center gap-1 text-[#F1D94C] mb-1">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <p className="text-[11px] text-[#17172B] line-clamp-3 leading-relaxed">
                "{rev.text}"
              </p>
              <div className="mt-2 pt-2 border-t border-[#F0F2F5] flex justify-between items-center text-[10px]">
                <span className="font-bold text-[#0B0B2B]">{rev.name}</span>
                <span className="text-[#5669E8] font-semibold">{rev.loc.split(',')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 8. BOTTOM APP NAVIGATION (Home, Services, Bookings, Profile) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E7EB] py-1.5 px-6 shadow-[0_-4px_20px_rgba(11,11,43,0.06)] flex items-center justify-between">
        
        {/* Tab 1: Home */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'home' ? 'text-[#5669E8]' : 'text-[#71717A]'
          }`}
        >
          <HomeIcon className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* Tab 2: Services */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('services');
            navigate('/services');
          }}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'services' ? 'text-[#5669E8]' : 'text-[#71717A]'
          }`}
        >
          <Sparkles className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold">Services</span>
        </button>

        {/* Tab 3: Bookings */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('bookings');
            if (onOpenMyBookings) onOpenMyBookings();
          }}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'bookings' ? 'text-[#5669E8]' : 'text-[#71717A]'
          }`}
        >
          <Calendar className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold">Bookings</span>
        </button>

        {/* Tab 4: Profile */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('profile');
            if (onOpenAuth) onOpenAuth();
          }}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'profile' ? 'text-[#5669E8]' : 'text-[#71717A]'
          }`}
        >
          <User className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>

      </div>

    </div>
  );
}
