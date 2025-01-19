import { Capacitor } from '@capacitor/core';
import { useEffect, useState } from 'react';

export enum DeviceEnum {
    MOBILE = 'Mobile',
    TABLET = 'Tablet',
    DESKTOP = 'Desktop',
    UNKNOWN = '',
}
export enum OsEnum {
    IOS = 'IOS',
    ANDROID = 'Android',
    WEB = 'Web',
    UNKNOWN = '',
}

export const useDeviceDetection = (): { device: DeviceEnum; os: OsEnum } => {
    const [device, setDevice] = useState<DeviceEnum>(DeviceEnum.UNKNOWN);
    const [os, setOs] = useState<OsEnum>(OsEnum.UNKNOWN);

    useEffect(() => {
        const handleDeviceDetection = (): void => {
            const userAgent = navigator.userAgent.toLowerCase();
            const userOs = Capacitor.getPlatform();

            const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
            const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

            switch (true) {
                case isMobile:
                    setDevice(DeviceEnum.MOBILE);
                    break;

                case isTablet:
                    setDevice(DeviceEnum.TABLET);
                    break;

                case !isTablet && !isMobile:
                    setDevice(DeviceEnum.DESKTOP);
                    break;

                default:
                    setDevice(DeviceEnum.UNKNOWN);
                    console.error('Device not detected');
                    break;
            }

            switch (userOs) {
                case 'ios':
                    setOs(OsEnum.IOS);
                    break;

                case 'android':
                    setOs(OsEnum.ANDROID);
                    break;

                case 'web':
                    setOs(OsEnum.WEB);
                    break;

                default:
                    setOs(OsEnum.UNKNOWN);
                    console.error('OS not detected');
                    break;
            }
        };

        handleDeviceDetection();
        window.addEventListener('resize', handleDeviceDetection);

        return () => {
            window.removeEventListener('resize', handleDeviceDetection);
        };
    }, []);

    return { device, os };
};
