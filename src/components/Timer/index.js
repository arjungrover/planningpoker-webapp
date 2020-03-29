import React, {useState, useEffect} from 'react';

const Timer = (props) => {
  const [second, setSecond] = useState(props.secondt);
  
  useEffect(() => {
      setSecond(props.secondt)
  }, [props.secondt])

  useEffect(() => {
    const timeout = setTimeout(() => {
        if (second > 0) {
            setSecond(second - 1);        
        }
        if(second == 1) {
          props.onTimerOver();
        }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    }
  }, [second]);

  return (
    <div>
      <div>{second}</div>
    </div>
  )
}

export default Timer;
