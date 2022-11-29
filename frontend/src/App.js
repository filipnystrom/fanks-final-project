import './App.css';
import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import ProfilePage from './components/profilePage/ProfilePage';
import Breathing from './components/breathingExercise/Breathing';
import Journal from './components/journal/Journal';
import Query from './components/queryExercise/Query';
import SleepLog from './components/sleepLog/SleepLog';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

function App() {
  return (
    <Fragment>
      <Routes>
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
      <Route path='/' element={<Home />} />
      </Routes>
    </Fragment>
  )
}

export default App;
