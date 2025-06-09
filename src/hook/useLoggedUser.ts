import { useGetConnection, getUser } from '@/api';
import { useAuth } from '@/context/AuthProvider';
import { userType } from '@/types/challengeType';
import { TransactionType } from '@/types/transactionType';

const useLoggedUser = () => {
    const { user } = useAuth();
    const { data, error, isError } = useGetConnection();

    const getFullLoggedUser = async (): Promise<userType> => {
        const userId = user?.id;
        if (!userId) return;
        return await getUser();
    };

    const getUserTransactions = async (): Promise<TransactionType[]> => {
        const fUser = await getFullLoggedUser();
        if (!fUser) return;
        const transactions = fUser.transactions || [];
        return transactions;
    };

    const userHasBankAccount = async (): Promise<boolean> => {
        if (error || isError) {
            console.error('Error fetching connections:', error);
            return false;
        }

        if (data) {
            return data.length > 0;
        } else {
            return false;
        }
    };

    return {
        user,
        getFullLoggedUser,
        getUserTransactions,
        userHasBankAccount,
    };
};

export default useLoggedUser;
