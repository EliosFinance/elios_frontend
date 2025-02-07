import { useGetConnectors } from '@/api';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useNavigate } from 'react-router-dom';
import BankPageHeader from './BankPageHeader';
import {useState} from "react";
import SearchInput from "@/components/input/SearchInput.tsx";

const ConnectBankAccount = () => {
    const connectors = useGetConnectors();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredItems = connectors?.data?.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='w-full flex flex-col items-center justify-start px-4'>
            <div className='w-full flex flex-col items-center justify-center gap-4 mb-20'>
                <BankPageHeader />
                <SearchInput onSearch={setSearchTerm} />
                {filteredItems?.map((connector, key) => (
                    <div
                        className='w-full flex flex-col gap-4 items-start justify-center rounded-4 border-solid border-2 border-gray-200 p-2'
                        onClick={() => navigate(`${APP_ROUTES_ENUM.DISPLAY_SINGLE_CONNECTOR}/${connector.uuid}`)}
                        key={key}
                    >
                        <div className='w-full flex items-center justify-start gap-4'>
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
