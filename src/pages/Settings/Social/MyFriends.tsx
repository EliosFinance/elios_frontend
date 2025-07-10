import PageLayout from '@/layout/PageLayout';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  useSearchUsers,
  useFriendSuggestions,
  sendFriendRequest,
  addFriendByReferralCode
} from '@/api/friends';
import { userStore } from '@/store/UserStore';

const MyFriends = () => {
  const [search, setSearch] = useState('');
  const [loadingAdd, setLoadingAdd] = useState<number | null>(null);
  const navigate = useNavigate();
  const currentUserId = Number(userStore.getState().user?.id);
  const [referralCode, setReferralCode] = useState('');


  const { data: suggestions = [], isLoading } = useSearchUsers(search, currentUserId);
  const { data: friendSuggestions = [], isLoading: loadingSuggestions } = useFriendSuggestions(currentUserId);

  const handleSendRequest = async (toUserId: number) => {
    try {
      setLoadingAdd(toUserId);
      await sendFriendRequest(currentUserId, toUserId);
      alert('Demande envoyée !');
    } catch (e: any) {
      alert(e.response?.data?.message || 'Erreur lors de l’envoi');
    } finally {
      setLoadingAdd(null);
    }
  };

  const handleAddByReferral = () => {
    // à implémenter
  };

  const handleImportContacts = () => {
    // à implémenter avec Capacitor
  };

  return (
    <PageLayout title="Ajouter des amis" onBack={() => navigate('/friends')}>
      <div className="px-6 space-y-6 mt-4">

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher un utilisateur</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Entrez un pseudo ou un email"
            className="w-full p-2 border rounded text-black"
          />
        </div>

       
        {search.length >= 2 ? (
          <>
            {isLoading && <p>Recherche en cours...</p>}
            {!isLoading && suggestions.length === 0 && (
              <p className="text-gray-500">Aucun utilisateur trouvé</p>
            )}
            {!isLoading && suggestions.map((user) => (
              <div key={user.id} className="flex justify-between items-center p-3 bg-white rounded shadow mb-2">
              <div className="text-black">
              <div>{user.username}</div>
              {search.includes('@') && user.email && (
              <div className="text-sm text-gray-500">{user.email}</div>
              )}
            </div>
            <button
                    disabled={loadingAdd === user.id} onClick={() => handleSendRequest(user.id)}
                     className="bg-blue-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50">
                    {loadingAdd === user.id ? '...' : 'Ajouter'}
            </button>
             </div>
          ))}

          </>
        ) : (
          <>
            <h3 className="text-sm font-medium mt-6 mb-2">Suggestions d’amis</h3>
            {loadingSuggestions && <p>Chargement des suggestions...</p>}
            {!loadingSuggestions && friendSuggestions.length === 0 && (
              <p className="text-gray-500">Aucune suggestion pour l’instant</p>
            )}
            {!loadingSuggestions && friendSuggestions.map((user) => (
              <div key={user.id} className="flex justify-between items-center p-3 bg-white rounded shadow mb-2">
                <div className="text-black">
                          <div>{user.username}</div>
                  {search.includes('@') && <div className="text-sm text-gray-500">{user.email}</div>}
               </div>

                <button
                  disabled={loadingAdd === user.id}
                  onClick={() => handleSendRequest(user.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                >
                  {loadingAdd === user.id ? '...' : 'Ajouter'}
                </button>
              </div>
            ))}
          </>
        )}

       
        <div>
          <input
  type="text"
  placeholder="Code parrain"
  value={referralCode}
  onChange={(e) => setReferralCode(e.target.value)}
  className="flex-1 p-2 border rounded-l text-black"
/>
<button
  onClick={async () => {
    try {
      await addFriendByReferralCode(currentUserId, referralCode);
      alert("Parrain ajouté avec succès !");
      setReferralCode('');
    } catch (err: any) {
      alert(err.response?.data?.message || "Erreur lors du parrainage");
    }
  }}
  className="bg-blue-600 text-white px-4 rounded-r"
>
  Valider
</button>

        </div>

        {/* Ajouter via contacts */}
        <div>
          <button
            onClick={handleImportContacts}
            className="w-full bg-green-600 text-white p-2 rounded"
          >
            📱 Ajouter depuis mes contacts
          </button>
        </div>
      </div>
      
    </PageLayout>
  );
};

export default MyFriends;
