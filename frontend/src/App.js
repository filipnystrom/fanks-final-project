import './App.css';
import { useState, useEffect } from 'react';
import Landing from './components/Landing';

const url = 'http://localhost:8080';

function App() {
  const [data, setData] = useState(null);

  const getDb = () => {
    fetch(`${url}/api`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  useEffect(() => {
    getDb();
  }, []);

  return (
    <div className="App">
      <Landing />
      {/* {data && <h1>{data[0].title}</h1>}
      {data && <p>{data[0].content}</p>} */}
    </div>
  );
}

export default App;
