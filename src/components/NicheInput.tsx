import React, { useState } from 'react';
import { Search, Sparkles, ArrowLeft } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';

interface NicheInputProps {
  initialValue?: string;
  onSubmit: (niche: string) => void;
}

export const NicheInput: React.FC<NicheInputProps> = ({ initialValue = '', onSubmit }) => {
  const [niche, setNiche] = useState(initialValue);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) {
      setError('يرجى كتابة النيتش الذي ترغب في تحليله للبدء');
      return;
    }
    setError('');
    onSubmit(niche.trim());
  };

  const handleChipClick = (exampleLabel: string) => {
    setNiche(exampleLabel);
    setError('');
  };

  return (
    <section id="niche-input-section" className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-[#23170D]/50 border border-[#4A2F15] rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden backdrop-blur-sm">
        {/* Subtle decorative accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F5BF1E]/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="mb-6">
          <label
            htmlFor="niche-input-field"
            className="block text-lg sm:text-xl font-extrabold text-[#FCFCFA] mb-2"
          >
            اكتب الـNiche اللي بتفكر فيه
          </label>
          <p className="text-sm text-[#C8C5BA]">
            يمكنك كتابة اسم النيتش بالعربية أو الإنجليزية، عاماً أو مخصصاً. سنقوم بعدها بضبط الأسئلة الاستراتيجية لبناء خريطتك.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#797979]">
              <Search className="w-5 h-5 text-[#F5BF1E]" />
            </div>
            <input
              id="niche-input-field"
              type="text"
              value={niche}
              onChange={(e) => {
                setNiche(e.target.value);
                if (error) setError('');
              }}
              placeholder="مثال: Home Fitness أو AI Tools أو تعلم الإنجليزية..."
              className="w-full bg-[#040405] text-[#FCFCFA] placeholder-[#797979] text-base sm:text-lg rounded-2xl pr-12 pl-4 py-4 border border-[#4A2F15] focus:border-[#F5BF1E] focus:outline-none focus:ring-2 focus:ring-[#F5BF1E]/20 transition-all"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 font-medium pr-1">
              {error}
            </p>
          )}

          {/* Quick Examples */}
          <div className="pt-2">
            <div className="flex items-center gap-1.5 text-xs text-[#797979] mb-2 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#F5BF1E]" />
              <span>أمثلة سريعة للتجربة:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {BRAND_CONFIG.defaultNicheExamples.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleChipClick(item.label)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    niche === item.label
                      ? 'bg-[#F5BF1E] text-[#040405] font-bold border-[#F5BF1E]'
                      : 'bg-[#040405] text-[#C8C5BA] border-[#23170D] hover:border-[#4A2F15] hover:text-[#FCFCFA]'
                  }`}
                >
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-[11px] opacity-75 mr-1.5 hidden sm:inline">({item.ar})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#A7690C] via-[#F5BF1E] to-[#FBD052] text-[#040405] font-extrabold text-base shadow-lg shadow-[#F5BF1E]/15 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>ابدأ تحليل النيتش</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
