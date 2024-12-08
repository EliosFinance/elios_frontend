import { fetchPartners } from '@/api/allCall';
import icon from '@/assets/images/icons/bourso_icon.png';
import PartnerDrawer from '@/components/PartnerDrawer';
import { ArrowLeft, Eye } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Partners = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [partners, setPartners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPartners = async () => {
            // [CALL API] à décommenté lorsque la db sera seed
            /*try {
        const partnersData = await fetchPartners();
        setPartners(partnersData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch partners:", error);
      }*/

            // [SIMULATION] à commenté lorsque la db sera seed
            const simulatedPartners = [
                { id: 1, name: 'Bourso Bank', icon: icon },
                { id: 2, name: 'Bourso Bank', icon: icon },
                { id: 3, name: 'Bourso Bank', icon: icon },
                { id: 4, name: 'Bourso Bank', icon: icon },
                { id: 5, name: 'Bourso Bank', icon: icon },
                { id: 6, name: 'Bourso Bank', icon: icon },
                { id: 7, name: 'Bourso Bank', icon: icon },
                { id: 8, name: 'Bourso Bank', icon: icon },
            ];
            setLoading(false);
            setPartners(simulatedPartners);
        };

        getPartners();
    }, []);

    const handlePartnerClick = (partner: any) => {
        setSelectedPartner(partner);
        setIsDrawerOpen(true);
    };

    return (
        <div className='w-full flex justify-center items-center flex-col gap-y-12'>
            <div className='w-full flex justify-between items-center px-6'>
                <ArrowLeft className='mt-10 h-7 w-7' />
                <Eye className='mt-10 h-7 w-7' />
            </div>

            <div className='w-full flex justify-center items-start flex-col px-6'>
                <div className='w-full flex justify-between items-center'>
                    <h2 className='text-2xl font-black'>Nos partenaires</h2>
                </div>

                {loading ? (
                    <div className='text-center text-gray-500'>Chargement des partenaires...</div>
                ) : (
                    <div className='w-full flex justify-center items-center flex-wrap gap-6 mt-6'>
                        {partners.map((partner) => (
                            <div
                                key={partner.id}
                                className='w-24 h-24 flex flex-col justify-center items-center bg-gray-200 rounded-lg shadow-md cursor-pointer'
                                onClick={() => handlePartnerClick(partner)}
                            >
                                <img src={partner.icon || icon} className='w-13 h-13 mb-2' alt={partner.name} />
                                <span className='text-center text-sm font-semibold'>{partner.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <PartnerDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} partner={selectedPartner} />
        </div>
    );
};

export default Partners;
