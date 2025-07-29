import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { instance_back } from '../const';
import { userStore } from '@/store/UserStore';


export type Friend = {
    id: number;
    username: string;
    
};


export const searchUsers = async (query: string, currentUserId: number): Promise<any[]> => {
  const headers = userStore.getState().getAuth();
  const res = await instance_back.get('/friends/search', {
    params: { query, currentUserId },
    headers, 
  });
  return res.data;
};

 export const useSearchUsers = (query: string, currentUserId: number) => {

  return useQuery<any[], AxiosError>(
    ['searchUsers', query, currentUserId],
    () => searchUsers(query, currentUserId),
    {
      enabled: !!query,
    }
  );
};


export const getFriends = async (userId: number): Promise<Friend[]> => {
    const headers = userStore.getState().getAuth();
    const res = await instance_back.get(`/friends/${userId}`, { headers });
    return res.data;
};

export const useGetFriends = (userId: number) => {
    return useQuery<Friend[], AxiosError>({
        queryKey: ['friends', userId],
        queryFn: () => getFriends(userId),
    });
};

export const sendFriendRequest = async (fromUserId: number, toUserId: number) => {
    const headers = userStore.getState().getAuth();
    return instance_back.post('/friends/request', { fromUserId, toUserId }, { headers });
};

export const acceptFriendRequest = async (currentUserId: number, requesterId: number) => {
    const headers = userStore.getState().getAuth();
    return instance_back.post('/friends/accept', { currentUserId, requesterId }, { headers });
};

export const rejectFriendRequest = async (currentUserId: number, requesterId: number) => {
    const headers = userStore.getState().getAuth();
    return instance_back.post('/friends/reject', { currentUserId, requesterId }, { headers });
};

export const getUserById = async (id: number) => {
    const headers = userStore.getState().getAuth();
    const res = await instance_back.get(`/users/${id}`, { headers });
    return res.data;
};
export const useGetUserById = (id?: number) => {
  return useQuery(['user', id], async () => {
    const headers = userStore.getState().getAuth();
    const res = await instance_back.get(`/friends/${id}`, { headers });

    return res.data[0]; 
  }, {
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};



export const useFriendSuggestions = (currentUserId: number) => {
    return useQuery({
        queryKey: ['friend-suggestions', currentUserId],
        queryFn: async () => {
            const res = await fetch(`/api/friends/suggestions?currentUserId=${currentUserId}`);
            if (!res.ok) throw new Error('Erreur lors du chargement des suggestions');
            return res.json(); 
        },
    });
};
export const getReceivedFriendRequests = async (userId: number) => {
  const headers = userStore.getState().getAuth();
  const res = await instance_back.get(`/friends/requests/received`, {
    params: { userId },
    headers,
  });
  return res.data;
};


export const getSentFriendRequests = async (userId: number) => {
  const headers = userStore.getState().getAuth();
  const res = await instance_back.get(`/friends/requests/sent`, {
    params: { userId },
    headers,
  });
 
  return res.data;
};

export async function addFriendByReferralCode(currentUserId: number, referralCode: string) {
  const headers = userStore.getState().getAuth();

  const res = await instance_back.post(
    '/friends/add-by-code',
    { currentUserId, referralCode },
    { headers } 
  );

  return res.data;
}



