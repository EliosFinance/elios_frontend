import { userStore } from '@/store/UserStore';
import { instance_back } from './const';

export const createStripeCheckoutSession = async (plan: string) => {
    const headers = userStore.getState().getAuth();

    const response = await instance_back.post('/stripe/create-checkout-session', { plan }, { headers });

    return response.data;
};
