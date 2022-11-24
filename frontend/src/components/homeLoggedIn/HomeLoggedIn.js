import React from 'react';
import { useState } from 'react';
import LogoutButton from '../login/LogoutButton';
import Breathing from '../breathingExercise/Breathing';
import Journal from '../journal/Journal';
import SleepLog from '../sleepLog/SleepLog';
import Query from '../queryExercise/Query';
import ProfilePage from '../profilePage/ProfilePage';
import './HomeLoggedIn.css'

const HomeLoggedIn = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = e => {
        e.preventDefault();
        setClicked(e.target.className);
    }

    if (clicked === 'feature breathingBtn') {
        return (
            <Breathing />
        )
    };
    if (clicked === 'feature journalsBtn') {
        return (
            <Journal />
        )
    };
    if (clicked === 'feature sleepLogBtn') {
        return (
            <SleepLog />
        )
    };
    if (clicked === 'feature queryBtn') {
        return (
            <Query />
        )
    };
    if (clicked === 'feature profilePageBtn') {
        return (
            <ProfilePage />
        )
    };
    return (
        <section className='homeLoggedIn'>
            <div className='logoutBtn'>
                <LogoutButton />
            </div>
            <section className='features'>
                <div>
                    <div className='feature breathingBtn' onClick={handleClick}></div>
                    <p>Breathing</p>
                </div>
                <div>                    
                    <div className='feature journalsBtn' onClick={handleClick}></div>
                    <p>Journals</p>
                </div>
                <div>                
                    <div className='feature sleepLogBtn' onClick={handleClick}></div>
                    <p>Sleep Log</p>
                </div>
                <div>                
                    <div className='feature queryBtn' onClick={handleClick}></div>
                    <p>Query</p>
                </div>
                <div>
                    <div className='feature profilePageBtn' onClick={handleClick}></div>
                    <p>Profile</p>
                </div>
            </section>
        </section>
    )
}

export default HomeLoggedIn;