import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { useState } from "react";
import Splendor from "./Splendor";
import { Box, Modal, Button } from '@mui/material';


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
`;
const BackgroundLayer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(247, 238, 246, 0.2);
`;
const BackButton = styled.div`
    position: absolute;
    top: 3vh;
    left: 3vw;
    font-family: 'Jua', sans-serif;
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
    font-family: 'Jua', sans-serif;
    font-size: 2vw;
    letter-spacing: 0.05em;
`;
const BackModalButton = styled.div`
    display: flex;
    justify-content: space-between;
`;
const BackModalButtonStyle = {
    fontFamily: 'Jua',
    fontSize: '1.5vw'
};

/* 튜토리얼 나가기 */
function exitTutorial() {
    // 어느 단계에서 많이 나갔는지 통계 필요
    window.history.back();
}

function TutorialPage({players}) {

    const params = useParams();

    /* 배경 사진 관련 */
    const [backgroundImage, setBackgroundImage] = useState('');

    /* 돌아가기 버튼 모달 관련 */
    const [backModalOpen, setBackModalOpen] = useState(false);
    const handleBackModalOpen = () => {
        setBackModalOpen(true);
    };
    const handleBackModalClose = () => {
        setBackModalOpen(false);
    };

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
            <MainContent>
            {
                (params.title === '스플렌더') ?
                    <Splendor players={players} setBackgroundImage={setBackgroundImage}/>
                    :
                    null
            }
            </MainContent>
        </TutorialContainer>
    )
}

export default TutorialPage;