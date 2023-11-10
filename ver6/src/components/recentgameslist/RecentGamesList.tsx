import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

type RecentGame = {
  id: number;
  name: string;
  image?: string;
};

const RecentGamesList: React.FC = () => {
  const [recentGames, setRecentGames] = useState<RecentGame[]>([]);

   // 게임의 세부 정보를 가져오는 함수
   const fetchGameDetails = async (gameId: number) => {
    try {
      const response = await axios.get(`${SERVER_API_URL}/game/detail/${gameId}`);
      if (response.data.success) {
        return response.data.data.gameImage;
      }
    } catch (error) {
      console.error("게임 디테일 정보를 가져오는데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    const loadRecentGames = async () => {
      const loadedRecentGames = JSON.parse(localStorage.getItem('recentGames') || '[]');
      const gamesWithImages = await Promise.all(loadedRecentGames.map(async (game: RecentGame) => {
        const image = await fetchGameDetails(game.id);
        return { ...game, image };
      }));
      setRecentGames(gamesWithImages);
    };

    loadRecentGames();
  }, []);


  const handleRemoveGame = (gameId: number) => {
    const updatedRecentGames = recentGames.filter(game => game.id !== gameId);
    localStorage.setItem('recentGames', JSON.stringify(updatedRecentGames));
    setRecentGames(updatedRecentGames);
  };

  

  const listItemStyle: React.CSSProperties = {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px', 
  };

  const gameInfoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // 너비를 100%로 설정하여 부모 요소 전체를 사용
    gap: '10px'
  };

  return (
    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
    {recentGames.map((game) => (
      <li key={game.id} style={listItemStyle}>
        <Link to={`/game/${game.id}`} style={{ textDecoration: 'none' }}>
          {game.image && (
            <img src={game.image} alt={game.name} style={{ width: '100px', height: '100px' }} />
          )}
        </Link>
        <div style={gameInfoStyle}>
          <Link to={`/game/${game.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {game.name}
          </Link>
          <IconButton size="small" onClick={() => handleRemoveGame(game.id)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </li>
    ))}
  </ul>
  );
};

export default RecentGamesList;
