import { useEffect } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserRewardsState = {
    unClaimedRewards: number;
    claimedRewards: number;
    setUnClaimedRewards: (unClaimedRewards: number) => void;
    setClaimedRewards: (claimedRewards: number) => void;
    getUnClaimedRewards: () => number;
    getClaimedRewards: () => number;
};

export const useUserRewards = create<UserRewardsState>()(
    persist(
        (set, get) => ({
            unClaimedRewards: 1,
            claimedRewards: 0,
            setUnClaimedRewards: (unClaimedRewards) => set({ unClaimedRewards }),
            setClaimedRewards: (claimedRewards) => set({ claimedRewards }),
            claimReward: () => {
                set((state) => ({
                    unClaimedRewards: state.unClaimedRewards - 1,
                    claimedRewards: state.claimedRewards + 1,
                }));
            },
            getUnClaimedRewards: () => get().unClaimedRewards,
            getClaimedRewards: () => get().claimedRewards,
        }),
        {
            name: 'user-rewards-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

// setInterval(async() => {
//     // TODO: implement getRewards
//     // const rewards = await getRewards();
//     useUserRewards.getState().setUnClaimedRewards(0);
// }, 60*2*1000);
