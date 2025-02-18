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

// export const subjects: ArticleType[] = [
//     {
//         id: 1,
//         isPremium: false,
//         slug: 'comment-bien-epargner-by-jean-dupont',
//         title: 'Comment bien épargner ?',
//         category: {
//             id: 1,
//             title: ArticleCategoriesEnum.EPARGNE,
//             description:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//             icon: 'https://via.placeholder.com/150',
//         },
//         readByUser: false,
//         likedByUser: false,
//         savedByUser: false,
//         readingTime: '15min',
//         categoryIcon: 'https://via.placeholder.com/150',
//         thumbnail: 'https://via.placeholder.com/150',
//         likes_count: 541,
//         reads_count: 10531,
//         author: {
//             firstName: 'Jean',
//             lastName: 'Dupont',
//             avatar: 'https://via.placeholder.com/150',
//             job: 'Conseiller en gestion de patrimoine',
//             company: 'Elios Patrimoine',
//         },
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin necvehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//         cards: [
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.QUOTE,
//                         quoteAuthor: {
//                             firstName: 'Jean',
//                             lastName: 'Dupont',
//                             avatar: 'https://via.placeholder.com/150',
//                             job: 'Conseiller en gestion de patrimoine',
//                             company: 'Elios Patrimoine',
//                         },
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: 2,
//         isPremium: false,
//         slug: 'comment-bien-epargner-by-jean-dupont',
//         title: 'Comment bien épargner ?',
//         category: {
//             id: 2,
//             title: ArticleCategoriesEnum.INVESTISSEMENT,
//             description:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//             icon: 'https://via.placeholder.com/150',
//         },
//         readByUser: false,
//         likedByUser: false,
//         savedByUser: false,
//         readingTime: '15min',
//         thumbnail: 'https://via.placeholder.com/150',
//         likes_count: 541,
//         reads_count: 10531,
//         author: {
//             firstName: 'Jean',
//             lastName: 'Dupont',
//             avatar: 'https://via.placeholder.com/150',
//             job: 'Conseiller en gestion de patrimoine',
//             company: 'Elios Patrimoine',
//         },
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin necvehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//         cards: [
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.QUOTE,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: 3,
//         isPremium: false,
//         slug: 'comment-bien-epargner-by-jean-dupont',
//         title: 'Comment bien épargner ?',
//         category: {
//             id: 3,
//             title: ArticleCategoriesEnum.EPARGNE,
//             description:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//             icon: 'https://via.placeholder.com/150',
//         },
//         readByUser: false,
//         likedByUser: false,
//         savedByUser: false,
//         readingTime: '15min',
//         thumbnail: 'https://via.placeholder.com/150',
//         likes_count: 541,
//         reads_count: 10531,
//         author: {
//             firstName: 'Jean',
//             lastName: 'Dupont',
//             avatar: 'https://via.placeholder.com/150',
//             job: 'Conseiller en gestion de patrimoine',
//             company: 'Elios Patrimoine',
//         },
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin necvehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//         cards: [
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.QUOTE,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: 4,
//         isPremium: false,
//         slug: 'comment-bien-epargner-by-jean-dupont',
//         title: 'Comment bien épargner ?',
//         category: {
//             id: 3,
//             title: ArticleCategoriesEnum.EPARGNE,
//             description:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//             icon: 'https://via.placeholder.com/150',
//         },
//         likedByUser: false,
//         savedByUser: false,
//         readingTime: '15min',
//         thumbnail: 'https://via.placeholder.com/150',
//         likes_count: 541,
//         reads_count: 10531,
//         author: {
//             firstName: 'Jean',
//             lastName: 'Dupont',
//             avatar: 'https://via.placeholder.com/150',
//             job: 'Conseiller en gestion de patrimoine',
//             company: 'Elios Patrimoine',
//         },
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin necvehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//         cards: [
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.QUOTE,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//         ],
//         readByUser: false,
//     },
//     {
//         id: 5,
//         isPremium: false,
//         slug: 'comment-bien-epargner-by-jean-dupont',
//         title: 'Comment bien épargner ?',
//         category: {
//             id: 3,
//             title: ArticleCategoriesEnum.EPARGNE,
//             description:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//             icon: 'https://via.placeholder.com/150',
//         },
//         readByUser: false,
//         likedByUser: false,
//         savedByUser: false,
//         readingTime: '15min',
//         thumbnail: 'https://via.placeholder.com/150',
//         likes_count: 541,
//         reads_count: 10531,
//         author: {
//             firstName: 'Jean',
//             lastName: 'Dupont',
//             avatar: 'https://via.placeholder.com/150',
//             job: 'Conseiller en gestion de patrimoine',
//             company: 'Elios Patrimoine',
//         },
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin necvehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//         cards: [
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.QUOTE,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: 6,
//         isPremium: false,
//         slug: 'comment-bien-epargner-by-jean-dupont',
//         title: 'Comment bien épargner ?',
//         category: {
//             id: 3,
//             title: ArticleCategoriesEnum.EPARGNE,
//             description:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//             icon: 'https://via.placeholder.com/150',
//         },
//         readByUser: false,
//         likedByUser: false,
//         savedByUser: false,
//         readingTime: '15min',
//         thumbnail: 'https://via.placeholder.com/150',
//         likes_count: 541,
//         reads_count: 10531,
//         author: {
//             firstName: 'Jean',
//             lastName: 'Dupont',
//             avatar: 'https://via.placeholder.com/150',
//             job: 'Conseiller en gestion de patrimoine',
//             company: 'Elios Patrimoine',
//         },
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin necvehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//         cards: [
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.TEXT,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.QUOTE,
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
//                     },
//                 ],
//             },
//             {
//                 image: 'https://via.placeholder.com/150',
//                 title: 'This is the title.',
//                 type: ArticleTypesEnum.FULL,
//                 readByUser: false,
//                 savedByUser: false,
//                 content: [
//                     {
//                         type: ContentTypesEnum.LIST,
//                         text: [
//                             'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//                             'Nullam in tincidunt ex.',
//                             'Nulla facilisi.',
//                             'Proin nec vehicula leo.',
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
// ];

// export const categories = [
//     {
//         id: 1,
//         title: ArticleCategoriesEnum.EPARGNE,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 2,
//         title: ArticleCategoriesEnum.INVESTISSEMENT,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 3,
//         title: ArticleCategoriesEnum.VIDEOS,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 4,
//         title: ArticleCategoriesEnum.ACTUALITES,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 5,
//         title: ArticleCategoriesEnum.IMMOBILIER,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 6,
//         title: ArticleCategoriesEnum.CRYPTO,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 7,
//         title: ArticleCategoriesEnum.BOURSE,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 8,
//         title: ArticleCategoriesEnum.FISCAL,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 9,
//         title: ArticleCategoriesEnum.RETRAITE,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 10,
//         title: ArticleCategoriesEnum.ASSURANCE,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 11,
//         title: ArticleCategoriesEnum.BANQUE,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 12,
//         title: ArticleCategoriesEnum.CREDIT,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 13,
//         title: ArticleCategoriesEnum.BUDGET,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 14,
//         title: ArticleCategoriesEnum.EMPLOI,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 15,
//         title: ArticleCategoriesEnum.ENTREPRENEURIAT,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 16,
//         title: ArticleCategoriesEnum.LIVRES,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 17,
//         title: ArticleCategoriesEnum.FORMATION,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 18,
//         title: ArticleCategoriesEnum.WEBINAIRE,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 19,
//         title: ArticleCategoriesEnum.EVENEMENT,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 20,
//         title: ArticleCategoriesEnum.INTERVIEW,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 21,
//         title: ArticleCategoriesEnum.PODCAST,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 22,
//         title: ArticleCategoriesEnum.MINDSET,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 23,
//         title: ArticleCategoriesEnum.BIEN_ETRE,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 24,
//         title: ArticleCategoriesEnum.DEVELOPPEMENT_PERSONNEL,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 25,
//         title: ArticleCategoriesEnum.COACHING,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 26,
//         title: ArticleCategoriesEnum.SPIRITUALITE,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 27,
//         title: ArticleCategoriesEnum.RELATION,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 28,
//         title: ArticleCategoriesEnum.FAMILLE,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
//     {
//         id: 29,
//         title: ArticleCategoriesEnum.EDUCATION,
//         icon: 'https://via.placeholder.com/150',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo.',
//     },
// ];
