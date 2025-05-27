import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
    id: string;
    username: string;
    token: string;
    refresh_token: string;
    powens_token: string;
};

type UserState = {
    user: User | null;
    updateUser: (user: Partial<User>) => void;
    getAuth: () => { Authorization?: string };
    removeUser: () => void;
};

export const userStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            updateUser: (user) => {
                const currentState = get();
                const newUser = currentState.user ? { ...currentState.user, ...user } : (user as User);
                set({ user: newUser });
                localStorage.setItem('user-storage', JSON.stringify({ state: { user: newUser }, version: 0 }));
            },
            removeUser: () =>
                set(() => ({
                    user: null,
                })),
            getAuth: () => {
                const { user } = get();
                return {
                    Authorization: user?.token ? `Bearer ${user.token}` : undefined,
                };
            },
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

mountStoreDevtool('User', userStore);
