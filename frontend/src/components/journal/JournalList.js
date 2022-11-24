import React, { useEffect } from 'react'
import { JournalItem } from './JournalItem'


export const JournalList = (props) => {
 
  return (
        <ul>
            {props.items.map((journal, index)=>(
               <JournalItem
                 key={index}
                 journal={journal}
                 />
            ))}
        </ul>
  )
}
