import { useState } from 'react';
import SleepLogCard from "./SleepLogCard";


const SleepLogGallery = ({ sleepLog, setSleepLog }) => {
  const [isToggled, setIsToggled] = useState(false);
  

  const toggleCard = () => {
    if (!isToggled) {
      setIsToggled(true);
    }
    if (isToggled) {
      setIsToggled(false);
    }
  }

  return (
    <section className="logGallery">
      <h3>Your previous sleeplogs:</h3>

      {sleepLog?.entries.map(log => {
        const { date, hours, rate, comments, entryId } = log; 
        return (
          <SleepLogCard
            date={date}
            hours={hours}
            rate={rate}
            comments={comments}
            entryId={entryId}
            key={entryId}
            setSleepLog={setSleepLog}
            onClick={() => toggleCard()}
          />
        )
      })}
    </section>
  )
}

export default SleepLogGallery;