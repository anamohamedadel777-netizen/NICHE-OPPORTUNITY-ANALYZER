import React, { useState } from 'react';
import {
  Users,
  AlertCircle,
  Heart,
  TrendingUp,
  Package,
  FileText,
  Gift,
  GitFork,
  DollarSign,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { NicheAnalysisResult } from '../types/niche';

interface NicheMapProps {
  result: NicheAnalysisResult;
  onNodeClick?: (sectionId: string) => void;
}

interface MapNode {
  id: string;
  sectionId: string;
  titleAr: string;
  titleEn: string;
  icon: any;
  summary: string;
  metric: string;
  badge: string;
}

export const NicheMap: React.FC<NicheMapProps> = ({ result, onNodeClick }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes: MapNode[] = [
    {
      id: 'audience',
      sectionId: 'section-audience',
      titleAr: 'الجمهور',
      titleEn: 'AUDIENCE',
      icon: Users,
      summary: `${result.audienceSegments.length} شرائح مقترحة`,
      metric: `${result.audienceSegments[0]?.name.slice(0, 24)}...`,
      badge: 'الأساس',
    },
    {
      id: 'problems',
      sectionId: 'section-problems',
      titleAr: 'المشكلات',
      titleEn: 'PROBLEMS',
      icon: AlertCircle,
      summary: `${result.problems.primary.length + result.problems.secondary.length} مشكلات ملموسة`,
      metric: 'عملية وشعورية',
      badge: 'دافع الحل',
    },
    {
      id: 'desires',
      sectionId: 'section-desires',
      titleAr: 'الرغبات',
      titleEn: 'DESIRES',
      icon: Heart,
      summary: `${result.desires.functional.length + result.desires.emotional.length} رغبات وظيفية ونفسية`,
      metric: 'النتيجة المرغوبة',
      badge: 'الدافع',
    },
    {
      id: 'buyer-intent',
      sectionId: 'section-intent',
      titleAr: 'نية الشراء',
      titleEn: 'BUYER INTENT',
      icon: TrendingUp,
      summary: '4 مستويات وعي',
      metric: `${result.buyerIntent.highIntent.length} أنماط عالية النية`,
      badge: 'فرصة التحويل',
    },
    {
      id: 'products',
      sectionId: 'section-products',
      titleAr: 'المنتجات',
      titleEn: 'PRODUCTS',
      icon: Package,
      summary: `${result.productCategories.length} فئات منتجات`,
      metric: 'SaaS، كورسات، مادية',
      badge: 'نوع الحل',
    },
    {
      id: 'content',
      sectionId: 'section-content',
      titleAr: 'المحتوى',
      titleEn: 'CONTENT',
      icon: FileText,
      summary: `${result.contentAngles.length} زاوية محتوى`,
      metric: 'مقارنات وتعليم ومراجعات',
      badge: 'جذب الانتباه',
    },
    {
      id: 'lead-magnet',
      sectionId: 'section-lead-magnet',
      titleAr: 'الهدية المجانية',
      titleEn: 'LEAD MAGNET',
      icon: Gift,
      summary: `${result.leadMagnets.length} أفكار لليد ماجنت`,
      metric: 'حاسبات وقوائم فحص',
      badge: 'بناء الأصول',
    },
    {
      id: 'funnel',
      sectionId: 'section-funnel',
      titleAr: 'مسار التحويل',
      titleEn: 'FUNNEL',
      icon: GitFork,
      summary: `${result.funnels.length} مسارات مقترحة`,
      metric: 'من ترافيك إلى مشتري',
      badge: 'الهيكلة',
    },
    {
      id: 'offers',
      sectionId: 'section-offers',
      titleAr: 'سلم العروض',
      titleEn: 'OFFERS',
      icon: DollarSign,
      summary: 'سلم عروض خماسي',
      metric: 'مجاني -> مدخل -> رئيسي -> دوري',
      badge: 'الاستدامة',
    },
  ];

  const handleJump = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (onNodeClick) onNodeClick(sectionId);
  };

  return (
    <section id="section-niche-map" className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
          <span>CENTERPIECE VISUALIZATION</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#FCFCFA] mb-2">
          NICHE MAP • خريطة النيتش
        </h2>
        <p className="text-sm text-[#C8C5BA] max-w-2xl mx-auto">
          العلاقة التكاملية بين عناصر النيتش التسويقي. اضغط على أي عنصر للانتقال الفوري إلى تحليله التفصيلي.
        </p>
      </div>

      {/* Interactive Map Container */}
      <div className="bg-[#23170D]/30 border border-[#4A2F15] rounded-3xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-sm">
        {/* Subtle radial grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#4A2F15_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        {/* Center Node (NICHE) */}
        <div className="max-w-md mx-auto mb-10 text-center relative z-10">
          <div className="p-[2px] rounded-3xl bg-gradient-to-r from-[#A7690C] via-[#F5BF1E] to-[#FBD052] shadow-2xl shadow-[#F5BF1E]/15">
            <div className="bg-[#040405] rounded-[22px] p-6 text-center">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#F5BF1E] block mb-1">
                مركز الخريطة • THE NICHE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#FCFCFA]">
                {result.userInputs.niche}
              </h3>
              <p className="text-xs text-[#C8C5BA] mt-2">
                محور الاستهداف الذي تتصل به عناصر الجمهور والمشكلات والعروض
              </p>
            </div>
          </div>
        </div>

        {/* Desktop / Tablet Grid Connected Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {nodes.map((node) => {
            const Icon = node.icon;
            const isHovered = activeNode === node.id;

            return (
              <div
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                onClick={() => handleJump(node.sectionId)}
                className={`group relative bg-[#040405] border rounded-2xl p-5 transition-all duration-200 cursor-pointer ${
                  isHovered
                    ? 'border-[#F5BF1E] shadow-lg shadow-[#F5BF1E]/10 translate-y-[-2px]'
                    : 'border-[#23170D] hover:border-[#4A2F15]'
                }`}
              >
                {/* Node connector line indicator */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#23170D] border border-[#4A2F15] flex items-center justify-center text-[#F5BF1E] group-hover:bg-[#F5BF1E] group-hover:text-[#040405] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#797979] block">
                        {node.titleEn}
                      </span>
                      <h4 className="text-base font-extrabold text-[#FCFCFA]">
                        {node.titleAr}
                      </h4>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#23170D] text-[#FBD052] border border-[#4A2F15]">
                    {node.badge}
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#C8C5BA] mb-1">
                  {node.summary}
                </p>
                <p className="text-[11px] text-[#797979] truncate">
                  {node.metric}
                </p>

                <div className="mt-4 pt-3 border-t border-[#23170D] flex items-center justify-between text-[11px] text-[#797979] group-hover:text-[#F5BF1E] transition-colors">
                  <span>عرض التفاصيل في الأسفل</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Map footnote */}
        <div className="mt-8 text-center text-xs text-[#797979] flex items-center justify-center gap-2">
          <span>النيتش ليس جذاباً لمجرد شعبيته، بل بتوافق عناصره التسعة أعلاه.</span>
        </div>
      </div>
    </section>
  );
};
