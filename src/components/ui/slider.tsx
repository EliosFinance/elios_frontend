'use client';

import { cn } from '@/lib/utils';
import { Slider as SliderPrimitive } from '@radix-ui/react-slider';
import * as React from 'react';

// Slider principal
const Slider = ({
    min = 0,
    max = 100,
    step = 1,
    defaultValue = [0],
    onValueChange,
    className,
    ...props
}: React.ComponentProps<typeof SliderPrimitive>) => (
    <SliderPrimitive
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        className={cn('relative flex items-center w-full', className)}
        {...props}
    />
);
Slider.displayName = 'Slider';

// SliderTrack
const SliderTrack = React.forwardRef<
    // @ts-ignore
    React.ElementRef<typeof SliderPrimitive.Track>,
    // @ts-ignore
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
>(({ className, ...props }, ref) => (
    // @ts-ignore
    <SliderPrimitive.Track ref={ref} className={cn('bg-gray-300 rounded-full h-2 w-full', className)} {...props} />
));
SliderTrack.displayName = 'SliderTrack';

// SliderRange
// @ts-ignore
const SliderRange = React.forwardRef<
    // @ts-ignore
    React.ElementRef<typeof SliderPrimitive.Range>,
    // @ts-ignore
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range>
>(({ className, ...props }, ref) => (
    // @ts-ignore
    <SliderPrimitive.Range ref={ref} className={cn('bg-blue-500 rounded-full h-full', className)} {...props} />
));
SliderRange.displayName = 'SliderRange';

// SliderThumb
const SliderThumb = React.forwardRef<
    // @ts-ignore
    React.ElementRef<typeof SliderPrimitive.Thumb>,
    // @ts-ignore
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...props }, ref) => (
    // @ts-ignore
    <SliderPrimitive.Thumb ref={ref} className={cn('w-6 h-6 bg-blue-500 rounded-full', className)} {...props} />
));
SliderThumb.displayName = 'SliderThumb';

export { Slider, SliderTrack, SliderRange, SliderThumb };
