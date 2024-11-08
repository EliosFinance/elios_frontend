export type ChallengeType = {
    backgroundImage: string;
    companyLogo: string;
    id: number;
    title: string;
    reward: string;
    sponsor: string;
    description: string;
    progress: number;
    leaderboard: { rank: number; name: string; score: number }[];
};

export const challenges: ChallengeType[] = [
    {
        id: 1,
        backgroundImage:
            'https://images.unsplash.com/photo-1726996155550-d69c6a9118b6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        companyLogo:
            'https://images.unsplash.com/photo-1508599589920-14cfa1c1fe4d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJyYW5kfGVufDB8fDB8fHww', // Exemple de logo
        title: 'Grandissez votre delta positif !',
        reward: '250 EC',
        sponsor: 'Nike',
        description: "Apprenez le fonctionnement d'un éco-système...",
        progress: 1241,
        leaderboard: [
            { rank: 1, name: 'John Doe', score: 200 },
            { rank: 2, name: 'John Doe', score: 198 },
            { rank: 3, name: 'John Doe', score: 196 },
            { rank: 4, name: 'John Doe', score: 194 },
            { rank: 5, name: 'John Doe', score: 192 },
            { rank: 6, name: 'John Doe', score: 190 },
            { rank: 7, name: 'John Doe', score: 188 },
            { rank: 8, name: 'John Doe', score: 186 },
            { rank: 9, name: 'John Doe', score: 184 },
            { rank: 10, name: 'John Doe', score: 182 },
            { rank: 11, name: 'John Doe', score: 180 },
            { rank: 12, name: 'John Doe', score: 178 },
            { rank: 13, name: 'John Doe', score: 176 },
            { rank: 14, name: 'John Doe', score: 174 },
            { rank: 15, name: 'John Doe', score: 172 },
            { rank: 16, name: 'John Doe', score: 170 },
            { rank: 17, name: 'John Doe', score: 168 },
            { rank: 18, name: 'John Doe', score: 166 },
            { rank: 19, name: 'John Doe', score: 164 },
            { rank: 20, name: 'John Doe', score: 162 },
        ],
    },
    {
        id: 2,
        backgroundImage:
            'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJyYW5kfGVufDB8fDB8fHww',
        companyLogo:
            'https://images.unsplash.com/photo-1508599589920-14cfa1c1fe4d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJyYW5kfGVufDB8fDB8fHww',
        title: 'Delta positif',
        reward: '250 EC',
        sponsor: 'Nike',
        description: "Apprenez le fonctionnement d'un éco-système...",
        progress: 1241,
        leaderboard: [
            { rank: 1, name: 'John Doe', score: 200 },
            { rank: 2, name: 'John Doe', score: 198 },
            { rank: 3, name: 'John Doe', score: 196 },
            { rank: 4, name: 'John Doe', score: 194 },
            { rank: 5, name: 'John Doe', score: 192 },
            { rank: 6, name: 'John Doe', score: 190 },
            { rank: 7, name: 'John Doe', score: 188 },
            { rank: 8, name: 'John Doe', score: 186 },
            { rank: 9, name: 'John Doe', score: 184 },
            { rank: 10, name: 'John Doe', score: 182 },
        ],
    },
];
