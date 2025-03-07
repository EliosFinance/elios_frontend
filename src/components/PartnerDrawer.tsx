import { fetchChallenges } from '@/api/allCall';
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
            const getChallenges = async () => {
                // [CALL API] à décommenté lorsque la db sera seed
                /*try {
          const challengesData = await fetchChallenges(partner.id);
          setChallenges(challengesData);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Erreur lors de la récupération des défis:", error);
        }*/

                // [SIMULATION] à commenté lorsque la db sera seed
                const simulatedChallengesData = [
                    {
                        id: 1,
                        title: 'Défi 1',
                        description: 'Description du défi 1',
                        image: '',
                        category: { title: 'Catégorie 1', icon: '' },
                    },
                    {
                        id: 2,
                        title: 'Défi 2',
                        description: 'Description du défi 2',
                        image: '',
                        category: { title: 'Catégorie 2', icon: '' },
                    },
                    {
                        id: 3,
                        title: 'Défi 3',
                        description: 'Description du défi 3',
                        image: '',
                        category: { title: 'Catégorie 3', icon: '' },
                    },
                ];
                setLoading(false);
                setChallenges(simulatedChallengesData);
            };

            getChallenges();
        }
    }, [partner]);

    if (!partner) return null;

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <div className='w-full max-w-sm mx-auto'>
                    <DrawerHeader>
                        <div className='flex items-center justify-center w-full'>
                            <div className='flex items-center justify-center gap-7'>
                                <img src={partner.icon} alt={partner.name} className='w-12 h-12' />
                                <DrawerTitle className='text-xl font-bold'>{partner.name}</DrawerTitle>
                            </div>
                            <DrawerClose asChild>
                                <X className='absolute cursor-pointer top-2 right-4' onClick={() => setIsOpen(false)} />
                            </DrawerClose>
                        </div>
                        <DrawerDescription className='mt-4 ml-10 mr-10 text-center'>
                            Découvrez tous les défis de notre partenaire {partner.name} !
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className='mt-4 ml-5 mr-5 space-y-4'>
                        {loading ? (
                            <div className='text-center text-gray-500'>Chargement des défis...</div>
                        ) : (
                            challenges.map((challenge) => (
                                <PartnerChallenge
                                    key={challenge.id}
                                    challenge={{
                                        title: challenge.title,
                                        description: challenge.description,
                                        image: challenge.image || '',
                                        category: {
                                            title: challenge.category.title,
                                            icon: challenge.category.icon || '',
                                        },
                                    }}
                                />
                            ))
                        )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default PartnerDrawer;
