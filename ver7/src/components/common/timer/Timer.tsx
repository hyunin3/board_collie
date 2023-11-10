import React, { useEffect, useState } from 'react';
import Alarm from '@mui/icons-material/Alarm';

// styles
import styled from 'styled-components';

const ShowTime = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.5rem;
    padding: 0 1vw;
    font-family: 'Jua', sans-serif;
`;

const Timer: React.FC = () => {
  const initialTime = localStorage.getItem('time') ? parseInt(localStorage.getItem('time') as string, 10) : 0;
  const [time, setTime] = useState<number>(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (localStorage.getItem('isActive') === 'true') {
        setTime(prevTime => prevTime + 1); // time 값을 1 증가
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      localStorage.setItem('time', time.toString());
    };
  }, [time]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);

  const formatTime = () => {
    if (hours >= 1) {
      return `${hours}시간 ${minutes}분`;
    } else {
      return `${minutes}분`;
    }
  };

  return (
    <div>
      <ShowTime>
        <Alarm style={{ fontSize: '1.5rem' }}/>&nbsp;{formatTime()}
      </ShowTime>
    </div>
  );
};

export default Timer;
