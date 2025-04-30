import remove_text_icon from '@/assets/images/icons/remove_text_icon.png';
import search_icon from '@/assets/images/icons/search_icon.png';
import React from 'react';
import { createUseStyles } from 'react-jss';
import '@/css/index.css';
import { BackspaceIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type InputAppProps = {
    type?:
        | 'text'
        | 'password'
        | 'email'
        | 'number'
        | 'tel'
        | 'url'
        | 'date'
        | 'time'
        | 'datetime-local'
        | 'month'
        | 'week'
        | 'color'
        | 'checkbox'
        | 'radio'
        | 'file'
        | 'submit'
        | 'reset'
        | 'button'
        | 'hidden'
        | 'image'
        | 'range'
        | 'search';
    placeholder: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    endIcon?: boolean;
    onClear?: () => void;
};

const InputApp = (props: InputAppProps) => {
    const styles = useStyles();

    const removeText = () => {
        if (props.onClear) {
            props.onClear();
        }
    };

    return (
        <div className={styles.inputAppContainer}>
            <input
                className={styles.input}
                type={props.type ? props.type : 'text'}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            {props.endIcon && (
                <span className={styles.endIcon}>
                    {props.value && props.value.length > 0 ? (
                        <BackspaceIcon onClick={removeText} className='w-5 h-5 text-white cursor-pointer' />
                    ) : (
                        <MagnifyingGlassIcon className='w-5 h-5 text-white' />
                    )}
                </span>
            )}
        </div>
    );
};

export default InputApp;

const useStyles = createUseStyles({
    inputAppContainer: {
        position: 'relative',
        width: '100%',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid var(--neutral-500)',
        backgroundColor: 'var(--neutral-800)',
        borderRadius: '5px',
        fontSize: '16px',
        margin: '10px 0',
        borderTopLeftRadius: 'var(--border-radius-3)',
        borderTopRightRadius: 'var(--border-radius-3)',
        borderBottomRightRadius: 'var(--border-radius-3)',
        borderBottomLeftRadius: 'var(--border-radius-3)',
        paddingLeft: '15px',
    },
    endIcon: {
        position: 'absolute',
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
    },
});
