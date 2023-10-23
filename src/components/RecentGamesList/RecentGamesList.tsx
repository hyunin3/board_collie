import React, { useState, useEffect } from 'react';

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
    marginBottom: '10px', // 이 값을 조정하여 간격을 변경할 수 있습니다.
  };

  return (
    <ul style={listStyle}>
      {recentGames.map((gameName, index) => (
        <li key={index} style={listItemStyle}>{gameName}</li>
      ))}
    </ul>
  );
};

export default RecentGamesList;
