import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconButton, Box, Divider, Typography, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import gameimg from '../../assets/splendor.png'
import gameQr from '../../assets/qr2.png';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface Game {
  name: string;
  tags: string[];
}
type GameFromServer = {
  game_id: number;
  game_title: string;
  game_tag: Array<{
    tag_id: number;
    tag_name_kor: string;
  }>;
};

const dummyDataFromServer: GameFromServer[] = [
  {
    game_id: 1,
    game_title: '스플렌더',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '2-4명' },
      { tag_id: 3, tag_name_kor: '45분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 2,
    game_title: '모노폴리',
    game_tag: [
      { tag_id: 1, tag_name_kor: '보통' },
      { tag_id: 2, tag_name_kor: '2-8명' },
      { tag_id: 3, tag_name_kor: '180분' },
      { tag_id: 4, tag_name_kor: '경영' }
    ]
  },
  {
    game_id: 3,
    game_title: '다빈치코드',
    game_tag: [
      { tag_id: 1, tag_name_kor: '쉬움' },
      { tag_id: 2, tag_name_kor: '2-4명' },
      { tag_id: 3, tag_name_kor: '20분' },
      { tag_id: 4, tag_name_kor: '추리' }
    ]
  },

  
];
const transformData = (dataFromServer: GameFromServer[]): Game[] => {
  return dataFromServer.map(game => ({
    id: game.game_id,
    name: game.game_title,
    tags: game.game_tag.map(tag => tag.tag_name_kor),
  }));
};

const dummyData = transformData(dummyDataFromServer);

const GameDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const game = dummyData.find(game => game.name === name);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'row', marginTop: '90px' }}>
     <Box sx={{ flex: 2, marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <IconButton onClick={goBack} aria-label="뒤로 가기" sx={{ alignSelf: 'flex-start', mb: 2 }}>
    <ArrowBackIcon />
  </IconButton>
  <img src={gameimg} alt={name} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '32px' }} />
  <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Jua, sans-serif', textAlign: 'center', mb: 3 }}>
    {name}
  </Typography>
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
    {game ? (
      game.tags.map(tag => (
        <Chip key={tag} label={tag} sx={{ fontFamily: 'Jua, sans-serif', mb: 2 }} />
      ))
    ) : (
      <Typography style={{ fontFamily: 'Jua, sans-serif' }}>게임 정보를 찾을 수 없습니다.</Typography>
    )}
  </Box>
  
  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
  <Box sx={{ textAlign: 'center' }}>
    <img src={gameQr} alt="QR 코드" style={{ maxWidth: '100%', maxHeight: '180px' }} />
    <Typography sx={{ fontSize: '2rem', fontFamily: 'Jolly Lodger, cursive' }}>Chat Bot</Typography>
  </Box>
  
  {/* 재생버튼과 튜토리얼 텍스트를 포함하는 부모 Box */}
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '20px' }}>
    {/* 연두색 박스와 재생 아이콘 */}
    <Box
      sx={{
        borderRadius: 7,
        backgroundColor: '#EDFFD0',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100px',
        height: '100px',
        position: 'relative',
      }}
    >
      <PlayArrowIcon
        sx={{
          fontSize: 90, // 아이콘의 크기
          color: '#A1F38C', // 아이콘의 색상
        }}
      />
    </Box>
    <Typography textAlign="center" sx={{ fontSize: '2rem', fontFamily: 'Jolly Lodger, cursive', mt: 2 }}>Tutorial</Typography>
  </Box>
</Box>



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
