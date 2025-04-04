import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as echarts from 'echarts';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import CarouselChallenges from '@/components/challenge/CarouselChallenges';
import { challenges, ChallengeType } from '@/temp/DefiData';
import PageLayout from '@/layout/PageLayout';

export default function ChallengePage() {
  const navigate = useNavigate();

  const featuredChallenge = challenges[0];
  const chartRef = useRef<HTMLDivElement | null>(null);

  const ongoing = challenges.filter((c) => c.userStatus === 'START');
  const completed = challenges.filter((c) => c.userStatus === 'COMPLETED');
  const notStarted = challenges.filter((c) => !c.userStatus || c.userStatus === 'DEFAULT');

  const handleNavigate = (challengeId: number) => {
    navigate(`/challenge/${challengeId}`);
  };

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      const option = {
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [50, 80, 120, 160, 220],
            type: 'line',
            smooth: true,
            areaStyle: {},
          },
        ],
      };
      myChart.setOption(option);
    }
  }, []);

  return (
    <PageLayout title="Défis">
      <main className="flex flex-col w-full h-full space-y-6">
        {featuredChallenge && (
          <Card className="w-full shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Challenge vedette</CardTitle>
              <CardDescription className="mt-1 text-xs">
                {featuredChallenge.title}
              </CardDescription>
            </CardHeader>
            <div className="px-4 h-36">
              <div ref={chartRef} className="w-full h-full" />
            </div>
            <div className="flex justify-end p-4">
              <Button
                variant="default"
                size="sm"
                onClick={() => handleNavigate(featuredChallenge.id)}
              >
                Voir le défi
              </Button>
            </div>
          </Card>
        )}
  
        {ongoing.length > 0 && (
          <div>
            <h2 className="mb-2 text-base font-semibold">Défis en cours</h2>
            <CarouselChallenges
              slides={ongoing}
              loop
              renderItem={(challenge) => {
                const percent = challenge.total
                  ? Math.round((challenge.progress / challenge.total) * 100)
                  : 0;
                return (
                  <Card
                    key={challenge.id}
                    className="w-48 mr-4 shadow-md"
                    onClick={() => handleNavigate(challenge.id)}
                  >
                    <CardHeader className="p-3">
                      <div className="relative w-full h-20 mb-2 overflow-hidden rounded">
                        <img
                          src={challenge.backgroundImage}
                          alt={challenge.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardTitle className="text-sm font-bold">{challenge.title}</CardTitle>
                      <CardDescription className="mt-1 text-xs">
                        Statut: {challenge.userStatus || 'DEFAULT'}
                      </CardDescription>
                    </CardHeader>
                    <div className="px-3 pb-3">
                      <Progress value={percent} className="w-full h-2" />
                      <p className="mt-2 text-xs">
                        {challenge.progress}/{challenge.total} ({percent}%)
                      </p>
                    </div>
                  </Card>
                );
              }}
            />
          </div>
        )}
  
        {notStarted.length > 0 && (
          <div>
            <h2 className="mb-2 text-base font-semibold">Défis à démarrer</h2>
            <CarouselChallenges
              slides={notStarted}
              renderItem={(challenge) => {
                const percent = challenge.total
                  ? Math.round((challenge.progress / challenge.total) * 100)
                  : 0;
                return (
                  <Card
                    key={challenge.id}
                    className="w-48 mr-4 shadow-md"
                    onClick={() => handleNavigate(challenge.id)}
                  >
                    <CardHeader className="p-3">
                      <div className="relative w-full h-20 mb-2 overflow-hidden rounded">
                        <img
                          src={challenge.backgroundImage}
                          alt={challenge.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardTitle className="text-sm font-bold">{challenge.title}</CardTitle>
                      <CardDescription className="mt-1 text-xs">
                        Statut: {challenge.userStatus || 'DEFAULT'}
                      </CardDescription>
                    </CardHeader>
                    <div className="px-3 pb-3">
                      <Progress value={percent} className="w-full h-2" />
                      <p className="mt-2 text-xs">
                        {challenge.progress}/{challenge.total} ({percent}%)
                      </p>
                    </div>
                  </Card>
                );
              }}
            />
          </div>
        )}
  
        {completed.length > 0 && (
          <div>
            <h2 className="mb-2 text-base font-semibold">Défis terminés</h2>
            <CarouselChallenges
              slides={completed}
              renderItem={(challenge) => (
                <Card
                  key={challenge.id}
                  className="w-48 mr-4 shadow-md"
                  onClick={() => handleNavigate(challenge.id)}
                >
                  <CardHeader className="p-3">
                    <div className="relative w-full h-20 mb-2 overflow-hidden rounded">
                      <img
                        src={challenge.backgroundImage}
                        alt={challenge.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardTitle className="text-sm font-bold">{challenge.title}</CardTitle>
                    <CardDescription className="mt-1 text-xs text-green-600">
                      Défi terminé !
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}
            />
          </div>
        )}
      </main>
    </PageLayout>
  );
}
