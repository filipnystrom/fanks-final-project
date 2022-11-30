import React, { useState } from "react";

export const JournalItem = (props) => {
  const journal = { ...props.journal };
  const [showDelete, setShowDelet] = useState();
  const removeHamdler = () => props.onRemove(journal.entryId);

  const showDeleteButtonHandler = () => {
    setShowDelet((prevState) => !prevState);
  };
  return (
    <article className="journal__Card">
      <section  onClick={showDeleteButtonHandler}>
        <p className="journal__date">{journal.date}</p>
        {showDelete && (
          <section >
            <button className="remove__journal" onClick={removeHamdler}>
              REMOVE
            </button>
            <p className="journal__info">{journal.Thoughts}</p>
            <p className="journal__info">{journal.Emotions}</p>
            <p className="journal__info">{journal.Reflection}</p>
          </section>
        )}
      </section>
    </article>
  );
};
