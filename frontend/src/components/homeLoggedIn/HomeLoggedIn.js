import React from 'react';
import { useState } from 'react';
import LogoutButton from '../login/LogoutButton';
import Breathing from '../breathingExercise/Breathing';
import Journal from '../journal/Journal';
import SleepLog from '../sleepLog/SleepLog';
import ProfilePage from '../profilePage/ProfilePage';

const HomeLoggedIn = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = e => {
        e.preventDefault();
        setClicked(e.target.className);
    }

    if (clicked === 'breathingBtn') {
        return (
            <Breathing />
        )
    };
    if (clicked === 'journalsBtn') {
        return (
            <Journal />
        )
    };
    if (clicked === 'sleepLogBtn') {
        return (
            <SleepLog />
        )
    };
    if (clicked === 'profilePageBtn') {
        return (
            <ProfilePage />
        )
    };
    return (
        <section>
            <button className='breathingBtn' onClick={handleClick}>Breathing</button>
            <button className='journalsBtn' onClick={handleClick}>Journals</button>
            <button className='sleepLogBtn' onClick={handleClick}>Sleep Log</button>
            <button className='profilePageBtn' onClick={handleClick}>Profile</button>
            <LogoutButton />
        </section>
    )
}

export default HomeLoggedIn;