import './App.css';
import { useState, useEffect, Fragment } from 'react';
import HomeNotLoggedIn from './components/homeNotLoggedIn/HomeNotLoggedIn';
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from 'react-router-dom';
import HomeLoggedIn from './components/homeLoggedIn/HomeLoggedIn';
import ProfilePage from './components/profilePage/ProfilePage';
import Breathing from './components/breathingExercise/Breathing';
import Journal from './components/journal/Journal';
import Query from './components/queryExercise/Query';
import SleepLog from './components/sleepLog/SleepLog';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

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
    // getDb();
  }, []);

  return (
    <Fragment>
      <Routes>
      <Route path='/' element={<HomeLoggedIn />} />
      <Route path='/homeLoggedIn' element={
        <ProtectedRoute>
          <HomeLoggedIn />
        </ProtectedRoute>
      }
      />
      <Route path='/profilePage' element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
      />
      <Route path='/breathing' element={
        <ProtectedRoute>
          <Breathing />
        </ProtectedRoute>
      }
      />
      <Route path='/journal' element={
        <ProtectedRoute>
          <Journal />
        </ProtectedRoute>
      }
      />
      <Route path='/query' element={
        <ProtectedRoute>
          <Query />
        </ProtectedRoute>
      }
      />
      <Route path='/sleepLog' element={
        <ProtectedRoute>
          <SleepLog/>
        </ProtectedRoute>
      }
      />
      </Routes>
    </Fragment>
  )
}

export default App;
