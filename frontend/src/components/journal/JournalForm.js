import React, { useRef } from 'react'


export const JournalForm = (props) => {
    const thoughtRef = useRef();
    const emotionRef = useRef();
    const reflectionRef = useRef();

    const saveHndler = (event) =>{
        event.preventDefault();
        if (!thoughtRef.current.value){
            return;
        }
         
        const journalData = {
            Thoughts: thoughtRef.current.value,
            Emotions: emotionRef.current.value,
            Reflection: reflectionRef.current.value,
        }
        
        props.onAddJournalHandler(journalData);
        thoughtRef.current.value='';
        emotionRef.current.value='';
        reflectionRef.current.value='';

    }




  return (
    <form onSubmit={saveHndler}>
        <article>
            <aside>
                <label>My Thoughts:</label>
                <input type="text" ref={thoughtRef}/>
            </aside>
            <aside>
                <label>My Emotions:</label>
                <input type="text" ref={emotionRef}/>
            </aside>
            <aside>
                <label>My Personal Reflection:</label>
                <input type="text" ref={reflectionRef}/>
            </aside>
            <button>save</button>
        </article>
    </form>
  )
}
