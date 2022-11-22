import { useState, useEffect } from 'react';

const url = 'http://localhost:8080';

const Journal = () => {
  const [journal, setJournal] = useState(null);

  const getDb = () => {
    fetch(`${url}/journals`)
      .then((res) => res.json())
      .then((data) => setJournal(data));
  }

  useEffect(() => {
    getDb();
  }, []);

  

}

export default Journal;