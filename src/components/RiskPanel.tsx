import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';
import { RiskItem } from '../types/niche';

interface RiskPanelProps {
  risks: RiskItem[];
}

export const RiskPanel: React.FC<RiskPanelProps> = ({ risks }) => {
  return (
    <section id="section-risks" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>STRATEGIC RISKS • فخاخ ومخاطر النيتش</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
          إيه اللي محتاج تخلي بالك منه؟
        </h3>
        <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
          فهم المخاطر مسبقاً يحميك من إضاعة شهور في سوق مسدود أو معتمد على عرض واحد قد يختفي في أي لحظة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {risks.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-2xl p-6 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-sm font-extrabold text-[#FCFCFA]">
                <div className="w-7 h-7 rounded-lg bg-[#23170D] border border-[#4A2F15] flex items-center justify-center text-[#F5BF1E] shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span>{item.risk}</span>
              </div>

              <div className="space-y-3 pt-2 text-xs bg-[#23170D]/40 p-4 rounded-xl border border-[#23170D]">
                <div>
                  <span className="text-[#FBD052] font-bold block mb-1">
                    لماذا يعد هذا خطراً؟ (Why it matters):
                  </span>
                  <p className="text-[#C8C5BA] leading-relaxed">
                    {item.whyItMatters}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#23170D]">
                  <span className="text-[#FCFCFA] font-bold block mb-1 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#F5BF1E]" />
                    ما الذي يجب التحقق منه عملياً؟ (What to verify):
                  </span>
                  <p className="text-[#C8C5BA] leading-relaxed">
                    {item.whatToVerify}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
