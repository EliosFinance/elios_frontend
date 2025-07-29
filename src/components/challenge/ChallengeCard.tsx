import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthProvider';
import { challengeType } from '@/types/challengeType';

interface ChallengeCardProps {
    challenge: challengeType;
    onClick?: () => void;
}

export function ChallengeCard({ challenge, onClick }: ChallengeCardProps) {
    const { user } = useAuth();
    // const percent = challenge.total > 0 ? Math.round((challenge.progress / challenge.total) * 100) : 0;

    return (
        <Card className='bg-white shadow' onClick={onClick}>
            <CardHeader className='p-3'>
                <div className='relative w-full h-20 mb-2 overflow-hidden rounded'>
                    <img src={challenge.image} alt={challenge.title} className='object-cover w-full h-full' />
                </div>
                <CardTitle className='text-sm font-bold'>{challenge.title}</CardTitle>
                <CardDescription className='mt-1 text-xs'>
                    {['START', 'PROGRESS'].includes(
                        challenge.userToChallenge.filter((c) => c.user.username === user.username)[0]?.currentState ??
                            '',
                    )
                        ? 'En cours'
                        : 'À démarrer'}
                </CardDescription>
            </CardHeader>
            {/* <div className='px-3 pb-3'>
                <Progress value={percent} className='w-full h-2' />
                <p className='mt-2 text-xs'>
                    {challenge.progress}/{challenge.total} ({percent}%)
                </p>
            </div> */}
        </Card>
    );
}
