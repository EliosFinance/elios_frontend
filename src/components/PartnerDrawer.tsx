import { getChallenges } from '@/api/learn/challengesCalls';
import PartnerChallenge from '@/components/PartnerChallenge';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

type PartnerDrawerProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    partner: {
        id: number;
        name: string;
        icon: string;
    } | null;
};

const PartnerDrawer: React.FC<PartnerDrawerProps> = ({ isOpen, setIsOpen, partner }) => {
    const [challenges, setChallenges] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (partner) {
            const fetchData = async () => {
                try {
                    const challengesData = await getChallenges(partner.id);
                    setChallenges(challengesData);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.error('Erreur lors de la récupération des défis:', error);
                }

                // [SIMULATION] à commenté lorsque la db sera seed
                //     const simulatedChallengesData = [
                //         {
                //             id: 1,
                //             title: 'Défi 1',
                //             description: 'Description du défi 1',
                //             image: '',
                //             category: { title: 'Catégorie 1', icon: '' },
                //         },
                //         {
                //             id: 2,
                //             title: 'Défi 2',
                //             description: 'Description du défi 2',
                //             image: '',
                //             category: { title: 'Catégorie 2', icon: '' },
                //         },
                //         {
                //             id: 3,
                //             title: 'Défi 3',
                //             description: 'Description du défi 3',
                //             image: '',
                //             category: { title: 'Catégorie 3', icon: '' },
                //         },
                //     ];
                //     setLoading(false);
                //     setChallenges(simulatedChallengesData);
            };

            fetchData();
        }
    }, [partner]);

    if (!partner) return null;

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <div className='mx-auto w-full max-w-sm'>
                    <DrawerHeader>
                        <div className='flex justify-center items-center w-full'>
                            <div className='flex justify-center items-center gap-7'>
                                <img src={partner.icon} alt={partner.name} className='w-12 h-12' />
                                <DrawerTitle className='text-xl font-bold'>{partner.name}</DrawerTitle>
                            </div>
                            <DrawerClose asChild>
                                <X className='cursor-pointer absolute top-2 right-4' onClick={() => setIsOpen(false)} />
                            </DrawerClose>
                        </div>
                        <DrawerDescription className='ml-10 mr-10 text-center mt-4'>
                            Découvrez tous les défis de notre partenaire {partner.name} !
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className='ml-5 mr-5 mt-4 space-y-4'>
                        {loading ? (
                            <div className='text-center text-gray-500'>Chargement des défis...</div>
                        ) : (
                            challenges.map((challenge) => <PartnerChallenge key={challenge.id} challenge={challenge} />)
                        )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default PartnerDrawer;
