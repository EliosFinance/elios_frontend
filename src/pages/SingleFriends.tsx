import { friendsData } from '@/temp/FriendsData';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SingleFriend = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const friend = friendsData.find((friend) => friend.id === id);

    if (!friend) {
        return <div>Ami non trouvé</div>;
    }

    return (
        <div className='flex flex-col items-center w-full'>
            <header className='w-full h-20 bg-gray-200 flex items-center justify-between px-6 relative'>
                <div className='absolute top-4 left-4 flex items-center z-10'>
                    <ArrowLeftIcon className='w-8 h-8 cursor-pointer' onClick={() => navigate(-1)} />
                </div>
                <h2 className='text-xl font-bold z-10'>{friend.name}</h2>
            </header>

            <section className='w-full mt-6 px-6'>
                <div className='bg-white shadow rounded p-4 mb-4 flex items-center'>
                    <img src={friend.profilePicture} alt={friend.name} className='w-16 h-16 rounded-full mr-4' />
                    <div>
                        <p className='font-bold'>{friend.name}</p>
                        <p>Connected at {friend.lastConnected}</p>
                    </div>
                    <div className='ml-auto font-bold'>{friend.balance}</div>
                </div>

                <div className='bg-white shadow rounded p-4 mb-4'>
                    <h3 className='font-bold mb-2'>Ce mois-ci</h3>
                    {friend.monthlyGoals.map((goal, index) => (
                        <div key={index} className='flex justify-between items-center mb-2'>
                            <p>{goal.title}</p>
                            <div className='w-1/2 bg-gray-200 rounded-full h-2'>
                                <div
                                    className='bg-green-500 h-2 rounded-full'
                                    style={{ width: `${goal.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='bg-white shadow rounded p-4 mb-4'>
                    <h3 className='font-bold mb-2'>Cette semaine</h3>
                    <div className='flex justify-between mb-4'>
                        <p>Income</p>
                        <p className='font-bold'>Expenses</p>
                    </div>
                    <div className='flex justify-between items-center mb-4'>
                        <p>Category Chart</p>
                        <p className='font-bold'>
                            -$
                            {friend.weeklyExpenses
                                .reduce((acc, exp) => acc + parseFloat(exp.amount.replace(/[^0-9.-]+/g, '')), 0)
                                .toFixed(2)}
                        </p>
                    </div>
                    <div className='flex justify-between items-center mb-4'>
                        {friend.categoryChart.map((category, index) => (
                            <div key={index} className='flex flex-col items-center'>
                                <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
                                    <p>{category.percentage}%</p>
                                </div>
                                <p className='text-xs'>{category.category}</p>
                            </div>
                        ))}
                    </div>
                    <h4 className='font-bold mb-2'>Recent Expenses</h4>
                    {friend.weeklyExpenses.map((expense, index) => (
                        <div key={index} className='flex justify-between mb-2'>
                            <p>{expense.category}</p>
                            <p className='font-bold'>{expense.amount}</p>
                        </div>
                    ))}
                </div>

                <div className='bg-white shadow rounded p-4'>
                    <h3 className='font-bold mb-2'>See other friends</h3>
                    <ul>
                        {friendsData
                            .filter((f) => f.id !== friend.id)
                            .map((otherFriend) => (
                                <li key={otherFriend.id} className='mb-2'>
                                    {otherFriend.name}
                                </li>
                            ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default SingleFriend;
