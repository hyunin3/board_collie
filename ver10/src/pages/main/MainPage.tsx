import React from 'react';
import recommendLogo from '../../assets/recommendLogo.png';
import searchLogo from '../../assets/searchLogo.png';
import Grid from '@mui/material/Grid';
import {Paper, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage: React.FC = () => {
  const boxStyle: React.CSSProperties = {
    backgroundColor: '#CCF38C',
    padding: '20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '2.5rem',
    textAlign: 'center',
    width: '30vw',
    height: '30vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Jua, sans-serif',
  };

  const logoStyle: React.CSSProperties = {
    width: '80%',
    height: '80%',
    marginBottom: '20px',
  };


  return (
    <div>
      <Grid container style={{ height: '110vh' }} justifyContent="center" alignItems="center" spacing={16}>
        <Grid item>
          <Link to="/gamerecommend" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Paper elevation={3} style={boxStyle}>
            <Typography  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Jua, sans-serif', fontSize: '2.5rem',}}>
              {Array.from('게임 추천받기').map((char, index) => (
              <span key={index} style={{ '--i': index } as React.CSSProperties} className="animated-letter">
                {char}
              </span>
                ))}
            </Typography>

              <img src={recommendLogo} alt="Recommend Game Logo" style={logoStyle} className="logo-animate"/>
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/searchresult" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Paper elevation={3} style={boxStyle}>
            <Typography  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Jua, sans-serif', fontSize: '2.5rem',}}>
              {Array.from('게임 검색하기').map((char, index) => (
              <span key={index} style={{ '--i': index } as React.CSSProperties} className="animated-letter">
                {char}
              </span>
                ))}
            </Typography>
              <img src={searchLogo} alt="Search Game Logo" style={logoStyle} className="logo-animate"/>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    
    </div>
  );
};

export default MainPage;
