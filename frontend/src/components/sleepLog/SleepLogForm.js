import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const { v4: uuidv4 } = require("uuid");

const url = 'http://localhost:8080';

const SleepLogForm = ({ setSleepLog }) => {
  const { user } = useAuth0();
  const [newLog, setNewLog] = useState({
    date: '',
    rate: '',
    hours: '',
    comments: '',
    userId: '',
    entryId: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user.sub.replace('auth0|', '')
    console.log(user.sub, userId);
    const log = {
      date: newLog.date,
      rate: newLog.rate,
      hours: newLog.hours,
      comments: newLog.comments,
      userId: userId,
      entryId: uuidv4(),
    }

    fetch(`${url}/sleeplogs/${userId}/`, {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    }).then(() => {
      fetch(`${url}/sleeplogs/`)
        .then(res => res.json())
        .then((data) => setSleepLog(data.find(el => el.userId === userId)));
    })

    setNewLog({
      date: '',
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
      <h3>Add today's sleeplog here:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          name="date"
          value={newLog.date}
          onChange={handleChange}
        />

        <label htmlFor="rate">How did you sleep?</label>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="rate"
              value={newLog.rate}
              onChange={handleChange}
            />
            Bad!
          </label>
        
          <label>
            <input type="radio" name="rate" value={newLog.rate} onChange={handleChange} />
            Like always, ish?
          </label>
        
          <label>
            <input type="radio" name="rate" value={newLog.rate} onChange={handleChange} />
            Niiiiice!
          </label>
        </div>

        <label htmlFor="hours">How many hours did you sleep?</label>
        <input
          type="number"
          name="hours"
          value={newLog.hours}
          onChange={handleChange}
        />

        <label htmlFor="comments">Do you have any further reflections on your sleep?</label>
        <textarea
          type="textarea"
          rows="5"
          name="comments"
          value={newLog.comments}
          onChange={handleChange}
        />

        <button type="submit">Submit!</button>
      </form>
    </section>
  )
}

export default SleepLogForm;