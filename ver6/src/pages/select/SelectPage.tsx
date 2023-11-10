import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import yt_logo from '../../assets/yt_logo_rgb_light.png';
import styled from 'styled-components';

const StyledH1 = styled.h1`
@font-face {
  font-family: 'YClover-Bold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/YClover-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}
margin: 0;
font-size: 7em;
padding: 0;
color: #7fe800;
text-shadow: 0 0.1em 20px rgba(0, 0, 0, 1), 0.05em -0.03em 0 rgba(0, 0, 0, 1),
  0.05em 0.005em 0 rgba(0, 0, 0, 1), 0em 0.08em 0 rgba(0, 0, 0, 1),
  0.05em 0.08em 0 rgba(0, 0, 0, 1), 0px -0.03em 0 rgba(0, 0, 0, 1),
  -0.03em -0.03em 0 rgba(0, 0, 0, 1), -0.03em 0.08em 0 rgba(0, 0, 0, 1), -0.03em 0 0 rgba(0, 0, 0, 1);
font-family: 'YClover-Bold', cursive;

span {
  transform: scale(0.9);
  display: inline-block;
  animation-name: bop;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

span:first-child {
  animation-delay: 0s;
}

span:last-child {
  animation-name: bopB;
  animation-delay: 0.2s;
}

@keyframes bop {
  0% { transform: scale(0.9); }
  50%, 100% { transform: scale(1); }
}

@keyframes bopB {
  0% { transform: scale(0.9); }
  80%, 100% { transform: scale(1) rotateZ(-3deg); }
}
`;

const SelectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const validIds = [72, 27]; // 유효한 ID 목록
  const gameName = sessionStorage.getItem(`gameName-${id}`) || '게임 이름';

  const goBack = () => {
    navigate(-1);
  };

  const handleGameImageClick = () => {
    // id가 undefined인 경우를 처리
    if (!id) {
      navigate('/notfound2');
      return;
    }

    // 게임 ID가 유효한지 확인
    if (validIds.includes(parseInt(id))) {
      navigate(`/tutorial/${id}`); // ID를 URL 경로에 사용
    } else {
      navigate('/notfound2');
    }
  };

  const handleYoutubeSearch = () => {
    const encodedGameName = encodeURIComponent(gameName);
    window.open(`https://www.youtube.com/results?search_query=${encodedGameName} 게임방법`, '_blank');
  };

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: '90px' }}>
      <IconButton onClick={goBack} aria-label="뒤로 가기" sx={{ alignSelf: 'flex-start', mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      
      <Typography variant="h2" sx={{ mb: 2, mt: 2, fontWeight: 'bold', fontFamily: 'Jua, sans-serif' }}>
        {gameName || '게임 이름'}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, mb: 10, mt: 15 }}>
      <Box component="button" onClick={handleGameImageClick} sx={{ border: 'none', padding: 0, background: 'none' }}>
     <StyledH1>
      <span>T</span>
      <span>u</span>
      <span>t</span>
      <span>o</span>
      <span>r</span>
      <span>i</span>
      <span>a</span>
      <span>l</span>
    </StyledH1>
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
