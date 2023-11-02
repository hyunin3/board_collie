import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, SxProps } from '@mui/material';
import notfound_img from '../../../assets/notfound.png';

const NotFound: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log('아직 튜토리얼이 준비 중입니다. 이전 화면으로 돌아갑니다.');
      setIsLoading(true);
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    if (isLoading) {
      navigate(-1);
    }
  }, [isLoading, navigate]);

  const containerStyle: SxProps = {
    width: '100%',
    height: '100vh', 
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
  };

  const imageStyle: SxProps = {
    width: '30vw', 
    height: '30vw', 
    borderRadius: '50%', 
    mb: 2, 
  };

  return (
    <Grid container sx={containerStyle}>
      <Box component="img" src={notfound_img} alt="Not Found" sx={imageStyle} />
      <Typography sx={{ fontSize: '2.5rem', textAlign: 'center', fontFamily: 'Jua' }}>
        아직 준비 중이예요 ㅠㅠ
        <br />
        이전 화면으로 돌아갑니다.
      </Typography>
    </Grid>
  );
};

export default NotFound;
