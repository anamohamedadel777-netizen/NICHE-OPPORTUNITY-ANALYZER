import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NicheInput } from './components/NicheInput';
import { StrategicQuestionnaire } from './components/StrategicQuestionnaire';
import { AnalysisProgress } from './components/AnalysisProgress';
import { ResultHero } from './components/ResultHero';
import { NicheMap } from './components/NicheMap';
import { AudienceMap } from './components/AudienceMap';
import { ProblemMap } from './components/ProblemMap';
import { DesireMap } from './components/DesireMap';
import { BuyerIntentMap } from './components/BuyerIntentMap';
import { ProductOpportunityMap } from './components/ProductOpportunityMap';
import { ContentAngles } from './components/ContentAngles';
import { YouTubeIdeas } from './components/YouTubeIdeas';
import { ShortFormIdeas } from './components/ShortFormIdeas';
import { LeadMagnetIdeas } from './components/LeadMagnetIdeas';
import { FunnelMap } from './components/FunnelMap';
import { MonetizationPaths } from './components/MonetizationPaths';
import { RiskPanel } from './components/RiskPanel';
import { ValidationChecklist } from './components/ValidationChecklist';
import { QuestionsToResearch } from './components/QuestionsToResearch';
import { PositioningAngles } from './components/PositioningAngles';
import { NicheNarrowingTool } from './components/NicheNarrowingTool';
import { OpportunityMatrix } from './components/OpportunityMatrix';
import { DecisionPanel } from './components/DecisionPanel';
import { SevenDayPlan } from './components/SevenDayPlan';
import { ThirtyDayPlan } from './components/ThirtyDayPlan';
import { ShareableMap } from './components/ShareableMap';
import { MiniCourseCTA } from './components/MiniCourseCTA';
import { Disclaimer } from './components/Disclaimer';
import { Footer } from './components/Footer';

import { QuestionnaireState, NicheAnalysisResult } from './types/niche';
import { analyzeNicheOpportunity } from './services/analyzerService';

export default function App() {
  const [step, setStep] = useState<'input' | 'questionnaire' | 'analyzing' | 'results'>('input');
  const [currentNiche, setCurrentNiche] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<NicheAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // When user inputs a niche in the Hero / NicheInput
  const handleNicheSubmit = (niche: string) => {
    setCurrentNiche(niche);
    setStep('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When user completes the questionnaire
  const handleQuestionnaireSubmit = async (questionnaireState: QuestionnaireState) => {
    setIsLoading(true);
    setStep('analyzing');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const result = await analyzeNicheOpportunity(questionnaireState);
      setAnalysisResult(result);
      setStep('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error during analysis:', error);
      // Even on failure, service provides fallback
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to analyze another niche
  const handleReset = () => {
    setCurrentNiche('');
    setAnalysisResult(null);
    setStep('input');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#040405] text-[#FCFCFA] flex flex-col justify-between selection:bg-[#F5BF1E]/30 selection:text-[#FBD052]">
      {/* Top Header */}
      <Header onReset={handleReset} hasResult={step === 'results'} />

      <main className="flex-1 pb-16">
        {step === 'input' && (
          <>
            <Hero onStartClick={() => {
              const el = document.getElementById('niche-input-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />
            <NicheInput onSubmit={handleNicheSubmit} initialValue={currentNiche} />
            <Disclaimer />
          </>
        )}

        {step === 'questionnaire' && (
          <StrategicQuestionnaire
            niche={currentNiche}
            onSubmit={handleQuestionnaireSubmit}
            isLoading={isLoading}
            onBackToNiche={() => setStep('input')}
          />
        )}

        {step === 'analyzing' && <AnalysisProgress />}

        {step === 'results' && analysisResult && (
          <div className="space-y-4 animate-fade-in">
            {/* Result Hero Banner with Scores and Decision Framing */}
            <ResultHero result={analysisResult} />

            {/* Centerpiece Visualization: NICHE MAP */}
            <NicheMap result={analysisResult} onNodeClick={handleScrollToSection} />

            {/* Audience Map */}
            <AudienceMap
              segments={analysisResult.audienceSegments}
              userAudienceInput={analysisResult.userInputs.audience}
            />

            {/* Problem Map */}
            <ProblemMap problems={analysisResult.problems} />

            {/* Desire Map */}
            <DesireMap desires={analysisResult.desires} />

            {/* Buyer Intent Map */}
            <BuyerIntentMap buyerIntent={analysisResult.buyerIntent} />

            {/* Product Opportunity Map & Offer Ladder */}
            <ProductOpportunityMap
              categories={analysisResult.productCategories}
              offerLadder={analysisResult.offerLadder}
            />

            {/* Content Angles (15+ angles) */}
            <ContentAngles angles={analysisResult.contentAngles} />

            {/* YouTube Ideas (Always provided or featured) */}
            <YouTubeIdeas
              ideas={analysisResult.youtubeIdeas}
              isChannelSelected={analysisResult.userInputs.trafficSource === 'YouTube'}
            />

            {/* Short-form Hooks (10 scripts) */}
            <ShortFormIdeas
              ideas={analysisResult.shortFormIdeas}
              isChannelSelected={analysisResult.userInputs.trafficSource === 'Short-form Content'}
            />

            {/* Lead Magnet Opportunities */}
            <LeadMagnetIdeas leadMagnets={analysisResult.leadMagnets} />

            {/* Funnel Map */}
            <FunnelMap funnels={analysisResult.funnels} />

            {/* Monetization Paths */}
            <MonetizationPaths paths={analysisResult.monetizationPaths} />

            {/* Strategic Risks */}
            <RiskPanel risks={analysisResult.risks} />

            {/* Validation Checklist */}
            <ValidationChecklist />

            {/* 10 Strategic Research Questions */}
            <QuestionsToResearch questions={analysisResult.validationQuestions} />

            {/* Niche Positioning Angles */}
            <PositioningAngles angles={analysisResult.positioningAngles} />

            {/* Interactive Niche Narrowing Tool */}
            <NicheNarrowingTool initialBroadMarket={analysisResult.userInputs.niche} />

            {/* Opportunity Matrix */}
            <OpportunityMatrix
              matrix={analysisResult.opportunityMatrix}
              scores={analysisResult.dimensionScores}
            />

            {/* Decision Panel */}
            <DecisionPanel
              decision={analysisResult.decision}
              reasons={analysisResult.decisionReasons}
              overallScore={analysisResult.overallScore}
              confidenceScore={analysisResult.confidenceScore}
            />

            {/* 7-Day Action Plan */}
            <SevenDayPlan plan={analysisResult.sevenDayPlan} />

            {/* 30-Day Test Plan */}
            <ThirtyDayPlan plan={analysisResult.thirtyDayPlan} />

            {/* Shareable Summary Card */}
            <ShareableMap result={analysisResult} />

            {/* Mini Course Bridge & R.B.T.L.S Framework */}
            <MiniCourseCTA />

            {/* Strategic Disclaimer */}
            <Disclaimer />
          </div>
        )}
      </main>

      {/* Mohamed Adel Brand Footer */}
      <Footer />
    </div>
  );
}
