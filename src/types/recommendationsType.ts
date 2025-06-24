import { ChallengeType } from '@/temp/DefiData';
import { QuizzType } from '@/temp/QuizzData';
import { ArticleType } from './BlogType';

export type RecommendationUIState = {
    selectedCategories: string[];
    selectedContentTypes: string[];
    difficultyFilter: 'easy' | 'medium' | 'hard' | 'all';
    sortBy: 'relevance' | 'date' | 'popularity';
    viewMode: 'grid' | 'list' | 'cards';
};

export type FilteredRecommendations = {
    articles: ArticleType[];
    challenges: ChallengeType[];
    quizz: QuizzType[];
    totalCount: number;
    filteredCount: number;
};

export type RecommendationCard = {
    id: number;
    type: 'article' | 'challenge' | 'quizz';
    title: string;
    description: string;
    category: string;
    difficulty?: string;
    estimatedTime?: number;
    popularity: number;
    relevanceScore: number;
    thumbnail?: string;
    tags: string[];
};

export type RecommendationFilters = {
    categories: string[];
    contentTypes: ('articles' | 'challenges' | 'quizz')[];
    difficulty: ('easy' | 'medium' | 'hard')[];
    estimatedTime: { min: number; max: number };
    onlyNew: boolean;
    onlyTrending: boolean;
};

export type UserPreferences = {
    userId: number;
    favoriteCategories: CategoryPreference[];
    contentTypes: ContentTypePreference[];
    difficultyLevel: 'easy' | 'medium' | 'hard';
    activityScore: number;
    lastAnalyzed: Date;
};

export type CategoryPreference = {
    category: string;
    score: number;
    interactionCount: number;
};

export type ContentTypePreference = {
    type: 'articles' | 'challenges' | 'quizz';
    score: number;
    interactionCount: number;
};

export type PersonalizedContent = {
    articles: any[];
    challenges: any[];
    quizz: any[];
    algorithm?: string;
    explanation?: string;
    fromCache?: boolean;
};

export type UserInsights = {
    preferences: UserPreferences;
    insights: {
        summary: string;
        recommendations: string[];
        trends: string[];
        behaviorPatterns: any;
        anomalies: any;
        churnPrediction: any;
        optimalTiming: any;
    };
};

export type SimilarUser = {
    userId: number;
    similarityScore: number;
    commonInterests: string[];
};

export type BehaviorAnalysis = {
    patterns: any;
    anomalies: {
        anomalies: string[];
        suggestions: string[];
    };
    churnPrediction: {
        churnProbability: number;
        riskLevel: 'low' | 'medium' | 'high';
        reasons: string[];
        retentionActions: string[];
    };
    analysisDate: Date;
};

export type TimingOptimization = {
    bestTimes: { day: string; hour: number; score: number }[];
    nextRecommendationTime: Date;
    reasoning: string;
};

export type FeedbackData = {
    itemId: number;
    itemType: 'article' | 'challenge' | 'quizz';
    rating: number; // 1-5
    action: 'liked' | 'disliked' | 'ignored' | 'consumed';
    comment?: string;
};

export type CacheStats = {
    totalEntries: number;
    expiredEntries: number;
    hitRate: number;
    memoryUsage: string;
};

export type UserSpendingsPreferencesType = {
    financialProfile: {
        totalIncome: number;
        totalExpenses: number;
        savingsRate: number;
        topCategories: CategorySpending[];
        monthlyTrend: MonthlySpending[];
    };
    spendingPatterns: {
        averageTransactionAmount: number;
        transactionFrequency: number;
        highestSpendingDay: string;
        recurringExpenses: RecurringExpense[];
    };
    recommendations: {
        budgetOptimization: BudgetRecommendation[];
        savingsOpportunities: SavingsOpportunity[];
        riskAreas: RiskArea[];
    };
};

export type CategorySpending = {
    category: string;
    amount: number;
    percentage: number;
    transactionCount: number;
};

export type MonthlySpending = {
    month: string;
    income: number;
    expenses: number;
    savings: number;
};

export type RecurringExpense = {
    description: string;
    amount: number;
    frequency: 'weekly' | 'monthly' | 'quarterly';
    category: string;
};

export type BudgetRecommendation = {
    category: string;
    currentSpending: number;
    recommendedBudget: number;
    potentialSavings: number;
    priority: 'high' | 'medium' | 'low';
    description: string;
};

export type SavingsOpportunity = {
    type: string;
    description: string;
    potentialSavings: number;
    difficulty: 'easy' | 'medium' | 'hard';
    timeframe: string;
};

export type RiskArea = {
    type: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
    suggestion: string;
};

export type PersonalizedRecommendations = {
    articles: ArticleType[];
    challenges: ChallengeType[];
    quizz: QuizzType[];
};
