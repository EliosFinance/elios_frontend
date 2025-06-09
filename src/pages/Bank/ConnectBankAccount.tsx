import { useGetConnectors } from '@/api';
import InputApp from '@/components/InputApp';
import SearchInput from '@/components/input/SearchInput.tsx';
import { Skeleton } from '@/components/ui/skeleton';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BankPageHeader from './BankPageHeader';

const ConnectBankAccount = () => {
    const { data: connectors, isLoading } = useGetConnectors();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredConnectors, setFilteredConnectors] = useState(connectors);

    useEffect(() => {
        if (connectors) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const filtered = connectors.filter(
                (connector) =>
                    connector.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                    connector.uuid.toLowerCase().includes(lowerCaseSearchTerm),
            );
            setFilteredConnectors(filtered);
        }
    }, [connectors, searchTerm]);

    return (
        <div className='flex flex-col items-center justify-start w-full px-4'>
            <div className='flex flex-col items-start justify-center w-full mb-20 gap-4'>
                <BankPageHeader />
                <h1 className='mt-4 text-2xl font-bold text-primary-500 text-left'>Choisissez votre banque</h1>
                <InputApp
                    type='text'
                    placeholder='Recherchez une idée, un sujet, ...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClear={() => setSearchTerm('')}
                    endIcon
                />
                {isLoading && !filteredConnectors?.length
                    ? [...Array(25)].map((_, index) => (
                          <Skeleton
                              key={index}
                              className='w-full h-12 rounded-4'
                              style={{ marginTop: '20px', marginBottom: '20px' }}
                          />
                      ))
                    : filteredConnectors?.map((connector, key) => (
                          <div
                              className='flex flex-col items-start justify-center w-full p-2 border-2 border-gray-500 border-solid gap-4 rounded-4'
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
