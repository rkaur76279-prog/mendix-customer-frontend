import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Search, 
  X, 
  ChevronRight, 
  Home as HomeIcon, 
  Sparkles, 
  ShieldCheck, 
  SlidersHorizontal,
  ArrowRight,
  FilterX
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategorySelector from '../components/CategorySelector';
import SubcategorySection from '../components/SubcategorySection';
import ServiceCard from '../components/ServiceCard';
import ServiceDetailModal from '../components/ServiceDetailModal';
import BookingModal from '../components/BookingModal';
import AuthModal from '../components/AuthModal';
import MyBookingsModal from '../components/MyBookingsModal';
import ReviewModal from '../components/ReviewModal';

// Mobile bottom nav
import MobileBottomNav from '../components/mobile/MobileBottomNav';

import api from '../services/api';

export default function ServicesPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Categories list from MongoDB backend
  const [categoriesList, setCategoriesList] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Active category & subservices from MongoDB backend
  const [dbCategory, setDbCategory] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Selected service for Details Modal & Booking Modal
  const [selectedService, setSelectedService] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Auth & Bookings modal states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewBooking, setReviewBooking] = useState(null);

  // 1. Fetch 5 primary categories directly from MongoDB
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await api.categories.getAll();
        if (isMounted && res.categories) {
          setCategoriesList(res.categories);
        }
      } catch (err) {
        console.error('[ServicesPage] Failed to fetch categories from MongoDB:', err);
      } finally {
        if (isMounted) setLoadingCategories(false);
      }
    };
    fetchCategories();
    return () => { isMounted = false; };
  }, []);

  // 2. Fetch specific category subservices directly from MongoDB
  useEffect(() => {
    const slugToLoad = categorySlug || 'electrician';
    let isMounted = true;

    const loadCategoryServices = async () => {
      setLoadingCategory(true);
      try {
        const res = await api.categories.getBySlug(slugToLoad);
        if (isMounted && res.category) {
          setDbCategory(res.category);
        }
      } catch (err) {
        console.error('[ServicesPage] Failed to fetch category services from MongoDB:', err);
      } finally {
        if (isMounted) setLoadingCategory(false);
      }
    };

    loadCategoryServices();
    return () => { isMounted = false; };
  }, [categorySlug]);

  // Active category object from MongoDB
  const activeCategory = useMemo(() => {
    if (dbCategory) return dbCategory;
    const matchSlug = categorySlug || 'electrician';
    return categoriesList.find((c) => c.slug === matchSlug || c.id === matchSlug) || {
      name: 'Services',
      slug: matchSlug,
      subcategories: []
    };
  }, [dbCategory, categorySlug, categoriesList]);

  // 3. Search services directly from backend MongoDB API with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await api.services.search(searchQuery.trim());
        if (res.services) {
          setSearchResults(res.services);
        }
      } catch (e) {
        console.error('[ServicesPage] Search failed on MongoDB backend:', e);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update URL when category tab is clicked
  const handleSelectCategory = (slug) => {
    setSearchQuery('');
    navigate(`/services/${slug}`);
  };

  // View details modal
  const handleViewDetails = (service) => {
    setSelectedService({
      ...service,
      categoryName: service.categoryName || activeCategory.name,
      categorySlug: service.categorySlug || activeCategory.slug,
    });
    setIsDetailModalOpen(true);
  };

  // Open booking modal
  const handleOpenBooking = (service) => {
    setIsDetailModalOpen(false);
    setSelectedService({
      ...service,
      title: service.title || service.name,
      category: service.category || service.categoryName || activeCategory.name,
      numericPrice: service.numericPrice || service.price || 499,
      price: service.price ? (typeof service.price === 'number' ? `₹${service.price}` : service.price) : '₹499',
    });
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#17172B] flex flex-col font-sans selection:bg-[#5669E8] selection:text-white pb-20 md:pb-0">
      
      {/* ── 1. GLOBAL NAVBAR ────────────────────────────────────────── */}
      <Navbar
        onOpenWaitlist={() => navigate('/')}
        onOpenBooking={(srv) => handleOpenBooking(srv)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenAdmin={() => setIsAuthModalOpen(true)}
      />

      {/* ── 2. PAGE HEADER & BREADCRUMBS ────────────────────────────── */}
      <header className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-4">
        {/* Breadcrumb Navigation */}
        <nav 
          aria-label="Breadcrumb" 
          className="flex items-center gap-1.5 text-xs text-[#71717A] mb-3 overflow-x-auto no-scrollbar py-1"
        >
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-[#5669E8] transition-colors shrink-0"
          >
            <HomeIcon className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0" />
          <Link 
            to="/services" 
            className="hover:text-[#5669E8] transition-colors shrink-0"
          >
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0" />
          <span className="font-bold text-[#0B0B2B] truncate shrink-0">
            {activeCategory.name}
          </span>
        </nav>

        {/* Hero Title & Functional Search Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#E7E7EB] shadow-[0_4px_24px_rgba(11,11,43,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF0FF] text-[#5669E8] text-xs font-bold mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>5 Verified Home Care Categories</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[800] text-[#0B0B2B] tracking-tight leading-tight">
              Explore Our Services
            </h1>
            <p className="text-xs sm:text-sm text-[#71717A] mt-1.5 leading-relaxed">
              Professional home services, tailored to your needs. Transparent pricing, hygienic mono-dose products, and certified background-verified professionals.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-80 lg:w-96 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a service..."
                className="w-full h-11 pl-10 pr-9 bg-[#F8F9FC] border border-[#E7E7EB] rounded-2xl text-xs sm:text-sm text-[#17172B] placeholder:text-[#71717A] focus:outline-none focus:border-[#5669E8] focus:bg-white transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#0B0B2B]"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#71717A] mt-2 px-1">
              <span>Popular searches:</span>
              <button
                type="button"
                onClick={() => setSearchQuery('fan')}
                className="text-[#5669E8] hover:underline"
              >
                fan
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setSearchQuery('leak')}
                className="text-[#5669E8] hover:underline"
              >
                leak
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setSearchQuery('facial')}
                className="text-[#5669E8] hover:underline"
              >
                facial
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setSearchQuery('chimney')}
                className="text-[#5669E8] hover:underline"
              >
                chimney
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── 3. MAIN CATEGORY NAVIGATION TABS ───────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-6">
        <CategorySelector
          categories={categoriesList}
          selectedCategorySlug={activeCategory.slug || activeCategory.id}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* ── 4. CATEGORY BANNER & DETAILS ────────────────────────────── */}
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        
        {/* If Search Query is active */}
        {searchResults !== null ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E7E7EB]">
              <div>
                <h2 className="text-lg sm:text-xl font-[800] text-[#0B0B2B]">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-xs text-[#71717A] mt-0.5">
                  Found {searchResults.length} matching {searchResults.length === 1 ? 'service' : 'services'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-[#5669E8] hover:underline flex items-center gap-1"
              >
                <span>Clear Search</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {searchResults.map((srv) => (
                  <ServiceCard
                    key={srv.id}
                    service={srv}
                    onViewDetails={handleViewDetails}
                    onBookNow={handleOpenBooking}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#E7E7EB] shadow-xs max-w-md mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF0FF] text-[#5669E8] flex items-center justify-center mx-auto mb-3.5">
                  <FilterX className="w-7 h-7" />
                </div>
                <h3 className="text-base sm:text-lg font-[800] text-[#0B0B2B]">
                  No services found matching "{searchQuery}"
                </h3>
                <p className="text-xs text-[#71717A] mt-1 leading-relaxed">
                  Try searching for general keywords like "fan", "leak", "facial", "chimney", or "cleaning".
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-5 py-2 rounded-xl bg-[#5669E8] text-white text-xs font-bold hover:bg-[#4353c9] transition-all shadow-xs"
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Normal Category View */
          <div>
            {/* Category Hero Information Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E7E7EB] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-[800] text-[#0B0B2B] tracking-tight">
                    {activeCategory.name}
                  </h2>
                  {activeCategory.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBFBF5] text-[#006644]">
                      {activeCategory.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#71717A] mt-1 max-w-2xl leading-relaxed">
                  {activeCategory.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="p-2.5 rounded-xl bg-[#F8F9FC] border border-[#E7E7EB] text-right">
                  <span className="text-[10px] uppercase font-bold text-[#71717A] block">Starting from</span>
                  <span className="text-[18px] font-[800] text-[#5669E8]">
                    {activeCategory.startingPriceDisplay || `₹${activeCategory.startingPrice}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Subcategories with Individual Services */}
            {loadingCategory ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-[#E7E7EB] shadow-xs">
                <div className="w-9 h-9 border-3 border-[#5669E8] border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-xs font-semibold text-[#71717A]">
                  Loading services from MongoDB backend...
                </p>
              </div>
            ) : activeCategory.subcategories && activeCategory.subcategories.length > 0 ? (
              activeCategory.subcategories.map((subcat) => (
                <SubcategorySection
                  key={subcat.id || subcat.name}
                  subcategory={subcat}
                  onViewDetails={handleViewDetails}
                  onBookNow={handleOpenBooking}
                />
              ))
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center border border-[#E7E7EB]">
                <p className="text-sm text-[#71717A]">
                  No subservices listed under this category yet.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── 5. FOOTER (Desktop & Tablet) ────────────────────────────── */}
      <div className="mt-12 hidden md:block">
        <Footer 
          onOpenWaitlist={() => navigate('/')}
          onOpenBooking={handleOpenBooking}
        />
      </div>

      {/* ── 6. MOBILE BOTTOM NAVIGATION ─────────────────────────────── */}
      <MobileBottomNav
        activeTab="services"
        onTabChange={(tabId) => {
          if (tabId === 'home') navigate('/');
          if (tabId === 'services') navigate('/services');
          if (tabId === 'bookings') setIsMyBookingsOpen(true);
          if (tabId === 'profile') setIsAuthModalOpen(true);
        }}
      />

      {/* ── 7. INTERACTIVE MODALS ────────────────────────────────────── */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onBookNow={handleOpenBooking}
      />

      <BookingModal
        service={selectedService}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        onOpenReview={(booking) => {
          setReviewBooking(booking);
          setIsReviewModalOpen(true);
        }}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        booking={reviewBooking}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmitted={() => setIsMyBookingsOpen(true)}
      />

    </div>
  );
}
