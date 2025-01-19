import React from 'react';
import { createUseStyles } from 'react-jss';
import '../css/index.css';
import { OsEnum, useDeviceDetection } from '@/hook/useDeviceDetection';
import { Button } from './ui/button';

type ButtonAppProps = {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'default' | 'primary' | 'secondary';
    action?: 'apple' | 'google';
    bold?: boolean;
    disabled?: boolean;
    startIcon?: React.ReactNode;
    sx?: string;
    onClick?: () => void;
};

function ButtonApp(props: ButtonAppProps) {
    const styles = useStyles();
    const { os } = useDeviceDetection();

    if (os === OsEnum.ANDROID && props.action === 'apple') {
        console.error('This button is not available on Android');
        return;
    }

    return (
        <Button
            className={`
                ${styles.button}
                ${props?.sx}
                ${props?.size && !props?.action && styles[props.size]} 
                ${props?.variant && !props?.action && styles[props.variant]} 
                ${props?.color && !props?.action ? styles[props.color] : styles.default}
                ${props?.bold && 'font-bold'}
                ${props?.action && styles.outlined}
            `}
            onClick={() => props.onClick && props.onClick()}
            disabled={props.disabled}
        >
            {props.startIcon && !props.action && <span className='mr-2 w-auto h-max'>{props.startIcon}</span>}

            {props.action && <span className='mr-2 w-auto h-max'>{props.startIcon}</span>}

            {props.children}
        </Button>
    );
}

export default ButtonApp;

const useStyles = createUseStyles({
    button: {
        width: '100%',
        height: '45px',
        borderRadius: '100px',
        fontSize: 'var(--font-size-subtitle2)',
    },
    contained: {
        background: 'var(--primary-500)',
        color: 'var(--white)',
        '&:hover': {
            background: 'var(--primary-700)',
        },
        '&:active': {
            background: 'var(--primary-900)',
        },
    },
    outlined: {
        background: 'transparent',
        color: 'var(--primary-500)',
        border: '1px solid var(--primary-500)',
        '&:hover': {
            background: 'var(--primary-100)',
        },
        '&:active': {
            background: 'var(--primary-200)',
        },
    },
    text: {
        background: 'transparent',
        border: 'none',
        color: 'var(--primary-500)',
        '&:hover': {
            background: 'var(--primary-100)',
        },
        '&:active': {
            background: 'var(--primary-200)',
        },
    },
    small: {
        padding: '6px 16px',
        width: '60%',
    },
    medium: {
        padding: '8px 24px',
        width: '80%',
    },
    large: {
        padding: '10px 32px',
        width: '100%',
    },
    default: {
        background: 'var(--neutral-200)',
        color: 'var(--neutral-900)',
        '&:hover': {
            background: 'var(--neutral-700)',
        },
        '&:active': {
            background: 'var(--neutral-800)',
        },
    },
    primary: {
        background: 'var(--primary-500)',
        color: 'var(--neutral-50)',
        '&:hover': {
            background: 'var(--primary-700)',
        },
        '&:active': {
            background: 'var(--primary-900)',
        },
    },
    secondary: {
        background: 'var(--secondary-500)',
        color: 'var(--neutral-50)',
        '&:hover': {
            background: 'var(--secondary-700)',
        },
        '&:active': {
            background: 'var(--secondary-900)',
        },
    },
});
