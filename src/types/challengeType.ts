import { ArticleCategoriesEnum, ArticleCategoryType, ArticleType } from '@/types/BlogType';
import { TransactionType } from '@/types/transactionType';

export type companyType = {
    id: number;
    name: string;
    logo: string;
    description: string;
    creation_date: Date;
    challenges: challengeType[];
};

export type userType = {
    id: number;
    email: string;
    username: string;
    password: string;
    score: number;
    avatarUrl: string;
    powens_token: string;
    transactions: TransactionType[];
    friends: userType[];
    articles: ArticleType[];
    likedArticles: ArticleType[];
    challenges: challengeType[];
    notification: NotificationType;
    emailVerified: boolean;
    pinConfigured: boolean;
    termsAccepted: boolean;
    profileComplete: boolean;
    provider: 'email' | 'google';
    creation_date: Date;

    // TODO: add more fields
    isPremium: boolean;
};

export type NotificationType = {
    id: number;
    accountSync: boolean;
    budget: boolean;
    expenses: boolean;
    learn: boolean;
    emails: boolean;
    push: boolean;
    friends: boolean;
    challenges: boolean;
    weeklyReport: boolean;
    monthlyReport: boolean;
};

export type challengeType = {
    id: number;
    title: string;
    description: string;
    image: string;
    company: companyType;
    category: ArticleCategoryType;
    userToChallenge: userToChallengeType[];
};

export type userToChallengeType = {
    id: number;
    user: {
        id: number;
        username: string;
        email: string;
    };
    currentState: 'START' | 'PROGRESS' | 'REWARD_TO_CLAIM' | 'REWARD_CLAIMED' | 'END';
    creation_date: Date;
    update_date: Date;
};
