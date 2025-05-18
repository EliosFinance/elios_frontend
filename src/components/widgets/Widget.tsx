import { widgetStore } from '@/store/WidgetStore';
import { WidgetType } from '@/temp/WidgetData';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const Widget = ({ id, title, image, content, display }: WidgetType) => {
    const { toggleWidgetDisplay } = widgetStore((state) => ({
        toggleWidgetDisplay: state.toggleWidgetDisplay,
    }));

    return (
        <Card className='h-[200px] flex flex-col justify-between w-full shadow-md transition-all duration-300 rounded-xl hover:shadow-xl'>
            <CardHeader className='flex flex-row items-start justify-between h-full'>
                <div className='w-12 h-12 overflow-hidden bg-gray-200 rounded-full'>
                    <img src={image} alt={title} className='object-cover w-full h-full' />
                </div>
                <span className={`text-sm ${display ? 'text-green-500' : 'text-red-500'}`}></span>
                <button
                    onClick={() => toggleWidgetDisplay(id)}
                    className='flex items-center justify-center p-3 font-semibold text-white rounded-xl bg-blue-500 shadow-md transition duration-200 ease-in-out transform hover:bg-blue-600 hover:scale-105'
                >
                    <XMarkIcon className='w-3 h-3 text-white' />
                </button>
            </CardHeader>
            <CardContent className='flex flex-col items-start h-full'>
                <CardTitle className='text-sm leading-5 font-semibold text-gray-200 !h-1/2'>{title}</CardTitle>
                {/* {description && <CardDescription className='text-sm text-gray-500'>{description}</CardDescription>} */}
                {content && <p className='text-xs leading-5 text-gray-400 !h-1/2'>{content}</p>}
            </CardContent>
        </Card>
    );
};

export default Widget;
