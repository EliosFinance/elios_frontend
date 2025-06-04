import { generateDeviceId, setupPin } from '@/api/connexion/connexionCalls';
import { register_api } from '@/api/connexion/connexionCalls';
import { instance_back } from '@/api/const';
import { Button } from '@/components/ui/button';
import { useRegisterUsersStore } from '@/store/RegisterUser';
import { userStore } from '@/store/UserStore';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterHeader from '../components/RegisterHeader';

const TermsAndConditions: React.FC = () => {
    const [isAccepted, setIsAccepted] = useState(false);
    const navigate = useNavigate();
    const { email, username, password2: password, pin1: pin, clear } = useRegisterUsersStore();

    const handleNext = async () => {
        if (!isAccepted) {
            alert('Veuillez accepter les conditions générales pour continuer.');
            return;
        }

        try {
            // 1. Inscription et login
            await register_api(username, email, password);
            const loginResponse = await instance_back.post('auth/sign-in', {
                usernameOrEmail: username,
                password: password,
            });

            const { access_token, refresh_token, username: responseUsername, powens_token } = loginResponse.data;

            // 2. Stockage des tokens et mise à jour du store
            localStorage.setItem('token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            const tokenPayload = JSON.parse(atob(access_token.split('.')[1]));
            userStore.getState().updateUser({
                id: tokenPayload.sub,
                username: responseUsername,
                token: access_token,
                refresh_token: refresh_token,
                powens_token: powens_token,
            });

            // 3. Configuration du PIN et deviceId
            const success = await setupPin(pin);
            if (!success) {
                throw new Error('Échec de la configuration du PIN');
            }
            const deviceId = await generateDeviceId();
            localStorage.setItem('deviceId', deviceId);

            // 4. Nettoyage et redirection
            clear();
            navigate(APP_ROUTES_ENUM.HOME);
        } catch (err) {
            console.error("Erreur lors de l'inscription ou de la configuration:", (err as Error).message);
        }
    };

    return (
        <div className='flex flex-col items-center justify-start w-full h-screen px-4 pt-6 pb-8'>
            <RegisterHeader title="Conditions générales d'utilisation" />

            <div className='w-full h-full flex flex-col items-center justify-start gap-8 pt-16'>
                <div className='w-full p-4 mb-6 overflow-y-auto text-sm text-gray-400 border border-primary-500 rounded-lg max-h-64'>
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
                        className='w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-blue-500'
                    />
                    <label htmlFor='accept-terms' className='text-sm text-gray-300'>
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
