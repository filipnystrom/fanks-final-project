import React from 'react';
import LoginButton from '../login/LoginButton';
import './HomeNotLoggedIn.css';
import logo from '../../assets/images/sprout_logo.svg';
import { Link } from 'react-router-dom';

export const HomeNotLoggedIn = () => {
  return (
    <>
      <ul>
        <li><Link to='/'><img src={logo} onClick={HomeNotLoggedIn} alt='home' ></img></Link></li>
        <li><LoginButton /></li>
      </ul>
    <main>
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
  )
}

export default HomeNotLoggedIn;
