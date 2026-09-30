import React, { useEffect, useState } from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';

const STEPS = [
  'جاري رسم الجمهور (Audience Mapping)',
  'جاري تحليل المشكلات (Problems Analysis)',
  'جاري بناء خريطة نية الشراء (Buyer Intent)',
  'جاري اكتشاف زوايا المحتوى (Content Angles)',
  'جاري بناء فرص الفانل (Funnel Opportunities)',
  'جاري تجهيز Niche Map (خريطة النيتش)',
];

export const AnalysisProgress: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="relative w-20 h-20 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-[#4A2F15] border-t-[#F5BF1E] animate-spin" />
        <div className="absolute inset-2 bg-[#23170D] rounded-full flex items-center justify-center">
          <Compass className="w-8 h-8 text-[#F5BF1E] animate-pulse" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-[#FCFCFA] mb-2">
        جاري تحليل فرصة النيتش استراتيجياً
      </h3>
      <p className="text-xs sm:text-sm text-[#797979] mb-8">
        نقوم بفحص زوايا الجمهور، المشكلات، ونية الشراء بدون توقعات ربحية مضللة
      </p>

      {/* Sequential Steps List without fake % */}
      <div className="space-y-3 text-right max-w-md mx-auto bg-[#23170D]/40 border border-[#4A2F15] rounded-2xl p-5">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <div
              key={step}
              className={`flex items-center justify-between text-xs sm:text-sm transition-all duration-300 py-1 ${
                isCurrent
                  ? 'text-[#F5BF1E] font-bold'
                  : isDone
                  ? 'text-[#C8C5BA]'
                  : 'text-[#797979]/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-[#F5BF1E] shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-[#F5BF1E] border-t-transparent animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-[#4A2F15] shrink-0" />
                )}
                <span>{step}</span>
              </div>
              <span className="text-[11px] opacity-75 font-mono">
                {isDone ? 'اكتمل' : isCurrent ? 'قيد المعالجة' : 'في الانتظار'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
