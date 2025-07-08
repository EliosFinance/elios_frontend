import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type learnState = {
    panelSelected: string;
    setPanelSelected: (panelSelected: string) => void;
};

export const useLearnStore = create<learnState>()(
    persist(
        (set, _get) => ({
            panelSelected: 'articles',
            setPanelSelected: (panelSelected: string) => set({ panelSelected: panelSelected }),
        }),
        {
            name: 'learn-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
