import React from 'react';
import { Home, Sparkles, Calendar, User } from 'lucide-react';

export default function MobileBottomNav({
  activeTab = 'home',
  onTabChange,
  bookingBadge = 0,
}) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Sparkles },
    { id: 'bookings', label: 'Bookings', icon: Calendar, badge: bookingBadge },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E7EB] shadow-[0_-4px_20px_rgba(11,11,43,0.06)] pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex items-center justify-around h-[58px] px-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange && onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center h-full relative transition-all active:scale-95 ${
                isActive ? 'text-[#5669E8]' : 'text-[#71717A]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.9]'}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[15px] h-[15px] px-0.5 rounded-full bg-[#5669E8] text-white text-[9px] font-bold flex items-center justify-center leading-none shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className={`text-[10px] mt-1 tracking-tight leading-none ${isActive ? 'font-bold text-[#5669E8]' : 'font-medium'}`}>
                {tab.label}
              </span>

              {isActive && (
                <span className="absolute bottom-1 w-5 h-0.5 rounded-full bg-[#5669E8]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
