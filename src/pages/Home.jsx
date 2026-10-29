import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ServiceCategories from '../components/ServiceCategories';
import PopularServices from '../components/PopularServices';
import HeroFeatureGrid from '../components/HeroFeatureGrid';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';
import TrustSection from '../components/TrustSection';
import ServiceCarousel from '../components/ServiceCarousel';
import PopularSkills from '../components/PopularSkills';
import WaitlistBanner from '../components/WaitlistBanner';
import Footer from '../components/Footer';

// Mobile View (Yes Madam style app UI — visible on mobile devices only)
import MobileView from '../components/mobile/MobileView';

// Modals
import BookingModal from '../components/BookingModal';
import SearchResultsModal from '../components/SearchResultsModal';
import AuthModal from '../components/AuthModal';
import MyBookingsModal from '../components/MyBookingsModal';
import ReviewModal from '../components/ReviewModal';
import AdminWorkerModal from '../components/AdminWorkerModal';

import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  // Modals state
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewBooking, setReviewBooking] = useState(null);

  // Live Database Services state
  const [liveServices, setLiveServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await api.services.getAll();
        if (res.services && res.services.length > 0) {
          setLiveServices(res.services);
        }
      } catch (err) {
        console.warn('[Home] Using static fallback catalog for visual continuity');
      }
    };
    loadServices();
  }, []);

  // Open booking modal with service
  const handleOpenBooking = (service) => {
    setSelectedService(service || { 
      title: 'Full Home Deep Cleaning', 
      category: 'Home Cleaning',
      numericPrice: 1499,
      price: '₹1,499' 
    });
    setIsBookingModalOpen(true);
  };

  // Scroll to waitlist or categories section
  const handleOpenWaitlist = () => {
    const el = document.getElementById('waitlist-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Search Submission (Backed by MongoDB regex/text search)
  const handleSearchSubmit = async ({ query, location }) => {
    setSearchQuery(query);
    setSearchLocation(location);

    try {
      const res = await api.services.getAll({ q: query || '' });
      if (res.services && res.services.length > 0) {
        setSearchResults(
          res.services.map((s) => ({
            id: s._id,
            title: s.name,
            category: s.category,
            description: s.description,
            price: s.price || `₹${s.numericPrice}`,
            numericPrice: s.numericPrice,
          }))
        );
      } else {
        throw new Error('Fallback needed');
      }
    } catch {
      // Local fallback results in INR
      const fallbackList = [
        { title: 'Full Home Deep Cleaning', category: 'Home Cleaning', price: 'from ₹1,499', numericPrice: 1499, description: 'Complete floor-to-ceiling mechanized deep cleaning & sanitization.' },
        { title: 'Bathroom Deep Cleaning', category: 'Bathroom Cleaning', price: 'from ₹499', numericPrice: 499, description: 'Hard water tile descaling, stain removal & sanitization.' },
        { title: 'Modular Kitchen Deep Degreasing', category: 'Kitchen Cleaning', price: 'from ₹899', numericPrice: 899, description: 'Chimney degreasing, slab wiping, appliance exterior scrub.' },
        { title: 'Leak Detection & Pipe Repair', category: 'Plumbing Services', price: 'from ₹299', numericPrice: 299, description: 'Promptly address and fix tap, pipe, drain leaks & valve repairs.' },
        { title: 'Electrical Inspection', category: 'Electrical Repairs', price: 'from ₹249', numericPrice: 249, description: 'Switchboard wiring, MCB troubleshooting, fixture installs.' },
        { title: 'AC Jet Service & Gas Charging', category: 'AC Installation and Repair', price: 'from ₹599', numericPrice: 599, description: 'High-pressure foam jet wash, cooling check & gas refilling.' }
      ].filter(item => !query || item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(fallbackList);
    }

    setIsSearchModalOpen(true);
  };

  const handleExploreAll = () => {
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleSearchSubmit({ query: '', location: 'All Cities' });
    }
  };

  const handleOpenReview = (booking) => {
    setReviewBooking(booking);
    setIsReviewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#17172B] flex flex-col font-sans selection:bg-[#5669E8] selection:text-white">
      
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MOBILE VIEW (Visible on < md screens only) — Yes Madam Style App UI */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="block md:hidden">
        <MobileView
          onOpenBooking={handleOpenBooking}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* DESKTOP VIEW (Visible on md+ screens only) — Unchanged Desktop UI */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        {/* 1. HERO SECTION (Navigation, Headline, Location & Search, Professional Image) */}
        <HeroSection 
          onOpenWaitlist={handleOpenWaitlist}
          onOpenBooking={handleOpenBooking}
          onSearchSubmit={handleSearchSubmit}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenMyBookings={() => setIsMyBookingsOpen(true)}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
        />

        {/* 2. 12 SERVICE CATEGORIES GRID (Urban Company inspired) */}
        <ServiceCategories 
          onSelectService={(service) => handleOpenBooking(service)}
        />

        {/* 3. POPULAR SERVICES SECTION (Real MongoDB catalog in INR) */}
        <PopularServices 
          services={liveServices}
          onSelectService={(service) => handleOpenBooking(service)}
          onExploreAll={handleExploreAll}
        />

        {/* 4. HERO FEATURE IMAGE GRID */}
        <HeroFeatureGrid 
          onSelectCard={(card) => handleOpenBooking(card)}
        />

        {/* 5. STATISTICS AND PERFORMANCE SECTION */}
        <StatsSection 
          onCardClick={(topic) => handleOpenBooking({ title: `${topic} Consultation`, numericPrice: 0, price: 'Complimentary' })}
        />

        {/* 6. TESTIMONIALS SECTION */}
        <Testimonials />

        {/* 7. BRAND TRUST SECTION (Dark Theme) */}
        <div id="trust-section">
          <TrustSection 
            onSelectCard={(card) => handleOpenBooking(card)}
            onOpenWaitlist={handleOpenWaitlist}
          />
        </div>

        {/* 8. HOME CARE ESSENTIALS — SERVICE CAROUSEL */}
        <ServiceCarousel 
          onSelectService={(service) => handleOpenBooking(service)}
        />

        {/* 9. POPULAR SERVICES AND SKILLS DIRECTORY */}
        <PopularSkills 
          onSelectService={(service) => handleOpenBooking(service)}
        />

        {/* 10. WAITLIST / PROFESSIONAL SIGN-UP BANNER */}
        <div id="waitlist-section">
          <WaitlistBanner />
        </div>

        {/* 11. FOOTER */}
        <div id="footer-section">
          <Footer 
            onOpenWaitlist={handleOpenWaitlist}
            onOpenBooking={handleOpenBooking}
          />
        </div>
      </div>

      {/* INTERACTIVE MODALS */}
      <BookingModal 
        service={selectedService}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      <SearchResultsModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        query={searchQuery}
        location={searchLocation}
        results={searchResults}
        onBookService={(service) => handleOpenBooking(service)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        onOpenReview={handleOpenReview}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        booking={reviewBooking}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmitted={() => setIsMyBookingsOpen(true)}
      />

      <AdminWorkerModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

    </div>
  );
}
