import {
  getSentFriendRequests,
  getReceivedFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
} from '@/api/friends';
import { useEffect, useState } from 'react';
import { userStore } from '@/store/UserStore';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const MyFriendRequestsModal = ({
  onClose,
  onFriendAccepted,
}: {
  onClose: () => void;
  onFriendAccepted?: () => void;
}) => {
  const [sent, setSent] = useState<any[]>([]);
  const [received, setReceived] = useState<any[]>([]);
  const userId = Number(userStore.getState().user?.id);

  useEffect(() => {
    getSentFriendRequests(userId).then(setSent);
    getReceivedFriendRequests(userId).then(setReceived);
  }, [userId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    
      <div className="relative w-full max-w-md p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/90 ring-1 ring-white/10 space-y-6">
      
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-center text-white">
          Demandes d’amis
        </h2>

       
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm text-white">
              📤 Demandes envoyées
            </CardTitle>

            {sent.length === 0 ? (
              <CardDescription className="mt-2 text-gray-400">
                Aucune demande envoyée
              </CardDescription>
            ) : (
              <ul className="mt-3 space-y-2">
                {sent.map((user) => (
                  <li
                    key={user.id}
                    className="px-3 py-2 rounded text-sm text-white bg-white/10"
                  >
                    {user.username}
                  </li>
                ))}
              </ul>
            )}
          </CardHeader>
        </Card>

      
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm text-white">
              📥 Demandes reçues
            </CardTitle>

            {received.length === 0 ? (
              <CardDescription className="mt-2 text-gray-400">
                Aucune demande reçue
              </CardDescription>
            ) : (
              <ul className="mt-3 space-y-3">
                {received.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between px-3 py-2 rounded text-sm bg-white/10"
                  >
                    <span className="text-white">{user.username}</span>

                    <div className="flex gap-2">
                     <Button size="sm" variant="default" className="w-full hover:bg-warning-500 active:bg-warning-500 transition-colors text-white"
                     onClick={async () => { await acceptFriendRequest(userId, user.id);setReceived((prev) => prev.filter((u) => u.id !== user.id));
                    onFriendAccepted?.();
                    }}> Accepter
                   </Button>

                    <Button size="sm" variant="default" className="w-full hover:bg-warning-500 active:bg-warning-500 transition-colors text-white"
                    onClick={async () => {try {await rejectFriendRequest(userId, user.id);
                    setReceived((prev) => prev.filter((u) => u.id !== user.id));} catch (err) {console.error('Erreur refus', err); }}}
                      > Refuser
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default MyFriendRequestsModal;
