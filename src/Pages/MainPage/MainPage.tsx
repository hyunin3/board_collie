import React from 'react';
import recommendLogo from '../../assets/recommendLogo.png';
import searchLogo from '../../assets/searchLogo.png';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  const boxStyle: React.CSSProperties = {
    backgroundColor: '#CCF38C',
    padding: '20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1.5rem',
    textAlign: 'center',
    width: '30vw',
    height: '30vw',
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Jua, sans-serif'
  };

  const logoStyle: React.CSSProperties = {
    width: '80%',  
    height: '80%', 
    marginBottom: '20px'
  };

  return (
    <Grid container style={{ height: '100vh' }} justifyContent="center" alignItems="center" spacing={8}>
      <Grid item>
        <Paper elevation={3} style={boxStyle}>
          게임추천받기
          <img src={recommendLogo} alt="Recommend Game Logo" style={logoStyle} />
        </Paper>
      </Grid>
      <Grid item>
      <Link to="/searchresult">
        <Paper elevation={3} style={boxStyle}>
          게임검색하기
          <img src={searchLogo} alt="Search Game Logo" style={logoStyle} />
        </Paper>
      </Link>
      </Grid>
    </Grid>
  );
}

export default MainPage;
