export type FriendType = {
    id: string;
    name: string;
    profilePicture: string;
    balance: string;
    lastConnected: string;
    score: number;
    products: number[];
    overdueWork: {
        percentage: number;
        count: number;
        description: string;
    };
    finishedLate: {
        percentage: number;
        count: number;
        description: string;
    };
    monthlyGoals: { title: string; progress: number }[];
    weeklyExpenses: { category: string; amount: string; date: string }[];
    categoryChart: { category: string; percentage: number }[];
};

export const friendsData: FriendType[] = [
    {
        id: '1',
        name: 'Sarah',
        profilePicture: 'https://via.placeholder.com/150',
        balance: '$5.84',
        lastConnected: '12:23 AM',
        score: 78,
        products: [25, 25, 25],
        overdueWork: {
            percentage: 38,
            count: 6,
            description: 'Plus de 32 tâches en cours',
        },
        finishedLate: {
            percentage: 62,
            count: 19,
            description: 'Plus de 32 tâches en cours',
        },
        monthlyGoals: [
            { title: 'Objectif zéro dépenses', progress: 70 },
            { title: 'Evening Skincare', progress: 100 },
            { title: 'Meditate for 5 min', progress: 100 },
        ],
        weeklyExpenses: [
            { category: 'Starbucks Coffee', amount: '-$156.00', date: 'Dec 2, 2020' },
            { category: 'Netflix Subscription', amount: '-$87.00', date: 'Dec 11, 2020' },
        ],
        categoryChart: [
            { category: 'Transportation', percentage: 20 },
            { category: 'Shopping', percentage: 50 },
            { category: 'Coffee', percentage: 30 },
        ],
    },
    {
        id: '2',
        name: 'Alex',
        profilePicture: 'https://via.placeholder.com/150',
        balance: '$10.50',
        lastConnected: '11:45 PM',
        score: 85,
        products: [30, 20, 30],
        overdueWork: {
            percentage: 40,
            count: 5,
            description: 'Plus de 20 tâches en cours',
        },
        finishedLate: {
            percentage: 50,
            count: 15,
            description: 'Plus de 20 tâches en cours',
        },
        monthlyGoals: [
            { title: 'Read a book', progress: 50 },
            { title: 'Exercise daily', progress: 80 },
        ],
        weeklyExpenses: [
            { category: 'Amazon Purchase', amount: '-$200.00', date: 'Dec 5, 2020' },
            { category: 'Gym Membership', amount: '-$50.00', date: 'Dec 10, 2020' },
        ],
        categoryChart: [
            { category: 'Books', percentage: 40 },
            { category: 'Fitness', percentage: 60 },
        ],
    },
];
