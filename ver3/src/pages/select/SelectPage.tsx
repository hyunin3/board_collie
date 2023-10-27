import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Card, CardMedia } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import gameimg from '../../assets/splendor.png';
import yt_logo from '../../assets/yt_logo_rgb_light.png';

const SelectPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const validTitles = ['스플렌더', ];

  const goBack = () => {
    navigate(-1);
  };

  const handleGameImageClick = () => {
    // 게임 이름이 유효한지 확인
    if (name && validTitles.includes(name)) {
      navigate(`/tutorial/${encodeURIComponent(name)}`);
    } else {
      navigate('/notfound2');
    }
  };

  const handleYoutubeSearch = () => {
    const gameName = encodeURIComponent(name || "게임 이름 없음");
    window.open(`https://www.youtube.com/results?search_query=${gameName} 게임방법`, '_blank');
  };

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: '90px' }}>
      <IconButton onClick={goBack} aria-label="뒤로 가기" sx={{ alignSelf: 'flex-start', mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, mb: 2, mt: 20 }}>
      <Box component="button" onClick={handleGameImageClick} sx={{ border: 'none', padding: 0, background: 'none' }}>
    <Card sx={{ width: 300 }}>
      <CardMedia component="img" height="140" image={gameimg} alt={name} />
    </Card>
  </Box>
        <Box
          component="button"
          onClick={handleYoutubeSearch}
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'E9E9EB',
            borderRadius: '20px',
            padding: '8px 16px',
            border: '2px solid black',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'darkgrey',
            }
          }}
        >
          <img src={yt_logo} alt="YouTube Logo" style={{ height: '30px', marginRight: '10px', padding: '8px' }} />
          <Typography 
            variant="body2" 
            color="black"
            sx={{ fontSize: '1.5rem', fontFamily: 'Jua, sans-serif' }} 
            >
            에서 게임방법 검색
          </Typography>
        </Box>
      </Box>
      <Typography 
        variant="body1" 
        textAlign="center"
        sx={{ fontSize: '2rem', fontFamily: 'Jua, sans-serif' }} 
      >
        게임의 튜토리얼을 체험해보시거나 유튜브 영상을 감상하실 수 있습니다.
      </Typography>
    </Box>
  );
};

export default SelectPage;
