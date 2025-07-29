import PageLayout from '@/layout/PageLayout';
import { useGetFriends } from '@/api/friends'; 
import { userStore } from '@/store/UserStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyFriendRequestsModal from './Settings/Social/MyFriendRequestsModal'; 
import { useQueryClient } from 'react-query';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UsersIcon, EyeIcon } from 'lucide-react';

const Friends = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequests, setShowRequests] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = Number(userStore.getState().user?.id);
  const { data: friends = [], isLoading } = useGetFriends(userId);

  const sortedFriends = [...friends].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredFriends = sortedFriends.filter((friend) =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout title="Liste de mes amis" onBack={() => navigate('/home')}>
      <div className="flex items-start gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg flex-shrink-0">
          <UsersIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Tes amis</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Gère tes relations, vois leurs scores, ou explore leurs profils.
          </p>
          
        </div>
        <div className="flex  gap-4 mt-6 ml-96">
         <Button size="sm" variant="default" className="w-full hover:bg-warning-500 active:bg-warning-500 transition-colors text-white ml-96"

            onClick={() => navigate('/settings/my-friends')}
          >
            + Ajouter un ami
          </Button>
         <Button size="sm" variant="default" className="w-full hover:bg-warning-500 active:bg-warning-500 transition-colors text-white"
            onClick={() => setShowRequests(true)}
          >
            Voir les demandes
          </Button>
        </div>
      </div>

      <main className="space-y-6 pb-16">
        <Card>
          <CardHeader>
            <CardTitle>Rechercher un ami</CardTitle>
            <input
              type="text"
              placeholder="Recherchez par pseudo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-4 w-full p-2 rounded border bg-transparent text-sm text-white"
            />

            {isLoading ? (
              <CardDescription className="mt-4">Chargement…</CardDescription>
            ) : filteredFriends.length === 0 ? (
              <CardDescription className="mt-4 text-white">
                Aucun ami trouvé pour « {searchTerm} »
              </CardDescription>
            ) : (
              filteredFriends.map((friend) => (
                <div key={friend.id} className="mt-4">
                  <Card className="flex items-center justify-between p-3 shadow-sm">
                    <div>
                      <p className="font-medium text-white">{friend.username}</p>
                      <p className="text-sm text-gray-500">
                        Score : <span className="text-green-600 font-bold">🏆 {friend.score ?? '?'}</span>
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/friends/${friend.id}`)}
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      Voir
                    </Button>
                  </Card>
                </div>
              ))
            )}
          </CardHeader>
        </Card>

     
      </main>

      {showRequests && (
        <MyFriendRequestsModal
          onClose={() => setShowRequests(false)}
          onFriendAccepted={() =>
            queryClient.invalidateQueries({ queryKey: ['friends', userId] as const })
          }
        />
      )}
    </PageLayout>
  );
};

export default Friends;
