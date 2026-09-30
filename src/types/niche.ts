export type TrafficSource =
  | 'YouTube'
  | 'Short-form Content'
  | 'SEO'
  | 'Email'
  | 'Paid Ads'
  | 'Combination'
  | 'Not sure';

export type ExistingAudience =
  | 'لا'
  | 'أقل من 1,000'
  | '1,000–10,000'
  | '10,000+'
  | 'مش مهم للتحليل';

export type ProductType =
  | 'Digital Products'
  | 'Software / SaaS'
  | 'Physical Products'
  | 'Services'
  | 'Subscriptions'
  | 'Courses'
  | 'Not sure';

export type BudgetOption =
  | '0 — Organic only'
  | 'Small'
  | 'Medium'
  | 'Paid validation available'
  | 'Prefer not to say';

export type GoalOption =
  | 'Build an audience'
  | 'Affiliate income'
  | 'Content business'
  | 'Email list'
  | 'Long-term brand'
  | 'Testing only';

export interface QuestionnaireState {
  niche: string;
  audience: string;
  primaryProblem: string;
  desiredOutcome: string;
  trafficSource: TrafficSource;
  existingAudience: ExistingAudience;
  productTypes: ProductType[];
  budget: BudgetOption;
  goal: GoalOption;
  affiliateProducts: string;
  additionalNotes: string;
}

export type DecisionType = 'EXPLORE' | 'NARROW' | 'VALIDATE';

export interface AudienceSegment {
  name: string;
  whoTheyAre: string;
  mainProblem: string;
  mainDesire: string;
  buyingSituation: string;
  priorityTag: string; // e.g. 'أسهل في الاستهداف (Easier to message)'
  isSuggested: boolean;
}

export interface ProblemItem {
  title: string;
  description: string;
  whyItMatters: string;
  contentPotential: string;
  solutionCategory: string;
}

export interface ProblemsMap {
  primary: ProblemItem[];
  secondary: ProblemItem[];
  emotional: ProblemItem[];
  practical: ProblemItem[];
  knowledgeGaps: ProblemItem[];
}

export interface DesiresMap {
  functional: string[];
  emotional: string[];
  lifestyle: string[];
}

export interface IntentItem {
  queryPattern: string;
  intent: string;
}

export interface BuyerIntentMapData {
  discovery: IntentItem[];
  problemAware: IntentItem[];
  solutionAware: IntentItem[];
  highIntent: IntentItem[];
}

export interface ProductCategory {
  categoryName: string;
  problemSolved: string;
  targetSegment: string;
  purchaseFrequency: string;
  commercialNature: string;
  contentAngle: string;
}

export interface OfferLadderItem {
  level: string;
  title: string;
  desc: string;
}

export interface ContentAngleItem {
  title: string;
  category: 'Discovery' | 'Educational' | 'Problem' | 'Comparison' | 'Review' | 'Buyer Intent' | 'Authority';
  categoryArabic: string;
  targetAudience: string;
  intentLevel: 'Low' | 'Medium' | 'High';
  cta: string;
}

export interface YouTubeIdea {
  title: string;
  hookAngle: string;
  targetPayoff: string;
}

export interface ShortFormIdea {
  hook: string;
  problem: string;
  microPayoff: string;
  cta: string;
}

export interface LeadMagnetIdea {
  name: string;
  type: string;
  typeArabic: string;
  problemSolved: string;
  quickWin: string;
  idealAudience: string;
  naturalNextOffer: string;
}

export interface FunnelStructure {
  name: string;
  steps: string[];
  whyItWorks: string;
}

export interface MonetizationPath {
  path: string;
  feasibility: string;
  notes: string;
}

export interface RiskItem {
  risk: string;
  whyItMatters: string;
  whatToVerify: string;
}

export interface PositioningAngle {
  angleName: string;
  formula: string;
  whyItIsStrong: string;
}

export interface DayPlanItem {
  day: number;
  title: string;
  task: string;
}

export interface WeekPlanItem {
  week: number;
  title: string;
  focus: string;
}

export interface OpportunityMatrixData {
  audienceClarity: 'Low' | 'Medium' | 'High';
  problemClarity: 'Low' | 'Medium' | 'High';
  buyerIntent: 'Low' | 'Medium' | 'High';
  contentDepth: 'Low' | 'Medium' | 'High';
  offerDiversity: 'Low' | 'Medium' | 'High';
  funnelPotential: 'Low' | 'Medium' | 'High';
  strategicRisk: 'Low' | 'Medium' | 'High';
}

export interface DimensionScores {
  audienceClarity: number; // 0-10
  problemDepth: number; // 0-10
  desiredOutcomes: number; // 0-10
  buyerIntentPotential: number; // 0-10
  offerDiversity: number; // 0-10
  contentDepth: number; // 0-10
  funnelPotential: number; // 0-10
  strategicRisk: number; // 0-10 (higher means higher risk)
}

export interface NicheAnalysisResult {
  summary: string;
  decisionFraming: string;
  audienceSegments: AudienceSegment[];
  problems: ProblemsMap;
  desires: DesiresMap;
  buyerIntent: BuyerIntentMapData;
  productCategories: ProductCategory[];
  offerLadder: OfferLadderItem[];
  contentAngles: ContentAngleItem[];
  youtubeIdeas: YouTubeIdea[];
  shortFormIdeas: ShortFormIdea[];
  leadMagnets: LeadMagnetIdea[];
  funnels: FunnelStructure[];
  monetizationPaths: MonetizationPath[];
  risks: RiskItem[];
  validationQuestions: string[];
  positioningAngles: PositioningAngle[];
  sevenDayPlan: DayPlanItem[];
  thirtyDayPlan: WeekPlanItem[];
  opportunityMatrix: OpportunityMatrixData;
  dimensionScores: DimensionScores;
  decision: DecisionType;
  decisionReasons: string[];

  // Deterministically computed:
  overallScore: number; // 0-100 derived from (sum/80)*100
  confidenceScore: number; // 0-100 based on questionnaire inputs specificity
  analyzedAt: string;
  userInputs: QuestionnaireState;
}
