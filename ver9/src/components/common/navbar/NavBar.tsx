/* eslint-disable */
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// router
import { Outlet, useNavigate } from 'react-router-dom';

// styles
import styled from 'styled-components';

// images
import iconLogo from '../../../assets/logo.png'

// import
import Timer from '../timer/Timer';

// icon
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew';

/**
 * NavBar
 *
 * @author 허주혁
 * @todo 
 */

// 상단 NavBar의 CSS
const NavBarContainer = styled.div`
    width: 100%;
    height: 12vh;

    position: fixed;
    top: 0;
    left: 0;

    background-color: #EDFFD0;
    color: black;

    // NabBar 내부의 레이아웃 조정
    display: flex;
    justify-content: space-between; // NavBar 내의 콘텐츠를 균등하게 분배하여 간격 생성
    align-items: center; // NavBar 내 항목들 수직 가운데 정렬

    padding: 0 0px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
    background-image: url(${iconLogo});
    background-size: contain;
    background-repeat: no-repeat;
    width: 7vw;  
    height: 11vh;
    padding: 0 1vw;
`;

const PlayersNumber = styled.div`
    padding: 0 1vw;
    font-size: 1.5rem;
    font-family: 'Jua', sans-serif;
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    // justify-content: center;
`;
const InnerWrapper = styled.div`
    height: 50%;
    width: 100%;
`;

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
`;

const ModalLogo = styled.div`
    background-image: url(${iconLogo});
    background-size: contain;
    background-repeat: no-repeat;
    width: 11vw;
    height: 15vh;
    margin: auto; // 가운데 정렬
    display: block;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

interface NavBarProps {
    players: number;
}


function NavBar({ players: initialPlayers } : NavBarProps) {

    const navigate = useNavigate();
    const [players, setPlayers] = useState(initialPlayers); 
    const [modalOpen, setModalOpen] = useState(false); 
    const [time, setTime] = useState(localStorage.getItem('time') || '00:00');

    const handleLogoClick = () => {
        navigate('/main');
    }

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    // 게임 종료 및 이용시간 POST
    const endGame = async () => {

        localStorage.removeItem('players');
        localStorage.removeItem('isActive');
        localStorage.removeItem('time');
        navigate('/');
    };
    const [playerSelectModalOpen, setPlayerSelectModalOpen] = useState(false);

  const handlePlayersNumberClick = () => {
    setPlayerSelectModalOpen(true);
  };

  const handlePlayerSelectModalClose = () => {
    setPlayerSelectModalOpen(false);
  };

  const incrementPlayers = () => {
    if (players < 8) setPlayers(prev => prev + 1);
  };
  
  const decrementPlayers = () => {
    if (players > 1) setPlayers(prev => prev - 1);
  };

    return (
        <>
            <Outlet />
            <NavBarContainer>
                <Logo onClick={handleLogoClick}/>
                <RightSection>
                    <ColumnWrapper>
                        <InnerWrapper><Timer /></InnerWrapper>
                        <InnerWrapper><PlayersNumber onClick={handlePlayersNumberClick}>{`플레이 인원 : ${players} 인`}</PlayersNumber></InnerWrapper>
                    </ColumnWrapper>
                    <PowerSettingsNew style={{ fontSize: 40, padding: '0 1vw' }} onClick={openModal} />
                    <Modal
                        open={modalOpen}
                        onClose={closeModal}
                    >
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

                </RightSection>
            </NavBarContainer>
        </>
    )
}

export default NavBar;