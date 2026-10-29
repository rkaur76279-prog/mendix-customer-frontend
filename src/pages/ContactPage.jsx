import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Headset,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Calendar,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  ExternalLink,
  Loader2,
  Building,
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import AuthModal from '../components/AuthModal';
import MyBookingsModal from '../components/MyBookingsModal';
import MobileBottomNav from '../components/mobile/MobileBottomNav';

import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const INQUIRY_TYPES = [
  'Booking Support',
  'Service Information',
  'Booking Cancellation',
  'Rescheduling Request',
  'Payment or Refund Issue',
  'Account Support',
  'Feedback and Suggestions',
  'Other',
];

const FAQ_ITEMS = [
  {
    q: 'How can I book a service?',
    a: 'You can explore our catalog via the Services page or search on the homepage. Select your required service, choose your preferred date and time slot, enter your address details, and confirm. You will receive an instant booking ID (e.g. MDX-XXXXXX).',
  },
  {
    q: 'How do I reschedule a booking?',
    a: 'Go to "My Bookings" from the navigation bar, locate your confirmed appointment, and click "Reschedule". You can pick a new convenient date and time slot without any penalty as long as the professional is not already en route.',
  },
  {
    q: 'How can I cancel a service?',
    a: 'Navigate to "My Bookings", select the active booking, and choose "Cancel Booking". If cancelled prior to the technician departing for your location, any prepaid amount is automatically initiated for a 100% refund.',
  },
  {
    q: 'What should I do if my professional is delayed?',
    a: 'We monitor active dispatch closely. If a technician is held up due to traffic or an extended prior job, you will see an updated status in "My Bookings". You can also reach our emergency support hotline directly with your Booking ID for real-time dispatch assistance.',
  },
  {
    q: 'How can I report a payment issue?',
    a: 'Submit a message using the contact form below with inquiry type "Payment or Refund Issue" and include your Booking ID. Our accounts desk reviews transaction logs within 2 to 4 business hours and resolves any double-charge or billing queries.',
  },
];

export default function ContactPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Modals state
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Booking Support',
    bookingId: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState('');

  // FAQ accordion open states
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Auto-populate logged-in user details if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.fullName || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  // Validate form client-side
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Full name is required.';
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters.';
        break;
      case 'email':
        if (!value.trim()) error = 'Email address is required.';
        else if (!/^\S+@\S+\.\S+$/.test(value.trim())) error = 'Please enter a valid email address.';
        break;
      case 'subject':
        if (!value.trim()) error = 'Subject is required.';
        else if (value.trim().length < 3) error = 'Subject must be at least 3 characters.';
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required.';
        else if (value.trim().length < 10) error = 'Message must be at least 10 characters.';
        else if (value.length > 3000) error = 'Message cannot exceed 3,000 characters.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(null);

    // Validate all fields
    const newErrors = {};
    ['name', 'email', 'subject', 'message'].forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Smooth scroll to top of form
      const el = document.getElementById('contact-form-card');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.contact.submit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        inquiryType: formData.inquiryType,
        bookingId: formData.bookingId.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      if (response && response.success) {
        setSubmitSuccess({
          ticketId: response.ticketId || '',
          message: response.message || 'Thank you for contacting Mendx! Your message has been submitted successfully.',
          inquiryType: response.inquiryType || formData.inquiryType,
        });

        // Reset message and subject, retain contact info for user convenience
        setFormData((prev) => ({
          name: user?.fullName || '',
          email: user?.email || '',
          phone: user?.phone || '',
          inquiryType: 'Booking Support',
          bookingId: '',
          subject: '',
          message: '',
        }));
        setErrors({});

        // Scroll to confirmation message
        const el = document.getElementById('contact-form-card');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        throw new Error(response.error || 'Failed to submit enquiry.');
      }
    } catch (err) {
      console.error('[ContactPage] Submission failed:', err);
      setSubmitError(err.message || 'Unable to submit your enquiry at this moment. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('contact-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBookingModal = (service) => {
    setSelectedService(service || {
      title: 'General Support Consultation',
      category: 'Home Services',
      price: 'Free Consultation',
      numericPrice: 0,
    });
    setIsBookingModalOpen(true);
  };

  const handleTabChange = (tabId) => {
    if (tabId === 'home') navigate('/');
    else if (tabId === 'services') navigate('/services');
    else if (tabId === 'bookings') setIsMyBookingsOpen(true);
    else if (tabId === 'profile') {
      if (isAuthenticated) setIsMyBookingsOpen(true);
      else setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#10102F] flex flex-col font-sans selection:bg-[#5968F5] selection:text-white">
      
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 1. TOP NAVBAR */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Navbar
        onOpenBooking={() => handleOpenBookingModal()}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenAdmin={() => {}}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-16">
        
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 2. HERO SECTION */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mt-4 sm:mt-6 relative w-full bg-gradient-to-b from-white via-[#F7F8FF] to-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 border border-[#E7E7EB] shadow-[0_4px_30px_rgba(89,104,245,0.04)] overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#5968F5]/10 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-[#24C99A]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 flex flex-col text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#5968F5]/20 text-xs font-bold text-[#5968F5] shadow-xs w-fit mb-5">
                <Sparkles className="w-3.5 h-3.5 text-[#24C99A]" />
                <span>We're Here to Help</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] font-[800] text-[#10102F] tracking-[-0.03em] leading-[1.12]">
                Let's Make Your Home Care Easier,{' '}
                <span className="text-[#5968F5]">Here for You</span>
              </h1>

              {/* Description */}
              <p className="mt-4 sm:mt-5 text-[#5A5B6A] text-[15px] sm:text-[17px] leading-[1.65] max-w-[560px]">
                Have questions about your booking, need help choosing a service, or want to share feedback? The Mendx team is always ready to help.
              </p>

              {/* Action Buttons */}
              <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  id="hero-contact-support-btn"
                  onClick={scrollToForm}
                  className="h-12 px-6 sm:px-7 rounded-xl bg-[#5968F5] hover:bg-[#4352E6] active:scale-[0.98] text-white text-[15px] font-bold shadow-[0_4px_16px_rgba(89,104,245,0.35)] transition-all duration-200 flex items-center gap-2"
                >
                  <Headset className="w-4 h-4" />
                  <span>Contact Support</span>
                </button>

                <Link
                  to="/services"
                  id="hero-explore-services-btn"
                  className="h-12 px-6 sm:px-7 rounded-xl bg-white hover:bg-[#F7F8FF] border border-[#E7E7EB] hover:border-[#5968F5]/40 text-[#10102F] text-[15px] font-bold shadow-xs transition-all duration-200 flex items-center gap-2"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 text-[#5968F5]" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-9 pt-6 border-t border-[#E7E7EB]/80 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-[#5A5B6A]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#EBFBF5] text-[#24C99A] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-[#10102F]">Average Response &lt; 15 mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#EEF0FF] text-[#5968F5] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-[#10102F]">100% Verified Technicians</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Column with Floating Cards */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Outer Card Container */}
              <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(89,104,245,0.14)] border-4 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
                  alt="Friendly home service professional assisting customer"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                
                {/* Gradient overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#10102F]/80 via-transparent to-transparent" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#24C99A] text-[#10102F] text-xs font-bold mb-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" /> Dedicated Care
                  </div>
                  <div className="text-lg font-bold">Mendx Customer Concierge</div>
                  <p className="text-xs text-white/85 mt-0.5">Assisting thousands of happy homeowners every day.</p>
                </div>

                {/* Floating Top Card (Within image boundaries on mobile) */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-[0_12px_28px_rgba(16,16,47,0.12)] border border-[#E7E7EB] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] text-[#5968F5] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#10102F]">Trusted Home Professionals</div>
                    <div className="text-[11px] text-[#24C99A] font-semibold">Background Verified</div>
                  </div>
                </div>

                {/* Floating Bottom Card (Within image boundaries on mobile) */}
                <div className="absolute bottom-28 left-4 sm:bottom-28 sm:left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-[0_12px_28px_rgba(16,16,47,0.12)] border border-[#E7E7EB] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBFBF5] text-[#24C99A] flex items-center justify-center shrink-0">
                    <Headset className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#10102F]">Friendly Customer Support</div>
                    <div className="text-[11px] text-[#5968F5] font-semibold">Prompt 7-Day Assistance</div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 3. CONTACT INFORMATION CARDS */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mt-16 sm:mt-20">
          
          <div className="text-center max-w-[680px] mx-auto mb-10 sm:mb-12">
            <h2 className="text-[28px] sm:text-[36px] font-[800] text-[#10102F] tracking-tight">
              Get in Touch With Mendx
            </h2>
            <p className="mt-2 sm:mt-3 text-[#5A5B6A] text-[15px] sm:text-[17px]">
              Choose the easiest way to connect with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Customer Support */}
            <div className="bg-white rounded-[22px] p-6 sm:p-7 border border-[#E7E7EB] shadow-[0_4px_20px_rgba(16,16,47,0.03)] hover:shadow-[0_12px_32px_rgba(89,104,245,0.08)] hover:border-[#5968F5]/30 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] text-[#5968F5] group-hover:scale-105 group-hover:bg-[#5968F5] group-hover:text-white transition-all duration-300 flex items-center justify-center mb-5 shadow-xs">
                  <Headset className="w-6 h-6" />
                </div>
                <h3 className="text-[18px] font-bold text-[#10102F] mb-2">Customer Support</h3>
                <p className="text-[#5A5B6A] text-sm leading-relaxed mb-4">
                  Get assistance with bookings, service requests, and general questions.
                </p>
              </div>
              <div className="pt-4 border-t border-[#F0F2F5]">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="text-xs font-bold text-[#5968F5] hover:text-[#4352E6] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Support Ticket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. Email Support */}
            <div className="bg-white rounded-[22px] p-6 sm:p-7 border border-[#E7E7EB] shadow-[0_4px_20px_rgba(16,16,47,0.03)] hover:shadow-[0_12px_32px_rgba(89,104,245,0.08)] hover:border-[#5968F5]/30 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] text-[#5968F5] group-hover:scale-105 group-hover:bg-[#5968F5] group-hover:text-white transition-all duration-300 flex items-center justify-center mb-5 shadow-xs">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-[18px] font-bold text-[#10102F] mb-2">Email Support</h3>
                <p className="text-[#5A5B6A] text-sm leading-relaxed mb-4">
                  Send us your questions or feedback. We reply promptly within 2 hours.
                </p>
              </div>
              <div className="pt-4 border-t border-[#F0F2F5]">
                <a
                  href="mailto:support@mendx.in"
                  className="text-xs font-bold text-[#5968F5] hover:text-[#4352E6] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>support@mendx.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 3. Phone Support */}
            <div className="bg-white rounded-[22px] p-6 sm:p-7 border border-[#E7E7EB] shadow-[0_4px_20px_rgba(16,16,47,0.03)] hover:shadow-[0_12px_32px_rgba(89,104,245,0.08)] hover:border-[#5968F5]/30 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] text-[#5968F5] group-hover:scale-105 group-hover:bg-[#5968F5] group-hover:text-white transition-all duration-300 flex items-center justify-center mb-5 shadow-xs">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-[18px] font-bold text-[#10102F] mb-2">Phone Support</h3>
                <p className="text-[#5A5B6A] text-sm leading-relaxed mb-4">
                  Speak with our support team when assistance is available.
                </p>
              </div>
              <div className="pt-4 border-t border-[#F0F2F5]">
                <a
                  href="tel:18002026363"
                  className="text-xs font-bold text-[#5968F5] hover:text-[#4352E6] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>1800-202-6363 (Toll Free)</span>
                </a>
              </div>
            </div>

            {/* 4. Business Hours */}
            <div className="bg-white rounded-[22px] p-6 sm:p-7 border border-[#E7E7EB] shadow-[0_4px_20px_rgba(16,16,47,0.03)] hover:shadow-[0_12px_32px_rgba(89,104,245,0.08)] hover:border-[#5968F5]/30 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] text-[#5968F5] group-hover:scale-105 group-hover:bg-[#5968F5] group-hover:text-white transition-all duration-300 flex items-center justify-center mb-5 shadow-xs">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-[18px] font-bold text-[#10102F] mb-2">Business Hours</h3>
                <p className="text-[#5A5B6A] text-sm leading-relaxed mb-4">
                  Find out when our customer support team is available.
                </p>
              </div>
              <div className="pt-4 border-t border-[#F0F2F5]">
                <div className="text-xs font-bold text-[#10102F]">
                  Mon – Sun: 8:00 AM – 9:00 PM IST
                </div>
                <div className="text-[11px] text-[#24C99A] font-semibold mt-0.5">
                  Emergency Booking Care: 24/7
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 4. BEAUTIFUL CONTACT FORM & HELP CARD */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section id="contact-form-section" className="mt-16 sm:mt-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Form Column (Left/Main - 8 cols) */}
            <div className="lg:col-span-8">
              
              <div 
                id="contact-form-card"
                className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 border border-[#E7E7EB] shadow-[0_12px_40px_rgba(16,16,47,0.04)] relative"
              >
                
                {/* Form Heading & Subtitle */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF0FF] text-xs font-bold text-[#5968F5] mb-3">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Direct Message</span>
                  </div>
                  <h2 className="text-[26px] sm:text-[32px] font-[800] text-[#10102F] tracking-tight">
                    Send Us a Message
                  </h2>
                  <p className="mt-2 text-[#5A5B6A] text-sm sm:text-base">
                    Tell us how we can help, and our team will get back to you.
                  </p>
                </div>

                {/* Success Notification Banner */}
                {submitSuccess && (
                  <div className="mb-8 p-5 rounded-2xl bg-[#EBFBF5] border border-[#24C99A]/30 text-[#006644] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#24C99A] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#0B3829]">
                          Message Submitted Successfully!
                        </h4>
                        <p className="text-sm mt-1 text-[#13503B]">
                          {submitSuccess.message}
                        </p>
                        {submitSuccess.ticketId && (
                          <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 bg-white/80 rounded-lg text-xs font-mono font-bold text-[#0B3829] border border-[#24C99A]/20">
                            <span>Ticket Reference:</span>
                            <span className="text-[#5968F5]">{submitSuccess.ticketId}</span>
                          </div>
                        )}
                        <p className="text-xs text-[#2A7258] mt-2">
                          Our support team will follow up via your email shortly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Notification Banner */}
                {submitError && (
                  <div className="mb-8 p-4 rounded-2xl bg-[#FFF1F2] border border-[#F43F5E]/30 text-[#9F1239] flex items-start gap-3 animate-in fade-in duration-200">
                    <AlertCircle className="w-5 h-5 text-[#E11D48] shrink-0 mt-0.5" />
                    <div className="text-sm font-medium">
                      {submitError}
                    </div>
                  </div>
                )}

                {/* Actual Form */}
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name-input" className="block text-xs font-bold uppercase tracking-wider text-[#10102F] mb-2">
                        Full Name <span className="text-[#5968F5]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name-input"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full h-12 px-4 rounded-xl bg-[#F8F9FC] border text-sm text-[#10102F] placeholder-[#9D9EAF] focus:bg-white focus:outline-none transition-all ${
                          errors.name 
                            ? 'border-[#F43F5E] focus:ring-2 focus:ring-[#F43F5E]/20' 
                            : 'border-[#E7E7EB] focus:border-[#5968F5] focus:ring-2 focus:ring-[#5968F5]/10'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-[#E11D48] font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label htmlFor="email-input" className="block text-xs font-bold uppercase tracking-wider text-[#10102F] mb-2">
                        Email Address <span className="text-[#5968F5]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email-input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. rahul@example.com"
                        className={`w-full h-12 px-4 rounded-xl bg-[#F8F9FC] border text-sm text-[#10102F] placeholder-[#9D9EAF] focus:bg-white focus:outline-none transition-all ${
                          errors.email 
                            ? 'border-[#F43F5E] focus:ring-2 focus:ring-[#F43F5E]/20' 
                            : 'border-[#E7E7EB] focus:border-[#5968F5] focus:ring-2 focus:ring-[#5968F5]/10'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-[#E11D48] font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Inquiry Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Phone Number (optional) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="phone-input" className="block text-xs font-bold uppercase tracking-wider text-[#10102F]">
                          Phone Number
                        </label>
                        <span className="text-[11px] text-[#71717A] font-medium">Optional</span>
                      </div>
                      <input
                        type="tel"
                        id="phone-input"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full h-12 px-4 rounded-xl bg-[#F8F9FC] border border-[#E7E7EB] text-sm text-[#10102F] placeholder-[#9D9EAF] focus:bg-white focus:border-[#5968F5] focus:outline-none focus:ring-2 focus:ring-[#5968F5]/10 transition-all"
                      />
                    </div>

                    {/* Inquiry Type Dropdown */}
                    <div>
                      <label htmlFor="inquiry-select" className="block text-xs font-bold uppercase tracking-wider text-[#10102F] mb-2">
                        Inquiry Type <span className="text-[#5968F5]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="inquiry-select"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                          className="w-full h-12 px-4 pr-10 rounded-xl bg-[#F8F9FC] border border-[#E7E7EB] text-sm text-[#10102F] font-medium appearance-none focus:bg-white focus:border-[#5968F5] focus:outline-none focus:ring-2 focus:ring-[#5968F5]/10 transition-all"
                        >
                          {INQUIRY_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#71717A] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Booking ID (optional) & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Booking ID */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="booking-id-input" className="block text-xs font-bold uppercase tracking-wider text-[#10102F]">
                          Booking ID
                        </label>
                        <span className="text-[11px] text-[#71717A] font-medium">Optional</span>
                      </div>
                      <input
                        type="text"
                        id="booking-id-input"
                        name="bookingId"
                        value={formData.bookingId}
                        onChange={handleChange}
                        placeholder="e.g. MDX-491028"
                        className="w-full h-12 px-4 rounded-xl bg-[#F8F9FC] border border-[#E7E7EB] text-sm font-mono text-[#10102F] placeholder-[#9D9EAF] focus:bg-white focus:border-[#5968F5] focus:outline-none focus:ring-2 focus:ring-[#5968F5]/10 transition-all"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject-input" className="block text-xs font-bold uppercase tracking-wider text-[#10102F] mb-2">
                        Subject <span className="text-[#5968F5]">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject-input"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Brief summary of your query"
                        className={`w-full h-12 px-4 rounded-xl bg-[#F8F9FC] border text-sm text-[#10102F] placeholder-[#9D9EAF] focus:bg-white focus:outline-none transition-all ${
                          errors.subject 
                            ? 'border-[#F43F5E] focus:ring-2 focus:ring-[#F43F5E]/20' 
                            : 'border-[#E7E7EB] focus:border-[#5968F5] focus:ring-2 focus:ring-[#5968F5]/10'
                        }`}
                      />
                      {errors.subject && (
                        <p className="mt-1.5 text-xs text-[#E11D48] font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.subject}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="message-input" className="block text-xs font-bold uppercase tracking-wider text-[#10102F]">
                        Message <span className="text-[#5968F5]">*</span>
                      </label>
                      <span className={`text-[11px] font-mono ${formData.message.length > 2800 ? 'text-[#E11D48] font-bold' : 'text-[#71717A]'}`}>
                        {formData.message.length} / 3,000
                      </span>
                    </div>
                    <textarea
                      id="message-input"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={3000}
                      placeholder="Please provide details about your booking, service query, or feedback so we can assist you efficiently..."
                      className={`w-full p-4 rounded-2xl bg-[#F8F9FC] border text-sm text-[#10102F] placeholder-[#9D9EAF] focus:bg-white focus:outline-none transition-all resize-y ${
                        errors.message 
                          ? 'border-[#F43F5E] focus:ring-2 focus:ring-[#F43F5E]/20' 
                          : 'border-[#E7E7EB] focus:border-[#5968F5] focus:ring-2 focus:ring-[#5968F5]/10'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-[#E11D48] font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="submit-contact-form-btn"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto min-w-[200px] h-13 px-8 rounded-xl bg-[#5968F5] hover:bg-[#4352E6] active:scale-[0.98] disabled:bg-[#5968F5]/60 disabled:cursor-not-allowed text-white text-[15px] font-bold shadow-[0_4px_20px_rgba(89,104,245,0.35)] transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                    <p className="text-[12px] text-[#71717A] mt-3">
                      By submitting, you agree to allow Mendx support representatives to contact you via email or phone regarding this inquiry.
                    </p>
                  </div>

                </form>

              </div>

            </div>

            {/* Sidebar Column (Right - 4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Highlighted Card: "Need Help With an Existing Booking?" */}
              <div className="bg-gradient-to-br from-[#10102F] to-[#1C1C4E] rounded-[28px] p-7 sm:p-8 text-white shadow-[0_12px_36px_rgba(16,16,47,0.15)] relative overflow-hidden">
                
                {/* Decorative badge watermark */}
                <div className="absolute right-[-10px] bottom-[-10px] text-white/5 select-none pointer-events-none">
                  <Calendar className="w-40 h-40" />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-[#24C99A] flex items-center justify-center mb-5 border border-white/10">
                    <Calendar className="w-6 h-6" />
                  </div>

                  <h3 className="text-[20px] font-bold tracking-tight mb-2">
                    Need Help With an Existing Booking?
                  </h3>

                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    Find your booking details, track technician arrival in real-time, or reschedule your service directly.
                  </p>

                  <button
                    type="button"
                    id="contact-view-my-bookings-btn"
                    onClick={() => setIsMyBookingsOpen(true)}
                    className="w-full h-12 px-5 rounded-xl bg-[#5968F5] hover:bg-[#4352E6] active:scale-[0.98] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>View My Bookings</span>
                  </button>
                </div>

              </div>

              {/* Service Guarantee Card */}
              <div className="bg-white rounded-[24px] p-6 border border-[#E7E7EB] shadow-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBFBF5] text-[#24C99A] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#10102F]">Mendx 30-Day Guarantee</h4>
                    <p className="text-xs text-[#71717A]">Quality guaranteed on all repairs</p>
                  </div>
                </div>
                <p className="text-xs text-[#5A5B6A] leading-relaxed">
                  Every booked service includes verified background-checked professionals, upfront transparent pricing, and our 30-day rework guarantee.
                </p>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-white rounded-[24px] p-6 border border-[#E7E7EB] shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-3">
                  Headquarters & Regional Ops
                </h4>
                <div className="text-xs text-[#10102F] space-y-1.5 font-medium">
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 text-[#5968F5] shrink-0 mt-0.5" />
                    <span>Mendx Home Services Tech Pvt. Ltd.</span>
                  </div>
                  <div className="pl-6 text-[#5A5B6A]">
                    Indiranagar Tech Hub, Bangalore, Karnataka 560038
                  </div>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mt-20 sm:mt-28">
          
          <div className="text-center max-w-[680px] mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E7EB] text-xs font-bold text-[#5968F5] shadow-xs mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-[800] text-[#10102F] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-[#5A5B6A] text-[15px] sm:text-[17px]">
              Quick answers to common questions about Mendx bookings, cancellations, and support.
            </p>
          </div>

          <div className="max-w-[840px] mx-auto space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={item.q}
                  className={`bg-white rounded-[20px] border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-[#5968F5]/40 shadow-[0_8px_24px_rgba(89,104,245,0.06)]' 
                      : 'border-[#E7E7EB] shadow-xs hover:border-[#5968F5]/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[16px] font-bold text-[#10102F]">
                      {item.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#5968F5] text-white' : 'bg-[#F8F9FC] text-[#71717A]'
                    }`}>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-[#5A5B6A] leading-relaxed border-t border-[#F0F2F5] animate-in fade-in duration-150">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 6. FINAL CALL TO ACTION */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="mt-20 sm:mt-28">
          <div className="w-full bg-gradient-to-r from-[#5968F5] via-[#4F5FE8] to-[#4352E6] rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 lg:p-16 text-white text-center shadow-[0_16px_40px_rgba(89,104,245,0.25)] relative overflow-hidden">
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#24C99A]/20 blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-[700px] mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white mb-4">
                Mendx Promise
              </span>
              <h2 className="text-[30px] sm:text-[42px] font-[800] tracking-tight leading-[1.15]">
                Your Comfort Matters to Us
              </h2>
              <p className="mt-4 text-white/90 text-[15px] sm:text-[17px] leading-relaxed max-w-[560px] mx-auto">
                From booking your first service to resolving a concern, we're here to make every step easier.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/services"
                  id="cta-explore-services-btn"
                  className="h-13 px-8 rounded-xl bg-white hover:bg-[#F8F9FC] text-[#5968F5] text-[15px] font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="h-13 px-7 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-[15px] font-bold transition-all"
                >
                  Talk to Our Team
                </button>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 7. FOOTER */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Footer 
        onOpenBooking={() => handleOpenBookingModal()} 
      />

      {/* Mobile Bottom Bar */}
      <MobileBottomNav
        activeTab="profile"
        onTabChange={handleTabChange}
      />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 8. INTERACTIVE MODALS */}
      {/* ═══════════════════════════════════════════════════════════ */}
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
      />

    </div>
  );
}
