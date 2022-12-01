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
      {isAuthenticated && !isLoading && <section className='centerColumn'>
        <section className="navBar homeHeader">
          <div><img className='homeLogo' src={logo} alt='home' ></img></div>
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
        </section>
      </section>}

      {!isAuthenticated && !isLoading &&
        <>
          <ul className="navBar homeHeader">
            <li><Link to='/'><img className='homeLogo' src={logo} onClick={Home} alt='home' ></img></Link></li>
            <li><LoginButton text={'LOGIN'} name={'login'} /></li>
          </ul>

          <main>
            <section className="introSection">
              <img className='welcome' src={SproutWelcome} alt='welcome'></img>

              <div className='introText'>
                <h1 className="introTitle">Grow with Sprout</h1>
                <p className='description'>Sprout is your best friend in tending to your inner garden and striving towards personal growth! Join in on the journey to become free from stress and letting your flowers blossom. And don't worry, growing is both fun and easy – when you have the right company.</p>
                <div className='loginBtnContainer'><LoginButton text={'SIGN UP'} name={'signup'} /></div>
              </div>
            </section>

            <section className="commentSection">
              <div className="userComment">
                <p className="quote comment">"This has really helped me! I feel so much lighter now"</p>
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
            <p className='footer' >This web app is an open source by FANKS. Visit our <a href="https://github.com/filipnystrom/fanks-final-project" target="_blank" rel="noreferrer" className='github'>GitHub.</a></p>
          </footer>
        </>
      }
    </>
  )
}

export default Home;