import PageLayout from '@/layout/PageLayout';
import { useGetUserById } from '@/api/friends/friendsCalls';
import { useNavigate, useParams } from 'react-router-dom';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SingleFriend() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const friendId = Number(id);

    const { data: friend, isLoading, isError } = useGetUserById(friendId);

    if (isLoading) return <p className="text-center text-gray-400">Chargement...</p>;
    if (isError || !friend) return <p className="text-center text-red-500">Ami non trouvé</p>;

    return (
        <PageLayout title="Profil de l’ami" onBack={() => navigate('/friends')}>
  <div className="flex flex-col space-y-6 pb-10">
  
    <Card>
      <CardHeader className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full" />
        <div>
          <CardTitle>{friend.username}</CardTitle>
          <CardDescription>{friend.email}</CardDescription>
        </div>
      </CardHeader>
    </Card>


 
    <Card>
      <CardHeader>
        <CardTitle>Quizz réalisés</CardTitle>
        {friend.quizzes?.length === 0 ? (
          <CardDescription className="text-sm text-gray-500">
            Aucun quizz encore réalisé.
          </CardDescription>
        ) : (
          <ul className="mt-2 ml-4 list-disc text-sm text-gray-800">
            {friend.quizzes.map((q: any) => (
              <li key={q.id}>
                {q.title} — {q.score} pts
              </li>
            ))}
          </ul>
        )}
      </CardHeader>
    </Card>

   
    <Card>
      <CardHeader>
        <CardTitle>Challenges terminés</CardTitle>
        {friend.challengesCompleted?.length === 0 ? (
          <CardDescription className="text-sm text-gray-500">
            Aucun challenge terminé.
          </CardDescription>
        ) : (
          <ul className="mt-2 ml-4 list-disc text-sm text-gray-800">
            {friend.challengesCompleted.map((c: any) => (
              <li key={c.id}>{c.title}</li>
            ))}
          </ul>
        )}
      </CardHeader>
    </Card>
  </div>
</PageLayout>

    );
}
