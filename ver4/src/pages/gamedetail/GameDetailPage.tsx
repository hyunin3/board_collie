import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconButton, Box, Divider, Typography, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import gameimg from '../../assets/splendor.png'
import gameQr from '../../assets/qr2.png';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

type Game = {
  name: string;
  tags: string[];
  id: number;
};
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
  {
    game_id: 4,
    game_title: '장미전쟁',
    game_tag: [
      { tag_id: 1, tag_name_kor: '보통' },
      { tag_id: 2, tag_name_kor: '2명' },
      { tag_id: 3, tag_name_kor: '25분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 5,
    game_title: '센추리: 향신료의 길',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '2-5명' },
      { tag_id: 3, tag_name_kor: '40분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 6,
    game_title: '마헤',
    game_tag: [
      { tag_id: 1, tag_name_kor: '보통' },
      { tag_id: 2, tag_name_kor: '4-7명' },
      { tag_id: 3, tag_name_kor: '30분' },
      { tag_id: 4, tag_name_kor: '경주' }
    ]
  },
  {
    game_id: 7,
    game_title: '부루마불',
    game_tag: [
      { tag_id: 1, tag_name_kor: '보통' },
      { tag_id: 2, tag_name_kor: '2-4명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '경영' }
    ]
  },
  {
    game_id: 8,
    game_title: '테라포밍마스',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '2-5명' },
      { tag_id: 3, tag_name_kor: '120분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 9,
    game_title: '인코그니토',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '4명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '추리' }
    ]
  },
  {
    game_id: 10,
    game_title: '시타델',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '4-7명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 11,
    game_title: '제왕의 깃발',
    game_tag: [
      { tag_id: 1, tag_name_kor: '보통' },
      { tag_id: 2, tag_name_kor: '3-4명' },
      { tag_id: 3, tag_name_kor: '20분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 12,
    game_title: '마피아 데 쿠바',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '6-12명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 13,
    game_title: '아발론',
    game_tag: [
      { tag_id: 1, tag_name_kor: '쉬움' },
      { tag_id: 2, tag_name_kor: '2명' },
      { tag_id: 3, tag_name_kor: '20분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 14,
    game_title: '루미큐브',
    game_tag: [
      { tag_id: 1, tag_name_kor: '보통' },
      { tag_id: 2, tag_name_kor: '2-6명' },
      { tag_id: 3, tag_name_kor: '30분' },
      { tag_id: 4, tag_name_kor: '타일조합' }
    ]
  },
  {
    game_id: 15,
    game_title: '로스트시티',
    game_tag: [
      { tag_id: 1, tag_name_kor: '보통' },
      { tag_id: 2, tag_name_kor: '2명' },
      { tag_id: 3, tag_name_kor: '20분' },
      { tag_id: 4, tag_name_kor: '전략' }
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
  const { id } = useParams<{ id: string }>();
  const gameId = parseInt(id ?? "0"); // useParams로 받은 id를 정수로 변환
  const navigate = useNavigate();
  const game = dummyData.find(game => game.id === gameId);

  const goBack = () => {
    navigate(-1);
  };
  
  // 재생버튼 클릭 시 선택페이지로 이동
  const handlePlayButtonClick = () => {
    if (game) {
      sessionStorage.setItem(`gameName-${game.id}`, game.name);
      navigate(`/select/${game.id}`);
    }
  };
  

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'row', marginTop: '90px' }}>
     <Box sx={{ flex: 2, marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <IconButton onClick={goBack} aria-label="뒤로 가기" sx={{ alignSelf: 'flex-start', mb: 2 }}>
    <ArrowBackIcon />
  </IconButton>
  <img src={gameimg} alt={gameimg} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '32px' }} />
  <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Jua, sans-serif', textAlign: 'center', mb: 3 }}>
      {game?.name} 
    </Typography>
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
    {game ? (
      game.tags.map(tag => (
        <Chip key={tag} label={tag} sx={{ fontSize: '1rem',fontFamily: 'Jua, sans-serif', mb: 2 }} />
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
      onClick={handlePlayButtonClick}
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
      <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'start', pl: 14, mt: 7 }}>
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
