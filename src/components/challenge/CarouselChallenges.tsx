import React from 'react';
import { ChallengeType } from '@/temp/DefiData';
import {
  CarouselApp,
  CarouselAppContent,
  CarouselAppItem,
} from '@/components/ui/carousel-app';

interface CarouselChallengesProps {
  slides: ChallengeType[];
  renderItem: (data: ChallengeType) => React.ReactNode;
  loop?: boolean;
}

export default function CarouselChallenges({
  slides,
  renderItem,
  loop = false,
}: CarouselChallengesProps) {
  // Configuration des options du carousel
  const carouselOptions = {
    loop,
    dragFree: false, // Pour le "clipsage"
    align: 'center' as const
  };

  return (
    <div className="pb-6"> {/* Ajout d'un padding en bas pour éviter que le contenu soit coupé */}
      <CarouselApp
        opts={carouselOptions}
        className="w-full"
      >
        <CarouselAppContent>
          {slides.map((slide, index) => (
            <CarouselAppItem key={slide.id || index}>
              {renderItem(slide)}
            </CarouselAppItem>
          ))}
        </CarouselAppContent>
      </CarouselApp>
    </div>
  );
}
