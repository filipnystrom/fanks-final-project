import React from 'react';
import { useState } from 'react';
import LogoutButton from '../login/LogoutButton';
import Breathing from '../breathingExercise/Breathing';
import Journal from '../journal/Journal';
import SleepLog from '../sleepLog/SleepLog';
import Query from '../queryExercise/Query';
import ProfilePage from '../profilePage/ProfilePage';
import './HomeLoggedIn.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from '../login/LoginButton';
import logo from '../../assets/images/sprout_logo.svg';
import SproutWelcome from '../../assets/images/SproutWelcome.svg';

const HomeLoggedIn = () => {
    const [clicked, setClicked] = useState(false);
    const { isAuthenticated } = useAuth0();

    const handleClick = e => {
        e.preventDefault();
        setClicked(e.target.className);
    }

    if (clicked === 'feature breathingBtn') {
        return (
            <Breathing setClicked={setClicked} />
        )
    };
    if (clicked === 'feature journalsBtn') {
        return (
            <Journal setClicked={setClicked} />
        )
    };
    if (clicked === 'feature sleepLogBtn') {
        return (
            <SleepLog setClicked={setClicked} />
        )
    };
    if (clicked === 'feature queryBtn' ) {
        return (
            <Query setClicked={setClicked} />
        )
    };
    if (clicked === 'feature profilePageBtn') {
        return (
            <ProfilePage setClicked={setClicked} />
        )
    };
    return (
        <>
        { isAuthenticated && <section className='homeLoggedIn'>
            <div className='logoutBtn'>
                <LogoutButton />
            </div>
            <section className='features'>
                <div>
                    <div className='feature breathingBtn'></div>
                    <p><Link to='/breathing'>Breathing</Link></p>
                </div>
                <div>                    
                    <div className='feature journalsBtn'></div>
                    <p><Link to='/journal'>Journal</Link></p>
                </div>
                <div>                
                    <div className='feature sleepLogBtn'></div>
                    <p><Link to='/sleeplog'>Sleep Log</Link></p>
                </div>
                <div>                
                    <div className='feature queryBtn'></div>
                    <p><Link to='/query'>Query</Link></p>
                </div>
                <div>
                    <div className='feature profilePageBtn'></div>
                    <p><Link to='/profilepage'>Profile Page</Link></p>
                </div>
            </section>
        </section>}
        { !isAuthenticated && 
            <>
                <ul>
                    <li><Link to='/'><img src={logo} onClick={HomeLoggedIn} alt='home' ></img></Link></li>
                    <li><LoginButton /></li>
                </ul>

                <main>
                    <img className='welcome' src={SproutWelcome} alt='welcome'></img>
                    <h1>Meditate with Sprout</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and and over the moon. 
                    Typesetting industry. Meditate with Sprout. Sign up now - it’s free! 
                    Just take a minute to sign up now. Lorem Ipsum is simply dummy text of 
                    the printing and typesetting industry. Come on sign up now!</p>
                </main>
                <section>
                    <p>"I love this web app!"</p>
                </section>
                <footer>
                    <p> © 2022 Sprout
                    This web app is an open source by FANKS. Visit our GitHub.</p>
                </footer>
            </>
        }
    </>
    )
}

export default HomeLoggedIn;