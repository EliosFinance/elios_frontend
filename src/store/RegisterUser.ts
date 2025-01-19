import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type NewUserState = {
    username: string;
    email: string;
    password1: string;
    password2: string;
    pin1: string;
    pin2: string;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setPassword1: (password1: string) => void;
    setPassword2: (password2: string) => void;
    setPin1: (pin1: string) => void;
    setPin2: (pin2: string) => void;
    clear: () => void;
};

export const useRegisterUsersStore = create<NewUserState>()(
    persist(
        (set) => ({
            username: '',
            email: '',
            password1: '',
            password2: '',
            pin1: '',
            pin2: '',
            setUsername: (username: string) => set({ username }),
            setEmail: (email: string) => set({ email }),
            setPassword1: (password1: string) => set({ password1 }),
            setPassword2: (password2: string) => set({ password2 }),
            setPin1: (pin1: string) => set({ pin1 }),
            setPin2: (pin2: string) => set({ pin2 }),
            clear: () => set({ username: '', email: '', password1: '', password2: '', pin1: '', pin2: '' }),
        }),
        {
            name: 'register-user-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

mountStoreDevtool('RegisterUserStore', useRegisterUsersStore);
