import React, { useEffect, useState } from 'react';
import Alarm from '@mui/icons-material/Alarm';

// styles
import styled from 'styled-components';

const ShowTime = styled.div`
    align-items: center;    
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0 1vw;
    fontFamily: 'Jolly Lodger, cursive',
`;

const Timer: React.FC = () => {
  const initialTime = localStorage.getItem('time') ? parseInt(localStorage.getItem('time') as string, 10) : 0;
  const [time, setTime] = useState<number>(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (localStorage.getItem('isActive') === 'true') {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          localStorage.setItem('time', newTime.toString());
          return newTime;
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formatTime = () => {
    if (hours >= 1) {
      return `${hours}시간 ${minutes}분 ${seconds}초`;
    } else {
      return `${minutes}분 ${seconds}초`;
    }
  };

  return (
    <div>
      <ShowTime>
        <Alarm style={{ fontSize: 25 }}/> {formatTime()}
      </ShowTime>
    </div>
  );
};

export default Timer;
