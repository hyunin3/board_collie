import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Modal, Button } from '@mui/material';

import ID27 from './games/ID27';
import ID72 from "./games/ID72";


/* 스타일 */
const TutorialContainer = styled.div`
    position: relative;

    /* 컨테이너 크기 조정 */
    width: 100vw;
    height: 100vh;

    /* 문자열 내 줄바꿈(\n) 적용 */
    white-space: pre-wrap;

    /* 배경 사진 */
    background-size: cover;
    background-position: center;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Jua', sans-serif;
`;
const BackgroundLayer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.3);
`;
const BackButton = styled.div`
    position: absolute;
    top: 3vh;
    left: 3vw;
    font-size: 2vw;
    color: #F7EEF6;
    z-index: 9999;
`;
const MainContent = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
`;
const modalStyle = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    height: '20%',
    bgcolor: '#FFFFFF',
    pt: 3,
    px: 4,
    pb: 3,
    borderRadius: '8px'
};
const BackModalMessage = styled.h2`
    display: flex;
    justify-content: center;
    font-size: 2vw;
    letter-spacing: 0.05em;
    font-family: 'Jua', sans-serif;
`;
const BackModalButton = styled.div`
    display: flex;
    justify-content: space-between;
`;
const BackModalButtonStyle = {
    fontSize: '1.5vw',
    fontFamily: 'Jua, sans-serif'
};
const MuteButton = styled.div`
    position: absolute;
    z-index: 9999;
    top: 3vh;
    right: 3vw;
    font-size: 3vw;
`;

/* 튜토리얼 나가기 */
function exitTutorial() {
    // 어느 단계에서 많이 나갔는지 통계 필요
    window.history.back();
}

function TutorialPage() {

    const players = localStorage.getItem('players');

    const params = useParams();

    /* 배경 사진 관련 */
    const [backgroundImage, setBackgroundImage] = useState('');

    /* 배경 음악 관련 */
    const [bgmIsPlaying, setBgmIsPlaying] = useState('wait');
    function bgmOn() {
        setBgmIsPlaying('on');
    }
    function bgmOff() {
        setBgmIsPlaying('off');
    }

    /* 돌아가기 버튼 모달 관련 */
    const [backModalOpen, setBackModalOpen] = useState(false);
    const handleBackModalOpen = () => {
        setBackModalOpen(true);
    };
    const handleBackModalClose = () => {
        setBackModalOpen(false);
    };

    // 로컬 스토리지 타이머 계속 가게 설정
    const [time, setTime] = useState(Number(localStorage.getItem('time')) || 0);
    useEffect(() => {
        const timer = setInterval(() => {
          setTime(prevTime => prevTime + 1); // time 값을 1 증가
        }, 1000); // 1초에 한 번씩 실행
    
        return () => {
          clearInterval(timer); // 컴포넌트 unmount시 타이머 해제
          localStorage.setItem('time', time); // 컴포넌트 unmount시 time 값을 localStorage에 저장
        };
    }, [time]);

    return (
        <TutorialContainer
            style={{backgroundImage: `url(${backgroundImage})`}}
        >
            <BackgroundLayer/>
            <BackButton onClick={handleBackModalOpen}>돌아가기</BackButton>
            <Modal
                open={backModalOpen}
                onClose={handleBackModalClose}
            >
                <Box sx={{ ...modalStyle, '&:focus': { outline: 'none' }}}>
                    <BackModalMessage>튜토리얼을 나가시겠습니까?</BackModalMessage>
                    <BackModalButton>
                        <Button
                            sx={{ ...BackModalButtonStyle}}
                            onClick={handleBackModalClose}
                        >
                            아니요
                        </Button>
                        <Button
                            sx={{ ...BackModalButtonStyle}}
                            onClick={exitTutorial}
                        >
                            예
                        </Button>
                    </BackModalButton>
                </Box>
            </Modal>
            <MuteButton>
                {
                    (bgmIsPlaying === 'on') ?
                        <span onClick={bgmOff}>🔊</span>
                    :
                    (bgmIsPlaying === 'off') ?
                        <span onClick={bgmOn}>🔈</span>
                    :
                        null
                }
            </MuteButton>
            <MainContent>
            {
                (params.title === '72') ? // Splendor 스플렌더
                    <ID72
                        players={players}
                        bgmIsPlaying={bgmIsPlaying}
                        setBackgroundImage={setBackgroundImage}
                        setBgmIsPlaying={setBgmIsPlaying}
                    />
                :
                (params.title === '27') ? // Rummikub 루미큐브
                    <ID27
                        bgmIsPlaying={bgmIsPlaying}
                        setBackgroundImage={setBackgroundImage}
                        setBgmIsPlaying={setBgmIsPlaying}
                    />
                :
                    null
            }
            </MainContent>
        </TutorialContainer>
    )
}

export default TutorialPage;