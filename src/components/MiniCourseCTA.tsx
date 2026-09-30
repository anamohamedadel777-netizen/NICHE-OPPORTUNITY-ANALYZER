import React from 'react';
import { PlayCircle, ArrowLeft, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';

export const MiniCourseCTA: React.FC = () => {
  const hasUrl = Boolean(BRAND_CONFIG.MINI_COURSE_URL && BRAND_CONFIG.MINI_COURSE_URL.trim() !== '');

  return (
    <section id="section-mini-course" className="py-16 px-4 max-w-5xl mx-auto border-t border-[#23170D]">
      {/* R.B.T.L.S Framework Connection */}
      <div className="bg-[#040405] border border-[#23170D] rounded-2xl p-6 mb-10 text-center">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#F5BF1E] font-bold mb-4">
          <Layers className="w-4 h-4" />
          <span>منظومة R.B.T.L.S للتسويق بالعمولة الاحترافي</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto mb-4">
          {BRAND_CONFIG.rbtls.map((step) => (
            <div
              key={step.letter}
              className={`p-3.5 rounded-xl border transition-all text-center ${
                step.active
                  ? 'bg-[#23170D] border-[#F5BF1E] ring-1 ring-[#F5BF1E]/40'
                  : 'bg-[#040405] border-[#23170D] opacity-60'
              }`}
            >
              <span className={`text-2xl font-black font-mono block ${step.active ? 'text-[#F5BF1E]' : 'text-[#797979]'}`}>
                {step.letter}
              </span>
              <span className="text-xs font-bold text-[#FCFCFA] block mt-1">
                {step.wordAr}
              </span>
              <span className="text-[10px] text-[#797979] font-mono">
                {step.wordEn}
              </span>
              {step.active && (
                <span className="mt-2 inline-block text-[9px] bg-[#F5BF1E] text-[#040405] px-1.5 py-0.5 rounded font-extrabold">
                  أنت هنا
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-[#C8C5BA]">
          <strong className="text-[#F5BF1E]">Niche Analysis</strong> جزء من مرحلة{' '}
          <strong className="text-[#FCFCFA]">Research (البحث)</strong> في منظومة التسويق بالعمولة الكاملة.
        </p>
      </div>

      {/* Main Mini Course Banner */}
      <div className="bg-gradient-to-br from-[#23170D] via-[#040405] to-[#23170D] border-2 border-[#4A2F15] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-[#F5BF1E]/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#040405] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FREE MINI COURSE • تدريب مجاني من 3 فيديوهات</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#FCFCFA] mb-4">
            اختيار الـNiche مجرد أول قرار
          </h3>

          <p className="text-sm sm:text-base text-[#C8C5BA] leading-relaxed mb-6">
            دلوقتي عندك <strong className="text-[#FCFCFA]">Niche Map (خريطة النيتش)</strong>. لكن المشروع لسه محتاج:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs font-bold text-[#FCFCFA] mb-8">
            {['Audience', 'Problem', 'Offer', 'Message', 'Funnel', 'Traffic', 'Tracking', 'Learning'].map((term) => (
              <span key={term} className="px-3 py-1.5 rounded-lg bg-[#040405] border border-[#4A2F15] text-[#FBD052]">
                {term}
              </span>
            ))}
          </div>

          <p className="text-sm text-[#C8C5BA] max-w-xl mx-auto mb-8">
            وده السبب إني عملت <strong className="text-[#FCFCFA]">ميني كورس مجاني من 3 فيديوهات</strong> بيرتبلك نظام الـ Affiliate Marketing كمنظومة أعمال قابلة للقياس والنمو.
          </p>

          {hasUrl ? (
            <a
              href={BRAND_CONFIG.MINI_COURSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#A7690C] via-[#F5BF1E] to-[#FBD052] text-[#040405] font-black text-base shadow-xl shadow-[#F5BF1E]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <PlayCircle className="w-5 h-5" />
              <span>ابدأ الميني كورس مجانًا</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          ) : (
            <div className="inline-block p-3 rounded-xl bg-[#23170D] border border-[#4A2F15] text-xs text-[#797979]">
              سيتم إضافة رابط الميني كورس هنا
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
