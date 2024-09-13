import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from 'zustand';

type NewUserState= {
    email: string;
    password1: string;
    password2: string;
    pin1: number;
    pin2: number;
    setEmail: (email: string) => void;
    setPassword1: (password1: string) => void;
    setPassword2: (password2: string) => void;
    setPin1: (pin1: number) => void;
    setPin2: (pin2: number) => void;
    clear: () => void;
}

export const useRegisterUsersStore = create<NewUserState>()(
    persist(
        (set) => ({
            email: '',
            password1: '',
            password2: '',
            pin1: 0,
            pin2: 0,
            setEmail: (email: string) => set({ email }),
            setPassword1: (password1: string) => set({ password1 }),
            setPassword2: (password2: string) => set({ password2 }),
            setPin1: (pin1: number) => set({ pin1 }),
            setPin2: (pin2: number) => set({ pin2 }),
            clear: () => set({ email: '', password1: '', password2: '', pin1: 0, pin2: 0 }),
        }),
        {
            name: 'register-user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

mountStoreDevtool('RegisterUserStore', useRegisterUsersStore);