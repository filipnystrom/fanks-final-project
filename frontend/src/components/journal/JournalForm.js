import { useRef, useState } from 'react';


export const JournalForm = (props) => {
    const [wrongInput, setWrongInput] = useState(false);
    const thoughtRef = useRef();
    const emotionRef = useRef();
    const reflectionRef = useRef();

    const saveHndler = (event) => {
        event.preventDefault();
        if (!thoughtRef.current.value) {
            setWrongInput(true);
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
        setWrongInput(false);
    }

    return (
        <section >
        <form onSubmit={saveHndler}>
            <article className='formControl'>
                <section>
                    <label className='lable' htmlFor="thoughts">What am I grateful for today?</label>
                    <textarea className='input' type="textarea" rows="5" name="thoughts" ref={thoughtRef} />
                </section>
                <section>
                    <label className='lable' htmlFor="emotion">What am I looking forward to for
                        tomorrow?</label>
                    <textarea className='input' type="textarea" rows="5" name="emotion" ref={emotionRef} />
                </section>
                <section>
                    <label className='lable' htmlFor="reflection">Five words to summarize about today:</label>
                    <textarea className='input' type="textarea" rows="5" name="reflection" ref={reflectionRef} />
                </section>
            </article>
            <button className="saveBtn" >SAVE</button>
        {(wrongInput === true) && <h3 className="errorMessage">Please fill in your journal to save!</h3>}
        </form>
        </section>
        
    )
}