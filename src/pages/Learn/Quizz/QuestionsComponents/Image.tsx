import React from 'react';

const Image = (options: string[]) => {
    return (
        <div className='w-full flex flex-col gap-y-4'>
            {options.map((option, index) => (
                <div key={index} className='w-full flex justify-start items-center gap-x-2'>
                    <input key={index} type='checkbox' name='multiple' value={option} />
                    <label>{option}</label>
                </div>
            ))}
        </div>
    );
};

export default Image;
