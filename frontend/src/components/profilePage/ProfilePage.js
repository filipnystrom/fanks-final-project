import React from 'react';
import './ProfilePage.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import LogoutButton from '../login/LogoutButton';
import closeButton from '../../assets/images/close_icon.svg';


const ProfilePage = () => {
  const { user } = useAuth0();
  // const { logout } = useAuth0();
  

  return (
    <div className="profilePage">
        <ul className='navBar profileHeader'>
            <li><h4 className='profileText'>My Profile</h4></li>
            <li><Link to='/'><img src={closeButton} alt='home' ></img></Link></li>
            </ul>
        <div className='profiledata'>
          <img  className ="profile-img"  src={user.picture} alt={user.name} />
          <div className= "profileInform">
          <h4 className='profileH4'> {user.name.split('@')[0].replace(/[^a-zA-Z ]/g, " ")}</h4>
          <h4 className='profileH4'>{user.email}</h4>
          </div>
        </div>
        <LogoutButton text={'LOGOUT'} name={'logout'}/>
      </div>
  )
};

export default ProfilePage;