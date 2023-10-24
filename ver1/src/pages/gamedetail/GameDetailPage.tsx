import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconButton, Box, Divider, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


interface Game {
  name: string;
  tags: string[];
}

const dummyData: Game[] = [
  {
    name: '반지의 제왕',
    tags: ['어려움', '4명', '1시간', '판타지']
  },
  {
    name: '모노폴리',
    tags: ['보통', '2-6명', '2시간', '전략']
  },
  {
    name: '해리포터',
    tags: ['쉬움', '4명', '30분', '판타지']
  },
  {
    name: '델토라 퀘스트',
    tags: ['어려움', '2-4명', '1시간', '판타지']
  },
  {
    name: '카탄의 개척자들',
    tags: ['보통', '3-4명', '1시간', '전략']
  },
  {
    name: '카드게임 UNO',
    tags: ['쉬움', '2-10명', '30분', '가족']
  },
  {
    name: '코끼리 공주',
    tags: ['쉬움', '2-5명', '20분', '어린이']
  },
  {
    name: '독립 경제학자',
    tags: ['어려움', '3-5명', '2시간', '전략']
  },
  {
    name: '바둑',
    tags: ['어려움', '2명', '1-2시간', '전략']
  },
  {
    name: '체스',
    tags: ['보통', '2명', '1시간', '전략']
  }
];

const GameDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const game = dummyData.find(game => game.name === name);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ flex: 2, marginRight: '20px' }}>
        <IconButton onClick={goBack} aria-label="뒤로 가기">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom style={{ fontFamily: 'Jua, sans-serif' }}>
          {name}
        </Typography>
        {game ? (
          <ul>
            {game.tags.map(tag => (
              <li key={tag} style={{ fontFamily: 'Jua, sans-serif' }}>{tag}</li>
            ))}
          </ul>
        ) : (
          <Typography style={{ fontFamily: 'Jua, sans-serif' }}>게임 정보를 찾을 수 없습니다.</Typography>
        )}
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'start', pl: 14 }}>
          <Typography variant="h5" sx={{ fontFamily: 'Jua, sans-serif', mb: 15 }}>
            테마 및 진행방식
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: 'Jua, sans-serif', mb: 15 }}>
            게임별 요약
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: 'Jua, sans-serif' }}>
            유사한 다른 게임
          </Typography>
        </Box>
      </Box>
      );
    }

export default GameDetailPage;
