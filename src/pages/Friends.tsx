import PageLayout from '@/layout/PageLayout';
import { useGetFriends } from '@/api/friends'; 
import { userStore } from '@/store/UserStore';
import { EyeIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyFriendRequestsModal from './Settings/Social/MyFriendRequestsModal'; 


const Friends = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [showRequests, setShowRequests] = useState(false);
    const userId = Number(userStore.getState().user?.id);
    const { data: friends = [], isLoading } = useGetFriends(userId);
    

   
    const sortedFriends = [...friends].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  
    const filteredFriends = sortedFriends.filter((friend) =>
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PageLayout title='Suivez les statistiques de vos amis' onBack={() => navigate(-1)}>
            <div className='absolute z-10 flex items-center top-4 right-4'>
                <EyeIcon className='w-8 h-8 cursor-pointer' />
            </div>

            <section className='w-full px-6 mt-6'>
                <input
                    type='text'
                    placeholder='Recherchez vos amis'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full p-2 mb-4 border rounded text-black'
                />

                {isLoading ? (
                    <p>Chargement...</p>
                ) : filteredFriends.length === 0 ? (
                    <p className="text-gray-500">Aucun ami trouvé pour « {searchTerm} »</p>
                ) : (
                    filteredFriends.map((friend) => (
                        <div key={friend.id} className='mb-4'>
                            <div className='flex items-center justify-between p-4 bg-white rounded shadow'>
                                <div>
                                    <p className='text-lg font-semibold text-black'>{friend.username}</p>
                            <p className='text-sm text-gray-500'>
                            Score : <span className='text-green-600 font-bold'>🏆 {friend.score  ?? '?'}</span>
                             </p>

                                </div>
                                <button
                                    onClick={() => navigate(`/friends/${friend.id}`)}
                                    className='p-2 text-black hover:text-gray-700 transition-colors'
                                    title="Voir les détails"
                                >
                                    <PlusIcon className='w-6 h-6' />
                                </button>
                            </div>
                        </div>
                    ))
                )}
          <div className="flex justify-end mb-4 gap-4">
              <button
                onClick={() => navigate('/settings/my-friends')}
                className="px-4 py-2 text-white bg-primary-500 rounded shadow" > + Ajouter un ami
              </button>
              <button
                onClick={() => setShowRequests(true)}
                className="px-4 py-2 text-white bg-primary-500 rounded shadow">  Voir les demandes
               </button>

           </div>
         </section>
                {showRequests && (<MyFriendRequestsModal onClose={() => setShowRequests(false)} />)}
        </PageLayout>
    );
};

export default Friends;
