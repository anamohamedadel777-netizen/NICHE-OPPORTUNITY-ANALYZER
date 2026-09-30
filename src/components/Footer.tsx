import React from 'react';
import { Compass } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#23170D] bg-[#040405] py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#A7690C] via-[#F5BF1E] to-[#FBD052] p-[1px]">
            <div className="w-full h-full bg-[#040405] rounded-[5px] flex items-center justify-center">
              <Compass className="w-3.5 h-3.5 text-[#F5BF1E]" />
            </div>
          </div>
          <span className="font-extrabold text-[#FCFCFA] text-sm">
            {BRAND_CONFIG.brandName}
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-base sm:text-lg font-black text-[#F5BF1E] tracking-tight">
            {BRAND_CONFIG.brandSloganAr}
          </p>
          <p className="text-xs text-[#797979] font-mono uppercase tracking-wider">
            {BRAND_CONFIG.brandSloganEn}
          </p>
        </div>

        <p className="text-[11px] text-[#797979] pt-4 border-t border-[#23170D]/60 max-w-md mx-auto">
          جميع الحقوق محفوظة © {new Date().getFullYear()} • أداة تحليل وبناء Niche Map لممارسي التسويق بالعمولة المنظومي.
        </p>
      </div>
    </footer>
  );
};
