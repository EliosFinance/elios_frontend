import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { ArrowLeftIcon, EyeIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';

const Rewards = () => {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    return (
        <div className="flex flex-col items-center w-full px-6 pb-24">
            {copied && (
                <Alert
                    mobile
                    variant="default"
                    className="mb-4"
                >
                    <AlertTitle>Succès</AlertTitle>
                    <AlertDescription>Le lien a été copié dans le presse-papiers !</AlertDescription>
                </Alert>
            )}
            <header className="relative flex items-center justify-between w-full h-20 px-6 bg-gray-200">
                <div className="absolute z-10 flex items-center top-4 left-4">
                    <ArrowLeftIcon className="w-8 h-8 cursor-pointer" onClick={() => navigate(-1)} />
                </div>
                <h2 className="z-10 text-xl font-bold">Récompenses</h2>
                <div className="absolute z-10 flex items-center top-4 right-4">
                    <EyeIcon className="w-8 h-8 cursor-pointer" />
                </div>
            </header>

            <section className="w-full mt-6">
                <h3 className="mb-4 text-lg font-bold">Parrainez vos amis &amp; gagnez 100 points</h3>
                <div className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded">
                    <Input
                        type="text"
                        value="elios.me/username-id"
                        className="w-full p-2 mr-2 bg-white rounded"
                        readOnly
                    />
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard
                                .writeText("elios.me/username-id")
                                .then(() => {
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                })
                                .catch((err) => console.error("Erreur de copie:", err));
                        }}
                        className="px-2 py-1 text-sm bg-gray-300 rounded"
                    >
                        Copy
                    </Button>
                </div>
                <Button className="w-full py-2 mb-4 text-white bg-blue-500 rounded">Partager</Button>

                <div className="p-4 mb-4 bg-gray-100 rounded">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <img
                                src="https://images.unsplash.com/photo-1574607407517-cd664b1504f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29pbnN8ZW58MHx8MHx8fDA%3D"
                                alt="EliCoins"
                                className="w-16 h-16 mr-2"
                            />
                            <span className="font-bold">Mes EliCoins</span>
                        </div>
                        <span className="font-bold">125/500</span>
                    </div>
                    <div className="h-2 bg-blue-200 rounded-full">
                        <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: "25%" }}
                        ></div>
                    </div>
                </div>

                <div className="flex justify-between mb-4">
                    <Button className="flex-1 px-4 py-2 mr-2 text-white bg-blue-500 rounded">Activité</Button>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button className="flex-1 px-4 py-2 text-white bg-blue-500 rounded">
                                Comment ça marche
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Comment ça marche</DrawerTitle>
                                <DrawerClose className="absolute top-4 right-4">
                                    <Button className="text-gray-500">Close</Button>
                                </DrawerClose>
                            </DrawerHeader>
                            <div className="p-4">
                                <p>Explaining text goes here...</p>
                                <p>Explaining text goes here...</p>
                                <p>Explaining text goes here...</p>
                                <p>Explaining text goes here...</p>
                                <p>Explaining text goes here...</p>
                                <p>Explaining text goes here...</p>
                                <p>Explaining text goes here...</p>
                                <p>Explaining text goes here...</p>
                                <p>Explaining text goes here...</p>
                                <p>Explaining text goes here...</p>
                                <p>Explaining text goes here...</p>
                                <p>Explaining text goes here...</p>
                                <p>Explaining text goes here...</p>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>

                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">
                        Récompenses <InformationCircleIcon className="inline w-4 h-4" />
                    </h3>
                    <span className="text-blue-500 cursor-pointer">Voir tout</span>
                </div>

                {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded">
                        <img
                            src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA=="
                            alt="Reward"
                            className="w-10 h-10 mr-4"
                        />
                        <div className="flex-1">
                            <p>5% sur votre prochaine commande</p>
                            <div className="h-2 mt-2 bg-blue-200 rounded-full">
                                <div
                                    className="h-2 bg-blue-500 rounded-full"
                                    style={{ width: "50%" }}
                                ></div>
                            </div>
                        </div>
                        <Button className="px-3 py-1 ml-4 text-white bg-blue-500 rounded">Récupérer</Button>
                    </div>
                ))}
            </section>
        </div>
    );

};

export default Rewards;