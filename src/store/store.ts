import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Définition de l'état global
interface StoreState {
    token: string;
    email: string;
    password: string; // Ajout du password
    pinCode: string; // Ajout du pinCode
    setToken: (token: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void; // Setter pour password
    setPinCode: (pinCode: string) => void; // Setter pour pinCode
}

// Configuration du store Zustand
const useStore = create<StoreState>()(
    persist(
        (set) => ({
            token: '',
            email: '',
            password: '', // Initialisation du password
            pinCode: '', // Initialisation du pinCode
            setToken: (token) => set({ token }),
            setEmail: (email) => set({ email }),
            setPassword: (password) => set({ password }), // Setter pour password
            setPinCode: (pinCode) => set({ pinCode }), // Setter pour pinCode
        }),
        {
            name: 'app-storage', // Nom dans le localStorage
            storage: createJSONStorage(() => localStorage), // Utilisation de localStorage
        },
    ),
);

// Intégration de `mountStoreDevtool` uniquement en développement
if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Zustand Store', useStore);
}

export default useStore;
