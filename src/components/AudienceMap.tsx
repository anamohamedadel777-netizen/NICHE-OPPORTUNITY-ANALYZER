import React, { useState } from 'react';
import { Users, Check, AlertTriangle, ArrowRight, Tag } from 'lucide-react';
import { AudienceSegment } from '../types/niche';

interface AudienceMapProps {
  segments: AudienceSegment[];
  userAudienceInput?: string;
}

export const AudienceMap: React.FC<AudienceMapProps> = ({ segments, userAudienceInput }) => {
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState<number | null>(0);

  const getPriorityBadgeStyle = (tag: string) => {
    if (tag.includes('Easier') || tag.includes('أسهل')) {
      return 'bg-[#F5BF1E]/10 text-[#F5BF1E] border-[#F5BF1E]/30';
    }
    if (tag.includes('Clearer') || tag.includes('أوضح')) {
      return 'bg-[#23170D] text-[#FCFCFA] border-[#4A2F15]';
    }
    if (tag.includes('intent') || tag.includes('شراء')) {
      return 'bg-[#A7690C]/20 text-[#FBD052] border-[#F5BF1E]/40';
    }
    return 'bg-[#797979]/20 text-[#C8C5BA] border-[#797979]/40';
  };

  return (
    <section id="section-audience" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>AUDIENCE MAP • خريطة الجمهور</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
            مين ممكن يكون جوه النيتش ده؟
          </h3>
          <p className="text-sm text-[#C8C5BA] mt-1">
            لا تخاطب الجميع برسالة واحدة. النيتش الواحد يتكون من شرائح تختلف في حدة المشكلة وسياق الشراء.
          </p>
        </div>

        <div className="text-xs text-[#797979] bg-[#040405] px-3 py-2 rounded-xl border border-[#23170D] shrink-0">
          <span>التصنيف استرشادي • القرار النهائي لك</span>
        </div>
      </div>

      {userAudienceInput && userAudienceInput !== 'مش محدد لسه' && (
        <div className="mb-6 p-4 rounded-xl bg-[#23170D]/40 border border-[#4A2F15] text-xs sm:text-sm text-[#C8C5BA] flex items-center justify-between gap-3">
          <div>
            <span className="text-[#F5BF1E] font-bold ml-1">مدخلاتك الأولية:</span>
            <span>"{userAudienceInput}"</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#040405] text-[#FCFCFA] text-xs border border-[#4A2F15] shrink-0">
            مذكور من المستخدم
          </span>
        </div>
      )}

      {/* Segments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {segments.map((seg, idx) => {
          const isSelected = selectedSegmentIndex === idx;

          return (
            <div
              key={seg.name}
              onClick={() => setSelectedSegmentIndex(idx)}
              className={`bg-[#040405] border rounded-2xl p-6 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-[#F5BF1E] shadow-xl shadow-[#F5BF1E]/5 ring-1 ring-[#F5BF1E]/30'
                  : 'border-[#23170D] hover:border-[#4A2F15]'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[#797979]">الشريحة 0{idx + 1}</span>
                    {seg.isSuggested && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#23170D] text-[#C8C5BA] border border-[#4A2F15]">
                        شرائح مقترحة
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-extrabold text-[#FCFCFA]">{seg.name}</h4>
                </div>

                <span
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold shrink-0 ${getPriorityBadgeStyle(
                    seg.priorityTag
                  )}`}
                >
                  {seg.priorityTag}
                </span>
              </div>

              {/* Who They Are */}
              <p className="text-sm text-[#C8C5BA] leading-relaxed mb-4">
                {seg.whoTheyAre}
              </p>

              {/* Details table inside card */}
              <div className="space-y-3 bg-[#23170D]/40 rounded-xl p-4 border border-[#23170D] text-xs">
                <div>
                  <span className="text-[#F5BF1E] font-bold block mb-0.5">
                    المشكلة الأساسية (Main Problem):
                  </span>
                  <span className="text-[#FCFCFA] leading-normal">{seg.mainProblem}</span>
                </div>

                <div>
                  <span className="text-[#FBD052] font-bold block mb-0.5">
                    الرغبة الأساسية (Main Desire):
                  </span>
                  <span className="text-[#FCFCFA] leading-normal">{seg.mainDesire}</span>
                </div>

                <div>
                  <span className="text-[#797979] font-bold block mb-0.5">
                    موقف الشراء المحتمل (Buying Situation):
                  </span>
                  <span className="text-[#C8C5BA] leading-normal">{seg.buyingSituation}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
