import { getSentFriendRequests, getReceivedFriendRequests , acceptFriendRequest , rejectFriendRequest} from '@/api/friends';
import { useEffect, useState } from 'react';
import { userStore } from '@/store/UserStore';



const MyFriendRequestsModal = ({ onClose }: { onClose: () => void }) => {
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const userId = Number(userStore.getState().user?.id);

  useEffect(() => {
    getSentFriendRequests(userId).then(setSent);
    getReceivedFriendRequests(userId).then(setReceived);
  }, [userId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[95%] max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold text-black mb-6 text-center">
          Demandes d’amis
        </h2>

        {/* Demandées */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">📤 Demandes envoyées</h3>
          {sent.length === 0 ? (
            <p className="text-sm text-gray-400">Aucune demande envoyée</p>
          ) : (
            <ul className="space-y-2">
              {sent.map((user) => (
                <li key={user.id} className="p-3 bg-gray-100 rounded-lg text-black text-sm">
                  {user.username}
                </li>
              ))}
            </ul>
          )}
        </section>

     
        <section>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">📥 Demandes reçues</h3>
         {received.length === 0 ? (
  <p className="text-sm text-gray-400">Aucune demande reçue</p>
) : (
  <ul className="space-y-3">
    {received.map((user) => (
      <li
        key={user.id}
        className="flex justify-between items-center p-3 bg-gray-100 rounded-lg text-black text-sm"
      >
        <span>{user.username}</span>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                await acceptFriendRequest(userId, user.id); // 
                setReceived((prev) => prev.filter((u) => u.id !== user.id)); 
              } catch (err) {
                console.error('Erreur acceptation', err);
              }
            }}
            className="px-2 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700"
          >
            Accepter
          </button>

          <button
            onClick={async () => {
              try {
                await rejectFriendRequest(userId, user.id); 
                setReceived((prev) => prev.filter((u) => u.id !== user.id)); 
              } catch (err) {
                console.error('Erreur refus', err);
              }
            }}
            className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
          >
            Refuser
          </button>
        </div>
      </li>
    ))}
  </ul>
)}

          
        </section>
      </div>
    </div>
  );
};

export default MyFriendRequestsModal;
