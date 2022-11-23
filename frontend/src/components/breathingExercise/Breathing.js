import React, { useState, useEffect } from 'react';
import './Breathing.css';

const Breathing = () => {
const [text, setText] = useState(0);
const [className, setClassName] = useState(0);

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

useEffect(() => {
    breathAnimation();
}, []);

useEffect(() => {
    if (text === 'Breathe Out!') {
        setTimeout(breathAnimation, breatheTime);
    }
}, [text]);

function breathAnimation() {
    setText('Breathe In!');
    setClassName('container grow');
  
    setTimeout(() => {
      setText('Hold');
  
      setTimeout(() => {
        setText('Breathe Out!');
        setClassName('container shrink');
      }, holdTime);
    }, breatheTime);
  }

return (
    <main> 
        <h4>Breathe</h4>
            <section className={ className }>
                <div className='circle'></div>
                <p id='text'> { text }</p>
                <div className='pointer-container'>
                    <span className='pointer'></span>
                </div>
                <div className='gradient-circle'></div>
            </section>
    </main>
);
    }

export default Breathing;