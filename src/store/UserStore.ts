import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
    username?: string;
    token?: string;
    refresh_token?: string;
    powens_token?: string;
};

type UserState = {
    user: User | null;
    updateUser: (user: User | null) => void;
    getAuth: () => { Authorization?: string };
    removeUser: () => void;
};

export const userStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            updateUser: (user) =>
                set((state) => ({
                    user: { ...state.user, ...user },
                })),
            removeUser: () =>
                set(() => ({
                    user: null,
                })),
            getAuth: () => {
                const { user } = get();
                return {
                    Authorization: user && user.token ? `Bearer ${user.token}` : undefined,
                };
            },
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

mountStoreDevtool('User', userStore);
