import React from 'react';
import { X, Search, Sparkles, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SearchResultsModal({ isOpen, onClose, query, location, results, onBookService }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[20px] max-w-[700px] w-full p-6 sm:p-8 shadow-2xl border border-[#E7E7EB] relative max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#F0F2F5]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6475E8]">
              <Sparkles className="w-3.5 h-3.5" /> Search Results
            </div>
            <h3 className="text-[22px] sm:text-[26px] font-bold text-[#10101B] tracking-tight mt-1">
              {query ? `Results for "${query}"` : 'All Available Services'}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#686975] mt-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#FF795B]" />
              <span>Location: {location || 'All Cities'}</span>
              <span>•</span>
              <span className="text-[#2FC493] font-semibold">{results?.length || 0} services verified</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E7E7EB] text-[#10101B] flex items-center justify-center transition-colors shrink-0"
            aria-label="Close search results"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {results && results.length > 0 ? (
            results.map((service, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#FAF7F3] hover:bg-[#FAF7F3]/80 border border-[#E7E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors group"
              >
                <div>
                  <h4 className="text-[17px] font-bold text-[#10101B] group-hover:text-[#6475E8] transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-xs text-[#686975] mt-1 line-clamp-2 max-w-[420px]">
                    {service.description || service.longDescription || 'Certified technician ready for same-day dispatch.'}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-bold text-[#6475E8] bg-white px-2 py-0.5 rounded border border-[#E7E7EB]">
                      {service.price || 'Instant Quote'}
                    </span>
                    <span className="text-[11px] text-[#00462F] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#2FC493]" /> Top Rated
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onBookService(service);
                  }}
                  className="h-10 px-4 bg-[#080821] hover:bg-[#3938AD] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shrink-0 transition-colors"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-[#92939C] mx-auto mb-3 opacity-60" />
              <p className="text-sm font-semibold text-[#10101B]">No matching services found</p>
              <p className="text-xs text-[#686975] mt-1">Try searching for "shelving", "leak", "clean", or "drywall".</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#F0F2F5] flex items-center justify-between text-xs text-[#686975]">
          <span>Need custom assistance? Call our concierge</span>
          <a href="tel:18005556363" className="font-bold text-[#6475E8] hover:underline">
            +1 (800) 555-MEND
          </a>
        </div>

      </div>
    </div>
  );
}
