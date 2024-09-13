import ButtonApp from '@/components/ButtonApp';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/images/corp/main_logo.png';
import '@/css/index.css';

const FirstTimeScreen = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const navigate = useNavigate();
  const styles = useStyles();

  const handleClick = () => {
    navigate('/register', { replace: false });
  }
  return (
    <div className={styles.firstTimeScreen}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo} alt="logo" />

        <div className={styles.headings}>
          <h1 className='italic uppercase font-bold'>Elios</h1>
          <p className='text-center w-[80%]'>Elevez votre experience financière avec Elios : Bienvenue dans le futur de l'ère bancaire.</p>
          {/* TODO: sliders */}
          <div className={styles.slider}>
            <span
              className={`${styles.element1} ${currentSlide === 0 ? styles.activeSlider : ''}`}
              onClick={() => setCurrentSlide(0)}
            ></span>
            <span
              className={`${styles.element2} ${currentSlide === 1 ? styles.activeSlider : ''}`}
              onClick={() => setCurrentSlide(1)}
            ></span>
            <span
              className={`${styles.element3} ${currentSlide === 2 ? styles.activeSlider : ''}`}
              onClick={() => setCurrentSlide(2)}
            ></span>
          </div>
        </div>

        <ButtonApp color='primary' bold onClick={handleClick} size='large'>
          C'EST PARTI
        </ButtonApp>
      </div>
    </div>
  );
};

export default FirstTimeScreen;

const useStyles = createUseStyles({
  firstTimeScreen: {
    width: '100dvw',
    height: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  wrapper: {
    width: '80%',
    height: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },

  logo: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  
  headings: {
    width: '100dvw',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '-6rem',
  },

  slider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    width: '100%',
    height: 'auto',
    marginTop: '1rem',
  },
  element1: {
    width: '10px',
    height: '3px',
    borderRadius: '50px',
    backgroundColor: 'var(--neutral-300)',
  },
  element2: {
    width: '10px',
    height: '3px',
    borderRadius: '50px',
    backgroundColor: 'var(--neutral-300)',
  },
  element3: {
    width: '10px',
    height: '3px',
    borderRadius: '50px',
    backgroundColor: 'var(--neutral-300)',
  },
  activeSlider: {
    backgroundColor: 'var(--neutral-900)',
    width: '25px',
  },
})