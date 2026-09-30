import React, { useState } from 'react';
import { FileText, ArrowRight, Tag, ExternalLink, Target } from 'lucide-react';
import { ContentAngleItem } from '../types/niche';

interface ContentAnglesProps {
  angles: ContentAngleItem[];
}

export const ContentAngles: React.FC<ContentAnglesProps> = ({ angles }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'جميع الزوايا' },
    { key: 'Discovery', label: 'محتوى اكتشاف (Discovery)' },
    { key: 'Educational', label: 'محتوى تعليمي (Educational)' },
    { key: 'Problem', label: 'محتوى المشكلة (Problem)' },
    { key: 'Comparison', label: 'مقارنات (Comparison)' },
    { key: 'Review', label: 'مراجعات (Review)' },
    { key: 'Buyer Intent', label: 'نية شراء (Buyer Intent)' },
    { key: 'Authority', label: 'بناء سلطة وثقة (Authority)' },
  ];

  const filteredAngles =
    selectedCategory === 'all'
      ? angles
      : angles.filter((a) => a.category === selectedCategory);

  const getIntentStyle = (intent: 'Low' | 'Medium' | 'High') => {
    switch (intent) {
      case 'High':
        return 'bg-[#F5BF1E]/15 text-[#F5BF1E] border-[#F5BF1E]/40 font-bold';
      case 'Medium':
        return 'bg-[#23170D] text-[#FCFCFA] border-[#4A2F15]';
      case 'Low':
      default:
        return 'bg-[#23170D] text-[#797979] border-[#4A2F15]';
    }
  };

  return (
    <section id="section-content" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>CONTENT ANGLES • زوايا المحتوى الاستراتيجية</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
            زوايا المحتوى (أكثر من 15 زاوية نوعية)
          </h3>
          <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
            المحتوى التسويقي الفعال لا يقتصر على التعليم، بل يمزج بين التوعية، وتفكيك المشكلات، والمقارنات الصريحة الموجهة للشراء.
          </p>
        </div>

        <span className="text-xs text-[#797979] bg-[#040405] px-3 py-2 rounded-xl border border-[#23170D] shrink-0 font-mono">
          إجمالي الزوايا المتاحة: {angles.length}
        </span>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setSelectedCategory(c.key)}
            className={`text-xs px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-medium ${
              selectedCategory === c.key
                ? 'bg-[#F5BF1E] text-[#040405] font-bold border-[#F5BF1E]'
                : 'bg-[#040405] text-[#C8C5BA] border-[#23170D] hover:border-[#4A2F15]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Angles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAngles.map((angle, idx) => (
          <div
            key={idx}
            className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-2xl p-6 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#23170D] text-[#C8C5BA] border border-[#4A2F15]">
                  {angle.categoryArabic}
                </span>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md border ${getIntentStyle(
                    angle.intentLevel
                  )}`}
                >
                  نية الشراء: {angle.intentLevel === 'High' ? 'عالية' : angle.intentLevel === 'Medium' ? 'متوسطة' : 'منخفضة'}
                </span>
              </div>

              <h4 className="text-base font-extrabold text-[#FCFCFA] leading-snug mb-3">
                "{angle.title}"
              </h4>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#23170D] text-xs">
              <div>
                <span className="text-[#797979] font-bold block mb-0.5">
                  الجمهور المستهدف:
                </span>
                <span className="text-[#C8C5BA]">{angle.targetAudience}</span>
              </div>

              <div>
                <span className="text-[#F5BF1E] font-bold block mb-0.5">
                  الدعوة لاتخاذ إجراء (Possible CTA):
                </span>
                <span className="text-[#FCFCFA] font-medium">{angle.cta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
