import { useState, useEffect } from 'react';
import { JournalForm } from './JournalForm';
import { JournalList } from './JournalList';
import { useAuth0 } from "@auth0/auth0-react";

const url = 'http://localhost:8080/journals/';

const Journal = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const id = user.sub.substring(6);
  const [journal, setJournal] = useState([]);
  

  const getUser = async () => {
    const journals = await fetch(url+id)
    const result = await journals.json();
    setJournal(result)
  }

  useEffect(() => {
    getUser();
  }, []);

  const addJournalsHandler = async (enteredJournal) => {
    const {Thoughts, Emotions, Reflection } = enteredJournal
    const reqBody = {Thoughts, Emotions, Reflection, entryId: Date.now()  }

     const response = await fetch(url+id , {
      method:"POST",
      mode: 'cors',
headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
            body: JSON.stringify(reqBody)
    })

   const result = await response.json();
    if(result.code === 201){
      setJournal(prevState => {
        const state = [...prevState];
        state.push(reqBody)
        return state
      })
    }  
    
  }
  

  // const addJournalHandler = async (journal) => {
  //   setJournal(prevState => [journal, ...prevState]);
       
  //   await fetch(url, {
  //     method:"POST",
  //     headers: {"Content-Type":"application/json"},
  //     body:JSON.stringify(journal)
  //   })
  // }

  return (
    <>
    <JournalForm  onAddJournalHandler={addJournalsHandler}/>
    <JournalList
       items ={journal}
       />
    </>
  )

  

}

export default Journal;