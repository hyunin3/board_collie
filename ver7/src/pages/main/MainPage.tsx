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
              게임 추천받기
              <img src={recommendLogo} alt="Recommend Game Logo" style={logoStyle} />
            </Paper>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/searchresult" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Paper elevation={3} style={boxStyle}>
              게임 검색하기
              <img src={searchLogo} alt="Search Game Logo" style={logoStyle} />
            </Paper>
          </Link>
        </Grid>
      </Grid>
    
    </div>
  );
};

export default MainPage;
