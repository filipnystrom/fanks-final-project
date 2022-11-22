import { useState, useEffect } from 'react';

const url = 'http://localhost:8080';

const SleepLog = () => {
  const [sleepLog, setSleepLog] = useState(null);

  const getDb = () => {
    fetch(`${url}/sleeplogs`)
      .then((res) => res.json())
      .then((data) => setSleepLog(data));
  }

  useEffect(() => {
    getDb();
  }, []);


}

export default SleepLog;