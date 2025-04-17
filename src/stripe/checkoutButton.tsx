import { createStripeCheckoutSession } from '@/api/stripe';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({ plan }: { plan: 'monthly' | 'annual' }) => {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const { sessionId } = await createStripeCheckoutSession(plan);
            const stripe = await stripePromise;

            if (!stripe) {
                console.error('Erreur de chargement Stripe');
                return;
            }

            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) {
                console.error(error.message || 'Erreur lors de la redirection Stripe');
            }
        } catch (err) {
            console.error(err);
            console.error('Erreur lors de la création de la session de paiement.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            className='w-full py-3 mt-6 text-white bg-blue-500 rounded-full'
            onClick={handleCheckout}
            disabled={loading}
        >
            {loading ? 'Chargement...' : 'Je deviens Premium'}
        </Button>
    );
};

export default CheckoutButton;
