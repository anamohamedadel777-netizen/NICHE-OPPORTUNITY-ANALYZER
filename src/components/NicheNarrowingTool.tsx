import React, { useState } from 'react';
import { Sliders, Copy, Check, Sparkles, ArrowDown } from 'lucide-react';

interface NicheNarrowingToolProps {
  initialBroadMarket: string;
}

export const NicheNarrowingTool: React.FC<NicheNarrowingToolProps> = ({
  initialBroadMarket,
}) => {
  const [broadMarket, setBroadMarket] = useState(initialBroadMarket || 'Fitness');
  const [audience, setAudience] = useState('الموظفون والمحترفون المشغولون');
  const [problem, setProblem] = useState('ضيق الوقت والإرهاق بعد العمل');
  const [context, setContext] = useState('من المنزل بدون معدات باهظة');
  const [desiredOutcome, setDesiredOutcome] = useState('الحفاظ على اللياقة في 20 دقيقة يومياً');

  const [copied, setCopied] = useState(false);

  // Generate sharpened niche statement
  const sharpenedNiche = `${desiredOutcome} ${context} مخصص لـ (${audience})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sharpenedNiche);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="section-narrowing-tool" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="bg-[#23170D]/40 border border-[#4A2F15] rounded-3xl p-6 sm:p-10">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>INTERACTIVE NARROWING TOOL • أداة تضييق النيتش التفاعلية</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
            ضيّق النيتش (The 5-Step Formula)
          </h3>
          <p className="text-sm text-[#C8C5BA] mt-1">
            استخدم معادلة التضييق الخماسية لتحويل أي سوق عام واسع إلى نيتش محدد حاد يسهل اختراقه وتصدره.
          </p>
        </div>

        {/* 5 Steps Interactive Formula Builder */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
          {/* Step 1: Broad Market */}
          <div className="bg-[#040405] border border-[#23170D] rounded-2xl p-4">
            <span className="text-[10px] font-mono text-[#F5BF1E] block mb-1">
              01 • السوق العام (Market)
            </span>
            <label className="text-xs font-bold text-[#FCFCFA] block mb-2">
              السوق الكبير
            </label>
            <input
              type="text"
              value={broadMarket}
              onChange={(e) => setBroadMarket(e.target.value)}
              className="w-full bg-[#23170D]/60 text-[#FCFCFA] text-xs rounded-lg p-2.5 border border-[#4A2F15] focus:border-[#F5BF1E] focus:outline-none"
              placeholder="مثال: Fitness"
            />
          </div>

          {/* Step 2: Audience */}
          <div className="bg-[#040405] border border-[#23170D] rounded-2xl p-4">
            <span className="text-[10px] font-mono text-[#F5BF1E] block mb-1">
              02 • الشريحة (Audience)
            </span>
            <label className="text-xs font-bold text-[#FCFCFA] block mb-2">
              الجمهور المستهدف
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full bg-[#23170D]/60 text-[#FCFCFA] text-xs rounded-lg p-2.5 border border-[#4A2F15] focus:border-[#F5BF1E] focus:outline-none"
              placeholder="مثال: Busy Professionals"
            />
          </div>

          {/* Step 3: Problem */}
          <div className="bg-[#040405] border border-[#23170D] rounded-2xl p-4">
            <span className="text-[10px] font-mono text-[#F5BF1E] block mb-1">
              03 • العائق (Problem)
            </span>
            <label className="text-xs font-bold text-[#FCFCFA] block mb-2">
              المشكلة المحورية
            </label>
            <input
              type="text"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full bg-[#23170D]/60 text-[#FCFCFA] text-xs rounded-lg p-2.5 border border-[#4A2F15] focus:border-[#F5BF1E] focus:outline-none"
              placeholder="مثال: Lack of time"
            />
          </div>

          {/* Step 4: Context */}
          <div className="bg-[#040405] border border-[#23170D] rounded-2xl p-4">
            <span className="text-[10px] font-mono text-[#F5BF1E] block mb-1">
              04 • السياق (Context)
            </span>
            <label className="text-xs font-bold text-[#FCFCFA] block mb-2">
              بيئة التطبيق
            </label>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full bg-[#23170D]/60 text-[#FCFCFA] text-xs rounded-lg p-2.5 border border-[#4A2F15] focus:border-[#F5BF1E] focus:outline-none"
              placeholder="مثال: Home / Remote"
            />
          </div>

          {/* Step 5: Desired Outcome */}
          <div className="bg-[#040405] border border-[#23170D] rounded-2xl p-4">
            <span className="text-[10px] font-mono text-[#F5BF1E] block mb-1">
              05 • النتيجة (Outcome)
            </span>
            <label className="text-xs font-bold text-[#FCFCFA] block mb-2">
              النتيجة الملموسة
            </label>
            <input
              type="text"
              value={desiredOutcome}
              onChange={(e) => setDesiredOutcome(e.target.value)}
              className="w-full bg-[#23170D]/60 text-[#FCFCFA] text-xs rounded-lg p-2.5 border border-[#4A2F15] focus:border-[#F5BF1E] focus:outline-none"
              placeholder="مثال: 20-min daily routine"
            />
          </div>
        </div>

        {/* Generated Sharpened Statement Result Card */}
        <div className="bg-[#040405] border border-[#F5BF1E]/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-right">
            <span className="text-xs text-[#F5BF1E] font-bold uppercase tracking-wider block">
              النتيجة: صياغة النيتش المركزة والنهائية (Sharpened Niche Statement)
            </span>
            <h4 className="text-lg sm:text-xl font-extrabold text-[#FCFCFA]">
              "{sharpenedNiche}"
            </h4>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#23170D] hover:bg-[#4A2F15] text-[#FBD052] hover:text-[#FCFCFA] border border-[#F5BF1E]/30 text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ الصياغة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
