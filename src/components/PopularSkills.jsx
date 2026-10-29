import React, { useState } from 'react';
import { 
  ArrowRight, 
  Flame, 
  Paintbrush, 
  Wind, 
  Sparkles, 
  Droplet, 
  ShieldCheck, 
  Wrench, 
  Hammer,
  Zap,
  Thermometer,
  Layers,
  Cpu,
  PenTool,
  Settings,
  BatteryCharging,
  Sun,
  Volume2,
  Lock,
  Lightbulb,
  Shield
} from 'lucide-react';

const DIRECTORY_DATA = {
  popular: [
    { id: 'burner-services', title: 'Burner Services', category: 'Kitchen Appliance', icon: Flame, iconColor: '#FF795B' },
    { id: 'painting-service', title: 'Painting Service', category: 'Interior & Exterior', icon: Paintbrush, iconColor: '#6475E8' },
    { id: 'ac-cleaning', title: 'AC Cleaning', category: 'Climate & Air Quality', icon: Wind, iconColor: '#2FC493' },
    { id: 'carpet-cleaning', title: 'Carpet Cleaning', category: 'Deep Stain Extraction', icon: Sparkles, iconColor: '#E8B77E' },
    { id: 'bathroom-sanitization', title: 'Bathroom Sanitization', category: 'Steam Sterilization', icon: Droplet, iconColor: '#78B3E8' },
    { id: 'kitchen-cleaning', title: 'Kitchen Cleaning', category: 'Degrease & Sanitize', icon: ShieldCheck, iconColor: '#510D31' },
    { id: 'plumbing-sanitary', title: 'Plumbing & Sanitary Services', category: 'Pipes & Fixtures', icon: Wrench, iconColor: '#3938AD' },
    { id: 'drywall-repair', title: 'Drywall Repair', category: 'Patching & Sanding', icon: Hammer, iconColor: '#FF795B' }
  ],
  topSkills: [
    { id: 'master-electrician', title: 'Master Electrician', category: 'Panel Upgrades & EV', icon: Zap, iconColor: '#F1D94C' },
    { id: 'hvac-certified-tech', title: 'HVAC Certified Tech', category: 'Air Heat Pump Tuning', icon: Thermometer, iconColor: '#2FC493' },
    { id: 'tile-grout-specialist', title: 'Tile & Grout Specialist', category: 'Porcelain & Marble', icon: Layers, iconColor: '#6475E8' },
    { id: 'smart-home-integrator', title: 'Smart Home Integrator', category: 'Automated Lighting & Hubs', icon: Cpu, iconColor: '#3938AD' },
    { id: 'custom-cabinet-maker', title: 'Custom Cabinet Maker', category: 'Woodworking & Trim', icon: Hammer, iconColor: '#510D31' },
    { id: 'precision-pipe-fitter', title: 'Precision Pipe Fitter', category: 'Copper & PEX Lines', icon: Wrench, iconColor: '#78B3E8' },
    { id: 'drywall-finisher', title: 'Drywall Finisher', category: 'Level 5 Smooth Finish', icon: Paintbrush, iconColor: '#FF795B' },
    { id: 'appliance-diagnostics', title: 'Appliance Diagnostics Pro', category: 'Refrigeration & Washers', icon: Settings, iconColor: '#080821' }
  ],
  trendingSkills: [
    { id: 'ev-charger-install', title: 'EV Charger Installation', category: 'Level 2 Fast Chargers', icon: BatteryCharging, iconColor: '#2FC493' },
    { id: 'heat-pump-calibration', title: 'Heat Pump Calibration', category: 'Inverter Diagnostics', icon: Sun, iconColor: '#FF795B' },
    { id: 'soundproofing-install', title: 'Soundproofing Installation', category: 'Acoustic Wall Panels', icon: Volume2, iconColor: '#6475E8' },
    { id: 'water-filtration', title: 'Water Filtration Systems', category: 'Reverse Osmosis UV', icon: Droplet, iconColor: '#78B3E8' },
    { id: 'smart-lock-security', title: 'Smart Lock & Security Setup', category: 'Keyless Entry & Cams', icon: Lock, iconColor: '#3938AD' },
    { id: 'architectural-led-mapping', title: 'Architectural LED Mapping', category: 'Cove & Accent Lighting', icon: Lightbulb, iconColor: '#F1D94C' },
    { id: 'emergency-sump-pump', title: 'Emergency Sump Pump Servicing', category: 'Flood Defense Backup', icon: Shield, iconColor: '#510D31' },
    { id: 'energy-audit-weatherization', title: 'Energy Audit & Sealing', category: 'Thermal Leak Blocking', icon: Wind, iconColor: '#2FC493' }
  ]
};

export default function PopularSkills({ onSelectService }) {
  const [activeTab, setActiveTab] = useState('popular');

  const tabs = [
    { id: 'popular', label: 'Popular Services' },
    { id: 'topSkills', label: 'Top Skills' },
    { id: 'trendingSkills', label: 'Trending Skills' }
  ];

  const currentItems = DIRECTORY_DATA[activeTab] || DIRECTORY_DATA.popular;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
      
      {/* Functional Interactive Tab Headings */}
      <div className="flex flex-wrap items-center justify-start gap-x-3 sm:gap-x-5 gap-y-2 mb-10 sm:mb-14">
        {tabs.map((tab, idx) => (
          <React.Fragment key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`text-[26px] sm:text-[36px] md:text-[42px] font-[600] tracking-tight transition-all duration-200 text-left cursor-pointer ${
                activeTab === tab.id 
                  ? 'text-[#365CCF] underline underline-offset-8 decoration-[#365CCF]/40' 
                  : 'text-[#D1D4DB] hover:text-[#92939C]'
              }`}
            >
              {tab.label}
            </button>
            {idx < tabs.length - 1 && (
              <span className="text-[26px] sm:text-[36px] md:text-[42px] font-bold text-[#A0A4AE] select-none">
                ·
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Two-Column Grid with 8 Service Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {currentItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onSelectService && onSelectService(item)}
              className="bg-[#FAF8F5] hover:bg-[#A7C8F1] h-[100px] sm:h-[102px] rounded-[14px] px-5 sm:px-6 flex items-center justify-between cursor-pointer group transition-all duration-200 border border-[#E7E7EB]/50 hover:border-transparent hover:shadow-md"
            >
              {/* Left Title & Category */}
              <div className="pr-4">
                <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#171717] group-hover:text-[#080821] tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#686975] group-hover:text-[#080821]/80 mt-1 font-medium">
                  {item.category}
                </p>
              </div>

              {/* Right Illustration & Arrow */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                {/* Isolated Product-style Icon */}
                <div className="w-11 h-11 rounded-full bg-white/80 group-hover:bg-white flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105">
                  <Icon 
                    style={{ color: item.iconColor }} 
                    className="w-5 h-5 stroke-[2.2]" 
                  />
                </div>

                {/* Circular Arrow Button at Far Right */}
                <div className="w-10 h-10 rounded-full bg-white group-hover:bg-[#080821] group-hover:text-white text-[#10101B] flex items-center justify-center transition-all duration-200 shadow-xs">
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
