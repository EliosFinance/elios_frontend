import { ChallengeType } from '@/temp/DefiData';
import { ChallengeCard } from './ChallengeCard';

interface ChallengeListProps {
    challenges: ChallengeType[];
    onSelectChallenge?: (id: number) => void;
}

export function ChallengeList({ challenges, onSelectChallenge }: ChallengeListProps) {
    return (
        <div className='flex flex-col space-y-4'>
            {challenges.map((ch) => (
                <ChallengeCard key={ch.id} challenge={ch} onClick={() => onSelectChallenge?.(ch.id)} />
            ))}
        </div>
    );
}
