import { WidgetType } from '@/temp/WidgetData';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type WidgetState = {
    widgets: WidgetType[];
    toggleWidgetDisplay: (id: number) => void;
    setWidgets: (widgets: WidgetType[]) => void;
    getWidgets: () => WidgetType[];
};

export const widgetStore = create<WidgetState>()(
    persist(
        (set, get) => ({
            widgets: [],
            toggleWidgetDisplay: (id) => {
                set((state) => ({
                    widgets: state.widgets.map((widget) =>
                        widget.id === id ? { ...widget, display: !widget.display } : widget,
                    ),
                }));
            },
            setWidgets: (widgets) => set({ widgets }),
            getWidgets: () => get().widgets,
        }),
        {
            name: 'widget-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
