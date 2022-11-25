import React from 'react';
import { useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
//import LineChart from "./LineChart";
import { Data } from "./LineChart";
//import {EditForm} from "./EditProfile";

const ProfilePage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    const {userData, setUserData} = useState({  labels: Data.map((data) => data.day),
      datasets: [
        {
          label: "Users Progress",
          data: Data.map((data) => data.userGain),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],});

    return (
        <div>
        <h1>My Profile</h1>
        <div>
        
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>Name:</h2>{user.name.split('@')[0].replace(/[^a-zA-Z ]/g, " ")}
        <h2>Email:</h2>{user.email}
      </div>
      <button >Edit Profile</button>

       <h2> Weekly Progress: </h2>
      
       < div chartData={userData} />
        </div>
        </div>
    )
}

export default ProfilePage;


