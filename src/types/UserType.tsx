import { ChallengeType } from '@/temp/DefiData';
import { QuizzType } from '@/temp/QuizzData';
import { ArticleType } from './BlogType';
import { TransactionType } from './transactionType';

export type UserCompletionStatus = {
    emailVerified: boolean;
    pinConfigured: boolean;
    termsAccepted: boolean;
    profileComplete: boolean;
    provider: 'email' | 'google';
    registrationDate: Date;
    nextSteps: string[];
};

export type FriendsType = {
    id: string;
    profilePicture: string;
    username: string;
    email: string;
    friends: FriendsType[];
    articles: ArticleType[];
    likedArticles: ArticleType[];
    readArticles: ArticleType[];
    transactions: TransactionType[];
    userToChallenge: UserToChallengeType[];
};

export type UserToChallengeType = {
    id: number;
    challenge: ChallengeType;
    user: FriendsType;
    currentState: string | null;
    creation_date: Date;
    update_date: Date;
};

// User recommendations ↓

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
