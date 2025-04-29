'use client';

import { cn } from '@/lib/utils';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import * as React from 'react';

type CarouselAppApi = UseEmblaCarouselType[1];
type UseCarouselAppParameters = Parameters<typeof useEmblaCarousel>;
type CarouselAppOptions = UseCarouselAppParameters[0];
type CarouselAppPlugin = UseCarouselAppParameters[1];

type CarouselAppProps = {
    opts?: CarouselAppOptions;
    plugins?: CarouselAppPlugin;
    orientation?: 'horizontal' | 'vertical';
    setApi?: (api: CarouselAppApi) => void;
    // Ajout des propriétés manquantes
    className?: string;
};

type CarouselAppContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
} & CarouselAppProps;

const CarouselAppContext = React.createContext<CarouselAppContextProps | null>(null);

function useCarouselApp() {
    const context = React.useContext(CarouselAppContext);

    if (!context) {
        throw new Error('useCarouselApp must be used within a <CarouselApp />');
    }

    return context;
}

const CarouselApp = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselAppProps>(
    ({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }, ref) => {
        const [carouselRef, api] = useEmblaCarousel(
            {
                ...opts,
                axis: orientation === 'horizontal' ? 'x' : 'y',
                align: 'center',
                containScroll: 'trimSnaps',
            },
            plugins,
        );

        const [canScrollPrev, setCanScrollPrev] = React.useState(false);
        const [canScrollNext, setCanScrollNext] = React.useState(false);

        const onSelect = React.useCallback((api: CarouselAppApi) => {
            if (!api) {
                return;
            }

            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        }, []);

        const scrollPrev = React.useCallback(() => {
            api?.scrollPrev();
        }, [api]);

        const scrollNext = React.useCallback(() => {
            api?.scrollNext();
        }, [api]);

        React.useEffect(() => {
            if (!api || !setApi) {
                return;
            }

            setApi(api);
        }, [api, setApi]);

        React.useEffect(() => {
            if (!api) {
                return;
            }

            onSelect(api);
            api.on('reInit', onSelect);
            api.on('select', onSelect);

            return () => {
                api?.off('select', onSelect);
            };
        }, [api, onSelect]);

        return (
            <CarouselAppContext.Provider
                value={{
                    carouselRef,
                    api: api,
                    opts,
                    orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
                    scrollPrev,
                    scrollNext,
                    canScrollPrev,
                    canScrollNext,
                    className,
                }}
            >
                <div
                    ref={ref}
                    className={cn('relative', className)}
                    role='region'
                    aria-roledescription='carousel'
                    {...props}
                >
                    {children}
                </div>
            </CarouselAppContext.Provider>
        );
    },
);
CarouselApp.displayName = 'CarouselApp';

const CarouselAppContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { carouselRef, orientation } = useCarouselApp();

        return (
            <div ref={carouselRef} className='overflow-hidden'>
                <div
                    ref={ref}
                    className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
                    {...props}
                />
            </div>
        );
    },
);
CarouselAppContent.displayName = 'CarouselAppContent';

const CarouselAppItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { orientation } = useCarouselApp();

        return (
            <div
                ref={ref}
                role='group'
                aria-roledescription='slide'
                className={cn(
                    'min-w-0 shrink-0 grow-0 basis-4/5 md:basis-1/3',
                    orientation === 'horizontal' ? 'pl-4' : 'pt-4',
                    className,
                )}
                {...props}
            />
        );
    },
);
CarouselAppItem.displayName = 'CarouselAppItem';

export { type CarouselAppApi, CarouselApp, CarouselAppContent, CarouselAppItem };
