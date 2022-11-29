import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const { v4: uuidv4 } = require("uuid");

const url = 'http://localhost:8080';

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
          <label>
            <input
              type="radio"
              name="rate"
              value='Terrible'
              checked={newLog.rate === 'Terrible'}
              onChange={handleChange}
            />
            Terrible
          </label>
        
          <label>
            <input
              type="radio"
              name="rate"
              value='Not bad'
              checked={newLog.rate === 'Not bad'}
              onChange={handleChange}
            />
            Not bad
          </label>
        
          <label>
            <input
            type="radio"
            name="rate"
            value='Great!'
            checked={newLog.rate === 'Great!'}
            onChange={handleChange}
          />
            Great!
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

        <button type="submit" className="loginBtn">SUBMIT</button>
      </form>
      {(wrongInput === true) && <h4 className="errorMessage">Please fill in your log to submit!</h4>}
    </section>
  )
}

export default SleepLogForm;