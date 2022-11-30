import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const url = 'https://api.growwithsprout.site';

const SleepLogCard = ({ date, hours, rate, comments, entryId, setSleepLog }) => {
  const [isToggled, setIsToggled] = useState(false);
  const { user } = useAuth0();
  const userId = user.sub.replace('auth0|', '');
  
  const toggleCard = () => {
    if (!isToggled) {
      setIsToggled(true);
    }
    if (isToggled) {
      setIsToggled(false);
    }
  }

  const removeCard = (entryId, userId) => {
    fetch(`${url}/sleeplogs/${userId}/${entryId}/`, {
      method: 'DELETE',
      params: {
        entryId: entryId,
        userId: userId,
      }
    })
    .then(() => {
      fetch(`${url}/sleeplogs/`)
        .then((res) => res.json())
        .then((data) => setSleepLog(data.find(el => el.userId === userId)));
    })
  }

  if (!isToggled) {
    return (
      <div className="card sleepLogCard notToggled" onClick={() => toggleCard()}>
        <p className="bold">{date}</p>
      </div>
    )
  }

  if (isToggled) {
    return (
      <div className="sleepLogCard" onClick={() => toggleCard()}>
        <div className="sleepLogNav">
          <p className="bold">{date}</p>
          <button className="loginBtn" onClick={(e) => {
            e.stopPropagation();
            removeCard(entryId, userId);
          }}>REMOVE</button>
        </div>

        <p>Hours of sleep: {hours}</p>
        <p>How did I sleep: {rate}</p>
        <p>{comments}</p>
      </div>
    )
  }
}

export default SleepLogCard;