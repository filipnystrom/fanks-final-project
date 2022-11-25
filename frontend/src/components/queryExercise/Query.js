import Countdown from 'react-countdown';
import { useState } from 'react';
import BackButton from '../BackButton';

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

    const renderer2 = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <div><h1>DONE</h1><button onClick={handleClick}>Generate new question</button></div>
        }
        return <span>{seconds}</span>;
    }

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            if (clickedQuery === 'first') {
                return <div>
                    <h1>Now have your friend ask you the same question</h1>
                    <button onClick={handleClick}>Start</button>
                </div>;
            }
        }
        if (clickedQuery === 'second') {
            return <Countdown date={Date.now() + 3000} renderer={renderer2} />      
        }
        return <span>{seconds}</span>;
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
        <section>
            <h1>Find a friend and ask each other these questions repeatedly until at least one of you is out of saliva. Click the button whenever you're ready!</h1>
            {clickedQuery ? <div>
                <h1>{question}</h1>
                <Countdown date={Date.now() + 3000} renderer={renderer} />
            </div> : <button onClick={handleClick}>Start</button>}
            <BackButton setClicked={setClicked} />
        </section>
    )
}

export default Query;