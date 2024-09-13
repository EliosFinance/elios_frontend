import { create } from 'zustand';
import { mountStoreDevtool } from "simple-zustand-devtools";
import { createJSONStorage, persist } from "zustand/middleware";
import RegisterStep1 from "../pages/Auth/Register/Register-step1"
import RegisterStep2 from "../pages/Auth/Register/Register-step2"

export const StepsArray = [
    {
        title: 'Register',
        component: RegisterStep1
    },
    {
        title: 'Register',
        component: RegisterStep2
    }
];

type Step = {
    title: string;
    component: React.ReactNode;
}

type StepState = {
    step: Step | null;
    currentStep: number;
    setStep: (step: Step) => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (stepIndex: number) => void;
}

export const useRegisterStepsStore = create<StepState>()(
    persist(
        (set, get) => ({
            step: null,
            currentStep: 0,
            setStep: (step) => set({ step }),
            nextStep: () => {
                const { currentStep } = get();
                if (currentStep < StepsArray.length - 1) {
                    set({ currentStep: currentStep + 1 });
                }
            },
            prevStep: () => {
                const { currentStep } = get();
                if (currentStep > 0) {
                    set({ currentStep: currentStep - 1 });
                }
            },
            goToStep: (stepIndex) => {
                if (stepIndex >= 0 && stepIndex < StepsArray.length) {
                    set({ currentStep: stepIndex });
                }
            },
        }),
        {
            name: 'register-steps-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

mountStoreDevtool('RegisterStepsStore', useRegisterStepsStore);
