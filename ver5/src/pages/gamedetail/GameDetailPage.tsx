import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconButton, Box, Divider, Typography, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import gameimg from '../../assets/splendor.png'
import gameQr from '../../assets/qr2.png';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';
import Modal from '@mui/material/Modal';

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
  similarGame: any[]; // 여기서 'any'를 필요에 따라 적절한 타입으로 바꿔야 합니다.
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
  };
};

const GameDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const gameId = parseInt(id ?? "0"); // useParams로 받은 id를 정수로 변환
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);

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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
      <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'start', pl: 10, mt: 7 }}>
      
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
              sx={{ backgroundColor: '#CCF38C', mr: 1, mb: 1 }}
            />
            
            ))
            ) : (
          <Typography style={{ fontFamily: 'Jua, sans-serif' }}>태그 정보를 찾을 수 없습니다.</Typography>
             )}
          </div>
          
          <Typography variant="h5" sx={{ fontFamily: 'Jua, sans-serif', mb: 3, mt: 3 }}>
            게임평 요약
          </Typography>
            {game && (
          <Typography sx={{ fontFamily: 'Jua, sans-serif', mb: 4 }}>
            {game.evaluation}
          </Typography>
          )}

          <Typography variant="h5" sx={{ fontFamily: 'Jua, sans-serif' }}>
            유사한 다른 게임
          </Typography>
        </Box>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           {selectedTagName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedTagDescription}
          </Typography>
        </Box>
      </Modal>

      </Box>
      );
    }

export default GameDetailPage;
