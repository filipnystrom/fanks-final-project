import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import './Breathing.css';
import BackButton from '../BackButton';

const Breathing = ({ setClicked }) => {
    const RESET_ANIMATE_TEXT = 'Ready?';
    const [text, setText] = useState(RESET_ANIMATE_TEXT);
    const [className, setClassName] = useState('container');
    const [isRunning, setIsRunning] = useState(false);
    let [animateDuration, setAnimateDuration] = useState(0);

    const animationStates = [
        {
            text: RESET_ANIMATE_TEXT,
            className: 'container',
        }, 
        {
            text: 'Breathe In!',
            className: 'container grow',
        }, 
        {
            text: 'Hold',
        }, 
        {
            text: 'Breathe Out!',
            className: 'container shrink',
        },
        {
            text: 'Resume?',
            className: 'container',
        }
    ]

    useEffect(() => {
        if (isRunning === true) {
            const breatheTime = (7000 / 5) * 2;
            breathing();
            let interval = setInterval(breathing, breatheTime);
            return () => clearInterval(interval);
        }
    }, [isRunning]);

    const breathing = () => {
        animateDuration++;
        if (animateDuration > 3) {
            animateDuration = 1;
        }
        setAnimationState(animationStates[animateDuration]);
    }

    const setAnimationState = (animationState) => {
        setText(animationState.text);
        if (animationState.className) {
            setClassName(animationState.className);
        }
    }

    const startAnimation = () => {
        setIsRunning(true);
    }

    const stopAnimation = () => {
        setIsRunning(false);
        setAnimationState(animationStates[4]);
    }

    const resetAnimation = () => {
        setIsRunning(false);
        setAnimationState(animationStates[0]);
    }

    return (
        <main> 
            <h4>Breathe</h4>
                <section className={ className }>
                    <span className='circle'></span>
                    <p id='text'> { text } </p>
                    <span className='gradient-circle'></span>
                </section>
                <Timer 
                    startAnimation={startAnimation}
                    stopAnimation={stopAnimation}
                    resetAnimation={resetAnimation}
                />
                <BackButton setClicked={setClicked} />
        </main>
    );
}

export default Breathing;