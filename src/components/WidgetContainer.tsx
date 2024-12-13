import { widgetStore } from '@/store/WidgetStore';
import { WidgetType } from '@/temp/WidgetData';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Widget from './Widget';

const defaultWidgets: WidgetType[] = [
    {
        id: 1,
        title: 'Top weekly rewards',
        description: 'The best rewards of the week.',
        image: '/path/to/rewards.jpg',
        content: '1000 points, 5 stars',
        display: true,
    },
    {
        id: 2,
        title: 'Spent this month',
        description: 'Total amount spent this month.',
        image: '/path/to/spent.jpg',
        content: '-500$',
        display: true,
    },
    {
        id: 3,
        title: 'Abonnements',
        description: 'Active subscriptions.',
        image: '/path/to/subscriptions.jpg',
        content: 'Netflix, Spotify, Amazon Prime',
        display: true,
    },
    {
        id: 4,
        title: 'Total wealth',
        description: 'Total estimated wealth.',
        image: '/path/to/wealth.jpg',
        content: '50,000$',
        display: true,
    },
    {
        id: 5,
        title: 'Best friends',
        description: 'Your closest connections.',
        image: '/path/to/friends.jpg',
        content: 'John, Emily, Sarah',
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

const WidgetGrid = ({ widgets }: { widgets: WidgetType[] }) => (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {widgets.map(
            (widget) =>
                widget.display && (
                    <Widget
                        key={widget.id}
                        id={widget.id}
                        title={widget.title}
                        description={widget.description}
                        image={widget.image}
                        content={widget.content}
                        display={widget.display}
                    />
                ),
        )}
    </div>
);

const WidgetPagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => {
    return (
        <div className='flex justify-center items-center space-x-2 mt-4'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className={`w-6 h-1 rounded-full ${currentPage <= 1 ? 'bg-gray-300' : 'bg-black'}`}
            />
            <span className='text-lg font-semibold'>
                {currentPage} / {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`w-6 h-1 rounded-full ${currentPage >= totalPages ? 'bg-gray-300' : 'bg-black'}`}
            />
        </div>
    );
};

const WidgetContainer = () => {
    const { widgets, toggleWidgetDisplay, setWidgets } = widgetStore((state) => ({
        widgets: state.widgets,
        toggleWidgetDisplay: state.toggleWidgetDisplay,
        setWidgets: state.setWidgets,
    }));

    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (widgets.length === 0) {
            setWidgets(defaultWidgets);
        }
    }, [widgets, setWidgets]);

    const totalPages =
        widgets.filter((widget) => widget.display).length <= 4
            ? 1
            : Math.ceil(widgets.filter((widget) => widget.display).length / itemsPerPage);

    const getDisplayedWidgets = (currentPage: number) => {
        const visibleWidgets = widgets.filter((widget) => widget.display);
        return visibleWidgets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className='p-6 space-y-6'>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold'>Custom widgets</h2>
                <button
                    className='bg-blue-500 text-black rounded-xl w-10 h-9 flex items-center justify-center'
                    onClick={() => toggleWidgetDisplay(1)}
                >
                    <Plus className='text-black w-4 h-4' />
                </button>
            </div>
            <WidgetGrid widgets={getDisplayedWidgets(currentPage)} />
            <WidgetPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default WidgetContainer;
