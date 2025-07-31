import { userStore } from '@/store/UserStore';
import { challengeType, companyType, userToChallengeType } from '@/types/challengeType';
import { ArticleCategoriesEnum } from '@/types/BlogType';
import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { instance_back } from '../const';

// MOCK DATA FOR DEMO - Companies
const mockCompanies: companyType[] = [
    {
        id: 1,
        name: "Elios Finance",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
        description: "Expert en gestion financière personnelle",
        creation_date: new Date("2023-01-01"),
        challenges: []
    },
    {
        id: 2,
        name: "MoneyWise",
        logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop",
        description: "Votre partenaire épargne et investissement",
        creation_date: new Date("2023-06-01"),
        challenges: []
    },
    {
        id: 3,
        name: "BudgetPro",
        logo: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=100&h=100&fit=crop",
        description: "Maîtrisez votre budget avec nos outils",
        creation_date: new Date("2023-03-15"),
        challenges: []
    }
];

// MOCK DATA FOR DEMO - Categories
const mockChallengeCategories = [
    {
        id: 1,
        title: ArticleCategoriesEnum.BUDGET,
        description: "Défis pour maîtriser son budget",
        icon: "📋",
        articles: []
    },
    {
        id: 2,
        title: ArticleCategoriesEnum.EPARGNE,
        description: "Défis pour développer son épargne",
        icon: "💰",
        articles: []
    },
    {
        id: 3,
        title: ArticleCategoriesEnum.INVESTISSEMENT,
        description: "Défis pour débuter en investissement",
        icon: "📈",
        articles: []
    },
    {
        id: 4,
        title: ArticleCategoriesEnum.BOURSE,
        description: "Défis trading et bourse",
        icon: "📊",
        articles: []
    }
];

// MOCK DATA FOR DEMO - User Challenge States
const createUserChallengeState = (
    challengeId: number, 
    state: 'START' | 'PROGRESS' | 'REWARD_TO_CLAIM' | 'REWARD_CLAIMED' | 'END',
    username: string = "demo_user"
): userToChallengeType => ({
    id: challengeId,
    user: {
        id: 1,
        username: username,
        email: "demo@elios.com"
    },
    currentState: state,
    creation_date: new Date(),
    update_date: new Date()
});

// Function to get current user from store
const getCurrentUser = () => {
    try {
        const userState = userStore.getState();
        return userState.user?.username || "demo_user";
    } catch {
        return "demo_user";
    }
};

// MOCK DATA FOR DEMO - Challenges
const mockChallenges: challengeType[] = [
    // DÉFI VEDETTE - En cours
    {
        id: 1,
        title: "Défi Épargne 30 jours",
        description: "Économisez 5€ par jour pendant 30 jours et constituez votre première épargne de 150€. Un défi simple pour débuter !",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&h=300&fit=crop",
        company: mockCompanies[0],
        category: mockChallengeCategories[1], // EPARGNE
        userToChallenge: [createUserChallengeState(1, 'PROGRESS')]
    },
    
    // DÉFIS EN COURS
    {
        id: 2,
        title: "Budget Zéro Déchet",
        description: "Réduisez vos dépenses superflues de 30% en éliminant le gaspillage alimentaire et les achats impulsifs.",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=500&h=300&fit=crop",
        company: mockCompanies[2],
        category: mockChallengeCategories[0], // BUDGET
        userToChallenge: [createUserChallengeState(2, 'START')]
    },
    {
        id: 3,
        title: "Investir 100€ par mois",
        description: "Démarrez votre parcours d'investisseur en plaçant 100€ mensuels sur des ETF diversifiés.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop",
        company: mockCompanies[1],
        category: mockChallengeCategories[2], // INVESTISSEMENT
        userToChallenge: [createUserChallengeState(3, 'PROGRESS')]
    },
    
    // DÉFIS TERMINÉS
    {
        id: 4,
        title: "52 Semaines d'Épargne",
        description: "Le défi classique : épargnez 1€ la première semaine, 2€ la deuxième... jusqu'à 52€ !",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&h=300&fit=crop",
        company: mockCompanies[0],
        category: mockChallengeCategories[1], // EPARGNE
        userToChallenge: [createUserChallengeState(4, 'REWARD_CLAIMED')]
    },
    {
        id: 5,
        title: "Mes Premières Actions",
        description: "Achetez votre première action en bourse et apprenez les bases du trading responsable.",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&h=300&fit=crop",
        company: mockCompanies[1],
        category: mockChallengeCategories[3], // BOURSE
        userToChallenge: [createUserChallengeState(5, 'END')]
    },
    {
        id: 6,
        title: "Mes Premières Actions",
        description: "Achetez votre première action en bourse et apprenez les bases du trading responsable.",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&h=300&fit=crop",
        company: mockCompanies[1],
        category: mockChallengeCategories[3], // BOURSE
        userToChallenge: [createUserChallengeState(5, 'END')]
    },
    
    // DÉFIS À DÉMARRER
    {
        id: 6,
        title: "Économie d'Énergie",
        description: "Réduisez vos factures énergétiques de 20% en adoptant des gestes simples et efficaces.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&h=300&fit=crop",
        company: mockCompanies[2],
        category: mockChallengeCategories[0], // BUDGET
        userToChallenge: []
    },
    {
        id: 7,
        title: "Fonds d'Urgence",
        description: "Constituez un fonds d'urgence équivalent à 3 mois de charges en 6 mois.",
        image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=500&h=300&fit=crop",
        company: mockCompanies[0],
        category: mockChallengeCategories[1], // EPARGNE
        userToChallenge: []
    },
    {
        id: 8,
        title: "Diversification Portfolio",
        description: "Apprenez à diversifier vos investissements sur 5 classes d'actifs différents.",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop",
        company: mockCompanies[1],
        category: mockChallengeCategories[2], // INVESTISSEMENT
        userToChallenge: []
    },
    {
        id: 9,
        title: "Trading Paper",
        description: "Entraînez-vous au trading sans risque avec 10 000€ virtuels pendant 30 jours.",
        image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=500&h=300&fit=crop",
        company: mockCompanies[1],
        category: mockChallengeCategories[3], // BOURSE
        userToChallenge: []
    },
    {
        id: 10,
        title: "Zéro Frais Bancaires",
        description: "Éliminez tous vos frais bancaires en optimisant vos comptes et cartes.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop",
        company: mockCompanies[2],
        category: mockChallengeCategories[0], // BUDGET
        userToChallenge: []
    },
    {
        id: 11,
        title: "PEA Jeune Actif",
        description: "Ouvrez et maximisez votre PEA avec 200€ par mois pendant votre première année.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        company: mockCompanies[0],
        category: mockChallengeCategories[2], // INVESTISSEMENT
        userToChallenge: []
    },
    {
        id: 12,
        title: "Objectif Assurance-Vie",
        description: "Atteignez 5000€ d'épargne sur votre assurance-vie en 12 mois.",
        image: "https://images.unsplash.com/photo-1505816014357-96b5ff457e9a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXNzdXJhbmNlJTIwdmllfGVufDB8fDB8fHwy?w=500&h=300&fit=crop",
        company: mockCompanies[0],
        category: mockChallengeCategories[1], // EPARGNE
        userToChallenge: []
    },
];

export const getChallenges = async (): Promise<challengeType[]> => {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Créer des copies des défis avec l'utilisateur actuel
    const currentUsername = getCurrentUser();
    
    const challengesWithUser = mockChallenges.map(challenge => ({
        ...challenge,
        userToChallenge: challenge.userToChallenge.map(utc => ({
            ...utc,
            user: {
                ...utc.user,
                username: currentUsername
            }
        }))
    }));
    
    return challengesWithUser;
};

export const getPartnerChallenges = async (partnerId: number): Promise<challengeType[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Filtrer les défis par entreprise partenaire
    return mockChallenges.filter(challenge => challenge.company.id === partnerId);
};

export const progressChallenge = async (challengeId: number): Promise<challengeType | void> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    console.log(`Progression du défi ${challengeId} mise à jour`);
    // Dans un vrai scénario, cela mettrait à jour l'état du défi
    const challenge = mockChallenges.find(c => c.id === challengeId);
    if (challenge) {
        return challenge;
    }
};

export const useGetChallenges = (): UseQueryResult<challengeType[], AxiosError> => {
    return useQuery<challengeType[], AxiosError>({
        queryKey: ['getChallenges'],
        queryFn: getChallenges,
    });
};
