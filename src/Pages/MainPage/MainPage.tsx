import React, { useState } from 'react';
import { Button, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './MainPage.css';
import logo from '../assets/logo_x2.jpg'

const MainPage: React.FC = () => {
  const [players, setPlayers] = useState(2);

  const incrementPlayers = () => {
    if (players < 8) setPlayers(prev => prev + 1);
  };

  const decrementPlayers = () => {
    if (players > 1) setPlayers(prev => prev - 1);
  };

  return (
    <div className="container">
      <img src={logo} alt="App Logo" className="logo" />
      <Typography variant="h5" gutterBottom>
        게임을 즐기실 인원을 선택해주세요!
      </Typography>
      <div className="player-adjust">
        <IconButton onClick={decrementPlayers} disabled={players === 1}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="h6">{players}</Typography>
        <IconButton onClick={incrementPlayers} disabled={players === 8}>
          <AddIcon />
        </IconButton>
      </div>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
        START
      </Button>
    </div>
  );
}

export default MainPage;
