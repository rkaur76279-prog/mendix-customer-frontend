import React from 'react';
import ServiceCard from './ServiceCard';

export default function SubcategorySection({
  subcategory,
  onViewDetails,
  onBookNow,
}) {
  if (!subcategory || !subcategory.services || subcategory.services.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 sm:mb-10">
      {/* Subcategory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3.5 sm:mb-4 pb-2 border-b border-[#F0F2F5]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[17px] sm:text-[19px] font-[800] text-[#0B0B2B] tracking-tight">
              {subcategory.name}
            </h3>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EEF0FF] text-[#5669E8]">
              {subcategory.services.length} {subcategory.services.length === 1 ? 'service' : 'services'}
            </span>
          </div>

          {subcategory.description && (
            <p className="text-[12px] text-[#71717A] mt-0.5">
              {subcategory.description}
            </p>
          )}
        </div>
      </div>

      {/* Grid of Individual Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {subcategory.services.map((service) => (
          <ServiceCard
            key={service.id || service.name}
            service={service}
            onViewDetails={onViewDetails}
            onBookNow={onBookNow}
          />
        ))}
      </div>
    </section>
  );
}
