import PageLayout from '@/layout/PageLayout';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  useSearchUsers,
  useFriendSuggestions,
  sendFriendRequest,
  addFriendByReferralCode,
} from '@/api/friends';
import { userStore } from '@/store/UserStore';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus2Icon, UsersIcon, ContactIcon } from 'lucide-react';

export default function MyFriends() {
  const navigate = useNavigate();
  const currentUserId = Number(userStore.getState().user?.id);

  const [search, setSearch] = useState('');
  const [loadingAdd, setLoadingAdd] = useState<number | null>(null);
  const [referralCode, setReferralCode] = useState('');

  const { data: suggestions = [], isLoading } = useSearchUsers(
    search,
    currentUserId,
  );
  const {
    data: friendSuggestions = [],
    isLoading: loadingSuggestions,
  } = useFriendSuggestions(currentUserId);

  const handleSendRequest = async (toUserId: number) => {
    try {
      setLoadingAdd(toUserId);
      await sendFriendRequest(currentUserId, toUserId);
      alert('Demande envoyée !');
    } catch (e: any) {
      alert(e.response?.data?.message || "Erreur lors de l’envoi");
    } finally {
      setLoadingAdd(null);
    }
  };

  const handleValidateReferral = async () => {
    try {
      await addFriendByReferralCode(currentUserId, referralCode);
      alert('Parrain ajouté avec succès !');
      setReferralCode('');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors du parrainage');
    }
  };

  const handleImportContacts = () => {
   
  };

 
  const renderUserRow = (user: any) => (
    <Card
      key={user.id}
      className="flex items-center justify-between p-3 mb-2 shadow-sm text-white "
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
        <div className="text-sm text-white">
          <p className="font-medium">{user.username}</p>
          {user.email && (
            <p className="text-gray-500 text-xs leading-tight">{user.email}</p>
          )}
        </div>
      </div>

      <Button className="hover:bg-warning-500 text-white"
        size="sm"
        disabled={loadingAdd === user.id}
        onClick={() => handleSendRequest(user.id)}
      >
        {loadingAdd === user.id ? '...' : 'Ajouter'}
      </Button>
    </Card>
  );


  return (
    <PageLayout title="Ajouter des amis" onBack={() => navigate('/friends')}>
      
      <div className="flex items-start gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg flex-shrink-0">
          <UsersIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Retrouve tes amis</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Recherche par pseudo, mail, code parrain ou tes contacts.
          </p>
        </div>
      </div>

      <main className="space-y-6 pb-16">
       
        <Card>
          <CardHeader>
            <CardTitle>Rechercher un utilisateur</CardTitle>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Entrez un pseudo ou un email"
              className="mt-4 w-full p-2 rounded border bg-transparent text-sm text-white"
            />
            {search.length >= 2 && (
              <>
                {isLoading && (
                  <CardDescription className="mt-2">Recherche…</CardDescription>
                )}
                {!isLoading && suggestions.length === 0 && (
                  <CardDescription className="mt-2 text-gray-500">
                    Aucun utilisateur trouvé.
                  </CardDescription>
                )}
                {!isLoading &&
                  suggestions.map((u) => (
                    <div key={u.id} className="mt-4">
                      {renderUserRow(u)}
                    </div>
                  ))}
              </>
            )}
          </CardHeader>
        </Card>

        
        {search.length < 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Suggestions d’amis</CardTitle>
              {loadingSuggestions && (
                <CardDescription className="mt-2">Chargement…</CardDescription>
              )}
              {!loadingSuggestions && friendSuggestions.length === 0 && (
                <CardDescription className="mt-2 text-gray-500">
                  Aucune suggestion pour l’instant.
                </CardDescription>
              )}
              {!loadingSuggestions &&
                friendSuggestions.map((u) => (
                  <div key={u.id} className="mt-4">
                    {renderUserRow(u)}
                  </div>
                ))}
            </CardHeader>
          </Card>
        )}

      
        <Card>
          <CardHeader>
            <CardTitle>Ajouter un parrain</CardTitle>
            <div className="mt-4 flex">
              <input
                type="text"
                placeholder="Code parrain"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="flex-1 p-2 border rounded-l bg-transparent text-white"
              />
              <Button onClick={handleValidateReferral} className="rounded-l-none hover:bg-warning-500 active:bg-warning-500 transition-colors text-white">
                Valider
              </Button>
            </div>
          </CardHeader>
        </Card>

      
        <Card>
          <CardHeader className="flex flex-col items-start">
            <CardTitle>Depuis tes contacts</CardTitle>
            <Button
              onClick={handleImportContacts}
              className="mt-4 w-full hover:bg-warning-500 active:bg-warning-500 transition-colors flex items-center justify-center gap-2 text-white"
            >
              <ContactIcon className="w-4 h-4" /> Importer mes contacts
            </Button>
          </CardHeader>
        </Card>
      </main>
    </PageLayout>
  );
}
