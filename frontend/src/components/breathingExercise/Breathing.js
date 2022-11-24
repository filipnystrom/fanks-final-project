import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import './Breathing.css';

const Breathing = () => {
const [text, setText] = useState('Ready?');
const [className, setClassName] = useState('container');
const [isRunning, setIsRunning] = useState(false);
const [isStop, setIsStop] = useState(false);
let [animateDuration, setAnimateDuration] = useState(0);

const totalTime = 7000;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
const RESET_ANIMATE_TEXT = 'Ready?';
const BREATHE_IN_ANIMATE_TEXT = 'Breathe In';
const BREATHE_OUT_ANIMATE_TEXT = 'Breathe Out';
const HOLD_ANIMATE_TEXT = 'Hold';


useEffect(() => {
    if (isRunning === true) {
        breathing();
         let interval = setInterval(breathing, breatheTime);
        return () => clearInterval(interval);
    }
}, [isRunning]);

const breathing = () => {
    if (isNaN(animateDuration)) {
        console.log('nan', animateDuration)
    }
animateDuration++;
console.log('where4', animateDuration)
if (animateDuration > 3) {
    animateDuration = 1;
    console.log('where5', animateDuration)
} if (animateDuration === 1) {
    console.log('where', animateDuration)
    setText('Breathe In!');
    setClassName('container grow');
} else if (animateDuration === 2) {
    console.log('where2', animateDuration)
    setText('Hold');
} else if (animateDuration === 3) {
    console.log('where3', animateDuration)
    setText('Breathe Out!');
    setClassName('container shrink');
}
}

const startAnimation = () => {
    setIsRunning(true);
    setIsStop(false);
}

const stopAnimation = () => {
    setIsStop(true);
    setIsRunning(false);
    setClassName('container');
    setText('Resume?')
}

const resumeAnimation = () => {
    setIsRunning(true);
    setIsStop(false);
}

const resetAnimation = () => {
    setIsRunning(false);
    setIsStop(true);
    setText(RESET_ANIMATE_TEXT);
    setClassName('container');
}

return (
    <main> 
        <h4>Breathe</h4>
            <section className={ className }>
                <div className='circle'></div>
                <p id='text'> { text } </p>
                <div className='gradient-circle'></div>
            </section>
            <Timer 
            startAnimation={startAnimation}
            resumeAnimation={resumeAnimation}
            stopAnimation={stopAnimation}
            resetAnimation={resetAnimation}
            />
    </main>
);
    }

export default Breathing;