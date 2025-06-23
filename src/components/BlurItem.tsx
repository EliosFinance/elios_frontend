import { LockIcon, PiggyBank, UsersIcon } from 'lucide-react';
import React from 'react';

export type BlurItemProps = {
    variant: 'premium' | 'connectAccount' | 'addFriends';
    locked: boolean;
    isLoading: boolean;
    loadingItem?: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

const BlurItem = (props: BlurItemProps) => {
    const handleClick = () => {
        if (props?.onClick && props?.locked) {
            props.onClick();
        }
    };

    return (
        <div className={`relative inline-block w-full ${props.className}`} onClick={handleClick}>
            {props.isLoading ? (
                props.loadingItem ? (
                    <div className='relative z-0'>{props.loadingItem}</div>
                ) : (
                    // breathing animation
                    <div className='relative z-0 animate-pulse bg-gray-200 dark:bg-gray-700 h-full rounded-lg'>
                        <div className='absolute inset-0 flex items-center justify-center'></div>
                    </div>
                )
            ) : (
                <>
                    {/* Conteneur du contenu */}
                    <div className='relative z-0'>{props.children}</div>

                    {/* Flou par-dessus */}
                    {props.locked && (
                        <div className='absolute inset-0 backdrop-blur-sm bg-[--neutral-500]/10 z-10 flex items-center justify-center flex-col'>
                            {props.variant === 'premium' && (
                                <>
                                    <LockIcon className='w-8 h-8 text-white' />
                                    <p className='text-white font-semibold'>Devenez premium</p>
                                </>
                            )}
                            {props.variant === 'addFriends' && (
                                <>
                                    <UsersIcon className='w-8 h-8 text-white' />
                                    <p className='text-white font-semibold'>Ajoutez des amis</p>
                                </>
                            )}
                            {props.variant === 'connectAccount' && (
                                <>
                                    <PiggyBank className='w-8 h-8 text-white' />
                                    <p className='text-white font-semibold'>Connecter un compte bancaire</p>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default BlurItem;
