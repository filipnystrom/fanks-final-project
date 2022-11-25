import React, { useState } from 'react'

export const JournalItem = (props) => {
    const journal = {...props.journal}
    const [showDelete, setShowDelet] = useState()
    const removeHamdler = () => props.onRemove(journal.entryId)

    const showDeleteButtonHandler = ()=>{
      setShowDelet(prevState => !prevState)
    }
  return (
    <li >
    <article  >
      <section  onClick={showDeleteButtonHandler}>
        <h2>{journal.Thoughts}</h2>
        <p>{journal.Emotions}</p>
        <p>{journal.Reflection}</p>
        {showDelete && <button  onClick={removeHamdler}>Remove</button>}
      </section>
    </article>
  </li>
  )
}
