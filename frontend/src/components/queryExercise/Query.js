import Countdown from 'react-countdown';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import closeButton from '../../assets/images/close_icon.svg';
import queryImg from '../../assets/images/holdHands.svg';
import './Query.css';

const questions = [
    'What do you long for?',
    'What is holding you back?',
    'What excites you?',
    'What are you afraid of?'
];

const getRandomInt = max => {
    return Math.floor(Math.random() * max);
}

const Query = ({ setClicked }) => {
    const [clickedQuery, setClickedQuery] = useState(null);
    const [question, setQuestion] = useState('');

    const renderer2 = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <div><h2 className='queryGreat'>Great!</h2><button className='startBtnQuery'onClick={handleClick}>DONE</button></div>
        }
        return <div className='queryTimer'>{minutes}0:0{seconds}</div>;
    }

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            if (clickedQuery === 'first') {
                return <div>
                    <button className='startBtnQuery' onClick={handleClick}>REPEAT</button>
                </div>;
            }
        }
        if (clickedQuery === 'second') {
            return <Countdown date={Date.now() + 3000} renderer={renderer2} />      
        }
        return <div className='queryTimer'>{minutes}0:0{seconds}</div>;
    };

    const handleClick = e => {
        e.preventDefault();
        if (!clickedQuery) {
            setQuestion(questions[getRandomInt(3)]);
            return setClickedQuery('first')
        };
        if (clickedQuery === 'first') {
            return setClickedQuery('second')
        };
        return setClickedQuery(null);
    }

    return (
        <div className='queryContainer'>
            <section className='querySection'>
                <section className='queryHeader'>
                    <h4 className='pairUp'>Pair Up</h4>
                    <div className='queryHomeBtn'><Link to='/'><img src={closeButton} alt='home' ></img></Link></div>
                </section>
                {clickedQuery ? <div>
                    <h4 className='queryQuestion'>{question}</h4>
                    <Countdown date={Date.now() + 3000} renderer={renderer} />
                </div> :
                <section className='stepSection'>
                    <p className='step'><span>Step 1:</span> Find a friend, and sit down in a calm and safe space. Take a few breaths together to settle in.</p>
                    <p className='step'><span>Step 2:</span> One of you starts by asking the question on the screen. Ask the question repeatedly, or leave space for longer answers..</p>
                    <p className='step'><span>Step 3:</span> You will get a minute to answer. Try to feel into your body and let out whatever comes to your mind.</p>
                    <p className='step'><span>Step 4:</span> When you're done, switch positions and repeat. Remember to give each other space, and listen attentively.</p>
                    <button className='startBtnQuery' onClick={handleClick}>START</button>
                </section>}
            </section>
            <img className='queryImg' src={queryImg} alt='pair up'></img>
        </div>
    )
}

export default Query;