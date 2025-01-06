import BlogPosts from '@/components/landing/BlogPosts';
import Friends from '@/components/landing/Friends';
import MonthlySubscriptions from '@/components/landing/MonthlySubscriptions';
import WeekChart from '@/components/landing/WeekChart';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
// pages/Landing.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center w-full px-4 space-y-8'>
            <div className='w-full'>
                <h2 className='text-xl font-bold mb-4'>Last Week</h2>
                <WeekChart />
            </div>

            <div className='w-full'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold'>Abonnements du mois</h2>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => navigate('/subscriptions')}
                        className='rounded-xl hover:bg-gray-100'
                    >
                        <ArrowRightIcon className='h-5 w-5' />
                    </Button>
                </div>
                <MonthlySubscriptions />
            </div>

            <div className='w-full'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold'>Mes amis</h2>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => navigate('/friends')}
                        className='rounded-xl hover:bg-gray-100'
                    >
                        <ArrowRightIcon className='h-5 w-5' />
                    </Button>
                </div>
                <Friends />
            </div>

            <div className='w-full'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold'>Apprendre avec EliosLearn !</h2>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => navigate('/articles')}
                        className='rounded-xl hover:bg-gray-100'
                    >
                        <ArrowRightIcon className='h-5 w-5' />
                    </Button>
                </div>
                <BlogPosts />
            </div>
        </div>
    );
};

export default Landing;
