import { CarouselApp, CarouselAppContent, CarouselAppItem } from '@/components/ui/carousel-app';
import { challengeType } from '@/types/challengeType';
import React from 'react';

interface CarouselChallengesProps {
    slides: challengeType[];
    renderItem: (data: challengeType) => React.ReactNode;
    loop?: boolean;
}

export default function CarouselChallenges({ slides, renderItem, loop = false }: CarouselChallengesProps) {
    const isSingleItem = slides.length === 1;

    const carouselOptions = {
        loop: isSingleItem ? false : loop,
        dragFree: false,
        align: 'center' as const,
    };

    if (isSingleItem) {
        return (
            <div className='flex justify-center pb-6'>
                <div className='w-full h-full max-w-sm'>{renderItem(slides[0])}</div>
            </div>
        );
    }

    return (
        <div className='pb-6'>
            {' '}
            <CarouselApp opts={carouselOptions} className='w-full'>
                <CarouselAppContent>
                    {slides.map((slide, index) => (
                        <CarouselAppItem key={slide.id || index}>{renderItem(slide)}</CarouselAppItem>
                    ))}
                </CarouselAppContent>
            </CarouselApp>
        </div>
    );
}
