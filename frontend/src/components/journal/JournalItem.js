import React from 'react'

export const JournalItem = (props) => {
    const journal = {...props.journal}
  return (
    <li >
    <article  >
      <section >
        <h2>{journal.Thoughts}</h2>
        <p>{journal.Emotions}</p>
        <p>{journal.Reflection}</p>
      </section>
         <button>Remove</button>
    </article>
  </li>
  )
}
