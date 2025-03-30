import { useGetConnectors } from '@/api';
import SearchInput from '@/components/input/SearchInput.tsx';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BankPageHeader from './BankPageHeader';

const ConnectBankAccount = () => {
    const connectors = useGetConnectors();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredItems = connectors?.data?.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className='flex flex-col items-center justify-start w-full px-4'>
            <div className='flex flex-col items-center justify-center w-full mb-20 gap-4'>
                <BankPageHeader />
                <SearchInput onSearch={setSearchTerm} />
                {filteredItems?.map((connector, key) => (
                    <div
                        className='flex flex-col items-start justify-center w-full p-2 border-2 border-gray-200 border-solid gap-4 rounded-4'
                        onClick={() => navigate(`${APP_ROUTES_ENUM.DISPLAY_SINGLE_CONNECTOR}/${connector.uuid}`)}
                        key={key}
                    >
                        <div className='flex items-center justify-start w-full gap-4'>
                            <img src={connector.logo} alt={`${connector.name} logo`} />
                            <span>{connector.name}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-full h-1 opacity-0'>spacer</div>
        </div>
    );
};

export default ConnectBankAccount;
