import React, { useState } from 'react';
import { AlertCircle, Brain, Wrench, BookOpen, Layers, Lightbulb } from 'lucide-react';
import { ProblemsMap } from '../types/niche';

interface ProblemMapProps {
  problems: ProblemsMap;
}

export const ProblemMap: React.FC<ProblemMapProps> = ({ problems }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'primary' | 'emotional' | 'practical' | 'knowledgeGaps'>('all');

  const categories = [
    { key: 'all', label: 'الكل' },
    { key: 'primary', label: 'مشكلات أساسية وفرعية' },
    { key: 'emotional', label: 'مشكلات شعورية (Emotional)' },
    { key: 'practical', label: 'مشكلات عملية (Practical)' },
    { key: 'knowledgeGaps', label: 'نقص معرفة (Knowledge Gaps)' },
  ];

  const renderProblemCard = (item: any, typeLabel: string, typeBadgeClass: string, Icon: any) => (
    <div
      key={item.title}
      className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-2xl p-5 flex flex-col justify-between transition-all"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${typeBadgeClass}`}>
            {typeLabel}
          </span>
          <Icon className="w-4 h-4 text-[#F5BF1E]" />
        </div>

        <h4 className="text-base font-extrabold text-[#FCFCFA] mb-2 leading-snug">
          {item.title}
        </h4>
        <p className="text-xs text-[#C8C5BA] leading-relaxed mb-4">
          {item.description}
        </p>
      </div>

      <div className="space-y-2 pt-3 border-t border-[#23170D] text-[11px]">
        <div>
          <span className="text-[#797979] font-bold block">أهميتها للعميل (Why it matters):</span>
          <span className="text-[#C8C5BA]">{item.whyItMatters}</span>
        </div>

        <div>
          <span className="text-[#F5BF1E] font-bold block">زاوية المحتوى (Content Potential):</span>
          <span className="text-[#FCFCFA] font-medium">{item.contentPotential}</span>
        </div>

        <div>
          <span className="text-[#FBD052] font-bold block">فئة الحل المقترح (Solution Category):</span>
          <span className="text-[#C8C5BA]">{item.solutionCategory}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="section-problems" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>PROBLEM MAP • خريطة المشكلات</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
          المشكلات اللي ممكن تبني عليها المحتوى
        </h3>
        <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
          العميل لا يشتري المنتجات حباً فيها، بل يشتري حلولاً للتخفيف من ألمه أو إحباطه. تفكيك المشكلة هو جوهر أي محتوى مؤثر.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveTab(c.key as any)}
            className={`text-xs px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${
              activeTab === c.key
                ? 'bg-[#F5BF1E] text-[#040405] font-bold border-[#F5BF1E]'
                : 'bg-[#040405] text-[#C8C5BA] border-[#23170D] hover:border-[#4A2F15]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === 'all' || activeTab === 'primary') &&
          problems.primary.map((p) =>
            renderProblemCard(
              p,
              'مشكلة أساسية',
              'bg-[#F5BF1E]/10 text-[#F5BF1E] border-[#F5BF1E]/30',
              AlertCircle
            )
          )}

        {(activeTab === 'all' || activeTab === 'primary') &&
          problems.secondary.map((p) =>
            renderProblemCard(
              p,
              'مشكلة فرعية',
              'bg-[#23170D] text-[#C8C5BA] border-[#4A2F15]',
              Layers
            )
          )}

        {(activeTab === 'all' || activeTab === 'emotional') &&
          problems.emotional.map((p) =>
            renderProblemCard(
              p,
              'مشكلة شعورية',
              'bg-[#A7690C]/20 text-[#FBD052] border-[#F5BF1E]/40',
              Brain
            )
          )}

        {(activeTab === 'all' || activeTab === 'practical') &&
          problems.practical.map((p) =>
            renderProblemCard(
              p,
              'مشكلة عملية',
              'bg-[#23170D] text-[#FCFCFA] border-[#4A2F15]',
              Wrench
            )
          )}

        {(activeTab === 'all' || activeTab === 'knowledgeGaps') &&
          problems.knowledgeGaps.map((p) =>
            renderProblemCard(
              p,
              'نقص معرفة وتصور خاطئ',
              'bg-[#797979]/20 text-[#C8C5BA] border-[#797979]/40',
              BookOpen
            )
          )}
      </div>
    </section>
  );
};
