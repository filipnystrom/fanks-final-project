import React, { useState } from "react";

export const JournalItem = (props) => {
  const journal = { ...props.journal };
  const [showDelete, setShowDelet] = useState();
  const removeHamdler = () => props.onRemove(journal.entryId);

  const showDeleteButtonHandler = () => {
    setShowDelet((prevState) => !prevState);
  };

    if (showDelete) {
      return (
        <section className="journal__Card" onClick={showDeleteButtonHandler}>
          <section className="journalNav">
            <p className="journal__date">{journal.date}</p>
            <button className="loginBtn" onClick={removeHamdler}>
              REMOVE
            </button>
          </section>

          <section>
            <p className="journal__info">What I am grateful for: {journal.Thoughts}</p>
            <p className="journal__info">What I am looking forward to: {journal.Emotions}</p>
            <p className="journal__info">Summarizing words: {journal.Reflection}</p>
          </section>
        </section>
      )
    }
    return (
      <section className="journal__Card hoverEffect" onClick={showDeleteButtonHandler}>
        <p className="journal__date">{journal.date}</p>
      </section>
    )
};
