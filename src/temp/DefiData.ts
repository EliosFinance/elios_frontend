// temp/DefiData.ts
import { companyType, userType } from '@/types/challengeType';

export enum challengeCategoryEnum {
    BUDGET = 'BUDGET',
    INVESTISSEMENT = 'INVESTISSEMENT',
    ECONOMIE = 'ECONOMIE',
    FINANCE = 'FINANCE',
    PERSONNEL = 'PERSONNEL',
}

export type ChallengeStatus = 'DEFAULT' | 'START' | 'COMPLETED';

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
    userStatus?: ChallengeStatus;
};

export const challenges: ChallengeType[] = [
    {
        id: 1,
        title: 'Grandissez votre delta positif !',
        backgroundImage: 'https://images.unsplash.com/photo-1573164574601-8b3d01bab9b3?auto=format&q=80&w=400',
        rewards: [
            {
                id: 1,
                title: 'Économisez 250 €',
                description: 'Apprenez à mettre de côté chaque mois…',
                reward: RewardsEnum.EC,
                value: 250,
                icon: 'https://via.placeholder.com/40',
            },
        ],
        company: {
            id: 1,
            name: 'Enterprise 1',
            logo: 'https://via.placeholder.com/80',
            description: 'Entreprise fictive spécialisée dans la finance',
            creation_date: new Date(),
            challenges: [],
        },
        description: 'Atteignez un objectif d’épargne en quelques semaines.',
        progress: 1241,
        total: 3000,
        leaderboard: [
            {
                rank: 1,
                user: {
                    id: 1,
                    username: 'Alice',
                    password: 'password',
                    score: 120,
                    profilePicture: 'null',
                    powens_token: 'string',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 950,
            },
            {
                rank: 2,
                user: {
                    id: 2,
                    username: 'Bob',
                    password: 'password',
                    score: 98,
                    profilePicture: 'null',
                    powens_token: 'string',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 600,
            },
            {
                rank: 3,
                user: {
                    id: 3,
                    username: 'Charlie',
                    password: 'password',
                    score: 80,
                    profilePicture: 'null',
                    powens_token: 'string',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 250,
            },
        ],
        category: challengeCategoryEnum.BUDGET,
        userStatus: 'START',
    },
    {
        id: 2,
        title: 'Gérez vos dépenses en 7 jours',
        backgroundImage: 'https://images.unsplash.com/photo-1610092374657-6aab0b236edb?auto=format&q=80&w=400',
        rewards: [
            {
                id: 2,
                title: 'Obtenez un badge “Économe”',
                description: "Pour récompenser l'effort sur vos dépenses",
                reward: RewardsEnum.BADGE,
                value: 1,
                icon: 'https://via.placeholder.com/40',
            },
        ],
        company: {
            id: 2,
            name: 'Enterprise 2',
            logo: 'https://via.placeholder.com/80',
            description: 'Entreprise fictive de conseils en budget',
            creation_date: new Date(),
            challenges: [],
        },
        description: 'Pendant 7 jours, suivez un plan d’action pour réduire vos sorties d’argent.',
        progress: 100,
        total: 700,
        leaderboard: [
            {
                rank: 1,
                user: {
                    id: 5,
                    username: 'Dana',
                    password: 'password',
                    score: 50,
                    profilePicture: 'null',
                    powens_token: 'string',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 300,
            },
            {
                rank: 2,
                user: {
                    id: 6,
                    username: 'Elvis',
                    password: 'password',
                    score: 45,
                    profilePicture: 'null',
                    powens_token: 'string',
                    transactions: [],
                    friends: [],
                    articles: [],
                    likedArticles: [],
                    challenges: [],
                },
                score: 200,
            },
        ],
        category: challengeCategoryEnum.BUDGET,
        userStatus: 'DEFAULT',
    },
    {
        id: 3,
        title: 'Tentez le zéro dépenses superflues',
        backgroundImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&q=80&w=400',
        rewards: [
            {
                id: 3,
                title: 'Gagnez +100 XP',
                description: 'Une expérience valorisante',
                reward: RewardsEnum.XP,
                value: 100,
                icon: 'https://via.placeholder.com/40',
            },
        ],
        company: {
            id: 3,
            name: 'Enterprise 3',
            logo: 'https://via.placeholder.com/80',
            description: 'Entreprise fictive – Coaching finances personnelles',
            creation_date: new Date(),
            challenges: [],
        },
        description: 'Réduisez vos dépenses inutiles en identifiant celles-ci et en adoptant de nouvelles habitudes.',
        progress: 0,
        total: 1000,
        leaderboard: [],
        category: challengeCategoryEnum.BUDGET,
        userStatus: 'COMPLETED',
    },
];
