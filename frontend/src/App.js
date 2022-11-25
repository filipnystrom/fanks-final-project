import './App.css';
import { useState, useEffect } from 'react';
import HomeNotLoggedIn from './components/homeNotLoggedIn/HomeNotLoggedIn';
import HomeLoggedIn from './components/homeLoggedIn/HomeLoggedIn';

import { useAuth0 } from "@auth0/auth0-react";

const url = 'http://localhost:8080';

function App() {
  const [data, setData] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();

  const getDb = () => {
    fetch(`${url}/journals`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  useEffect(() => {
    getDb();
  }, []);
  
  return (
    <div className="App">
      { isAuthenticated ? <HomeLoggedIn /> : <HomeNotLoggedIn /> }
    
    </div>
  )
}

export default App;
