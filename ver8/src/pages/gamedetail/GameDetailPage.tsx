/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IconButton, Box, Divider, Typography, Chip, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import gameimg from '../../assets/splendor.png'
import gameQr from '../../assets/qr2.png';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { useSearch } from '../../contexts/SearchContext'

const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

type Game = {
  id: number;
  name: string;
  image: string | null;
  qrImage: string | null;
  minPlayer: number;
  maxPlayer: number;
  playTime: number;
  evaluation: string;
  tags: {
    id: number;
    name: string;
    description: string;
  }[];
  similarGames: SimilarGame[];
};

type SimilarGame = {
  gameId: number;
  gameTitleKor: string;
  gameImage: string | null;
};

type GameFromServer = {
  gameId: number;
  gameImage: string | null;
  qrImage: string | null;
  gameTitleKor: string;
  gameTitleEng: string;
  minPlayer: number;
  maxPlayer: number;
  playTime: number;
  gameEvaluation: string;
  tags: Array<{
    tagId: number;
    tagName: string;
    tagDescription: string;
  }>;
  similarGame: any[]; 
};

const transformData = (dataFromServer: GameFromServer): Game => {
  return {
    id: dataFromServer.gameId,
    name: dataFromServer.gameTitleKor,
    image: dataFromServer.gameImage,
    qrImage: dataFromServer.qrImage,
    minPlayer: dataFromServer.minPlayer,
    maxPlayer: dataFromServer.maxPlayer,
    playTime: dataFromServer.playTime,
    evaluation: dataFromServer.gameEvaluation,
    tags: dataFromServer.tags.map(tag => ({
      id: tag.tagId,
      name: tag.tagName,
      description: tag.tagDescription,
    })),
    similarGames: dataFromServer.similarGame.map(game => ({
      gameId: game.gameId,
      gameTitleKor: game.gameTitleKor,
      gameImage: game.gameImage
    })),
  };
};

const GameDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const gameId = parseInt(id ?? "0"); // useParams로 받은 id를 정수로 변환
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const { setSearchTag, setSearchType } = useSearch();
  const [open, setOpen] = useState(false);
  const [selectedTagDescription, setSelectedTagDescription] = useState("");
  const handleOpen = (tagName: string, tagDescription: string) => {
    setSelectedTagName(tagName);
    setSelectedTagDescription(tagDescription);
    setOpen(true);
  };
  
  const [selectedTagName, setSelectedTagName] = useState("");
  
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleViewThemeGames = () => {
    setSearchTag(selectedTagName);
    setSearchType('tag');
    navigate('/searchresult');
  };

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/game/detail/${gameId}`);
        if (response.data.success) {
          const transformedData = transformData(response.data.data);
          setGame(transformedData);
        }
      } catch (error) {
        console.error("게임 디테일 정보를 가져오는데 실패했습니다.", error);
      }
    };
    
    fetchGameDetail();
  }, [gameId]);
  
  const goBack = () => {
    setSearchTag('');
    navigate(-1);
  };
  
  // 재생버튼 클릭 시 선택페이지로 이동
  const handlePlayButtonClick = () => {
    if (game) {
      sessionStorage.setItem(`gameName-${game.id}`, game.name);
      navigate(`/select/${game.id}`);
    }
  };

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/game/detail/${gameId}`);
        if (response.data.success) {
          const transformedData = transformData(response.data.data);
          setGame(transformedData);
  
          // 여기서 로컬 스토리지에 게임 정보를 저장합니다.
          updateRecentGamesInLocalStorage(transformedData);
        }
      } catch (error) {
        console.error("게임 디테일 정보를 가져오는데 실패했습니다.", error);
      }
    };
    
    fetchGameDetail();
  }, [gameId]);
  
  const updateRecentGamesInLocalStorage = (gameData: Game) => {
    const recentGames = JSON.parse(localStorage.getItem('recentGames') || '[]');
    const newRecentGame = { id: gameData.id, name: gameData.name };
    // 중복 게임 제거
    const filteredRecentGames = recentGames.filter((game: Game) => game.id !== gameData.id);
    // 새로운 게임을 추가합니다.
    const newRecentGames = [newRecentGame, ...filteredRecentGames];
    // 로컬 스토리지를 업데이트합니다.
    localStorage.setItem('recentGames', JSON.stringify(newRecentGames));
  };

  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
    <Box sx={{ height: '80vh', padding: '20px', display: 'flex', flexDirection: 'row', marginTop: '100px' }}>
     <Box sx={{ flex: 2, marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <IconButton onClick={goBack} aria-label="뒤로 가기" sx={{ alignSelf: 'flex-start', mb: 2 }}>
    <ArrowBackIcon />
  </IconButton>
  <img 
  src={game?.image || gameimg} 
  alt={game?.name || '게임 이미지'} 
  style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '32px' }} 
/>
  <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Jua, sans-serif', textAlign: 'center', mb: 3 }}>
      {game?.name} 
    </Typography>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
  {game ? (
    <>
      <Chip label={`최소 인원: ${game.minPlayer}명`} sx={{ fontSize: '1rem', fontFamily: 'Jua, sans-serif', mb: 2 }} />
      <Chip label={`최대 인원: ${game.maxPlayer}명`} sx={{ fontSize: '1rem', fontFamily: 'Jua, sans-serif', mb: 2 }} />
      <Chip label={`플레이 시간: ${game.playTime}분`} sx={{ fontSize: '1rem', fontFamily: 'Jua, sans-serif', mb: 2 }} />
    </>
  ) : (
    <Typography style={{ fontFamily: 'Jua, sans-serif' }}>게임 정보를 찾을 수 없습니다.</Typography>
  )}
</Box>
  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
  <Box sx={{ textAlign: 'center' }}>
  <img 
  src={game?.qrImage || gameQr} 
  alt="QR 코드" 
  style={{ maxWidth: '100%', maxHeight: '180px' }} 
/>
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
          fontSize: 90, 
          color: '#A1F38C', 
        }}
      />
    </Box>
    <Typography textAlign="center" sx={{ fontSize: '2rem', fontFamily: 'Jolly Lodger, cursive', mt: 2 }}>Tutorial</Typography>
  </Box>
</Box>
</Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'start', pl: 5, mt: 3, overflowY: 'auto' }} className="hide-scrollbar">
      <Typography variant="h5" sx={{ fontFamily: 'Jua, sans-serif', mb: 3 }}>
        테마 및 진행방식
      </Typography>
        <div>
          {game ? (
            game.tags.map((tag) => (
              <Chip
              key={tag.id}
              label={tag.name}
              onClick={() => handleOpen(tag.name, tag.description)}
              sx={{ 
                backgroundColor: '#CCF38C', 
                mr: 1, 
                mb: 1, 
                fontFamily: 'Jua, sans-serif', 
                fontSize: '1.2rem', 
                height: '40px', // 칩의 높이 조정
                padding: '0 10px', // 내부 여백 조정
              }}
            />
            ))
            ) : (
          <Typography style={{ fontFamily: 'Jua, sans-serif' }}>태그 정보를 찾을 수 없습니다.</Typography>
             )}
          </div>
          
          <Typography variant="h5" sx={{ fontFamily: 'Jua, sans-serif', mb: 2.5, mt: 3 }}>
            게임평 요약
          </Typography>
            {game && (
          <Typography sx={{ fontSize: '1.25rem', fontFamily: 'YESGothic-Regular', mb: 3 }}>
            {game.evaluation}
          </Typography>
          )}

          <Typography variant="h5" sx={{ fontFamily: 'Jua, sans-serif', mb: 3 }}>
            유사한 다른 게임
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {game?.similarGames.map(similarGame => (
          <Box key={similarGame.gameId} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 1 }}>
            <Link to={`/game/${similarGame.gameId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img
              src={similarGame.gameImage || gameimg} 
              alt={similarGame.gameTitleKor}
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px' }}
              />
            </Link>
          <Typography sx={{ mt: 1, fontFamily: 'Jua, sans-serif', fontSize: '1.2rem' }}>
          <Link to={`/game/${similarGame.gameId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {similarGame.gameTitleKor}
          </Link>
          </Typography>
            </Box>
              ))}
            </Box>
        </Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontSize: '1.5rem', fontFamily: 'Jua, sans-serif' }}  >
           {selectedTagName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '1.1rem' }} >
            {selectedTagDescription}
          </Typography>
          <Button onClick={handleViewThemeGames} sx={{ marginLeft: '-7px' }}>해당 테마 게임 모아보기</Button>
        </Box>
      </Modal>
      </Box>
      </div>
      );
    }

export default GameDetailPage;
