import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import B4 from '@/assets/images/corp/B4.webp';
import { useState } from 'react';

const Subscription = () => {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState('annual');

    const improvements = [
        'Accès à des fonctionnalités exclusives',
        'Support client prioritaire',
        'Mises à jour régulières',
        'Contenu premium',
        'Réductions sur les produits',
    ];

    return (
        <div className="flex flex-col items-center w-full">
            {/* <header className="w-full flex items-center justify-start px-6">
                <ArrowLeftIcon className="w-8 h-8 cursor-pointer" onClick={() => navigate(-1)} />
            </header> */}

            <section className="w-full px-6 mt-6">
                <div className="relative text-center mb-6">
                    <div className="relative">
                        <img
                            src={B4}
                            alt="Premium"
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white h-full" style={{ top: '50%', height: '50%' }}></div>
                        <span className="absolute top-4 left-4 bg-gray-300 text-sm px-2 py-1 rounded-full">
                            Deviens Premium
                        </span>
                        <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-black">Abonnement</h1>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">Qu’est-ce que ça change?</h2>
                <ul className="list-none mb-6">
                    {improvements.map((item, index) => (
                        <li key={index} className="flex items-center mb-2">
                            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="bg-gray-100 p-4 rounded mb-4">
                    <div
                        className={`flex items-center justify-between mb-4 p-4 rounded cursor-pointer ${selectedPlan === 'annual' ? 'bg-blue-100' : ''
                            }`}
                        onClick={() => setSelectedPlan('annual')}
                    >
                        <input
                            type="radio"
                            name="plan"
                            id="annual"
                            checked={selectedPlan === 'annual'}
                            onChange={() => setSelectedPlan('annual')}
                            className="mr-2"
                        />
                        <label htmlFor="annual" className="flex-1">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span>Annuel</span>
                                    <div className="text-sm text-gray-500">Economisez 20%</div>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-lg">47,99€</span>
                                    <div className="text-sm text-gray-500">/an</div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div
                        className={`flex items-center justify-between p-4 rounded cursor-pointer ${selectedPlan === 'monthly' ? 'bg-blue-100' : ''
                            }`}
                        onClick={() => setSelectedPlan('monthly')}
                    >
                        <input
                            type="radio"
                            name="plan"
                            id="monthly"
                            checked={selectedPlan === 'monthly'}
                            onChange={() => setSelectedPlan('monthly')}
                            className="mr-2"
                        />
                        <label htmlFor="monthly" className="flex-1">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span>Mensuel</span>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-lg">4,99€</span>
                                    <div className="text-sm text-gray-500">/mois</div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <button className="w-full bg-blue-500 text-white py-3 rounded-full mt-4 mb-8">
                    Je deviens Premium
                </button>
            </section>
        </div>
    );
};

export default Subscription;




                {/* C'est pour de drawer de subscription */}
                // import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@/components/ui/drawer';
                {/* <div>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded">
                                Open Subscription
                            </button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerClose className="absolute top-4 right-4">
                                    <button className="text-gray-500">Close</button>
                                </DrawerClose>
                            </DrawerHeader>
                            <Subscription />
                        </DrawerContent>
                    </Drawer>
                </div> */}