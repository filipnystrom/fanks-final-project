import { useState, useEffect } from "react";
import { JournalForm } from "./JournalForm";
import { JournalList } from "./JournalList";
import { useAuth0 } from "@auth0/auth0-react";
import './Journal.css';
import sproutPen from '../../assets/images/sprout_withpencil.svg';
import closeButton from '../../assets/images/close_icon.svg';
import { Link } from 'react-router-dom';
const { v4: uuidv4 } = require("uuid");

const url = "https://api.growwithsprout.site/journals/";

const Journal = () => {
  const { user } = useAuth0();
  const id = user?.sub.substring(6);
  const [journal, setJournal] = useState([]);

  const getUser = async () => {
    const journals = await fetch(url + id);
    const result = await journals.json();
    setJournal(result.entries);
  };

  useEffect(() => {
    getUser();
  }, []);

  const today = new Date();
  const currentDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

  const addJournalsHandler = async (enteredJournal) => {
    const { Thoughts, Emotions, Reflection } = enteredJournal;
    const reqBody = { Thoughts, Emotions, Reflection, entryId: uuidv4(), date: currentDate };
    const response = await fetch(url + id, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    const result = await response.json();
    if (result.code === 201) {
      getUser();
    }
  };

  const removeJournalHandler = async entryId => {
    const response = await fetch(`${url + id}/${entryId}/`, {
      method: "DELETE",
      mode: "cors",
      params: {
        entryId: entryId,
        userId: id,
      }
    })

    if (response.status !== 204) return;

    return getUser();
  };

  return (
    <section className="centerColumn journalLog">
   <ul className="navBar journalHeader">
        <li><p>Daily Journal</p></li>
        <li><Link to='/'><img src={closeButton} alt='home' ></img></Link></li>
      </ul>
      <img src={sproutPen} alt="Logo with pen" className='journal__logo'></img>
      <JournalForm onAddJournalHandler={addJournalsHandler} />
      <JournalList
        items={journal}
        onRemoveJournal={removeJournalHandler}

      />
      </section>
  )
};

export default Journal;