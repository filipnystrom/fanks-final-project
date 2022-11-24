import Countdown from 'react-countdown';
import { useState } from 'react';

const questions = [
    'U feel, nice?',
    'Is hard to get by?',
    'Where u, going? In life.'
];

const getRandomInt = max => {
    return Math.floor(Math.random() * max);
}

const Query = () => {
    const [clicked, setClicked] = useState(null);
    const [question, setQuestion] = useState('');

    const renderer2 = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <div><h1>DONE</h1><button onClick={handleClick}>Generate new question</button></div>
        }
        return <span>{seconds}</span>;
    }

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            if (clicked === 'first') {
                return <div>
                    <h1>Now have your friend ask you the same question</h1>
                    <button onClick={handleClick}>Start</button>
                </div>;
            }
        }
        if (clicked === 'second') {
            return <Countdown date={Date.now() + 3000} renderer={renderer2} />      
        }
        return <span>{seconds}</span>;
    };

    const handleClick = e => {
        e.preventDefault();
        if (!clicked) {
            setQuestion(questions[getRandomInt(3)]);
            return setClicked('first')
        };
        if (clicked === 'first') {
            return setClicked('second')
        };
        return setClicked(null);
    }

    return (
        <section>
            <h1>Find a friend and ask each other these questions repeatedly until at least one of you is out of saliva. Click the button whenever you're ready!</h1>
            {clicked ? <div>
                <h1>{question}</h1>
                <Countdown date={Date.now() + 3000} renderer={renderer} />
            </div> : <button onClick={handleClick}>Start</button>}
        </section>
    )
}

export default Query;