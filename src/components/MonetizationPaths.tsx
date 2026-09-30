import React from 'react';
import { DollarSign, CheckCircle2, TrendingUp, Info } from 'lucide-react';
import { MonetizationPath } from '../types/niche';

interface MonetizationPathsProps {
  paths: MonetizationPath[];
}

export const MonetizationPaths: React.FC<MonetizationPathsProps> = ({ paths }) => {
  return (
    <section id="section-monetization" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
          <DollarSign className="w-3.5 h-3.5" />
          <span>MONETIZATION PATHS • مسارات تحقيق الدخل الممكنة</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
          طرق محتملة لبناء Monetization (تحقيق الدخل)
        </h3>
        <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
          الربح ليس مساراً واحداً. هذه خيارات متوقعة منطقياً لهذا النيتش، مع التأكيد على أن كل مسار يتطلب وجود برامج عمولة حقيقية وشروط تتبع دقيقة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {paths.map((p, idx) => (
          <div
            key={idx}
            className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-2xl p-5 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="text-base font-extrabold text-[#FCFCFA] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#23170D] border border-[#4A2F15] text-xs font-mono font-bold text-[#F5BF1E] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{p.path}</span>
                </h4>

                <span className="text-[11px] px-2.5 py-0.5 rounded bg-[#23170D] text-[#FBD052] border border-[#4A2F15] font-semibold shrink-0">
                  {p.feasibility}
                </span>
              </div>

              <p className="text-xs text-[#C8C5BA] leading-relaxed pr-8 mb-2">
                {p.notes}
              </p>
            </div>

            <div className="pt-3 border-t border-[#23170D] flex items-center gap-2 text-[11px] text-[#797979]">
              <Info className="w-3.5 h-3.5 shrink-0 text-[#F5BF1E]" />
              <span>يتطلب التحقق من نسب العمولات وفترة الكوكيز (Cookie Duration) الحقيقية</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
