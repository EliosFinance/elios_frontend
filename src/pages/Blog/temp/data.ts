export enum categoriesEnum {
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


export enum cardTypesEnum {
    PREVIEW = 'preview',
    SMALL_PREVIEW = 'small_preview',

    FULL = 'full',
    FULL_ROUNDED_IMAGE = 'full_rounded_image',

    PREMIUM = 'premium',
}

export enum contentTypesEnum {
    TEXT = 'text',
    LIST = 'list',
    IMAGE = 'image',
    VIDEO = 'video',
    QUOTE = 'quote',
}

export type authorType = {
    firstName: string,
    lastName: string,
    avatar: string,
    job: string,
    company: string,
}

export type cardContentType = {
    type: contentTypesEnum,
    text?: string | string[],
    quoteAuthor?: authorType,
}

export type cardType = {
    image: string,
    title: string,
    readByUser: boolean,
    savedByUser: boolean,
    content: cardContentType[],
    type: cardTypesEnum
}

export type subjectType = {
    id: number,
    slug: string,
    title: string,
    isPremium: boolean,
    category: categoriesEnum,
    readByUser: boolean,
    likedByUser: boolean,
    readingTime: string,
    categoryIcon: string,
    thumbnail: string,
    author: authorType,
    description: string,
    cards: cardType[],
    reads_count: number,
    likes_count?: number,
}

export type categoryType = {
    id: number,
    title: categoriesEnum,
    icon: string,
}

export const subjects: subjectType[] = [ 
    {
        id: 1,
        isPremium: false,
        slug: 'comment-bien-epargner-by-jean-dupont',
        title: 'Comment bien épargner ?',
        category: categoriesEnum.EPARGNE,
        readByUser: false,
        likedByUser: false,
        readingTime: '15min',
        categoryIcon: 'https://via.placeholder.com/150',
        thumbnail: 'https://via.placeholder.com/150',
        likes_count: 541,
        reads_count: 10531,
        author: {
            firstName: 'Jean',
            lastName: 'Dupont',
            avatar: 'https://via.placeholder.com/150',
            job: 'Conseiller en gestion de patrimoine',
            company: 'Elios Patrimoine',
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin necvehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
        cards: [
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.TEXT,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    },
                    {
                        type: contentTypesEnum.TEXT,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    },
                    {
                        type: contentTypesEnum.LIST,
                        text: [
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            'Nullam in tincidunt ex.',
                            'Nulla facilisi.',
                            'Proin nec vehicula leo.',
                        ],
                    }
                ]
            },
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.QUOTE,
                        quoteAuthor: {
                            firstName: 'Jean',
                            lastName: 'Dupont',
                            avatar: 'https://via.placeholder.com/150',
                            job: 'Conseiller en gestion de patrimoine',
                            company: 'Elios Patrimoine',
                        },
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    }
                ]
            },
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.LIST,
                        text: [
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            'Nullam in tincidunt ex.',
                            'Nulla facilisi.',
                            'Proin nec vehicula leo.',
                        ],
                    }
                ]
            },
        ]
    },
    {
        id: 2,
        isPremium: false,
        slug: 'comment-bien-epargner-by-jean-dupont',
        title: 'Comment bien épargner ?',
        category: categoriesEnum.EPARGNE,
        readByUser: false,
        likedByUser: false,
        readingTime: '15min',
        categoryIcon: 'https://via.placeholder.com/150',
        thumbnail: 'https://via.placeholder.com/150',
        likes_count: 541,
        reads_count: 10531,
        author: {
            firstName: 'Jean',
            lastName: 'Dupont',
            avatar: 'https://via.placeholder.com/150',
            job: 'Conseiller en gestion de patrimoine',
            company: 'Elios Patrimoine',
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin necvehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
        cards: [
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.TEXT,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    },
                    {
                        type: contentTypesEnum.TEXT,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    },
                    {
                        type: contentTypesEnum.LIST,
                        text: [
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            'Nullam in tincidunt ex.',
                            'Nulla facilisi.',
                            'Proin nec vehicula leo.',
                        ],
                    }
                ]
            },
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.QUOTE,
                        quoteAuthor: {
                            firstName: 'Jean',
                            lastName: 'Dupont',
                            avatar: 'https://via.placeholder.com/150',
                            job: 'Conseiller en gestion de patrimoine',
                            company: 'Elios Patrimoine',
                        },
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    }
                ]
            },
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.LIST,
                        text: [
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            'Nullam in tincidunt ex.',
                            'Nulla facilisi.',
                            'Proin nec vehicula leo.',
                        ],
                    }
                ]
            },
        ]
    },
    {
        id: 3,
        isPremium: false,
        slug: 'comment-bien-epargner-by-jean-dupont',
        title: 'Comment bien épargner ?',
        category: categoriesEnum.EPARGNE,
        readByUser: false,
        likedByUser: false,
        readingTime: '15min',
        categoryIcon: 'https://via.placeholder.com/150',
        thumbnail: 'https://via.placeholder.com/150',
        likes_count: 541,
        reads_count: 10531,
        author: {
            firstName: 'Jean',
            lastName: 'Dupont',
            avatar: 'https://via.placeholder.com/150',
            job: 'Conseiller en gestion de patrimoine',
            company: 'Elios Patrimoine',
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin necvehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
        cards: [
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.TEXT,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    },
                    {
                        type: contentTypesEnum.TEXT,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    },
                    {
                        type: contentTypesEnum.LIST,
                        text: [
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            'Nullam in tincidunt ex.',
                            'Nulla facilisi.',
                            'Proin nec vehicula leo.',
                        ],
                    }
                ]
            },
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.QUOTE,
                        quoteAuthor: {
                            firstName: 'Jean',
                            lastName: 'Dupont',
                            avatar: 'https://via.placeholder.com/150',
                            job: 'Conseiller en gestion de patrimoine',
                            company: 'Elios Patrimoine',
                        },
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    }
                ]
            },
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.LIST,
                        text: [
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            'Nullam in tincidunt ex.',
                            'Nulla facilisi.',
                            'Proin nec vehicula leo.',
                        ],
                    }
                ]
            },
        ]
    },
    {
        id: 4,
        isPremium: false,
        slug: 'comment-bien-epargner-by-jean-dupont',
        title: 'Comment bien épargner ?',
        category: categoriesEnum.INVESTISSEMENT,
        readByUser: false,
        likedByUser: false,
        readingTime: '15min',
        categoryIcon: 'https://via.placeholder.com/150',
        thumbnail: 'https://via.placeholder.com/150',
        likes_count: 541,
        reads_count: 10531,
        author: {
            firstName: 'Jean',
            lastName: 'Dupont',
            avatar: 'https://via.placeholder.com/150',
            job: 'Conseiller en gestion de patrimoine',
            company: 'Elios Patrimoine',
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin necvehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
        cards: [
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.TEXT,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    },
                    {
                        type: contentTypesEnum.TEXT,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    },
                    {
                        type: contentTypesEnum.LIST,
                        text: [
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            'Nullam in tincidunt ex.',
                            'Nulla facilisi.',
                            'Proin nec vehicula leo.',
                        ],
                    }
                ]
            },
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.QUOTE,
                        quoteAuthor: {
                            firstName: 'Jean',
                            lastName: 'Dupont',
                            avatar: 'https://via.placeholder.com/150',
                            job: 'Conseiller en gestion de patrimoine',
                            company: 'Elios Patrimoine',
                        },
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    }
                ]
            },
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.LIST,
                        text: [
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            'Nullam in tincidunt ex.',
                            'Nulla facilisi.',
                            'Proin nec vehicula leo.',
                        ],
                    }
                ]
            },
        ]
    },
    {
        id: 5,
        isPremium: false,
        slug: 'comment-bien-epargner-by-jean-dupont',
        title: 'Comment bien épargner ?',
        category: categoriesEnum.INVESTISSEMENT,
        readByUser: false,
        likedByUser: false,
        readingTime: '15min',
        categoryIcon: 'https://via.placeholder.com/150',
        thumbnail: 'https://via.placeholder.com/150',
        likes_count: 541,
        reads_count: 10531,
        author: {
            firstName: 'Jean',
            lastName: 'Dupont',
            avatar: 'https://via.placeholder.com/150',
            job: 'Conseiller en gestion de patrimoine',
            company: 'Elios Patrimoine',
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin necvehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
        cards: [
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.TEXT,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    },
                    {
                        type: contentTypesEnum.TEXT,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    },
                    {
                        type: contentTypesEnum.LIST,
                        text: [
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            'Nullam in tincidunt ex.',
                            'Nulla facilisi.',
                            'Proin nec vehicula leo.',
                        ],
                    }
                ]
            },
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.QUOTE,
                        quoteAuthor: {
                            firstName: 'Jean',
                            lastName: 'Dupont',
                            avatar: 'https://via.placeholder.com/150',
                            job: 'Conseiller en gestion de patrimoine',
                            company: 'Elios Patrimoine',
                        },
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    }
                ]
            },
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.LIST,
                        text: [
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            'Nullam in tincidunt ex.',
                            'Nulla facilisi.',
                            'Proin nec vehicula leo.',
                        ],
                    }
                ]
            },
        ]
    },
    {
        id: 6,
        isPremium: false,
        slug: 'comment-bien-epargner-by-jean-dupont',
        title: 'Comment bien épargner ?',
        category: categoriesEnum.INVESTISSEMENT,
        readByUser: false,
        likedByUser: false,
        readingTime: '15min',
        categoryIcon: 'https://via.placeholder.com/150',
        thumbnail: 'https://via.placeholder.com/150',
        likes_count: 541,
        reads_count: 10531,
        author: {
            firstName: 'Jean',
            lastName: 'Dupont',
            avatar: 'https://via.placeholder.com/150',
            job: 'Conseiller en gestion de patrimoine',
            company: 'Elios Patrimoine',
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin necvehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
        cards: [
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.TEXT,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    },
                    {
                        type: contentTypesEnum.TEXT,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    },
                    {
                        type: contentTypesEnum.LIST,
                        text: [
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            'Nullam in tincidunt ex.',
                            'Nulla facilisi.',
                            'Proin nec vehicula leo.',
                        ],
                    }
                ]
            },
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.QUOTE,
                        quoteAuthor: {
                            firstName: 'Jean',
                            lastName: 'Dupont',
                            avatar: 'https://via.placeholder.com/150',
                            job: 'Conseiller en gestion de patrimoine',
                            company: 'Elios Patrimoine',
                        },
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi. Proin nec vehicula leo. Nullam in tincidunt ex. Nulla facilisi.Proin nec vehicula leo. Nullam in tincidunt ex.',
                    }
                ]
            },
            {
                image: 'https://via.placeholder.com/150',
                title: 'This is the title.',
                type: cardTypesEnum.FULL,
                readByUser: false,
                savedByUser: false,
                content: [
                    {
                        type: contentTypesEnum.LIST,
                        text: [
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            'Nullam in tincidunt ex.',
                            'Nulla facilisi.',
                            'Proin nec vehicula leo.',
                        ],
                    }
                ]
            },
        ]
    },
]

export const categories = [
    {
        id: 1,
        title: categoriesEnum.EPARGNE,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        title: categoriesEnum.INVESTISSEMENT,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        title: categoriesEnum.VIDEOS,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 4,
        title: categoriesEnum.ACTUALITES,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 5,
        title: categoriesEnum.IMMOBILIER,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 6,
        title: categoriesEnum.CRYPTO,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 7,
        title: categoriesEnum.BOURSE,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 8,
        title: categoriesEnum.FISCAL,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 9,
        title: categoriesEnum.RETRAITE,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 10,
        title: categoriesEnum.ASSURANCE,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 11,
        title: categoriesEnum.BANQUE,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 12,
        title: categoriesEnum.CREDIT,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 13,
        title: categoriesEnum.BUDGET,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 14,
        title: categoriesEnum.EMPLOI,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 15,
        title: categoriesEnum.ENTREPRENEURIAT,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 16,
        title: categoriesEnum.LIVRES,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 17,
        title: categoriesEnum.FORMATION,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 18,
        title: categoriesEnum.WEBINAIRE,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 19,
        title: categoriesEnum.EVENEMENT,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 20,
        title: categoriesEnum.INTERVIEW,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 21,
        title: categoriesEnum.PODCAST,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 22,
        title: categoriesEnum.MINDSET,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 23,
        title: categoriesEnum.BIEN_ETRE,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 24,
        title: categoriesEnum.DEVELOPPEMENT_PERSONNEL,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 25,
        title: categoriesEnum.COACHING,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 26,
        title: categoriesEnum.SPIRITUALITE,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 27,
        title: categoriesEnum.RELATION,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 28,
        title: categoriesEnum.FAMILLE,
        icon: 'https://via.placeholder.com/150',
    },
    {
        id: 29,
        title: categoriesEnum.EDUCATION,
        icon: 'https://via.placeholder.com/150',
    },
];