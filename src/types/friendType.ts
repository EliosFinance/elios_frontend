export type overdueWorkType = {
    percentage: number;
    count: number;
    description: string;
};

export type finishedLateType = {
    percentage: number;
    count: number;
    description: string;
};

export type monthlyGoalType = {
    title: string;
    progress: number;
};

export type weeklyExpenseType = {
    category: string;
    amount: string;
    date: string;
};

export type categoryChartType = {
    category: string;
    percentage: number;
};

export type friendType = {
    id: string;
    name: string;
    profilePicture: string;
    balance: string;
    lastConnected: string;
    score: number;
    products: number[];
    overdueWork: overdueWorkType;
    finishedLate: finishedLateType;
    monthlyGoals: monthlyGoalType[];
    weeklyExpenses: weeklyExpenseType[];
    categoryChart: categoryChartType[];
};
