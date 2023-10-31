import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type RecentGame = {
  id: number;
  name: string;
};

const RecentGamesList: React.FC = () => {
  const [recentGames, setRecentGames] = useState<RecentGame[]>([]);

  useEffect(() => {
    const loadedRecentGames = JSON.parse(localStorage.getItem('recentGames') || '[]');
    setRecentGames(loadedRecentGames);
  }, []);

  const handleRemoveGame = (gameId: number) => {
    const updatedRecentGames = recentGames.filter(game => game.id !== gameId);
    localStorage.setItem('recentGames', JSON.stringify(updatedRecentGames));
    setRecentGames(updatedRecentGames);
  };

  const listStyle: React.CSSProperties = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  };

  const listItemStyle: React.CSSProperties = {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px', 
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <ul style={listStyle}>
      {recentGames.map((game) => (
        <li key={game.id} style={listItemStyle}>
          <Link to={`/game/${game.id}`} style={linkStyle}>
            {game.name}
          </Link>
          <IconButton size="small" onClick={() => handleRemoveGame(game.id)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </li>
      ))}
    </ul>
  );
};

export default RecentGamesList;
