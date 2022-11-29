import React from 'react';
import LogoutButton from '../login/LogoutButton';
import './ProfilePage.css';

const ProfilePage = () => {
    return (
        <section>
        <h4>My profile</h4>
        <LogoutButton text={'LOGOUT'} name={'logout'}/>
        </section>
    )
}

export default ProfilePage;