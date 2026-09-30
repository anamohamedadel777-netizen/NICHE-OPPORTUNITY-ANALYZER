import React from 'react';
import { Heart, Sparkles, Compass, CheckCircle } from 'lucide-react';
import { DesiresMap } from '../types/niche';

interface DesireMapProps {
  desires: DesiresMap;
}

export const DesireMap: React.FC<DesireMapProps> = ({ desires }) => {
  return (
    <section id="section-desires" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5" />
          <span>DESIRE MAP • خريطة الرغبات</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
          الجمهور عايز يوصل لإيه؟
        </h3>
        <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
          الرغبة ليست مجرد "النجاح". الرغبة تنقسم إلى نتائج عملية ملموسة، ومشاعر راحة واستقرار، وتأثير مباشر على أسلوب الحياة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Functional Desires */}
        <div className="bg-[#040405] border border-[#23170D] rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#23170D] border border-[#4A2F15] flex items-center justify-center text-[#F5BF1E]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#797979] uppercase block">FUNCTIONAL</span>
              <h4 className="text-base font-extrabold text-[#FCFCFA]">رغبات وظيفية عملية</h4>
            </div>
          </div>
          <p className="text-xs text-[#797979] mb-4">
            نتائج محددة وقابلة للقياس يطلبها العميل مباشرة
          </p>

          <ul className="space-y-3">
            {desires.functional.map((d, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-[#C8C5BA] leading-relaxed">
                <CheckCircle className="w-4 h-4 text-[#F5BF1E] shrink-0 mt-0.5" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Emotional Desires */}
        <div className="bg-[#040405] border border-[#23170D] rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#23170D] border border-[#4A2F15] flex items-center justify-center text-[#FBD052]">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#797979] uppercase block">EMOTIONAL</span>
              <h4 className="text-base font-extrabold text-[#FCFCFA]">رغبات شعورية ونفسية</h4>
            </div>
          </div>
          <p className="text-xs text-[#797979] mb-4">
            كيف يريد العميل أن يشعر تجاه نفسه وأدائه
          </p>

          <ul className="space-y-3">
            {desires.emotional.map((d, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-[#C8C5BA] leading-relaxed">
                <CheckCircle className="w-4 h-4 text-[#FBD052] shrink-0 mt-0.5" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lifestyle Desires */}
        <div className="bg-[#040405] border border-[#23170D] rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#23170D] border border-[#4A2F15] flex items-center justify-center text-[#FCFCFA]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#797979] uppercase block">LIFESTYLE</span>
              <h4 className="text-base font-extrabold text-[#FCFCFA]">رغبات أسلوب الحياة</h4>
            </div>
          </div>
          <p className="text-xs text-[#797979] mb-4">
            التغيير الذي يطمح أن ينعكس على يومه وروتينه
          </p>

          <ul className="space-y-3">
            {desires.lifestyle.map((d, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-[#C8C5BA] leading-relaxed">
                <CheckCircle className="w-4 h-4 text-[#FCFCFA] shrink-0 mt-0.5" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
