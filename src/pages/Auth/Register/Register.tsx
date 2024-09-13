import React from 'react'
import { StepsArray, useRegisterStepsStore } from '@/store/RegisterSteps'
import ButtonApp from '@/components/ButtonApp';
import { createUseStyles } from 'react-jss';

const Register = () =>{
    const { currentStep, nextStep, prevStep } = useRegisterStepsStore();
    const styles = useStyles();
    
    return (
        <div className={styles.registerContainer}>
            {
                currentStep !== 0 && (
                    <>
                        <div className={styles.header}>
                            <img 
                                src="src\assets\images\corp\main_logo.png" 
                                alt="Statue" 
                                className="h-16 w-16 rounded-[var(--border-radius-3)] object-cover"
                            />
                            <h3>{StepsArray[currentStep].title}</h3>
                        </div>
                        {/* TODO: faire un composant bouton fleche */}
                        <button className='absolute top-10 left-6' onClick={prevStep} disabled={currentStep === 0}>←</button>

                    </>
                )
            }
            <div>
                {StepsArray[currentStep].component({currentStep, nextStep})}
            </div>
            {
                currentStep !== 0 && (
                    <ButtonApp 
                        onClick={nextStep}
                        disabled={currentStep === StepsArray.length - 1}
                        color='primary'
                        size='large'
                    >
                        Next
                    </ButtonApp>
                )
            }
        </div>
    )
}

export default Register

const useStyles = createUseStyles({
    registerContainer: {
      width: '100dvw',
      height: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
    },

    header : {
        position: 'fixed',
        top: '5%',
        left: 0,
        right: 0,
        width: '100dvw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        flexDirection: 'column',

    },

})