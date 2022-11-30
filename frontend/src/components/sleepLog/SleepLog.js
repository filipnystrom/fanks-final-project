import './sleepLog.css';
import { useState, useEffect } from 'react';
import SleepLogForm from './SleepLogForm';
import SleepLogGallery from './SleepLogGallery';
import { useAuth0 } from '@auth0/auth0-react';
import closeButton from '../../assets/images/close_icon.svg';
import { Link } from 'react-router-dom';

const url = 'http://api.growwithsprout.site';

const SleepLog = () => {
  const [sleepLog, setSleepLog] = useState(null);
  const { user } = useAuth0();
  const userId = user.sub.replace('auth0|', '');

  const getSleepLogs = () => {

    fetch(`${url}/sleeplogs`)
      .then((res) => res.json())
      .then((data) => setSleepLog(data.find(el => el.userId === userId)))
  }

  useEffect(() => {
    return getSleepLogs();
  }, []);

  return (
    <section className="centerColumn sleepLog">
      <ul className="navBar sleepHeader">
        <li><p>Sleep Log</p></li>
        <li><Link to='/'><img src={closeButton} alt='home' ></img></Link></li>
      </ul>

      <SleepLogForm sleepLog={sleepLog} setSleepLog={setSleepLog} />
      <SleepLogGallery sleepLog={sleepLog} setSleepLog={setSleepLog} />
    </section>
  )

}

export default SleepLog;