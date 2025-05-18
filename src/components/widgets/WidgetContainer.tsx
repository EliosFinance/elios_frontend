import { useGetConnections, useGetTransactions } from '@/api';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useAuth } from '@/context/AuthProvider';
import { widgetStore } from '@/store/WidgetStore';
import { WidgetType } from '@/temp/WidgetData';
import { ConnectionType } from '@/types/connectionType';
import { TransactionType } from '@/types/transactionType';
import { EyeIcon, EyeSlashIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Separator } from '../ui/separator';
import BitcoinWidget from './BitcoinWidget';
import ReadArticlesWidget from './ReadArticlesWidget';
import SpendingsWidget from './SpendingsWidget';
import Widget from './Widget';

const defaultWidgets = (user: any, connections: ConnectionType[], transactions: TransactionType[]): WidgetType[] => {
    const defaults = [
        {
            id: 1,
            title: 'Top weekly rewards',
            description: 'The best rewards of the week.',
            image: '/path/to/rewards.jpg',
            content: '1000 points, 5 stars',
            display: true,
        },
        {
            id: 6,
            title: 'Bitcoin price (?)',
            description: 'Current Bitcoin price.',
            image: '/path/to/bitcoin.jpg',
            content: 'Current price: 30,000$',
            display: true,
        },
        {
            id: 7,
            title: 'Articles favoris',
            description: 'Your favorite articles.',
            image: '/path/to/articles.jpg',
            content: 'Article 1, Article 2, Article 3',
            display: true,
        },
        {
            id: 8,
            title: 'Challenge en cours',
            description: 'Active ongoing challenge.',
            image: '/path/to/challenge.jpg',
            content: 'Run 50 km in a month',
            display: true,
        },
    ];

    if (user) {
        defaults.push({
            id: 5,
            title: 'Best friends',
            description: 'Your closest connections.',
            image: '/path/to/friends.jpg',
            content: 'John, Emily, Sarah',
            display: true,
        });

        if (connections) {
            defaults.push({
                id: 4,
                title: 'Total wealth',
                description: 'Total estimated wealth.',
                image: '/path/to/wealth.jpg',
                content: '50,000$',
                display: true,
            });
        }

        if (transactions) {
            defaults.push({
                id: 3,
                title: 'Abonnements',
                description: 'Active subscriptions.',
                image: '/path/to/subscriptions.jpg',
                content: 'Netflix, Spotify, Amazon Prime',
                display: true,
            });
            defaults.push({
                id: 2,
                title: 'Spent this month',
                description: 'Total amount spent this month.',
                image: '/path/to/spent.jpg',
                content: '-500$',
                display: true,
            });
        }
    }

    return defaults;
};

const WidgetGrid = ({ widgets }) => (
    <div className='grid grid-cols-2 gap-4'>
        {widgets.map((widget: WidgetType) => {
            if (!widget.display) return null;
            switch (widget.id) {
                case 7:
                    return <ReadArticlesWidget key={widget.id} />;
                case 6:
                    return <BitcoinWidget key={widget.id} />;
                case 2:
                    return <SpendingsWidget key={widget.id} />;
                default:
                    return (
                        <Widget
                            key={widget.id}
                            id={widget.id}
                            title={widget.title}
                            description={widget.description}
                            image={widget.image}
                            content={widget.content}
                            display={widget.display}
                        />
                    );
            }
        })}
    </div>
);

const WidgetPagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className='flex items-center justify-center mt-4 space-x-2'>
        {totalPages === 0 ? (
            <span className='text-sm text-gray-500'>No widgets. Click on the Plus button to add widgets.</span>
        ) : (
            <>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={`w-6 h-1 rounded-full ${currentPage === 1 ? 'bg-white' : 'bg-gray-700'}`}
                />
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className={`w-6 h-1 rounded-full ${currentPage === 2 ? 'bg-white' : 'bg-gray-700'}`}
                />
            </>
        )}
    </div>
);

const WidgetContainer = () => {
    const { user } = useAuth();
    const { data: connections } = useGetConnections();
    const { data: transactions } = useGetTransactions();
    const { widgets, toggleWidgetDisplay, setWidgets } = widgetStore((state) => ({
        widgets: state.widgets,
        toggleWidgetDisplay: state.toggleWidgetDisplay,
        setWidgets: state.setWidgets,
    }));

    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        if (widgets.length === 0) {
            setWidgets(defaultWidgets(user, connections, transactions));
        }
    }, [widgets, setWidgets]);

    const totalPages =
        widgets.filter((widget) => widget.display).length === 0
            ? 0
            : Math.ceil(widgets.filter((widget) => widget.display).length / itemsPerPage);

    const getDisplayedWidgets = (currentPage) => {
        const visibleWidgets = widgets.filter((widget) => widget.display);
        return visibleWidgets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handlePageChange(currentPage + 1),
        onSwipedRight: () => handlePageChange(currentPage - 1),
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    return (
        <div className='w-full px-6'>
            <div className='flex items-center justify-between w-full'>
                <h2 className='text-xl font-bold'>Custom widgets</h2>
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => setIsDrawerOpen(true)}
                    className='rounded-xl hover:bg-gray-100'
                >
                    <PencilSquareIcon className='w-5 h-5' />
                </Button>
            </div>

            <div className='relative overflow-hidden' {...handlers}>
                <div
                    className='flex transition-transform duration-500 ease-in-out'
                    style={{ transform: `translateX(-${(currentPage - 1) * 100}%)` }}
                >
                    {Array.from({ length: totalPages }, (_, i) => {
                        const displayedWidgets = getDisplayedWidgets(i + 1);
                        return (
                            <div
                                key={i}
                                className='flex-shrink-0 w-full'
                                style={{
                                    flexBasis: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    transition: 'transform 0.5s ease-in-out',
                                    paddingBottom: displayedWidgets.length < 3 ? '70%' : '0',
                                }}
                            >
                                <WidgetGrid widgets={displayedWidgets} />
                            </div>
                        );
                    })}
                </div>
            </div>

            <WidgetPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className='z-[100000] bg-[#181823]'>
                    <DrawerHeader>
                        <DrawerTitle>Manage Widgets</DrawerTitle>
                        <DrawerClose className='absolute right-4 top-4'>
                            <XMarkIcon />
                        </DrawerClose>
                    </DrawerHeader>
                    <div className='p-4 space-y-4 z-[100000]'>
                        {widgets.map((widget) => (
                            <div key={widget.id} className='flex flex-col'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <h3 className='text-lg font-semibold text-white'>{widget.title}</h3>
                                        <p className='text-sm text-white'>{widget.description}</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleWidgetDisplay(widget.id);
                                        }}
                                        className='flex items-center focus:outline-none'
                                    >
                                        {widget.display ? (
                                            <EyeIcon className='w-5 h-5 text-gray-300' />
                                        ) : (
                                            <EyeSlashIcon className='w-5 h-5 text-gray-300' />
                                        )}
                                    </button>
                                </div>
                                <Separator className='my-2' />
                            </div>
                        ))}
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default WidgetContainer;
