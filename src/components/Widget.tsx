import { widgetStore } from '@/store/WidgetStore';
import { WidgetType } from '@/temp/WidgetData';
import { EyeOff } from 'lucide-react';
import React from 'react';

const Widget = ({ id, title, description, image, content, display }: WidgetType) => {
    const { toggleWidgetDisplay } = widgetStore((state) => ({
        toggleWidgetDisplay: state.toggleWidgetDisplay,
    }));

    return (
        <div className='border border-blue-500 rounded-xl p-4 w-full flex flex-col justify-between shadow-md transition-all duration-300 hover:shadow-xl'>
            <div className='flex items-center justify-between mb-4'>
                <div className='bg-gray-200 rounded-full w-12 h-12 overflow-hidden'>
                    <img src={image} alt={title} className='w-full h-full object-cover' />
                </div>
                <span className={`text-sm ${display ? 'text-green-500' : 'text-red-500'}`}></span>
                <button
                    onClick={() => toggleWidgetDisplay(id)}
                    className='flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105'
                >
                    <EyeOff className='w-3 h-3 text-black' />
                </button>
            </div>

            <div className='flex flex-col space-y-2'>
                <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
                {description && <p className='text-sm text-gray-500'>{description}</p>}
                {content && <p className='text-base text-gray-700'>{content}</p>}
            </div>
        </div>
    );
};

export default Widget;
