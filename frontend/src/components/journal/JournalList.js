import { JournalItem } from './JournalItem'

export const JournalList = (props) => {
  // const enteredId = props.entryId
  // const { user } = useAuth0();
  // const id = user?.sub.substring(6);
  const removeHandler = enteredId =>{
    props.onRemoveJournal(enteredId)
  }
 
  return (
    <>
    <h3 className='p__journals'>Your previous journals:</h3>
        <div className='Journal__gallary'>
            {props.items.map((journal, index)=>(
               <JournalItem
                 key={index}
                 journal={journal}
                 onRemove={removeHandler}
                 />
            ))}
        </div>
        </>
  )
}