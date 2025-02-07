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
        <div className='w-full flex flex-col items-center justify-start gap-10 px-4'>
            <BankPageHeader />
            {connector && (
                <div className='w-full flex flex-col items-center justify-center gap-4'>
                    <div className='w-full flex items-center justify-center'>
                        <img src={connector.logo} alt={connector.name} />
                        <p>{connector.name}</p>
                    </div>

                    <div className='w-4/5 flex items-center justify-center flex-col gap-2'>
                        {connector.account_types?.map((p) => (
                            <div key={p} className='w-full flex items-center justify-between border-solid'>
                                <p>{p}</p>
                                <CheckCircleIcon className='h-5 w-5 fill-green-400 text-white' />
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
