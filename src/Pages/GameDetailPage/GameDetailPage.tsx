import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

const GameDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();


  const goBack = () => {
    navigate(-1);
  };

  // 여기에 게임 데이터를 검색하는 로직을 추가하세요
  // 예: const game = dummyData.find(game => game.name === name);

  return (
    <div>
      <IconButton onClick={goBack} aria-label="뒤로 가기">
        <ArrowBackIcon />
      </IconButton>
      <h1>{name}</h1>
      {/* 여기에 게임의 상세 정보를 표시하는 코드를 추가하세요 */}
      {/* 예:
      <ul>
        {game?.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      */}
    </div>
  );
}

export default GameDetailPage;
