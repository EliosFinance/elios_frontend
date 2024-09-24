import { createUseStyles } from 'react-jss';
import icon_empty from '@/assets/images/icons/save_icon_empty.png';
import icon_filled from '@/assets/images/icons/save_icon_filled.png';

type SaveButtonProps = {
  saved: boolean;
  isSaving: (isSaving: boolean) => void;
}


const SaveButton = (props: SaveButtonProps) => {
  const styles = useStyles();

  const handleClick = () => {
    props.isSaving(!props.saved);
  }

  return (
    <img 
      src={props.saved ? icon_filled : icon_empty}
      alt="save button"
      className={styles.save_button}
      onClick={handleClick}
    />
  )
}

export default SaveButton
const useStyles = createUseStyles({
  save_button: {
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})