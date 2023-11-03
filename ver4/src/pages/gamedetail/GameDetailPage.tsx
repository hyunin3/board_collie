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
    <Box sx={{ height: '100vh', overflow: 'hidden',  padding: '20px', display: 'flex', flexDirection: 'row', marginTop: '90px' }}>
     <Box sx={{ flex: 2, marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <IconButton onClick={goBack} aria-label="뒤로 가기" sx={{ alignSelf: 'flex-start', mb: 2 }}>
    <ArrowBackIcon />
  </IconButton>
  <img src={gameimg} alt={gameimg} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '32px' }} />
  <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Jua, sans-serif', textAlign: 'center', mb: 3 }}>
      {game?.name} 
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
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
      <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'start', pl: 5, mt: 3, maxHeight: '100vh', overflowY: 'auto' }} className="hide-scrollbar">
          <Typography variant="h5" sx={{ fontFamily: 'Jua, sans-serif', mb: 3 }}>
            테마 및 진행방식
          </Typography>
          <p>스플렌더는 고객들로부터 높은 평가를 받고 있습니다. 이 게임은 전략적인 생각이 필요하며 직관적인 룰로 이해하기에 쉽다는 점을 긍정적으로 평가 받고 있습니다. 또한, 높은 재현성으로 매번 다른 플레이를 경험할 수 있어 재미를 더하고 있습니다. 사용자들은 양질의 게임 요소와 매력적인 아트워크로 꾸며진 게임 보드를 특히 칭찬하고 있습니다. 플레이 시간이 30분 내외로 짧으며 따라서 바쁜 현대인들의 라이프 스타일에 적합합니다. 아무래도 복잡성을 줄이면서도 전략적인 깊이를 유지하는 밸런스가 훌륭하기 때문에 스플렌더는 가족 및 친구와 함께 즐기기에 이상적인 게임으로 손꼽힙니다.</p>
          <Typography variant="h5" sx={{ fontFamily: 'Jua, sans-serif', mb: 2.5, mt: 3 }}>
            게임평 요약
          </Typography>
          <p>스플렌더는 고객들로부터 높은 평가를 받고 있습니다. 이 게임은 전략적인 생각이 필요하며 직관적인 룰로 이해하기에 쉽다는 점을 긍정적으로 평가 받고 있습니다. 또한, 높은 재현성으로 매번 다른 플레이를 경험할 수 있어 재미를 더하고 있습니다. 사용자들은 양질의 게임 요소와 매력적인 아트워크로 꾸며진 게임 보드를 특히 칭찬하고 있습니다. 플레이 시간이 30분 내외로 짧으며 따라서 바쁜 현대인들의 라이프 스타일에 적합합니다. 아무래도 복잡성을 줄이면서도 전략적인 깊이를 유지하는 밸런스가 훌륭하기 때문에 스플렌더는 가족 및 친구와 함께 즐기기에 이상적인 게임으로 손꼽힙니다.</p>
          <Typography variant="h5" sx={{ fontFamily: 'Jua, sans-serif' }}>
            유사한 다른 게임
          </Typography>
          <p>스플렌더는 고객들로부터 높은 평가를 받고 있습니다. 이 게임은 전략적인 생각이 필요하며 직관적인 룰로 이해하기에 쉽다는 점을 긍정적으로 평가 받고 있습니다. 또한, 높은 재현성으로 매번 다른 플레이를 경험할 수 있어 재미를 더하고 있습니다. 사용자들은 양질의 게임 요소와 매력적인 아트워크로 꾸며진 게임 보드를 특히 칭찬하고 있습니다. 플레이 시간이 30분 내외로 짧으며 따라서 바쁜 현대인들의 라이프 스타일에 적합합니다. 아무래도 복잡성을 줄이면서도 전략적인 깊이를 유지하는 밸런스가 훌륭하기 때문에 스플렌더는 가족 및 친구와 함께 즐기기에 이상적인 게임으로 손꼽힙니다.</p>
          <p>스플렌더는 고객들로부터 높은 평가를 받고 있습니다. 이 게임은 전략적인 생각이 필요하며 직관적인 룰로 이해하기에 쉽다는 점을 긍정적으로 평가 받고 있습니다. 또한, 높은 재현성으로 매번 다른 플레이를 경험할 수 있어 재미를 더하고 있습니다. 사용자들은 양질의 게임 요소와 매력적인 아트워크로 꾸며진 게임 보드를 특히 칭찬하고 있습니다. 플레이 시간이 30분 내외로 짧으며 따라서 바쁜 현대인들의 라이프 스타일에 적합합니다. 아무래도 복잡성을 줄이면서도 전략적인 깊이를 유지하는 밸런스가 훌륭하기 때문에 스플렌더는 가족 및 친구와 함께 즐기기에 이상적인 게임으로 손꼽힙니다.</p>
          <p>스플렌더는 고객들로부터 높은 평가를 받고 있습니다. 이 게임은 전략적인 생각이 필요하며 직관적인 룰로 이해하기에 쉽다는 점을 긍정적으로 평가 받고 있습니다. 또한, 높은 재현성으로 매번 다른 플레이를 경험할 수 있어 재미를 더하고 있습니다. 사용자들은 양질의 게임 요소와 매력적인 아트워크로 꾸며진 게임 보드를 특히 칭찬하고 있습니다. 플레이 시간이 30분 내외로 짧으며 따라서 바쁜 현대인들의 라이프 스타일에 적합합니다. 아무래도 복잡성을 줄이면서도 전략적인 깊이를 유지하는 밸런스가 훌륭하기 때문에 스플렌더는 가족 및 친구와 함께 즐기기에 이상적인 게임으로 손꼽힙니다.</p>
        </Box>
      </Box>
      );
    }

export default GameDetailPage;
