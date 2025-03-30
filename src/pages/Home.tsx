import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';

import { useGetConnection, useGetTransactions } from '@/api';
import ButtonApp from '@/components/ButtonApp';
import { DataTable } from '@/components/DataTable.tsx';
import { columns } from '@/components/columnsTransaction.tsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx';
import { Button } from '@/components/ui/button.tsx';
import { userStore } from '@/store/UserStore.ts';
import { ConnectionType } from '@/types/connectionType';
import { useEffect } from 'react';

const Home = () => {
    const listTransaction = useGetTransactions();
    const listConnection = useGetConnection();
    const updateUser = userStore((state) => state.updateUser);
    const user = userStore((state) => state.user);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const powensToken = urlParams.get('token');

        if (powensToken) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const url = new URL(window.location);
            urlParams.delete('token');
            updateUser({
                ...user,
                powens_token: powensToken,
            });
            window.history.replaceState(
                {},
                '',
                `${url.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`,
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(listConnection);

    return (
        <div className='w-[100%]'>
            <Card>
                <CardHeader>
                    <CardTitle>Information du compte</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type='single' collapsible className='p-4 rounded-sm bg-blue-50'>
                        <AccordionItem value='item-1'>
                            <AccordionTrigger>Comptes</AccordionTrigger>
                            <AccordionContent>
                                {listConnection.data ? (
                                    listConnection.data.map((connection: ConnectionType, index: number) => {
                                        const value = connection.balance;
                                        const formatted = new Intl.NumberFormat('fr-FR', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        }).format(value);
                                        return (
                                            <div
                                                key={index}
                                                className='flex items-center justify-between gap-2 p-2 text-white rounded bg-slate-400'
                                            >
                                                <div className='flex items-center justify-center'>
                                                    <img
                                                        src={`https://lperrenot-sandbox.biapi.pro/2.0/logos/${connection.connector_uuid}-thumbnail.webp`}
                                                        alt=''
                                                    />
                                                    <p className='text-lg font-bold'>{connection.connector.name}</p>
                                                </div>
                                                <p>{formatted}</p>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>Vos comptes</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-2'>
                            <AccordionTrigger>Transactions</AccordionTrigger>
                            <AccordionContent>
                                <DataTable columns={columns} data={listTransaction.data ?? []} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
            <Drawer>
                <DrawerTrigger>
                    <ButtonApp>Test</ButtonApp>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant='outline'>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default Home;
