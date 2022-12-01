import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className='profileBtn' onClick={() => logout({ returnTo: window.location.origin })}>
      LOG OUT
    </button>
  );
};

export default LogoutButton;