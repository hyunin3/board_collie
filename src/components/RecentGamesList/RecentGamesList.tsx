import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecentGamesList: React.FC = () => {
  const [recentGames, setRecentGames] = useState<string[]>([]);

  useEffect(() => {
    const loadedRecentGames = JSON.parse(localStorage.getItem('recentGames') || '[]');
    setRecentGames(loadedRecentGames);
  }, []);

  const listStyle: React.CSSProperties = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  };

  const listItemStyle: React.CSSProperties = {
    marginBottom: '10px',
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
        </li>
      ))}
    </ul>
  );
};

export default RecentGamesList;
