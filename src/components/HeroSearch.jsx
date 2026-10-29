import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, ChevronDown, Check, Sparkles, X } from 'lucide-react';

const CITIES = [
  'All Cities',
  'Mumbai',
  'Delhi NCR',
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Ahmedabad'
];

export default function HeroSearch({ onSearchSubmit, onSelectService }) {
  const [selectedLocation, setSelectedLocation] = useState('Mumbai');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsLocationOpen(false);
        setIsSuggestionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live search debounced query
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/services?q=${encodeURIComponent(searchTerm)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions((data.services || []).map(s => ({
            id: s._id,
            title: s.name,
            category: s.category,
            price: s.price || `₹${s.numericPrice}`,
            numericPrice: s.numericPrice
          })));
          setIsSuggestionsOpen(true);
        }
      } catch (err) {
        // Fallback filter
        const fallback = [
          { title: 'Full Home Deep Cleaning', category: 'Home Cleaning', price: 'from ₹1,499', numericPrice: 1499 },
          { title: 'Bathroom Deep Cleaning', category: 'Bathroom Cleaning', price: 'from ₹499', numericPrice: 499 },
          { title: 'Modular Kitchen Deep Degreasing', category: 'Kitchen Cleaning', price: 'from ₹899', numericPrice: 899 },
          { title: 'Leak Detection & Pipe Repair', category: 'Plumbing Services', price: 'from ₹299', numericPrice: 299 },
          { title: 'Electrical Inspection', category: 'Electrical Repairs', price: 'from ₹249', numericPrice: 249 },
          { title: 'AC Jet Service & Gas Charging', category: 'AC Installation and Repair', price: 'from ₹599', numericPrice: 599 },
          { title: 'Salon & Spa at Home', category: 'Salon at Home', price: 'from ₹699', numericPrice: 699 }
        ].filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setSuggestions(fallback);
        setIsSuggestionsOpen(true);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit({
        query: searchTerm,
        location: selectedLocation
      });
    }
    setIsSuggestionsOpen(false);
  };

  const handleSelectSuggestion = (item) => {
    setSearchTerm(item.title);
    setIsSuggestionsOpen(false);
    if (onSelectService) {
      onSelectService(item);
    }
  };

  return (
    <div className="w-full max-w-[720px] mx-auto relative z-30" ref={containerRef}>
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 bg-white/95 rounded-[16px] shadow-[0_8px_30px_rgba(8,8,33,0.08)] border border-[#E7E7EB] backdrop-blur-md transition-all focus-within:shadow-[0_10px_35px_rgba(100,117,232,0.18)] focus-within:border-[#6475E8]/60"
      >
        {/* A. Location Selector */}
        <div className="relative shrink-0 sm:w-[165px]">
          <button
            type="button"
            onClick={() => {
              setIsLocationOpen(!isLocationOpen);
              setIsSuggestionsOpen(false);
            }}
            className="w-full h-[48px] sm:h-[50px] px-3 flex items-center justify-between text-left rounded-[10px] bg-[#F0F2F5]/80 hover:bg-[#F0F2F5] transition-colors border border-transparent focus:outline-none focus:ring-1 focus:ring-[#6475E8]"
            aria-label="Select location"
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-4 h-4 text-[#6475E8] shrink-0" />
              <div className="truncate">
                <span className="block text-[10px] font-semibold uppercase text-[#92939C] leading-none mb-0.5">Location</span>
                <span className="block text-xs sm:text-[13px] font-medium text-[#10101B] truncate">
                  {selectedLocation}
                </span>
              </div>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-[#686975] shrink-0 transition-transform ${isLocationOpen ? 'rotate-180 text-[#6475E8]' : ''}`} />
          </button>

          {/* Location Dropdown */}
          {isLocationOpen && (
            <div className="absolute top-[calc(100%+6px)] left-0 w-full sm:w-[220px] bg-white rounded-[12px] p-2 shadow-[0_12px_32px_rgba(8,8,33,0.15)] border border-[#E7E7EB] z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-semibold text-[#92939C] uppercase px-2 py-1">Available Cities</div>
              <div className="max-h-52 overflow-y-auto space-y-1 pt-1">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(city);
                      setIsLocationOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                      selectedLocation === city ? 'bg-[#E9E8FF] text-[#3938AD]' : 'hover:bg-[#FAF7F3] text-[#10101B]'
                    }`}
                  >
                    <span>{city}</span>
                    {selectedLocation === city && <Check className="w-3.5 h-3.5 text-[#3938AD]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vertical divider on desktop */}
        <div className="hidden sm:block w-[1px] h-8 bg-[#E7E7EB] mx-0.5" />

        {/* B. Service Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setIsSuggestionsOpen(true);
            }}
            placeholder="What services are you looking for?"
            className="w-full h-[48px] sm:h-[50px] px-3.5 bg-transparent text-[#10101B] placeholder-[#92939C] text-[14px] sm:text-[15px] font-normal focus:outline-none"
            aria-label="Service search"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSuggestions([]);
                setIsSuggestionsOpen(false);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#92939C] hover:text-[#10101B] rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* C. Search Button */}
        <button
          type="submit"
          className="h-[48px] sm:h-[50px] px-6 bg-[#080821] hover:bg-[#3938AD] active:scale-[0.98] text-white font-medium text-[15px] rounded-[10px] flex items-center justify-center gap-2 transition-all duration-200 shrink-0 shadow-sm"
        >
          <Search className="w-4 h-4 text-white" />
          <span>Search</span>
        </button>
      </form>

      {/* Live Suggestions Dropdown */}
      {isSuggestionsOpen && suggestions.length > 0 && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-[14px] p-3 shadow-[0_16px_36px_rgba(8,8,33,0.15)] border border-[#E7E7EB] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-[#F0F2F5] text-xs font-semibold text-[#92939C]">
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#6475E8]" /> Matching Services</span>
            <span>{suggestions.length} found</span>
          </div>
          <div className="max-h-64 overflow-y-auto divide-y divide-[#F0F2F5]">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="w-full flex items-center justify-between p-2.5 hover:bg-[#FAF7F3] rounded-lg text-left transition-colors group"
              >
                <div>
                  <div className="text-sm font-semibold text-[#10101B] group-hover:text-[#6475E8]">{item.title}</div>
                  <div className="text-xs text-[#686975] line-clamp-1">{item.description || item.category || 'Professional home service'}</div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className="text-xs font-bold text-[#6475E8] block">{item.price || 'Instant Quote'}</span>
                  <span className="text-[11px] text-[#2FC493] font-medium">Available now</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
