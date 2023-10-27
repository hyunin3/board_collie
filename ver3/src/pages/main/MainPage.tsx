import React from 'react';
import recommendLogo from '../../assets/recommendLogo.png';
import searchLogo from '../../assets/searchLogo.png';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import mainQr from '../../assets/qr 1.png';
import Fab from '@mui/material/Fab';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

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

  const qrContainerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    width: '100px',
    height: '100px',
    borderRadius: '50%', // 원 형태로 만들기
    backgroundColor: '#CCF38C', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  };

  const textStyle: React.CSSProperties = {
    fontFamily: 'Jolly Lodger, cursive',
    textAlign: 'center',
    color: '#333',
    fontSize: '2.5rem',
    marginTop: '10px',
  };

  const fabStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 16,
    right: 16,
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
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', textAlign: 'center' }}>
        <div style={qrContainerStyle}>
          <img src={mainQr} alt="QR Code" style={{ width: '80%', height: '80%' }} />
        </div>
        <p style={textStyle}>chat bot</p>
      </div>

      <Link to="/roulettegame" style={{ textDecoration: 'none' }}>
        <Fab color="primary" aria-label="룰렛 페이지로 이동" style={fabStyle}>
          <VideogameAssetIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default MainPage;
