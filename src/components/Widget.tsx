import { widgetStore } from '@/store/WidgetStore';
import { WidgetType } from '@/temp/WidgetData';
import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const Widget = ({ id, title, description, image, content, display }: WidgetType) => {
    const { toggleWidgetDisplay } = widgetStore((state) => ({
        toggleWidgetDisplay: state.toggleWidgetDisplay,
    }));

    return (
        <Card className='flex flex-col justify-between w-full shadow-md transition-all duration-300 rounded-xl hover:shadow-xl'>
            <CardHeader className='flex items-center justify-between'>
                <div className='w-12 h-12 overflow-hidden bg-gray-200 rounded-full'>
                    <img src={image} alt={title} className='object-cover w-full h-full' />
                </div>
                <span className={`text-sm ${display ? 'text-green-500' : 'text-red-500'}`}></span>
                <button
                    onClick={() => toggleWidgetDisplay(id)}
                    className='flex items-center justify-center px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:bg-blue-600 hover:scale-105'
                >
                    <EyeSlashIcon className='w-3 h-3 text-black' />
                </button>
            </CardHeader>
            <CardContent className='flex flex-col space-y-2'>
                <CardTitle className='text-lg font-semibold text-gray-800'>{title}</CardTitle>
                {description && <CardDescription className='text-sm text-gray-500'>{description}</CardDescription>}
                {content && <p className='text-base text-gray-700'>{content}</p>}
            </CardContent>
        </Card>
    );
};

export default Widget;
