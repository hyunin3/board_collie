import React, { useState, CSSProperties, useEffect } from 'react';
import { TextField, Grid, Button, Modal, FormControl, Select, MenuItem, InputAdornment, Typography, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import iconLogo from '../../assets/logo.png'
import styled from 'styled-components';
import { SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Props {
  onSearch: (query: string) => void;
  searchType: string;
  setSearchType: (type: string) => void; 
  style?: CSSProperties; 
  currentQuery: string;
  initialPlayers?: number;
}

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 30vh;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Jua', sans-serif;
  letter-spacing: 0.05em;
`;

const ModalLogo = styled.div`
  background-image: url(${iconLogo});
  background-size: contain;
  background-repeat: no-repeat;
  width: 11vw;
  height: 15vh;
  margin: auto;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const SearchBar: React.FC<Props> = ({ onSearch, searchType, setSearchType, style, currentQuery }) => {
  const [inputValue, setInputValue] = useState(currentQuery);
  const [isFocused, setIsFocused] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as string);
  };
  const initialPlayerCount = parseInt(localStorage.getItem('players') || '1');
  const [players, setPlayers] = useState<number>(initialPlayerCount);
  

  const handleSearchClick = () => { 
    onSearch(inputValue);
    // setInputValue('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/main');
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const endGame = () => {
    navigate('/');
  };

  useEffect(() => {
    setInputValue(currentQuery); // 현재 검색어로 상태를 업데이트
  }, [currentQuery]);

  useEffect(() => {
    localStorage.setItem('players', players.toString());
  }, [players]);

const [playerSelectModalOpen, setPlayerSelectModalOpen] = useState(false);

const handlePlayersNumberClick = () => {
  setPlayerSelectModalOpen(true);
};

const handlePlayerSelectModalClose = () => {
  setPlayerSelectModalOpen(false);
};

const incrementPlayers = () => {
  if (players < 8) setPlayers(players + 1);
};

const decrementPlayers = () => {
  if (players > 1) setPlayers(players - 1);
};

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2} style={{ marginTop: '15px', ...style }}>
      <div
        onClick={handleLogoClick}
        style={{
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '110px', 
          height: '100px', 
          cursor: 'pointer',
          opacity: 0,
        }}
      />
      <Grid item xs={6}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="제목 또는 태그를 입력해주세요!"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FormControl variant="outlined" style={{ marginRight: '10px' }}>
                <Select
                  value={searchType}
                  onChange={handleSearchTypeChange}
                  displayEmpty
                >
                  <MenuItem value="title">제목</MenuItem>
                  <MenuItem value="tag">태그</MenuItem>
                </Select>
              </FormControl>
            </InputAdornment>
          ),
          endAdornment: <SearchIcon style={{ marginRight: '10px' }} />,
          sx: {
            height: '6vh',
            borderRadius: '30px',
            backgroundColor: isFocused ? 'white' : '#e7e7e7',
            fontFamily: 'Jua, sans-serif',
          },
        }}
        style={{ position: 'relative', zIndex: 1000 }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: 'none',
            height: '6vh',
          },
        }}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      />
    </Grid>
      <Grid item xs={2}>
      <Button 
          variant="contained" 
          onClick={handleSearchClick}
          sx={{
            borderRadius: '15px', 
            backgroundColor: '#FDCD51',
            fontFamily: 'Jua, sans-serif',
            paddingX: '30px',
            color: 'black',
          }}
          style={{ position: 'relative', zIndex: 1000 }}
        >
          검색
        </Button>
      </Grid>
      <div
  onClick={handlePlayersNumberClick}
  style={{
    position: 'absolute', 
    right: '80px',
    height: '50px',
    width: '150px',
    cursor: 'pointer',
  }}
/>
      <div
        onClick={openModal}
        style={{
          position: 'absolute', 
          right: 0, 
          height: '100px',
          width: '70px', // 또는 원하는 너비
          cursor: 'pointer',
          opacity: 0, 
        }}
      />
        <Modal open={modalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalLogo />
          <h2>이용을 종료하시겠습니까?</h2>
          <ButtonWrapper>
            <Button onClick={endGame} sx={{fontFamily: 'Jua, sans-serif', fontSize: '1.3rem'}}>예</Button>
            <Button onClick={closeModal}sx={{fontFamily: 'Jua, sans-serif', fontSize: '1.3rem'}}>아니오</Button>   
          </ButtonWrapper>
        </ModalContent>
      </Modal>
      <Modal
  open={playerSelectModalOpen}
  onClose={handlePlayerSelectModalClose}
>
  <ModalContent>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <IconButton 
          onClick={decrementPlayers} 
          disabled={players === 1} 
          style={{ backgroundColor: 'black', color: 'white', width: '50px', height: '50px', marginRight: '20px' }}
        >
          <RemoveIcon />
        </IconButton>
        <Typography 
          style={{
            minWidth: '50px', 
            textAlign: 'center', 
            lineHeight: '50px', 
            fontSize: '30px',
            margin: '0 20px',
          }}
        >
          {players} 인
        </Typography>
        <IconButton 
          onClick={incrementPlayers} 
          disabled={players === 8} 
          style={{ backgroundColor: 'black', color: 'white', width: '50px', height: '50px', marginLeft: '20px' }}
        >
          <AddIcon />
        </IconButton>
      </div>
      <Button 
        onClick={handlePlayerSelectModalClose}
        style={{
          backgroundColor: '#CCF38C', 
          color: 'black', 
          fontFamily: 'Jua, sans-serif', 
          fontSize: '1.3rem'
        }}
      >
        확인
      </Button>
    </div>
  </ModalContent>
</Modal>

    </Grid>
  );
};

export default SearchBar;
