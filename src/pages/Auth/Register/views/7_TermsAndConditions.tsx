import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthProvider';
import { useRegisterUsersStore } from '@/store/RegisterUser';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterHeader from '../components/RegisterHeader';

const TermsAndConditions: React.FC = () => {
    const [isAccepted, setIsAccepted] = useState(false); // État pour gérer l'acceptation
    const navigate = useNavigate();
    const { authenticate } = useAuth();
    const { email, username, password2: password, pin2, clear } = useRegisterUsersStore();

    const handleNext = async () => {
        if (!isAccepted) {
            alert('Veuillez accepter les conditions générales pour continuer.');
            return;
        }

        const canRegister = await authenticate('register', username, password, email);
        if (canRegister) {
            clear();
            navigate(APP_ROUTES_ENUM.HOME);
        } else {
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <div className='flex flex-col items-center justify-between w-full h-screen px-4 pt-6 bg-white pb-28'>
            <RegisterHeader title="Conditions générales d'utilisation" />

            <div className='flex flex-col items-center justify-center w-full max-w-sm'>
                <div className='w-full p-4 mb-6 overflow-y-auto text-sm text-gray-700 border border-blue-300 rounded-lg max-h-64'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac lacus cursus risus posuere
                    pharetra sed eu turpis. Cras pulvinar elementum dolor, eget aliquam felis facilisis et. Fusce ante
                    risus, gravida vitae ante a, venenatis vestibulum nunc. Nam vitae ante fringilla leo vulputate
                    interdum. Cras et magna ac lorem elementum efficitur dapibus sed massa.
                    <br />
                    <br />
                    Nulla a risus vel orci pulvinar tristique non ut urna. Sed ut felis ex. Suspendisse vel erat sem.
                    Phasellus et vulputate sapien. In aliquet iaculis mi. Curabitur pulvinar sapien sed auctor pretium.
                    Sed sed porta est, eu placerat felis.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur...
                </div>

                <div className='flex items-center mb-4 space-x-2'>
                    <input
                        type='checkbox'
                        id='accept-terms'
                        checked={isAccepted}
                        onChange={(e) => setIsAccepted(e.target.checked)}
                        className='w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500'
                    />
                    <label htmlFor='accept-terms' className='text-sm text-gray-800'>
                        J'ai lu et j'accepte les conditions générales
                    </label>
                </div>
            </div>

            <Button
                onClick={handleNext}
                className={`w-full px-4 py-2 text-white text-center rounded-full ${
                    isAccepted ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!isAccepted}
            >
                Acceder à Elios
            </Button>
        </div>
    );
};

export default TermsAndConditions;
