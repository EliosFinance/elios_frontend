import { useEffect, useState } from 'react';

const useSwipeable = (onSwipedLeft: () => void, onSwipedRight: () => void, threshold = 150) => {
    const [startTouch, setStartTouch] = useState(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartTouch(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const touchMove = e.touches[0].clientX;
        if (Math.abs(touchMove - startTouch) > threshold) {
            if (touchMove > startTouch) {
                onSwipedRight();
            } else {
                onSwipedLeft();
            }
        }
    };

    const handleTouchEnd = () => {
        setStartTouch(0);
    };

    useEffect(() => {
        return () => {
            setStartTouch(0);
        };
    }, []);

    return {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
    };
};

export default useSwipeable;
