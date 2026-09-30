import React from 'react';
import { RotateCcw, Compass, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';

interface HeaderProps {
  onReset?: () => void;
  hasResult?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReset, hasResult }) => {
  return (
    <header className="w-full border-b border-[#23170D] bg-[#040405]/90 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A7690C] via-[#F5BF1E] to-[#FBD052] p-[1.5px] flex items-center justify-center shadow-lg shadow-[#F5BF1E]/10">
            <div className="w-full h-full bg-[#040405] rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#F5BF1E]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5BF1E]">
                {BRAND_CONFIG.brandName}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#23170D] text-[#C8C5BA] border border-[#4A2F15]">
                Strategy System
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-extrabold text-[#FCFCFA] leading-tight">
              {BRAND_CONFIG.appTitleAr}
              <span className="text-xs font-normal text-[#797979] mr-2 hidden md:inline">
                ({BRAND_CONFIG.appTitleEn})
              </span>
            </h1>
          </div>
        </div>

        {/* Action & Trust indicators */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#C8C5BA] bg-[#23170D]/60 px-3 py-1.5 rounded-lg border border-[#4A2F15]">
            <ShieldCheck className="w-4 h-4 text-[#F5BF1E]" />
            <span>تقييم فرصة استراتيجي • بدون وعود وهمية</span>
          </div>

          {hasResult && onReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs font-bold text-[#FBD052] hover:text-[#FCFCFA] bg-[#23170D] hover:bg-[#4A2F15] px-3.5 py-2 rounded-lg border border-[#F5BF1E]/30 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>حلل Niche جديد</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
