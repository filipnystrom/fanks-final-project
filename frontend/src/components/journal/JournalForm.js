import React, { useRef } from 'react'


export const JournalForm = (props) => {
    const thoughtRef = useRef();
    const emotionRef = useRef();
    const reflectionRef = useRef();

    const saveHndler = (event) => {
        event.preventDefault();
        if (!thoughtRef.current.value) {
            return;
        }

        const journalData = {
            Thoughts: thoughtRef.current.value,
            Emotions: emotionRef.current.value,
            Reflection: reflectionRef.current.value,
        }

        props.onAddJournalHandler(journalData);
        thoughtRef.current.value = '';
        emotionRef.current.value = '';
        reflectionRef.current.value = '';

    }




    return (
        <form onSubmit={saveHndler}>
            <article>
                <aside>
                    <label>What am I grateful for today?:</label>
                    <input type="text" ref={thoughtRef} />
                </aside>
                <aside>
                    <label>What am I looking forward to for
                        tomorrow?</label>
                    <input type="text" ref={emotionRef} />
                </aside>
                <aside>
                    <label>5 words to summarize about today::</label>
                    <input type="text" ref={reflectionRef} />
                </aside>
                <button>save</button>
            </article>
        </form>
    )
}
