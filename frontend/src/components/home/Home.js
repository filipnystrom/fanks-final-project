import React, { useEffect } from 'react';
/* import { useState } from 'react';
import LogoutButton from '../login/LogoutButton'; */
import './Home.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from '../login/LoginButton';
import logo from '../../assets/images/sprout_logo.svg';
import SproutWelcome from '../../assets/images/SproutWelcome.svg'; 

const Home = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    return (
        <>
        { isAuthenticated && !isLoading && <section className='centerColumn'>
            <section className="navBar homeHeader">
                <div><img src={logo} alt='home' ></img></div>
                <Link to='/profilepage'><button className='profileBtn'>MY PROFILE</button></Link>
            </section>
            <section className='features'>
                <div className='featureDiv'>
                    <Link to='/breathing'><div className='feature breathingBtn'></div></Link>
                    <p>Breathing</p>
                </div>
                <div className='featureDiv'>
                    <Link to='/journal'><div className='feature journalsBtn'></div></Link>
                    <p>Journal</p>
                </div>
                <div className='featureDiv'>
                    <Link to='/sleeplog'><div className='feature sleepLogBtn'></div></Link>
                    <p>Sleep Log</p>
                </div>
                <div className='featureDiv'>
                    <Link to='/query'><div className='feature queryBtn'></div></Link>
                    <p>Pair Up</p>
                </div>
                {/* <div>
                    <div className='feature profilePageBtn'></div>
                    <p><Link to='/profilepage'>Profile Page</Link></p>
                </div> */}
            </section>
        </section>}
        
        { !isAuthenticated && !isLoading &&
            <>
                <ul className="navBar">
                    <li><Link to='/'><img src={logo} onClick={Home} alt='home' ></img></Link></li>
                    <li><LoginButton text={'LOGIN'} name={'login'}/></li>
                </ul>

                    <img className='welcome' src={SproutWelcome} alt='welcome'></img>
                <main>
                    <h1>Meditate with Sprout</h1>
                    <p className='description'>Lorem Ipsum is simply dummy text of the printing and and over the moon. 
                    Typesetting industry. Meditate with Sprout. Sign up now - it’s free! 
                    Just take a minute to sign up now. Lorem Ipsum is simply dummy text of 
                    the printing and typesetting industry. Come on sign up now!</p>
                    <div className='loginBtnContainer'><LoginButton text={'SIGN UP'} name={'signup'}/></div>
                  <section className="commentSection">
                      <div className="userComment">
                        <p className="quote comment">"I am rather keen on this specific internet web application website!"</p>
                        <p className="comment">- Nuno, 28</p>
                      </div>
                      <div className="userComment">
                        <p className="quote comment">"Sprout is so easy to use, and fun too!"</p>
                        <p className="comment">- Katy, 32</p>
                      </div>
                      <div className="userComment">
                        <p className="quote comment">"I love this web app!"</p>
                        <p className="comment">- Sedi, 26</p>
                      </div>
                  </section>
                </main>
                <footer className='footer__container'>
                    <p className='footer'> © 2022 Sprout</p>
                    <p className='footer' >This web app is an open source by FANKS. Visit our <a href="https://github.com/filipnystrom/fanks-final-project" target="_blank" className='github'>GitHub.</a></p>
                </footer>
            </>
        }
    </>
    )
}

export default Home;