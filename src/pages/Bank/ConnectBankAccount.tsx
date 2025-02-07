import { useGetConnectors } from '@/api';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { useNavigate } from 'react-router-dom';
import BankPageHeader from './BankPageHeader';

const ConnectBankAccount = () => {
    const connectors = useGetConnectors();
    const navigate = useNavigate();

    return (
        <div className='w-full flex flex-col items-center justify-start px-4'>
            <div className='w-full flex flex-col items-center justify-center gap-4 mb-20'>
                <BankPageHeader />
                {connectors?.data?.map((connector, key) => (
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
