import './sleepLog.css';
import { useState, useEffect } from 'react';
import SleepLogForm from './SleepLogForm';
import SleepLogGallery from './SleepLogGallery';
import { useAuth0 } from '@auth0/auth0-react';

const url = 'http://localhost:8080';

const SleepLog = () => {
  const [sleepLog, setSleepLog] = useState(null);
  const { user } = useAuth0();

  const getSleepLogs = () => {
    const userId = user.sub.replace('auth0|', '');

    fetch(`${url}/sleeplogs`)
      .then((res) => res.json())
      .then((data) => setSleepLog(data.find(el => el.userId === userId)));
  }

  useEffect(() => {
    // if (!sleepLog) {
    //   return;
    // }
    return getSleepLogs();
  }, []);

  return (
    <section className="sleepLog">
      <h1>Your Sleeplog!</h1>
      <h3>Here you can fill in your sleeplog! It's really good to keep track of your sleep, and sleep is like super important to be able to grow as a person or whatever...</h3>

      <SleepLogForm sleepLog={sleepLog} setSleepLog={setSleepLog} />
      <SleepLogGallery sleepLog={sleepLog} setSleepLog={setSleepLog} />
    </section>
  )

}

export default SleepLog;