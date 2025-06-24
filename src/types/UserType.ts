import { ChallengeType } from '@/temp/DefiData';
import { ArticleType } from './BlogType';
import { TransactionType } from './transactionType';

export type UserCompletionStatus = {
    emailVerified: boolean;
    pinConfigured: boolean;
    termsAccepted: boolean;
    profileComplete: boolean;
    provider: 'email' | 'google';
    registrationDate: Date;
    nextSteps: string[];
};

export type FriendsType = {
    id: string;
    profilePicture: string;
    username: string;
    email: string;
    friends: FriendsType[];
    articles: ArticleType[];
    likedArticles: ArticleType[];
    readArticles: ArticleType[];
    transactions: TransactionType[];
    userToChallenge: UserToChallengeType[];
};

export type UserToChallengeType = {
    id: number;
    challenge: ChallengeType;
    user: FriendsType;
    currentState: string | null;
    creation_date: Date;
    update_date: Date;
};
