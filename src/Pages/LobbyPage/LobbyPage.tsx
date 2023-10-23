import React, { useState } from 'react';
import { Button, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './LobbyPage.css';
import logo from '../../assets/logo_x2.jpg'
import { Link } from 'react-router-dom';

const LobbyPage: React.FC = () => {
  const [players, setPlayers] = useState(2);

  const incrementPlayers = () => {
    if (players < 8) setPlayers(prev => prev + 1);
  };

  const decrementPlayers = () => {
    if (players > 1) setPlayers(prev => prev - 1);
  };

  return (
    <div className="container">
      <img src={logo} alt="App Logo" className="logo" style={{ marginBottom: '40px' }} />
      <Typography 
        variant="h3" 
        gutterBottom 
        style={{ 
          fontFamily: 'Jua, sans-serif', 
          whiteSpace: 'pre-wrap', 
          marginBottom: '40px' 
        }}
      >
        {Array.from('게임을 즐기실 인원을 선택해주세요!').map((char, index) => (
          <span key={index} style={{ display: 'inline-block', '--i': index } as React.CSSProperties}>
            {char}
          </span>
        ))}
      </Typography>

      <div className="player-adjust" style={{ marginBottom: '40px' }}>
        <IconButton 
          onClick={decrementPlayers} 
          disabled={players === 1} 
          style={{ backgroundColor: 'black', color: 'white', width: '50px', height: '50px', marginRight: '20px' }}
        >
          <RemoveIcon style={{ fontSize: '30px' }} />
        </IconButton>
        
        <Typography 
          variant="h6" 
          style={{
            width: '50px', 
            textAlign: 'center', 
            lineHeight: '50px', 
            fontSize: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {players}
        </Typography>

        <IconButton 
          onClick={incrementPlayers} 
          disabled={players === 8} 
          style={{ backgroundColor: 'black', color: 'white', width: '50px', height: '50px', marginLeft: '20px' }}
        >
          <AddIcon style={{ fontSize: '30px' }} />
        </IconButton>
      </div>

      <Link to="/main">
        <Button 
          variant="contained" 
          style={{ 
            backgroundColor: '#CCF38C', 
            color: 'black', 
            marginTop: '20px', 
            fontFamily: 'Jolly Lodger, cursive',
            borderRadius: "10px",
            fontSize: "2rem", 
            padding: '1px 70px',
          }}
        >
          START
        </Button>
      </Link>
    </div>
  );
}

export default LobbyPage;
