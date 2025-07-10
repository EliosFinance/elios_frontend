import PageLayout from '@/layout/PageLayout';
import { useGetUserById } from '@/api/friends/friendsCalls'; 
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';

const SingleFriend = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const friendId = Number(id);
    const { data: friend, isLoading, isError } = useGetUserById(friendId); 

    if (isLoading) return <p className="text-center">Chargement...</p>;
    if (isError || !friend) return <p className="text-center">Ami non trouvé</p>;

    return (
        <div className='flex flex-col items-center w-full'>
            <header className='relative flex items-center justify-between w-full h-20 px-6 bg-gray-200'>
                <div className='absolute z-10 flex items-center top-4 left-4'>
                    <ArrowLeftIcon className='w-8 h-8 cursor-pointer' onClick={() => navigate(-1)} />
                </div>
                <h2 className='z-10 text-xl font-bold'>{friend.username}</h2>
            </header>

            <section className='w-full px-6 mt-6'>
                <div className='flex items-center p-4 mb-4 bg-white rounded shadow'>
                    <div className='w-16 h-16 mr-4 bg-gray-300 rounded-full'></div>
                    <div>
                        <p className='font-bold text-black'>{friend.username}</p>
                        <p className='font-bold text-black'>{friend.email}</p>
                    </div>
                </div>

                <div className='p-4 mb-4 bg-white rounded shadow'>
                    <h3 className='mb-2 font-bold'>Statistiques à venir…</h3>
                    <p>Tu pourras afficher ici les scores des challenges par exemple.</p>
                </div>
            </section>
        </div>
    );
};

export default SingleFriend;
