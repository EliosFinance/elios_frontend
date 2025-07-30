import { userStore } from '@/store/UserStore';
import { ArticleCategoryType, ArticleContentType, ArticleType, ArticleCategoriesEnum, ContentTypesEnum, ArticleTypesEnum } from '@/types/BlogType';
import { AxiosError } from 'axios';
import { instance_back } from '../const';

// MOCK DATA FOR DEMO
const mockArticleCategories: ArticleCategoryType[] = [
    {
        id: 1,
        title: ArticleCategoriesEnum.INVESTISSEMENT,
        description: "Apprenez les bases de l'investissement pour faire fructifier votre argent",
        icon: "📈",
        articles: []
    },
    {
        id: 2,
        title: ArticleCategoriesEnum.EPARGNE,
        description: "Découvrez les meilleures stratégies d'épargne pour sécuriser votre avenir",
        icon: "💰",
        articles: []
    },
    {
        id: 3,
        title: ArticleCategoriesEnum.BOURSE,
        description: "Maîtrisez les marchés financiers et les actions",
        icon: "📊",
        articles: []
    },
    {
        id: 4,
        title: ArticleCategoriesEnum.CRYPTO,
        description: "Explorez le monde des cryptomonnaies et de la blockchain",
        icon: "₿",
        articles: []
    },
    {
        id: 5,
        title: ArticleCategoriesEnum.BUDGET,
        description: "Apprenez à gérer votre budget personnel efficacement",
        icon: "📋",
        articles: []
    },
    {
        id: 6,
        title: ArticleCategoriesEnum.IMMOBILIER,
        description: "Investir dans l'immobilier : stratégies et conseils",
        icon: "🏠",
        articles: []
    }
];

const mockAuthors = [
    {
        firstName: "Marie",
        lastName: "Dubois",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b7e4f19b?w=150&h=150&fit=crop&crop=face",
        job: "Conseillère en investissement",
        company: "Elios Finance"
    },
    {
        firstName: "Pierre",
        lastName: "Martin",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        job: "Analyste financier",
        company: "Elios Finance"
    },
    {
        firstName: "Sophie",
        lastName: "Legrand",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        job: "Experte en cryptomonnaies",
        company: "Elios Finance"
    },
    {
        firstName: "Thomas",
        lastName: "Rousseau",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        job: "Conseiller en épargne",
        company: "Elios Finance"
    }
];

const mockArticles: ArticleType[] = [
    {
        id: 1,
        slug: "comment-commencer-investir-bourse",
        title: "Comment commencer à investir en bourse : Guide du débutant",
        isPremium: false,
        category: mockArticleCategories[2], // BOURSE
        reads: [],
        likes: [],
        saved: [],
        readingTime: "8",
        thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
        author: mockAuthors[1],
        description: "Découvrez les étapes essentielles pour débuter en bourse sans risque. De l'ouverture d'un compte-titres aux premières actions à acheter, ce guide vous accompagne dans vos premiers pas d'investisseur.",
        articleContent: [
            {
                id: 1,
                image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop",
                title: "Comprendre les bases",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-15",
                update_date: "2024-01-15",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 1,
                        type: ContentTypesEnum.TEXT,
                        text: ["La bourse peut sembler intimidante, mais c'est un excellent moyen de faire fructifier son argent à long terme.", "Avant de commencer, il faut comprendre que tout investissement comporte des risques.", "L'objectif n'est pas de devenir riche rapidement, mais de construire un patrimoine sur le long terme."],
                        creation_date: "2024-01-15",
                        update_date: "2024-01-15"
                    }
                ]
            },
            {
                id: 2,
                image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&h=400&fit=crop",
                title: "Choisir son courtier",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-15",
                update_date: "2024-01-15",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 2,
                        type: ContentTypesEnum.LIST,
                        text: ["Frais de courtage compétitifs", "Interface intuitive", "Outils d'analyse performants", "Service client réactif", "Régulation par l'AMF"],
                        creation_date: "2024-01-15",
                        update_date: "2024-01-15"
                    }
                ]
            },
            {
                id: 3,
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
                title: "Vos premiers investissements",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-15",
                update_date: "2024-01-15",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 3,
                        type: ContentTypesEnum.TEXT,
                        text: ["Commencez par investir dans des ETF diversifiés pour réduire les risques.", "Les ETF World ou S&P 500 sont d'excellents choix pour débuter.", "N'investissez que de l'argent dont vous n'avez pas besoin à court terme."],
                        creation_date: "2024-01-15",
                        update_date: "2024-01-15"
                    }
                ]
            },
            {
                id: 4,
                image: "https://images.unsplash.com/photo-1618044619888-009e412ff12a?w=600&h=400&fit=crop",
                title: "La règle d'or",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-15",
                update_date: "2024-01-15",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 4,
                        type: ContentTypesEnum.QUOTE,
                        text: ["Le temps sur le marché bat le timing du marché. Warren Buffett"],
                        creation_date: "2024-01-15",
                        update_date: "2024-01-15"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        slug: "strategies-epargne-2024",
        title: "Les meilleures stratégies d'épargne pour 2024",
        isPremium: true,
        category: mockArticleCategories[1], // EPARGNE
        reads: [],
        likes: [],
        saved: [],
        readingTime: "12",
        thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop",
        author: mockAuthors[3],
        description: "Explorez les stratégies d'épargne les plus efficaces pour optimiser vos finances en 2024. Livret A, PEL, assurance-vie : découvrez où placer votre argent selon vos objectifs.",
        articleContent: [
            {
                id: 5,
                image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop",
                title: "Livret A et LDDS",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-20",
                update_date: "2024-01-20",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 5,
                        type: ContentTypesEnum.TEXT,
                        text: ["Le Livret A reste la base de l'épargne française avec 3% de rendement en 2024.", "Il est totalement défiscalisé et sans risque.", "Maximum 22 950€ pour un particulier."],
                        creation_date: "2024-01-20",
                        update_date: "2024-01-20"
                    }
                ]
            },
            {
                id: 6,
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
                title: "Plan Épargne Logement (PEL)",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-20",
                update_date: "2024-01-20",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 6,
                        type: ContentTypesEnum.LIST,
                        text: ["Taux de 2,25% garanti", "Durée minimum de 4 ans", "Prime d'État jusqu'à 1525€", "Droit à prêt immobilier privilégié"],
                        creation_date: "2024-01-20",
                        update_date: "2024-01-20"
                    }
                ]
            },
            {
                id: 7,
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
                title: "Assurance-vie",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-20",
                update_date: "2024-01-20",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 7,
                        type: ContentTypesEnum.TEXT,
                        text: ["L'assurance-vie offre une fiscalité avantageuse après 8 ans.", "Possibilité d'investir en fonds euros (sécurisés) ou unités de compte (plus risqués).", "Excellent outil de transmission du patrimoine."],
                        creation_date: "2024-01-20",
                        update_date: "2024-01-20"
                    }
                ]
            },
            {
                id: 8,
                image: "https://images.unsplash.com/photo-1554224154-22534de96e0b?w=600&h=400&fit=crop",
                title: "Conseil d'expert",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-20",
                update_date: "2024-01-20",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 8,
                        type: ContentTypesEnum.QUOTE,
                        text: ["Ne mettez jamais tous vos œufs dans le même panier. La diversification est la clé d'une épargne réussie."],
                        creation_date: "2024-01-20",
                        update_date: "2024-01-20"
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        slug: "bitcoin-ethereum-guide-crypto",
        title: "Bitcoin vs Ethereum : Quelle crypto choisir en 2024 ?",
        isPremium: false,
        category: mockArticleCategories[3], // CRYPTO
        reads: [],
        likes: [],
        saved: [],
        readingTime: "15",
        thumbnail: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=250&fit=crop",
        author: mockAuthors[2],
        description: "Comparaison détaillée entre Bitcoin et Ethereum. Technologie, cas d'usage, potentiel d'investissement : tout ce qu'il faut savoir pour faire le bon choix crypto.",
        articleContent: [
            {
                id: 9,
                image: "https://images.unsplash.com/photo-1518544866330-4e4815c6f8a5?w=600&h=400&fit=crop",
                title: "Bitcoin : L'or numérique",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-25",
                update_date: "2024-01-25",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 9,
                        type: ContentTypesEnum.TEXT,
                        text: ["Bitcoin est la première et plus connue des cryptomonnaies.", "Créé en 2009 par Satoshi Nakamoto, il s'agit d'une réserve de valeur numérique.", "Limité à 21 millions de bitcoins, sa rareté contribue à sa valeur."],
                        creation_date: "2024-01-25",
                        update_date: "2024-01-25"
                    }
                ]
            },
            {
                id: 10,
                image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=600&h=400&fit=crop",
                title: "Ethereum : Bien plus qu'une monnaie",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-25",
                update_date: "2024-01-25",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 10,
                        type: ContentTypesEnum.LIST,
                        text: ["Plateforme pour les contrats intelligents", "Écosystème DeFi le plus développé", "Transition vers Ethereum 2.0 (Proof of Stake)", "Support des NFT et applications décentralisées"],
                        creation_date: "2024-01-25",
                        update_date: "2024-01-25"
                    }
                ]
            },
            {
                id: 11,
                image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop",
                title: "Comparaison technique",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-25",
                update_date: "2024-01-25",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 11,
                        type: ContentTypesEnum.TEXT,
                        text: ["Bitcoin privilégie la sécurité et la décentralisation.", "Ethereum mise sur la programmabilité et l'innovation.", "Les deux ont des cas d'usage différents mais complémentaires."],
                        creation_date: "2024-01-25",
                        update_date: "2024-01-25"
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        slug: "budget-personnel-methodes",
        title: "5 méthodes éprouvées pour maîtriser son budget personnel",
        isPremium: false,
        category: mockArticleCategories[4], // BUDGET
        reads: [],
        likes: [],
        saved: [],
        readingTime: "10",
        thumbnail: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=250&fit=crop",
        author: mockAuthors[0],
        description: "Apprenez à gérer votre budget comme un pro avec ces 5 méthodes testées et approuvées. De la règle des 50/30/20 à l'envelope budgeting, trouvez votre méthode idéale.",
        articleContent: [
            {
                id: 12,
                image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&h=400&fit=crop",
                title: "Méthode 1 : La règle 50/30/20",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-30",
                update_date: "2024-01-30",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 12,
                        type: ContentTypesEnum.LIST,
                        text: ["50% pour les besoins essentiels (logement, nourriture, transport)", "30% pour les loisirs et plaisirs", "20% pour l'épargne et le remboursement de dettes"],
                        creation_date: "2024-01-30",
                        update_date: "2024-01-30"
                    }
                ]
            },
            {
                id: 13,
                image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=600&h=400&fit=crop",
                title: "Méthode 2 : Envelope Budgeting",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-30",
                update_date: "2024-01-30",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 13,
                        type: ContentTypesEnum.TEXT,
                        text: ["Allouez un montant fixe à chaque catégorie de dépenses.", "Une fois l'enveloppe vide, plus de dépenses dans cette catégorie.", "Parfait pour contrôler les dépenses impulsives."],
                        creation_date: "2024-01-30",
                        update_date: "2024-01-30"
                    }
                ]
            },
            {
                id: 14,
                image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=600&h=400&fit=crop",
                title: "Méthode 3 : Budget base zéro",
                type: ArticleTypesEnum.FULL,
                creation_date: "2024-01-30",
                update_date: "2024-01-30",
                reads: [],
                saved: [],
                article: {} as ArticleType,
                contentType: [
                    {
                        id: 14,
                        type: ContentTypesEnum.QUOTE,
                        text: ["Chaque euro doit avoir une destination précise. Revenus - Dépenses = 0"],
                        creation_date: "2024-01-30",
                        update_date: "2024-01-30"
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        slug: "investissement-immobilier-locatif",
        title: "Investissement locatif : Rentabilité et fiscalité en 2024",
        isPremium: true,
        category: mockArticleCategories[5], // IMMOBILIER
        reads: [],
        likes: [],
        saved: [],
        readingTime: "18",
        thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
        author: mockAuthors[1],
        description: "Guide complet sur l'investissement immobilier locatif. Calcul de rentabilité, avantages fiscaux, choix du bien : maximisez vos revenus locatifs.",
        articleContent: []
    },
    {
        id: 6,
        slug: "actions-dividendes-revenus-passifs",
        title: "Actions à dividendes : Créer des revenus passifs durables",
        isPremium: false,
        category: mockArticleCategories[2], // BOURSE
        reads: [],
        likes: [],
        saved: [],
        readingTime: "14",
        thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop",
        author: mockAuthors[1],
        description: "Construisez un portefeuille d'actions à dividendes pour générer des revenus passifs réguliers. Sélection de titres, stratégies et fiscalité.",
        articleContent: []
    },
    {
        id: 7,
        slug: "etf-investissement-passif",
        title: "ETF : L'investissement passif accessible à tous",
        isPremium: false,
        category: mockArticleCategories[0], // INVESTISSEMENT
        reads: [],
        likes: [],
        saved: [],
        readingTime: "11",
        thumbnail: "https://images.unsplash.com/photo-1573166364524-d9b6ea20c137?w=400&h=250&fit=crop",
        author: mockAuthors[0],
        description: "Découvrez les ETF, ces fonds indiciels qui permettent d'investir simplement sur les marchés. Avantages, inconvénients et stratégies d'investissement.",
        articleContent: []
    },
    {
        id: 8,
        slug: "assurance-vie-placement-prefere",
        title: "Assurance-vie : Pourquoi c'est encore le placement préféré des Français",
        isPremium: true,
        category: mockArticleCategories[1], // EPARGNE
        reads: [],
        likes: [],
        saved: [],
        readingTime: "16",
        thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
        author: mockAuthors[3],
        description: "Analyse complète de l'assurance-vie : avantages fiscaux, flexibilité, rendements. Pourquoi ce placement reste incontournable en 2024.",
        articleContent: []
    },
    {
        id: 9,
        slug: "plan-epargne-retraite-per",
        title: "Plan Épargne Retraite (PER) : Optimiser sa retraite et ses impôts",
        isPremium: false,
        category: mockArticleCategories[1], // EPARGNE
        reads: [],
        likes: [],
        saved: [],
        readingTime: "13",
        thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop",
        author: mockAuthors[3],
        description: "Découvrez le PER, nouveau produit d'épargne retraite. Déduction fiscale, gestion, sortie : tout ce qu'il faut savoir pour bien préparer sa retraite.",
        articleContent: []
    },
    {
        id: 10,
        slug: "fintech-banques-digitales-2024",
        title: "Fintech vs Banques traditionnelles : Le guide 2024",
        isPremium: false,
        category: mockArticleCategories[4], // BUDGET
        reads: [],
        likes: [],
        saved: [],
        readingTime: "9",
        thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
        author: mockAuthors[0],
        description: "Revolut, N26, Boursorama : comparatif des banques en ligne et néobanques. Services, tarifs, avantages pour faire le bon choix.",
        articleContent: []
    },
    {
        id: 11,
        slug: "scpi-investissement-immobilier-pierre-papier",
        title: "SCPI : Investir dans l'immobilier sans les contraintes",
        isPremium: true,
        category: mockArticleCategories[5], // IMMOBILIER
        reads: [],
        likes: [],
        saved: [],
        readingTime: "20",
        thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
        author: mockAuthors[1],
        description: "Les SCPI permettent d'investir dans l'immobilier dès 200€. Rendement, fiscalité, risques : tout savoir sur la pierre-papier.",
        articleContent: []
    },
    {
        id: 12,
        slug: "credit-immobilier-taux-2024",
        title: "Crédit immobilier 2024 : Négocier le meilleur taux",
        isPremium: false,
        category: mockArticleCategories[5], // IMMOBILIER
        reads: [],
        likes: [],
        saved: [],
        readingTime: "15",
        thumbnail: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=250&fit=crop",
        author: mockAuthors[2],
        description: "Stratégies pour obtenir le meilleur taux immobilier. Négociation, courtiers, banques : maximisez vos chances d'obtenir un financement avantageux.",
        articleContent: []
    },
    {
        id: 13,
        slug: "trading-forex-debutant",
        title: "Trading Forex pour débutants : Risques et opportunités",
        isPremium: false,
        category: mockArticleCategories[2], // BOURSE
        reads: [],
        likes: [],
        saved: [],
        readingTime: "17",
        thumbnail: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=400&h=250&fit=crop",
        author: mockAuthors[1],
        description: "Le marché des changes attire de nombreux débutants. Comprendre les risques, choisir un broker fiable et développer une stratégie gagnante.",
        articleContent: []
    },
    {
        id: 14,
        slug: "investir-start-up-crowdfunding",
        title: "Crowdfunding : Investir dans les start-ups prometteuses",
        isPremium: true,
        category: mockArticleCategories[0], // INVESTISSEMENT
        reads: [],
        likes: [],
        saved: [],
        readingTime: "12",
        thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop",
        author: mockAuthors[0],
        description: "Platforms de crowdfunding, analyse des projets, diversification : comment investir intelligemment dans l'innovation française.",
        articleContent: []
    },
    {
        id: 15,
        slug: "nft-investissement-art-numerique",
        title: "NFT : Faut-il investir dans l'art numérique ?",
        isPremium: false,
        category: mockArticleCategories[3], // CRYPTO
        reads: [],
        likes: [],
        saved: [],
        readingTime: "11",
        thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
        author: mockAuthors[2],
        description: "Les NFT ont révolutionné l'art numérique. Analyse du marché, risques, opportunités et conseils pour investir dans cette nouvelle classe d'actifs.",
        articleContent: []
    },
    {
        id: 16,
        slug: "gestion-patrimoine-jeunes-actifs",
        title: "Gestion de patrimoine pour jeunes actifs : Par où commencer ?",
        isPremium: false,
        category: mockArticleCategories[0], // INVESTISSEMENT
        reads: [],
        likes: [],
        saved: [],
        readingTime: "14",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
        author: mockAuthors[0],
        description: "Premiers salaires, premiers investissements : stratégies patrimoniales adaptées aux 25-35 ans. PEA, assurance-vie, immobilier locatif.",
        articleContent: []
    },
    {
        id: 17,
        slug: "inflation-proteger-epargne",
        title: "Inflation : Comment protéger son épargne de la hausse des prix",
        isPremium: false,
        category: mockArticleCategories[1], // EPARGNE
        reads: [],
        likes: [],
        saved: [],
        readingTime: "10",
        thumbnail: "https://images.unsplash.com/photo-1611095790444-1dfa35de854b?w=400&h=250&fit=crop",
        author: mockAuthors[3],
        description: "Face à l'inflation, certains placements perdent de la valeur. Actions, immobilier, or : quels investissements privilégier pour préserver son pouvoir d'achat.",
        articleContent: []
    },
    {
        id: 18,
        slug: "pea-compte-titres-differences",
        title: "PEA vs Compte-titres : Quel support choisir pour ses actions ?",
        isPremium: false,
        category: mockArticleCategories[2], // BOURSE
        reads: [],
        likes: [],
        saved: [],
        readingTime: "8",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        author: mockAuthors[1],
        description: "PEA ou compte-titres ordinaire ? Fiscalité, plafonds, éligibilité : comparatif complet pour optimiser vos investissements en bourse.",
        articleContent: []
    },
    {
        id: 19,
        slug: "cryptomonnaies-defi-finance-decentralisee",
        title: "DeFi : La finance décentralisée révolutionne-t-elle l'épargne ?",
        isPremium: true,
        category: mockArticleCategories[3], // CRYPTO
        reads: [],
        likes: [],
        saved: [],
        readingTime: "19",
        thumbnail: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=250&fit=crop",
        author: mockAuthors[2],
        description: "Lending, staking, yield farming : la DeFi promet des rendements attractifs. Opportunités et risques de cette nouvelle finance sans intermédiaires.",
        articleContent: []
    },
    {
        id: 20,
        slug: "investissement-socialement-responsable-esg",
        title: "ISR : Investir de manière socialement responsable",
        isPremium: false,
        category: mockArticleCategories[0], // INVESTISSEMENT
        reads: [],
        likes: [],
        saved: [],
        readingTime: "13",
        thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
        author: mockAuthors[0],
        description: "L'investissement responsable concilie performance financière et impact positif. ETF ESG, fonds thématiques : comment bien investir durablement.",
        articleContent: []
    }
];

// CRUD ARTICLE CATEGORIES
export const getArticleCategories = async (): Promise<ArticleCategoryType[]> => {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockArticleCategories;
};
export const getSingleArticleCategory = async (articleCategoryId: number): Promise<ArticleCategoryType> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`article-category/${articleCategoryId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération de la catégorie d'article n°${articleCategoryId}:`, err.message);
        throw err;
    }
};
export const postArticleCategory = async (articleCategoryId: number): Promise<ArticleCategoryType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.post(`article-category/${articleCategoryId}`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération de la catégorie d'article n°${articleCategoryId}:`, err.message);
        throw err;
    }
};
export const updateArticleCategory = async (articleCategoryId: number): Promise<ArticleCategoryType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`article-category/${articleCategoryId}`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de la catégorie d'article n°${articleCategoryId}:`, err.message);
        throw err;
    }
};
export const deleteArticleCategory = async (articleCategoryId: number): Promise<ArticleCategoryType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.delete(`article-category/${articleCategoryId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la suppression de la catégorie d'article n°${articleCategoryId}:`, err.message);
        throw err;
    }
};

// CRUD ARTICLES
export const getTrendingArticles = async (): Promise<ArticleType[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Retourner les articles les plus populaires (simulés)
    return [mockArticles[0], mockArticles[2], mockArticles[5], mockArticles[3]];
};

export const getReadArticles = async (): Promise<ArticleType[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Retourner quelques articles comme déjà lus
    return [mockArticles[0], mockArticles[6]];
};

export const getLikedArticles = async (): Promise<ArticleType[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Retourner quelques articles likés
    return [mockArticles[2], mockArticles[4]];
};

export const getArticles = async (): Promise<ArticleType[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockArticles;
};
export const getSingleArticle = async (articleId: number): Promise<ArticleType> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const article = mockArticles.find(a => a.id === articleId);
    if (!article) {
        throw new Error(`Article ${articleId} non trouvé`);
    }
    return article;
};
export const readArticle = async (articleId: number): Promise<ArticleType | void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log(`Article ${articleId} marqué comme lu`);
    return;
};

export const viewArticle = async (articleId: number): Promise<ArticleType | void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log(`Vue ajoutée à l'article ${articleId}`);
    return;
};

export const likeArticle = async (articleId: number): Promise<ArticleType | void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log(`Article ${articleId} liké`);
    return;
};

export const saveArticle = async (articleId: number): Promise<ArticleType | void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log(`Article ${articleId} sauvegardé`);
    return;
};
export const postArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.post(`articles/${articleId}`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors du post de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const updateArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`articles/${articleId}`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour de l'article n°${articleId}:`, err.message);
        throw err;
    }
};
export const deleteArticle = async (articleId: number): Promise<ArticleType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.delete(`articles/${articleId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la suppression de l'article n°${articleId}:`, err.message);
        throw err;
    }
};

// CRUD ARTICLE CONTENTS
export const getSavedArticleContents = async (): Promise<ArticleContentType[]> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`article-content/userSaved`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erreur lors de la récupération des contenus d'article:", err.message);
        throw err;
    }
};
export const getArticleContents = async (): Promise<ArticleContentType[]> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`article-content`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Erreur lors de la récupération des contenus d'article:", err.message);
        throw err;
    }
};
export const getSingleArticleContent = async (articleContentId: number): Promise<ArticleContentType> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.get(`article-content/${articleContentId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const readArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log(`Contenu d'article ${articleContentId} marqué comme lu`);
    return;
};
export const viewArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`article-content/${articleContentId}/views`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const likeArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`article-content/${articleContentId}/like`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const saveArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`article-content/${articleContentId}/save`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la récupération du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const postArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.post(`article-content/${articleContentId}`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors du post du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const updateArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.put(`article-content/${articleContentId}`, {}, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la mise à jour du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
export const deleteArticleContent = async (articleContentId: number): Promise<ArticleContentType | void> => {
    try {
        const headers = userStore.getState().getAuth();
        const response = await instance_back.delete(`article-content/${articleContentId}`, { headers });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(`Erreur lors de la suppression du contenu d'article n°${articleContentId}:`, err.message);
        throw err;
    }
};
