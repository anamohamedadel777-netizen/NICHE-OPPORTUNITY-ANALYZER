import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="p-4 sm:p-5 rounded-2xl bg-[#23170D]/40 border border-[#4A2F15] flex items-start gap-3.5 text-xs text-[#C8C5BA] leading-relaxed">
        <AlertTriangle className="w-5 h-5 text-[#F5BF1E] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#FCFCFA] block mb-1">
            تنبيه استراتيجي وإخلاء مسؤولية:
          </span>
          <p>
            التحليل هو <strong className="text-[#FBD052]">Niche Opportunity Assessment (تقييم فرصة النيتش)</strong> مبني على المعلومات التي تدخلها والتحليل الاستراتيجي المنطقي، وليس ضمانًا للطلب أو الربحية. يجب التحقق من السوق، الجمهور، المنتجات والطلب ببيانات حقيقية وأدوات بحث مستقلة قبل الاستثمار الكبير في الوقت أو المال.
          </p>
        </div>
      </div>
    </div>
  );
};
