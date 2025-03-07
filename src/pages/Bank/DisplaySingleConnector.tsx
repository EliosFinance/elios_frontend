import { getSingleConnector, getWebViewUrl } from '@/api';
import ButtonApp from '@/components/ButtonApp';
import { ConnectorType } from '@/types/connectionType';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BankPageHeader from './BankPageHeader';

const DisplaySingleConnector = () => {
    const [startConnection, setStartConnection] = useState<boolean>(false);
    const [connector, setConnector] = useState<ConnectorType | null>(null);
    const params = useParams<{ uuid: string }>();
    const uuid = params.uuid;

    useEffect(() => {
        const loadBankAccount = async () => {
            const connector = await getSingleConnector(uuid);
            setConnector(connector);
        };

        loadBankAccount();
    }, [uuid]);

    useEffect(() => {
        const loadWebView = async () => {
            if (startConnection && uuid) {
                const redirectUrl = await getWebViewUrl(uuid);

                if (redirectUrl) {
                    window.location.href = redirectUrl.url;
                }
            }
        };

        loadWebView();
    }, [startConnection]);

    return (
        <div className='flex flex-col items-center justify-start w-full px-4 gap-10'>
            <BankPageHeader />
            {connector && (
                <div className='flex flex-col items-center justify-center w-full gap-4'>
                    <div className='flex items-center justify-center w-full'>
                        <img src={connector.logo} alt={connector.name} />
                        <p>{connector.name}</p>
                    </div>

                    <div className='flex flex-col items-center justify-center w-4/5 gap-2'>
                        {connector.account_types?.map((p) => (
                            <div key={p} className='flex items-center justify-between w-full border-solid'>
                                <p>{p}</p>
                                <CheckCircleIcon className='w-5 h-5 text-white fill-green-400' />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <ButtonApp size='large' onClick={() => setStartConnection(true)} sx='!bg-blue-500 !text-white'>
                conekt ton kont zé partiiii
            </ButtonApp>
        </div>
    );
};

export default DisplaySingleConnector;
