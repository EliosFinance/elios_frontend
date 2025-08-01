import { userStore } from '@/store/UserStore';
import { QuizzType, QuizzDifficultyEnum, QuestionTypesEnum } from '@/types/QuizzType';
import { ArticleCategoriesEnum } from '@/types/BlogType';
import { AxiosError } from 'axios';
import { instance_back } from '../const';

// MOCK DATA FOR DEMO - Quiz complets avec contenu financier réaliste
const mockQuizz: QuizzType[] = [
    // QUIZ 1 - Budget Personnel (Facile)
    {
        id: 1,
        title: "Budget Personnel : Les Bases",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=500&h=300&fit=crop",
        description: "Testez vos connaissances sur la gestion d'un budget personnel efficace",
        theme: ArticleCategoriesEnum.BUDGET,
        difficulty: QuizzDifficultyEnum.EASY,
        relatedArticles: [],
        finishers: [
            { id: 1, username: "demo_user", email: "demo@elios.com", lastScore: 8 }
        ],
        questions: [
            {
                id: 1,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Quelle est la règle budgétaire 50/30/20 ?",
                options: [
                    { id: 1, option: "50% besoins, 30% envies, 20% épargne", isCorrect: true },
                    { id: 2, option: "50% épargne, 30% besoins, 20% envies", isCorrect: false },
                    { id: 3, option: "50% envies, 30% épargne, 20% besoins", isCorrect: false },
                    { id: 4, option: "50% investissement, 30% besoins, 20% loisirs", isCorrect: false }
                ],
                explanation: "La règle 50/30/20 recommande d'allouer 50% des revenus aux besoins essentiels, 30% aux envies/loisirs, et 20% à l'épargne et au remboursement de dettes."
            },
            {
                id: 2,
                type: QuestionTypesEnum.BOOLEAN,
                question: "Il est recommandé d'avoir un fonds d'urgence équivalent à 3-6 mois de charges.",
                options: [
                    { id: 5, option: "Vrai", isCorrect: true },
                    { id: 6, option: "Faux", isCorrect: false }
                ],
                explanation: "Oui, un fonds d'urgence de 3 à 6 mois de charges courantes permet de faire face aux imprévus sans s'endetter."
            },
            {
                id: 3,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Quelle application est la plus efficace pour suivre ses dépenses ?",
                options: [
                    { id: 7, option: "Tenir un budget mental", isCorrect: false },
                    { id: 8, option: "Noter toutes ses dépenses", isCorrect: true },
                    { id: 9, option: "Vérifier son compte une fois par mois", isCorrect: false },
                    { id: 10, option: "Utiliser uniquement sa carte bancaire", isCorrect: false }
                ],
                explanation: "Noter toutes ses dépenses, que ce soit sur papier ou via une app, permet un suivi précis et une meilleure maîtrise budgétaire."
            },
            {
                id: 4,
                type: QuestionTypesEnum.BOOLEAN,
                question: "Les frais bancaires sont négligeables dans un budget.",
                options: [
                    { id: 11, option: "Vrai", isCorrect: false },
                    { id: 12, option: "Faux", isCorrect: true }
                ],
                explanation: "Faux ! Les frais bancaires peuvent représenter plusieurs centaines d'euros par an. Il est important de les optimiser en choisissant les bonnes offres."
            },
            {
                id: 5,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Quelle stratégie adopter face à une dépense imprévue importante ?",
                options: [
                    { id: 13, option: "Utiliser son fonds d'urgence", isCorrect: true },
                    { id: 14, option: "Contracter un crédit à la consommation", isCorrect: false },
                    { id: 15, option: "Puiser dans son épargne long terme", isCorrect: false },
                    { id: 16, option: "Reporter d'autres dépenses non essentielles", isCorrect: true }
                ],
                explanation: "Le fonds d'urgence est prévu pour ce type de situation. On peut aussi reporter des dépenses non essentielles. Éviter les crédits coûteux."
            }
        ]
    },

    // QUIZ 2 - Investissement (Moyen)
    {
        id: 2,
        title: "Investir en Bourse : Stratégies",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop",
        description: "Évaluez vos connaissances en investissement boursier et stratégies de portefeuille",
        theme: ArticleCategoriesEnum.BOURSE,
        difficulty: QuizzDifficultyEnum.MEDIUM,
        relatedArticles: [],
        finishers: [],
        questions: [
            {
                id: 6,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Qu'est-ce qu'un ETF ?",
                options: [
                    { id: 17, option: "Une action d'entreprise technologique", isCorrect: false },
                    { id: 18, option: "Un fonds indiciel coté en bourse", isCorrect: true },
                    { id: 19, option: "Une obligation d'État", isCorrect: false },
                    { id: 20, option: "Un produit dérivé", isCorrect: false }
                ],
                explanation: "Un ETF (Exchange Traded Fund) est un fonds indiciel qui réplique un indice boursier et se négocie comme une action."
            },
            {
                id: 7,
                type: QuestionTypesEnum.BOOLEAN,
                question: "La diversification permet de réduire les risques d'un portefeuille.",
                options: [
                    { id: 21, option: "Vrai", isCorrect: true },
                    { id: 22, option: "Faux", isCorrect: false }
                ],
                explanation: "Vrai ! La diversification (secteurs, géographies, classes d'actifs) réduit le risque spécifique sans éliminer le risque de marché."
            },
            {
                id: 8,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Quel est le principal avantage du PEA ?",
                options: [
                    { id: 23, option: "Pas de frais de courtage", isCorrect: false },
                    { id: 24, option: "Exonération fiscale après 5 ans", isCorrect: true },
                    { id: 25, option: "Garantie de capital", isCorrect: false },
                    { id: 26, option: "Rendement garanti", isCorrect: false }
                ],
                explanation: "Le PEA offre une exonération d'impôt sur les plus-values après 5 ans de détention (seuls les prélèvements sociaux restent dus)."
            },
            {
                id: 9,
                type: QuestionTypesEnum.BOOLEAN,
                question: "Il faut essayer de prévoir les mouvements du marché pour bien investir.",
                options: [
                    { id: 27, option: "Vrai", isCorrect: false },
                    { id: 28, option: "Faux", isCorrect: true }
                ],
                explanation: "Faux ! Le 'market timing' est très difficile. Une stratégie d'investissement régulier (DCA) sur le long terme est plus efficace."
            },
            {
                id: 10,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Quelle allocation d'actifs convient à un jeune investisseur (25 ans) ?",
                options: [
                    { id: 29, option: "100% obligations", isCorrect: false },
                    { id: 30, option: "80% actions, 20% obligations", isCorrect: true },
                    { id: 31, option: "50% actions, 50% liquidités", isCorrect: false },
                    { id: 32, option: "100% immobilier", isCorrect: false }
                ],
                explanation: "Un jeune investisseur peut prendre plus de risques avec un horizon long. 80% actions et 20% obligations est une allocation classique."
            }
        ]
    },

    // QUIZ 3 - Cryptomonnaies (Difficile)
    {
        id: 3,
        title: "Cryptomonnaies & Blockchain",
        image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=500&h=300&fit=crop",
        description: "Maîtrisez-vous l'univers complexe des cryptomonnaies et de la blockchain ?",
        theme: ArticleCategoriesEnum.CRYPTO,
        difficulty: QuizzDifficultyEnum.HARD,
        relatedArticles: [],
        finishers: [
            { id: 2, username: "demo_user", email: "demo@elios.com", lastScore: 12 }
        ],
        questions: [
            {
                id: 11,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Quelle est la principale différence entre Bitcoin et Ethereum ?",
                options: [
                    { id: 33, option: "Bitcoin est plus rapide", isCorrect: false },
                    { id: 34, option: "Ethereum supporte les smart contracts", isCorrect: true },
                    { id: 35, option: "Bitcoin est moins cher", isCorrect: false },
                    { id: 36, option: "Il n'y a pas de différence", isCorrect: false }
                ],
                explanation: "Ethereum est une plateforme programmable qui supporte les smart contracts, contrairement à Bitcoin qui se concentre sur les transferts de valeur."
            },
            {
                id: 12,
                type: QuestionTypesEnum.BOOLEAN,
                question: "Le Bitcoin est limité à 21 millions d'unités maximum.",
                options: [
                    { id: 37, option: "Vrai", isCorrect: true },
                    { id: 38, option: "Faux", isCorrect: false }
                ],
                explanation: "Vrai ! Cette limite est inscrite dans le code de Bitcoin et constitue un mécanisme anti-inflationniste."
            },
            {
                id: 13,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Qu'est-ce que la DeFi (Finance Décentralisée) ?",
                options: [
                    { id: 39, option: "Un système bancaire traditionnel", isCorrect: false },
                    { id: 40, option: "Des services financiers sur blockchain", isCorrect: true },
                    { id: 41, option: "Une nouvelle cryptomonnaie", isCorrect: false },
                    { id: 42, option: "Un algorithme de trading", isCorrect: false }
                ],
                explanation: "La DeFi regroupe des services financiers (prêts, échanges, assurance) fonctionnant sur blockchain sans intermédiaires traditionnels."
            },
            {
                id: 14,
                type: QuestionTypesEnum.BOOLEAN,
                question: "Les NFT peuvent uniquement représenter des œuvres d'art numériques.",
                options: [
                    { id: 43, option: "Vrai", isCorrect: false },
                    { id: 44, option: "Faux", isCorrect: true }
                ],
                explanation: "Faux ! Les NFT peuvent représenter tout actif numérique unique : art, musique, domaines, objets de jeux, billets d'événements, etc."
            },
            {
                id: 15,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Quel est le principal risque du staking de cryptomonnaies ?",
                options: [
                    { id: 45, option: "Perte totale garantie", isCorrect: false },
                    { id: 46, option: "Volatilité des prix", isCorrect: true },
                    { id: 47, option: "Frais de transaction élevés", isCorrect: false },
                    { id: 48, option: "Impossibilité de retrait", isCorrect: false }
                ],
                explanation: "Le principal risque du staking est la volatilité : même si vous gagnez des récompenses, la valeur de vos cryptos peut chuter."
            }
        ]
    },

    // QUIZ 4 - Immobilier (Moyen)
    {
        id: 4,
        title: "Investissement Immobilier",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop",
        description: "Testez vos connaissances sur l'investissement immobilier locatif et la pierre-papier",
        theme: ArticleCategoriesEnum.IMMOBILIER,
        difficulty: QuizzDifficultyEnum.MEDIUM,
        relatedArticles: [],
        finishers: [],
        questions: [
            {
                id: 16,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Comment calculer la rentabilité brute d'un investissement locatif ?",
                options: [
                    { id: 49, option: "(Loyers annuels ÷ Prix d'achat) × 100", isCorrect: true },
                    { id: 50, option: "(Prix d'achat ÷ Loyers annuels) × 100", isCorrect: false },
                    { id: 51, option: "Loyers mensuels × 12", isCorrect: false },
                    { id: 52, option: "C'est impossible à calculer", isCorrect: false }
                ],
                explanation: "La rentabilité brute = (Loyers annuels hors charges ÷ Prix d'acquisition tout compris) × 100. C'est un indicateur de base pour comparer des biens."
            },
            {
                id: 17,
                type: QuestionTypesEnum.BOOLEAN,
                question: "Les SCPI permettent d'investir dans l'immobilier dès 200€.",
                options: [
                    { id: 53, option: "Vrai", isCorrect: true },
                    { id: 54, option: "Faux", isCorrect: false }
                ],
                explanation: "Vrai ! Les SCPI (pierre-papier) permettent d'investir dans l'immobilier professionnel avec de petits montants, dès quelques centaines d'euros."
            },
            {
                id: 18,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Quel est l'avantage fiscal principal de l'investissement locatif ?",
                options: [
                    { id: 55, option: "Exonération totale d'impôts", isCorrect: false },
                    { id: 56, option: "Déduction des charges et intérêts d'emprunt", isCorrect: true },
                    { id: 57, option: "TVA récupérable", isCorrect: false },
                    { id: 58, option: "Pas de plus-values à la revente", isCorrect: false }
                ],
                explanation: "On peut déduire des revenus locatifs : intérêts d'emprunt, charges de copropriété, travaux, frais de gestion, assurances, etc."
            },
            {
                id: 19,
                type: QuestionTypesEnum.BOOLEAN,
                question: "L'assurance loyers impayés est obligatoire pour un investissement locatif.",
                options: [
                    { id: 59, option: "Vrai", isCorrect: false },
                    { id: 60, option: "Faux", isCorrect: true }
                ],
                explanation: "Faux ! L'assurance loyers impayés est optionnelle mais recommandée. Elle protège contre les défauts de paiement des locataires."
            },
            {
                id: 20,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Quelle rentabilité nette viser en investissement locatif ?",
                options: [
                    { id: 61, option: "2-3% par an", isCorrect: false },
                    { id: 62, option: "4-6% par an", isCorrect: true },
                    { id: 63, option: "10-15% par an", isCorrect: false },
                    { id: 64, option: "20% par an", isCorrect: false }
                ],
                explanation: "Une rentabilité nette de 4-6% par an est réaliste en immobilier locatif, après déduction de toutes les charges (taxes, travaux, vacance, etc.)."
            }
        ]
    },

    // QUIZ 5 - Fiscalité (Difficile)
    {
        id: 5,
        title: "Fiscalité & Optimisation",
        image: "https://images.unsplash.com/photo-1579706966698-cf96a97235ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZpc2NhbGl0JUMzJUE5ZXxlbnwwfHwwfHx8Mg%3D%3D?w=500&h=300&fit=crop",
        description: "Naviguez dans le labyrinthe fiscal français pour optimiser vos investissements",
        theme: ArticleCategoriesEnum.FISCAL,
        difficulty: QuizzDifficultyEnum.HARD,
        relatedArticles: [],
        finishers: [
            { id: 3, username: "demo_user", email: "demo@elios.com", lastScore: 9 }
        ],
        questions: [
            {
                id: 21,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Quel est le plafond de versement annuel sur un PEA en 2024 ?",
                options: [
                    { id: 65, option: "75 000€", isCorrect: false },
                    { id: 66, option: "150 000€", isCorrect: true },
                    { id: 67, option: "200 000€", isCorrect: false },
                    { id: 68, option: "Il n'y a pas de plafond", isCorrect: false }
                ],
                explanation: "Le plafond de versement sur un PEA est de 150 000€. Au-delà, les versements sont bloqués mais le capital peut continuer à fructifier."
            },
            {
                id: 22,
                type: QuestionTypesEnum.BOOLEAN,
                question: "Les plus-values sur l'assurance-vie sont totalement exonérées après 8 ans.",
                options: [
                    { id: 69, option: "Vrai", isCorrect: false },
                    { id: 70, option: "Faux", isCorrect: true }
                ],
                explanation: "Faux ! Après 8 ans, il y a un abattement de 4600€/an (9200€ pour un couple) puis taxation à 7,5% + prélèvements sociaux."
            },
            {
                id: 23,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Comment est taxée la plus-value sur la résidence principale ?",
                options: [
                    { id: 71, option: "Taux de 30%", isCorrect: false },
                    { id: 72, option: "Taux progressif de l'IR", isCorrect: false },
                    { id: 73, option: "Exonération totale", isCorrect: true },
                    { id: 74, option: "Taux de 12,8%", isCorrect: false }
                ],
                explanation: "La plus-value sur la résidence principale est totalement exonérée d'impôt. C'est l'un des rares placements 100% défiscalisé."
            },
            {
                id: 24,
                type: QuestionTypesEnum.BOOLEAN,
                question: "Le PER permet de déduire les versements de ses revenus imposables.",
                options: [
                    { id: 75, option: "Vrai", isCorrect: true },
                    { id: 76, option: "Faux", isCorrect: false }
                ],
                explanation: "Vrai ! Le Plan Épargne Retraite permet de déduire les versements de ses revenus, dans la limite de plafonds. La sortie sera imposée."
            },
            {
                id: 25,
                type: QuestionTypesEnum.MULTIPLE,
                question: "Quelle niche fiscale permet de réduire ses impôts en investissant dans l'immobilier neuf ?",
                options: [
                    { id: 77, option: "Loi Scellier", isCorrect: false },
                    { id: 78, option: "Loi Pinel", isCorrect: true },
                    { id: 79, option: "Loi Malraux", isCorrect: false },
                    { id: 80, option: "Loi Girardin", isCorrect: false }
                ],
                explanation: "La loi Pinel permet une réduction d'impôt de 12%, 18% ou 21% selon la durée d'engagement locatif (6, 9 ou 12 ans) dans l'immobilier neuf."
            }
        ]
    }
];

export const getAllQuizz = async (): Promise<QuizzType[]> => {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 700));
    return mockQuizz;
};
export const getSingleQuizz = async (quizzId: number): Promise<QuizzType> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const quiz = mockQuizz.find(q => q.id === quizzId);
    if (!quiz) {
        throw new Error(`Quiz ${quizzId} non trouvé`);
    }
    return quiz;
};

export const completeQuizz = async (quizzId: number, score: number): Promise<QuizzType> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`Quiz ${quizzId} terminé avec un score de ${score}`);
    const quiz = mockQuizz.find(q => q.id === quizzId);
    if (!quiz) {
        throw new Error(`Quiz ${quizzId} non trouvé`);
    }
    
    // Simuler l'ajout du score dans les finishers
    const existingFinisher = quiz.finishers.find(f => f.username === "demo_user");
    if (existingFinisher) {
        existingFinisher.lastScore = score;
    } else {
        quiz.finishers.push({
            id: quiz.finishers.length + 1,
            username: "demo_user",
            email: "demo@elios.com",
            lastScore: score
        });
    }
    
    return quiz;
};
