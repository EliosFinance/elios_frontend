import { ArticleCategoriesEnum, ArticleType, ArticleTypesEnum } from '@/types/BlogType';

export enum QuizzDifficultyEnum {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export enum QuestionTypesEnum {
    MULTIPLE = 'multiple',
    BOOLEAN = 'boolean',
    IMAGE = 'image',
}

export type QuizzType = {
    id: number;
    title: string;
    image: string;
    description: string;
    questions: QuestionType[];
    theme: ArticleCategoriesEnum;
    difficulty: QuizzDifficultyEnum;
    relatedArticles: ArticleType[];
    finishers: {
        id: number;
        username: string;
        email: string;
        lastScore: number;
    }[];
};

export type QuestionType = {
    id: number;
    type: QuestionTypesEnum;
    question: string;
    options: QuestionOptionType[];
    explanation: string;
};

export type QuestionOptionType = {
    id: number;
    option: string;
    isCorrect: boolean;
};
