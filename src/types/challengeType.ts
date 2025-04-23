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
    username: string;
    password: string;
    score: number;
    profilePicture: string;
    powens_token: string;
    transactions: TransactionType[];
    friends: userType[];
    articles: ArticleType[];
    likedArticles: ArticleType[];
    challenges: challengeType[];
};

export type challengeType = {
    id: number;
    title: string;
    description: string;
    image: string;
    company: companyType;
    category: ArticleCategoryType;
    users: userType[];
};

export const challengeData: challengeType = {
    id: 1,
    title: 'Challenge 1',
    description: 'Description 1',
    image: 'Image 1',
    company: {
        id: 1,
        name: 'Enterprise 1',
        logo: 'Logo 1',
        description: 'Description 1',
        creation_date: new Date(),
        challenges: [],
    },
    category: {
        id: 1,
        title: ArticleCategoriesEnum.BUDGET,
        description: 'Description 1',
        icon: 'https://via.placeholder.com/150',
        articles: [],
    },
    users: [],
};
