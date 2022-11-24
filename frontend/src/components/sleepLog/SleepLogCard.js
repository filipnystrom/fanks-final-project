import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const url = 'http://localhost:8080';

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
    console.log('remove meeeee', userId);
    fetch(`${url}/sleeplogs/${userId}/`, {
      method: 'DELETE',
      params: {
        entryId: entryId,
        userId: userId,
      }
    }).then(() => {
      fetch(`${url}/sleeplogs`)
      .then((res) => res.json())
      .then((data) => setSleepLog(data.find(el => el.userId === userId)));
  })
  }

  if (!isToggled) {
    return (
      <div className="card sleepLogCard notToggled" onClick={() => toggleCard()}>
        <p>{date}</p>
      </div>
    )
  }

  if (isToggled) {
    return (
      <div className="card sleepLogCard" onClick={() => toggleCard()}>
        <p>{date}</p>
        <p>{hours}</p>
        <p>{rate}</p>
        <p>{comments}</p>
        <button onClick={(e) => {
          e.stopPropagation();
          removeCard(entryId, userId);
        }}>Remove sleeplog</button>
      </div>
    )
  }
}

export default SleepLogCard;