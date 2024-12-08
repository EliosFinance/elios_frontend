import { userType } from '@/types/challengeType';
import { companyType } from '@/types/challengeType';

export enum challengeCategoryEnum {
    BUDGET = 'BUDGET',
    INVESTISSEMENT = 'INVESTISSEMENT',
    ECONOMIE = 'ECONOMIE',
    FINANCE = 'FINANCE',
    PERSONNEL = 'PERSONNEL',
}

export enum RewardsEnum {
    EC = 'EC',
    XP = 'XP',
    BADGE = 'BADGE',
}

export type RewardsType = {
    id: number;
    title: string;
    description: string;
    reward: RewardsEnum;
    value: number;
    icon: string;
};

export type LeaderboardType = {
    rank: number;
    user: userType;
    score: number;
};

export type ChallengeType = {
    id: number;
    title: string;
    rewards: RewardsType[];
    backgroundImage: string;
    company: companyType;
    description: string;
    progress: number;
    total: number;
    leaderboard: LeaderboardType[];
    category: challengeCategoryEnum;
};

export const challenges: ChallengeType[] = [
    {
        id: 1,
        backgroundImage:
            'https://images.unsplash.com/photo-1726996155550-d69c6a9118b6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Grandissez votre delta positif !',
        rewards: [
            {
                id: 1,
                title: 'Grandissez votre delta positif !',
                description: "Apprenez le fonctionnement d'un éco-système...",
                reward: RewardsEnum.EC,
                value: 250,
                icon: 'https://via.placeholder.com/150',
            },
        ],
        company: {
            id: 1,
            name: 'Enterprise 1',
            logo: 'https://via.placeholder.com/150',
            description: 'Description 1',
            creation_date: new Date(),
            challenges: [],
        },
        description: "Apprenez le fonctionnement d'un éco-système...",
        progress: 1241,
        leaderboard: [
            {
                rank: 1,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 9999,
            },
            {
                rank: 2,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 1516,
            },
            {
                rank: 3,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 1500,
            },
            {
                rank: 4,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 45,
            },
            {
                rank: 5,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 5,
            },
            {
                rank: 6,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 3,
            },
            {
                rank: 7,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 1,
            },
        ],
        total: 0,
        category: challengeCategoryEnum.BUDGET,
    },
    {
        id: 2,
        backgroundImage:
            'https://images.unsplash.com/photo-1726996155550-d69c6a9118b6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Grandissez votre delta positif !',
        rewards: [
            {
                id: 1,
                title: 'Grandissez votre delta positif !',
                description: "Apprenez le fonctionnement d'un éco-système...",
                reward: RewardsEnum.EC,
                value: 250,
                icon: 'https://via.placeholder.com/150',
            },
        ],
        company: {
            id: 1,
            name: 'Enterprise 1',
            logo: 'https://via.placeholder.com/150',
            description: 'Description 1',
            creation_date: new Date(),
            challenges: [],
        },
        description: "Apprenez le fonctionnement d'un éco-système...",
        progress: 1241,
        leaderboard: [
            {
                rank: 1,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 9999,
            },
            {
                rank: 2,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 1516,
            },
            {
                rank: 3,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 1500,
            },
            {
                rank: 4,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 45,
            },
            {
                rank: 5,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 5,
            },
            {
                rank: 6,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 3,
            },
            {
                rank: 7,
                user: {
                    id: 1,
                    username: 'John Doe',
                    password: 'password',
                    powens_token: 'token',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 1,
            },
        ],
        total: 0,
        category: challengeCategoryEnum.BUDGET,
    },
];
