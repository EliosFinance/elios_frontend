import { useState, useCallback } from 'react';
import * as confetti from 'confettis';

const useConfettis = () => {
    const [isCooldown, setIsCooldown] = useState(false);
    const cooldownTime = 500;

    const x = 0.3;
    const y = 0.3;

    const minCount = 350;
    const maxCount = 500;

    // const minAngle = 40;
    // const maxAngle = 130;

    const minSpeed = 30;
    const maxSpeed = 50;

    const throwConfettis = useCallback(() => {
        if (isCooldown) return;

        confetti.create({
            x: x,
            y: y,
            count: randomNumber(minCount, maxCount),
            ticks: -1,
            gravity: 1.5,
            decay: 0.93,
            speed: randomNumber(minSpeed, maxSpeed),
            angle: 0,
            scale: [0.5, 0.7, 0.8],
            shapes: ['square', 'ellipse', 'star'],
            z: 100,
        });

        setIsCooldown(true);
        setTimeout(() => {
            setIsCooldown(false);
        }, cooldownTime);
    }, [isCooldown]);

    const randomNumber = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    };

    return { throwConfettis };
};

export default useConfettis;