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

const example_article: ArticleType = {
    id: 1,
    title: "Exemple d'article",
    thumbnail: 'https://images.unsplash.com/photo-1612831340830-0b5f4b7a7e3f',
    description: "Ceci est un exemple d'article",
    articleContent: [],
    author: {
        avatar: 'https://images.unsplash.com/photo-1612831340830-0b5f4b7a7e3f',
        firstName: 'John Doe',
        company: 'Elios',
        lastName: 'Doe',
        job: 'Développeur',
    },
    category: {
        id: 1,
        articles: [],
        title: ArticleCategoriesEnum.BUDGET,
        icon: 'https://images.unsplash.com/photo-1612831340830-0b5f4b7a7e3f',
        description: 'Ceci est un exemple de catégorie',
    },
    isPremium: false,
    likes: [],
    readingTime: '0',
    reads: [],
    saved: [],
    slug: 'exemple-article',
};

export const QUIZZ_DATA: QuizzType[] = [
    {
        id: 1,
        title: 'Les bases de la finance',
        image: 'https://images.unsplash.com/photo-1612831340830-0b5f4b7a7e3f',
        description: 'Ce quizz vous permettra de tester vos connaissances sur les bases de la finance',
        difficulty: QuizzDifficultyEnum.EASY,
        theme: ArticleCategoriesEnum.BUDGET,
        relatedArticles: [example_article, example_article, example_article],
        questions: [
            {
                id: 1,
                type: QuestionTypesEnum.MULTIPLE,
                question: 'Quelle est la définition de la finance ?',
                options: [
                    { id: 1, option: "La science de la gestion de l'argent", isCorrect: true },
                    { id: 2, option: 'La science de la gestion des biens', isCorrect: false },
                    { id: 3, option: 'La science de la gestion des ressources', isCorrect: false },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
            {
                id: 2,
                type: QuestionTypesEnum.BOOLEAN,
                question: 'La finance est-elle une science exacte ?',
                options: [
                    { id: 1, option: 'Vrai', isCorrect: true },
                    { id: 2, option: 'Faux', isCorrect: false },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
            {
                id: 3,
                type: QuestionTypesEnum.MULTIPLE,
                question: 'Quelle est la différence entre la finance et la comptabilité ?',
                options: [
                    {
                        id: 1,
                        option: 'La finance est une science exacte, la comptabilité est une science sociale',
                        isCorrect: false,
                    },
                    {
                        id: 2,
                        option: 'La finance est une science sociale, la comptabilité est une science exacte',
                        isCorrect: true,
                    },
                    {
                        id: 3,
                        option: 'La finance est une science exacte, la comptabilité est une science exacte',
                        isCorrect: false,
                    },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
            {
                id: 4,
                type: QuestionTypesEnum.BOOLEAN,
                question: 'La finance est-elle une science humaine ?',
                options: [
                    { id: 1, option: 'Vrai', isCorrect: true },
                    { id: 2, option: 'Faux', isCorrect: false },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
            {
                id: 5,
                type: QuestionTypesEnum.MULTIPLE,
                question: 'Quelle est la définition de la comptabilité ?',
                options: [
                    { id: 1, option: "La science de la gestion de l'argent", isCorrect: false },
                    { id: 2, option: 'La science de la gestion des biens', isCorrect: true },
                    { id: 3, option: 'La science de la gestion des ressources', isCorrect: false },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
            {
                id: 6,
                type: QuestionTypesEnum.BOOLEAN,
                question: 'La comptabilité est-elle une science exacte ?',
                options: [
                    { id: 1, option: 'Vrai', isCorrect: true },
                    { id: 2, option: 'Faux', isCorrect: false },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
            {
                id: 7,
                type: QuestionTypesEnum.MULTIPLE,
                question: 'Quelle est la différence entre la finance et la comptabilité ?',
                options: [
                    {
                        id: 1,
                        option: 'La finance est une science exacte, la comptabilité est une science sociale',
                        isCorrect: false,
                    },
                    {
                        id: 2,
                        option: 'La finance est une science sociale, la comptabilité est une science exacte',
                        isCorrect: true,
                    },
                    {
                        id: 3,
                        option: 'La finance est une science exacte, la comptabilité est une science exacte',
                        isCorrect: false,
                    },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
            {
                id: 8,
                type: QuestionTypesEnum.BOOLEAN,
                question: 'La finance est-elle une science humaine ?',
                options: [
                    { id: 1, option: 'Vrai', isCorrect: true },
                    { id: 2, option: 'Faux', isCorrect: false },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
        ],
        finishers: [],
    },
    {
        id: 2,
        title: 'Les bases de la comptabilité',
        image: 'https://images.unsplash.com/photo-1612831340830-0b5f4b7a7e3f',
        description: 'Ce quizz vous permettra de tester vos connaissances sur les bases de la comptabilité',
        difficulty: QuizzDifficultyEnum.EASY,
        theme: ArticleCategoriesEnum.BUDGET,
        relatedArticles: [example_article, example_article, example_article],
        questions: [
            {
                id: 1,
                type: QuestionTypesEnum.MULTIPLE,
                question: 'Quelle est la définition de la finance ?',
                options: [
                    { id: 1, option: "La science de la gestion de l'argent", isCorrect: false },
                    { id: 2, option: 'La science de la gestion des biens', isCorrect: true },
                    { id: 3, option: 'La science de la gestion des ressources', isCorrect: false },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
            {
                id: 2,
                type: QuestionTypesEnum.BOOLEAN,
                question: 'La finance est-elle une science exacte ?',
                options: [
                    { id: 1, option: 'Vrai', isCorrect: true },
                    { id: 2, option: 'Faux', isCorrect: false },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
            {
                id: 3,
                type: QuestionTypesEnum.MULTIPLE,
                question: 'Quelle est la différence entre la finance et la comptabilité ?',
                options: [
                    {
                        id: 1,
                        option: 'La finance est une science exacte, la comptabilité est une science sociale',
                        isCorrect: false,
                    },
                    {
                        id: 2,
                        option: 'La finance est une science sociale, la comptabilité est une science exacte',
                        isCorrect: true,
                    },
                    {
                        id: 3,
                        option: 'La finance est une science exacte, la comptabilité est une science exacte',
                        isCorrect: false,
                    },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
            {
                id: 4,
                type: QuestionTypesEnum.BOOLEAN,
                question: 'La finance est-elle une science humaine ?',
                options: [
                    { id: 1, option: 'Vrai', isCorrect: true },
                    { id: 2, option: 'Faux', isCorrect: false },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
            {
                id: 5,
                type: QuestionTypesEnum.MULTIPLE,
                question: 'Quelle est la définition de la comptabilité ?',
                options: [
                    { id: 1, option: "La science de la gestion de l'argent", isCorrect: false },
                    { id: 2, option: 'La science de la gestion des biens', isCorrect: true },
                    { id: 3, option: 'La science de la gestion des ressources', isCorrect: false },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
            {
                id: 6,
                type: QuestionTypesEnum.BOOLEAN,
                question: 'La comptabilité est-elle une science exacte ?',
                options: [
                    { id: 1, option: 'Vrai', isCorrect: true },
                    { id: 2, option: 'Faux', isCorrect: false },
                ],
                explanation:
                    "La finance est la science de la gestion de l'argent, elle étudie comment les individus, les entreprises et les gouvernements gèrent leurs ressources financières.",
            },
        ],
        finishers: [],
    },
];
