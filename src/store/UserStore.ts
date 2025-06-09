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
    lastUserLocation: string | null;
    setLastUserLocation: (location: string) => void;
};

export const userStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            lastUserLocation: null,
            updateUser: (user) => {
                const currentState = get();
                const newUser = currentState.user ? { ...currentState.user, ...user } : (user as User);
                set({ user: newUser });
            },
            removeUser: () => {
                set(() => ({
                    user: null,
                    lastUserLocation: null,
                }));
            },
            getAuth: () => {
                const { user } = get();
                return {
                    Authorization: user?.token ? `Bearer ${user.token}` : undefined,
                };
            },
            setLastUserLocation: (location) => {
                set({ lastUserLocation: location });

                setTimeout(() => {
                    const newState = get();
                }, 10);
            },
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
            version: 1,
            partialize: (state) => ({
                user: state.user,
                lastUserLocation: state.lastUserLocation,
            }),
            migrate: (persistedState: any, version: number) => {
                if (version === 0) {
                    return persistedState;
                }
                return persistedState;
            },
        },
    ),
);

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('User', userStore);
}
