import React, { useState } from 'react'

export const JournalItem = (props) => {
    const journal = {...props.journal}
    const [showDelete, setShowDelet] = useState()
    const removeHamdler = () => props.onRemove(journal.entryId)

    const showDeleteButtonHandler = ()=>{
      setShowDelet(prevState => !prevState)
    }
  return (
    <article className='journalLogCard' >
      <section className='journalLogNav' onClick={showDeleteButtonHandler}>
        <p>{journal.date}</p>
        {showDelete && <section>
          <p>-{journal.Thoughts}</p>
          <p>-{journal.Emotions}</p>
        <p>-{journal.Reflection}</p>
        <button  onClick={removeHamdler}>Remove</button>
      </section>}
      </section>
    </article>
  )
}