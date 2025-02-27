import * as confetti from 'confettis';
import { useCallback, useState } from 'react';

const useConfettis = () => {
    const [isCooldown, setIsCooldown] = useState(false);
    const [isPartyCooldown, setIsPartyCooldown] = useState(false);

    const cooldownTime = 500;
    const partyCooldownTime = 2000;
    const partyInterval = 50;

    const x = 0.3;
    const y = 0.3;

    const minCount = 350;
    const maxCount = 500;

    // const minAngle = 40;
    // const maxAngle = 130;

    const minSpeed = 30;
    const maxSpeed = 50;

    const minPartySpeed = 15;
    const maxPartySpeed = 25;

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

    const partyConfettis = useCallback(() => {
        if (isCooldown) return;

        confetti.create({
            x: 0.001,
            y: 0.2,
            count: 10,
            gravity: [1.5, 1],
            ticks: 500,
            scale: [0.5, 0.7, 0.8],
            speed: randomNumber(minPartySpeed, maxPartySpeed),
            decay: 0.95,
            spread: 40,
            angle: 70,
            shapes: ['square', 'ellipse', 'star'],
        });

        confetti.create({
            x: 1.999,
            y: 0.2,
            count: 10,
            gravity: [1.5, 1],
            ticks: 500,
            scale: [0.5, 0.7, 0.8],
            speed: randomNumber(minPartySpeed, maxPartySpeed),
            decay: 0.95,
            spread: 40,
            angle: 110,
            shapes: ['square', 'ellipse', 'star'],
        });
    }, [isPartyCooldown, partyInterval]);

    const throwPartyConfettis = useCallback(() => {
        if (isCooldown) return;
        setIsPartyCooldown(true);

        const intervalId = setInterval(() => {
            partyConfettis();
        }, partyInterval);

        setTimeout(() => {
            clearInterval(intervalId);
            setIsPartyCooldown(false);
        }, partyCooldownTime);
    }, [isCooldown, partyConfettis, partyInterval, partyCooldownTime]);

    const randomNumber = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    };

    return {
        throwConfettis,
        throwPartyConfettis,
    };
};

export default useConfettis;
