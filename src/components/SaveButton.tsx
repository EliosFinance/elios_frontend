import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/outline';

type SaveButtonProps = {
    saved: boolean;
    isSaving: (isSaving: boolean) => void;
};

const SaveButton = (props: SaveButtonProps) => {
    const handleClick = () => {
        props.isSaving(!props.saved);
    };

    return props.saved ? (
        <BookmarkSlashIcon className='h-[20px] z-10' onClick={handleClick} color='red' />
    ) : (
        <BookmarkIcon className='h-[20px] z-10' onClick={handleClick} color='green' />
    );
};

export default SaveButton;
