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


export enum contentTypesEnum {
    TEXT = 'text',
    LIST = 'list',
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio',
    QUOTE = 'quote',
}

export type authorType = {
    firstName: string,
    lastName: string,
    avatar: string,
    job: string,
    company: string,
}

export type cardType = {
    image: string,
    readByUser: boolean,
    savedByUser: boolean,
    content: {
        type: contentTypesEnum,
        text?: string | string[],
        quoteAuthor?: authorType,
    }[]
}

export type subjectType = {
    id: number,
    slug: string,
    title: string,
    category: categoriesEnum,
    readByUser: boolean,
    likedByUser: boolean,
    readingTime: string,
    categoryIcon: string,
    thumbnail: string,
    author: authorType,
    description: string,
    cards: cardType[],
    likes_count?: number,
    reads_count?: number,
}

export const subjects: subjectType[] = [ 
    {
        id: 1,
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