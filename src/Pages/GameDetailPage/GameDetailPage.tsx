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
  

  // 게임 정보를 불러오는 로직이 여기에 들어갑니다.
  // 예를 들어, 상태를 사용하여 선택된 게임의 상세 정보를 저장하고 표시할 수 있습니다.

  return (
    <div>
      <IconButton onClick={goBack} aria-label="뒤로 가기">
        <ArrowBackIcon />
      </IconButton>
      <h1>{name}</h1>
      {/* 게임의 상세 정보를 여기에 표시합니다. */}
      
    </div>
  );
};

export default GameDetailPage;
