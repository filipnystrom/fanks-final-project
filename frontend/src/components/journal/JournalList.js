import React, { useEffect } from 'react'
import { JournalItem } from './JournalItem'
import { useAuth0 } from "@auth0/auth0-react";


export const JournalList = (props) => {
  const enteredId = props.entryId
  const { user } = useAuth0();
  const id = user.sub.substring(6);
  const removeHandler = enteredId =>{
    props.onRemoveJournal(enteredId)
  }
 
  return (
        <ul>
            {props.items.map((journal, index)=>(
               <JournalItem
                 key={index}
                 journal={journal}
                 onRemove={removeHandler}
                 />
            ))}
        </ul>
  )
}
