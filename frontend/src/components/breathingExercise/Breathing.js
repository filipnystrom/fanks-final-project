import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import './Breathing.css';
import closeButton from '../../assets/images/close_icon.svg';
import { Link } from "react-router-dom";
import circle from '../../assets/images/breathing_circle.svg';

const Breathing = () => {
    const RESET_ANIMATE_TEXT = 'Ready?';
    const [text, setText] = useState(RESET_ANIMATE_TEXT);
    const [className, setClassName] = useState('container-circle');
    const [isRunning, setIsRunning] = useState(false);
    let animateDuration = 0;

    const animationStates = [
        {
            text: RESET_ANIMATE_TEXT,
            className: 'container-circle',
        }, 
        {
            text: 'Breathe In',
            className: 'container-circle grow',
        }, 
        {
            text: 'Hold',
        }, 
        {
            text: 'Breathe Out',
            className: 'container-circle shrink',
        },
        {
            text: 'Resume?',
            className: 'container-circle',
        }
    ]

    useEffect(() => {
        if (isRunning === true) {
            const breatheTime = (7000 / 5) * 2;
            breathing();
            let interval = setInterval(breathing, breatheTime);
            return () => clearInterval(interval);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <main className='centerColumn'>
        <ul className='navBar breathingHeader'>
            <li><h4 className='breathText'>Breathing</h4></li>
            <li><Link to='/'><img src={closeButton} alt='home' ></img></Link></li>
            </ul>
                <section className={ className }>
                    <span><img src={circle} alt='breathing circle' className='circle'></img></span>
                    <p id='text' className='text'> { text } </p>
                    <span className='gradient-circle'></span>
                </section>
                <Timer 
                    startAnimation={startAnimation}
                    stopAnimation={stopAnimation}
                    resetAnimation={resetAnimation}
                />
        </main>
    );
}

export default Breathing;