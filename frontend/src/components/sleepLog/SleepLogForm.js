import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import sleepTerrible from '../../assets/images/sleep_terrible.svg';
import sleepOk from '../../assets/images/sleep_okey.svg';
import sleepGreat from '../../assets/images/sleep_great.svg';
const { v4: uuidv4 } = require("uuid");

const url = 'https://api.growwithsprout.site';

const SleepLogForm = ({ sleepLog, setSleepLog }) => {
  const { user } = useAuth0();
  const userId = user.sub.replace('auth0|', '')
  const [wrongInput, setWrongInput] = useState(false);
  const [newLog, setNewLog] = useState({
    rate: '',
    hours: '',
    comments: '',
    userId: '',
    entryId: '',
  })

  const today = new Date();
  const currentDate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;


  const addNewUserSleepLog = () => {
    if (sleepLog) return;

    const newUserLog = {
      userId: userId,
      entries: [],
    }

    fetch(`${url}/sleeplogs/${userId}/`, {
      method: 'POST',
      body: JSON.stringify(newUserLog),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewUserSleepLog();

    if (newLog.date === '' || newLog.hours === '' || newLog.rate === '') {
      setWrongInput(true);
      return setNewLog({
        rate: '',
        hours: '',
        comments: '',
        userId: '',
        entryId: '',
      })
    }

    const log = {
      date: currentDate,
      rate: newLog.rate,
      hours: newLog.hours,
      comments: newLog.comments,
      userId: userId,
      entryId: uuidv4(),
    }

    fetch(`${url}/sleeplogs/${userId}/`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    }).then(() => {
      fetch(`${url}/sleeplogs/`)
        .then(res => res.json())
        .then((data) => setSleepLog(data.find(el => el.userId === userId)));
    }).then(() => {
      fetch(`${url}/sleeplogs/`)
        .then(res => res.json())
        .then((data) => setSleepLog(data.find(el => el.userId === userId)));
    })

    setWrongInput(false);
    return setNewLog({
      rate: '',
      hours: '',
      comments: '',
    })
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setNewLog({
      ...newLog,
      [e.target.name]: value
    })
  };

  return (
    <section className="formSection card">
      <form onSubmit={handleSubmit}>
      <label htmlFor="hours">Number of hours I slept tonight:</label>
        <input
          type="number"
          name="hours"
          value={newLog.hours}
          onChange={handleChange}
        />

        <label htmlFor="rate">How would I rate my sleep?</label>
        <div className="radio">
          <label className="radioButton">
            <img src={sleepTerrible} alt="Terrible sleep icon" />
            Terrible
            <input
              type="radio"
              name="rate"
              value='Terrible'
              checked={newLog.rate === 'Terrible'}
              onChange={handleChange}
            />
          </label>
        
          <label className="radioButton">
            <img src={sleepOk} alt="Okay sleep icon" />
            Not bad
            <input
              type="radio"
              name="rate"
              value='Not bad'
              checked={newLog.rate === 'Not bad'}
              onChange={handleChange}
            />
          </label>
        
          <label className="radioButton">
            <img src={sleepGreat} alt="Great sleep icon" />
            Great!
            <input
            type="radio"
            name="rate"
            value='Great!'
            checked={newLog.rate === 'Great!'}
            onChange={handleChange}
          />
          </label>
        </div>

        <label htmlFor="comments">Things I would like to continue doing to get a good nights sleep:</label>
        <textarea
          type="textarea"
          rows="5"
          name="comments"
          value={newLog.comments}
          onChange={handleChange}
        />

        <button type="submit" className="loginBtn">SAVE</button>
      </form>
      {(wrongInput === true) && <h3 className="errorMessage">Please fill in your log to save!</h3>}
    </section>
  )
}

export default SleepLogForm;