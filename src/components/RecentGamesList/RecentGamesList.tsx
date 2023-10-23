import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const RecentGamesList: React.FC = () => {
  const [recentGames, setRecentGames] = useState<string[]>([]);

  useEffect(() => {
    const loadedRecentGames = JSON.parse(localStorage.getItem('recentGames') || '[]');
    setRecentGames(loadedRecentGames);
  }, []);

  const handleRemoveGame = (gameName: string) => {
    const updatedRecentGames = recentGames.filter(name => name !== gameName);
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
    justifyContent: 'space-between',
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <ul style={listStyle}>
      {recentGames.map((gameName, index) => (
        <li key={index} style={listItemStyle}>
          <Link to={`/game/${gameName}`} style={linkStyle}>
            {gameName}
          </Link>
          <IconButton size="small" onClick={() => handleRemoveGame(gameName)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </li>
      ))}
    </ul>
  );
};

export default RecentGamesList;
