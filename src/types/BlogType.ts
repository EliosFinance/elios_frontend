export enum ArticleCategoriesEnum {
    EPARGNE = 'Epargne',
    INVESTISSEMENT = 'Investissement',
    VIDEOS = 'Vidéos',
    ACTUALITES = 'Actualités',
    IMMOBILIER = 'Immobilier',
    CRYPTO = 'Crypto',
    BOURSE = 'Bourse',
    FISCAL = 'Fiscal',
    RETRAITE = 'Retraite',
    ASSURANCE = 'Assurance',
    BANQUE = 'Banque',
    CREDIT = 'Crédit',
    BUDGET = 'Budget',
    EMPLOI = 'Emploi',
    ENTREPRENEURIAT = 'Entrepreneuriat',
    LIVRES = 'Livres',
    FORMATION = 'Formation',
    WEBINAIRE = 'Webinaire',
    EVENEMENT = 'Evénement',
    INTERVIEW = 'Interview',
    PODCAST = 'Podcast',
    MINDSET = 'Mindset',
    BIEN_ETRE = 'Bien-être',
    DEVELOPPEMENT_PERSONNEL = 'Développement personnel',
    COACHING = 'Coaching',
    SPIRITUALITE = 'Spiritualité',
    RELATION = 'Relation',
    FAMILLE = 'Famille',
    EDUCATION = 'Education',
}

export enum ArticleTypesEnum {
    PREVIEW = 'preview',
    SMALL_PREVIEW = 'small_preview',

    FULL = 'full',
    FULL_ROUNDED_IMAGE = 'full_rounded_image',

    PREMIUM = 'premium',
}

export enum ContentTypesEnum {
    TEXT = 'text',
    LIST = 'list',
    IMAGE = 'image',
    VIDEO = 'video',
    QUOTE = 'quote',
}

export type ArticleAuthorType = {
    firstName: string;
    lastName: string;
    avatar: string;
    job: string;
    company: string;
};

export type ContentType = {
    id: number;
    type: ContentTypesEnum;
    text?: string[];
    creation_date: string;
    update_date: string;
};

export type ArticleContentType = {
    id: number;
    image: string;
    title: string;
    type: ArticleTypesEnum;
    creation_date: string;
    update_date: string;
    reads: any[];
    saved: any[];
    article: ArticleType;
    contentType: ContentType[];
};

export type ArticleType = {
    id: number;
    slug: string;
    title: string;
    isPremium: boolean;
    category: ArticleCategoryType;
    reads: any[];
    likes: any[];
    saved: any[];
    readingTime: string;
    thumbnail: string;
    author: ArticleAuthorType;
    description: string;
    articleContent: ArticleContentType[];
};

export type ArticleCategoryType = {
    id: number;
    title: ArticleCategoriesEnum;
    description: string;
    icon: string;
    articles: ArticleType[];
};
