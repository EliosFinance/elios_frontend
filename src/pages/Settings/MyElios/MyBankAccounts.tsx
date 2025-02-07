import {getWebViewRefreshUrl, getWebViewUrl, useGetConnections} from '@/api';
import AppDrawer from '@/components/AppDrawer';
import GetPremium from '@/components/GetPremium';
import Subscription from '@/components/UpgradePlan';
import { ConnectionType } from '@/types/connectionType';
import { ArrowPathRoundedSquareIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import SettingsPageHeader from '../SettingsPageHeader';

const MyBankAccounts = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const connections = useGetConnections();

    const handleRefreshAccount = async (connection_id: string) => {
        const redirectUrl = await getWebViewRefreshUrl(connection_id);

        if (redirectUrl) {
            window.location.href = redirectUrl.url;
        }
    }

    const BankAccount = (key: number, bankAccount: ConnectionType) => {
        const allowedStates = new Set([
            'additionalInformationNeeded',
            'SCARequired',
            'webauthRequired',
            'wrongpass',
            'decoupled',
        ]);
        const showResyncButton = allowedStates.has(bankAccount.state);
        const showWarning =
            (bankAccount.error || bankAccount.error_message) && !allowedStates.has(bankAccount.state);
        const borderColorClass = showResyncButton
            ? 'border-red-500'
            : showWarning
                ? 'border-yellow-500'
                : 'border-gray-200';

        return (
            <div
                className={`w-full flex flex-col gap-4 items-start justify-center rounded-4 border-solid border-2 ${borderColorClass} p-4`}
                key={key}
            >
                <div className='w-full flex items-center justify-between'>
                    <div className='w-full flex items-center justify-start gap-2'>
                        <img
                            src={`https://lperrenot-sandbox.biapi.pro/2.0/logos/${bankAccount.connector_uuid}-thumbnail.webp`}
                            alt={`${bankAccount.connector.name} logo`}
                        />
                        <span>{bankAccount.connector.name}</span>
                    </div>
                    <p className='text-xl'>{bankAccount.balance + '€'}</p>
                </div>

                { showResyncButton && (
                    <div
                        className='w-full flex items-center justify-start border-solid border-2 bg-blue-500 p-2 rounded-2 gap-2 text-white'
                        onClick={() => handleRefreshAccount(bankAccount.id)}
                    >
                        <ArrowPathRoundedSquareIcon className='w-6 h-6 object-cover object-center'/>
                        <p>Re synchroniser</p>
                    </div>
                )}
                {(showWarning && bankAccount.error_message) && (
                    <div className="w-full flex items-center justify-start border-solid border-2 bg-yellow-500 p-2 rounded-2 gap-2 text-white">
                        <ExclamationTriangleIcon className="w-6 h-6 object-cover object-center" />
                        <p>{bankAccount.error_message}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className='w-full h-full flex flex-col gap-8 items-start justify-center px-4 py-8 mb-12'>
            <SettingsPageHeader/>

            <div className='w-full flex flex-col gap-4 items-start justify-center'>
                {connections.data &&
                    connections.data.map((bankAccount: ConnectionType, index: number) =>
                        BankAccount(index, bankAccount),
                    )}
            </div>

            <GetPremium onTopUpClick={() => setIsDrawerOpen(true)} />
            <AppDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} title='Devenez Premium'>
                <Subscription />
            </AppDrawer>
        </div>
    );
};

export default MyBankAccounts;
