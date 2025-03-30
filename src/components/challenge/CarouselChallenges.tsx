import { ChallengeType } from '@/temp/DefiData';
import React, { useEffect, useRef } from 'react';

interface CarouselChallengesProps {
    slides: ChallengeType[];
    renderItem: (data: ChallengeType) => React.ReactNode;
    loop?: boolean;
}

export default function CarouselChallenges({ slides, renderItem, loop }: CarouselChallengesProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (loop) {
            // TODO
        }
    }, [loop]);

    return (
        <div ref={containerRef} className='flex overflow-x-auto no-scrollbar' style={{ gap: '1rem' }}>
            {slides.map((slide) => renderItem(slide))}
        </div>
    );
}
