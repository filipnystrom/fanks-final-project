import { useState, useEffect } from "react";
import { JournalForm } from "./JournalForm";
import { JournalList } from "./JournalList";
import { useAuth0 } from "@auth0/auth0-react";
import BackButton from "../BackButton";
const { v4: uuidv4 } = require("uuid");

const url = "http://localhost:8080/journals/";

const Journal = ({ setClicked }) => {
  const { user } = useAuth0();
  const id = user.sub.substring(6);
  const [journal, setJournal] = useState([]);

  const getUser = async () => {
    const journals = await fetch(url + id);
    const result = await journals.json();
    setJournal(result.entries);
  };

  useEffect(() => {
    getUser();
  }, []);

  const addJournalsHandler = async (enteredJournal) => {
    const { Thoughts, Emotions, Reflection } = enteredJournal;
    const reqBody = { Thoughts, Emotions, Reflection, entryId: uuidv4(), done: false };

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
    const response = await fetch(`${url + id}/${entryId}/`,{
      method:"DELETE",
      mode: "cors",
      params: {
        entryId: entryId,
        userId: id,
      }
    })
    
    if (response.status!== 204) return;

    return getUser();
  };

  return (
    <>
      <JournalForm onAddJournalHandler={addJournalsHandler} />
      <JournalList
       items={journal}
       onRemoveJournal={removeJournalHandler}
        
       />
       <BackButton setClicked={setClicked} />
    </>
  );
};

export default Journal;
