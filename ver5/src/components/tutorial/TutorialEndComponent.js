import { IconButton, Box, Modal } from '@mui/material';
import { KeyboardArrowLeft, Replay, Logout } from '@mui/icons-material';
import styled from 'styled-components';
import { useState } from "react";

/* 스타일 */
const TutorialEndCotainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
`;
const MovePageButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
`;
const MoveButtonStyle = {
    width: '100%',
    height: '70%',
};
const MoveButtonIconStyle = {
    fontSize: '3.5vw',
    color: '#F7EEF6',
};
const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 70%;
`;
const TitleImage = styled.div`
    margin-top: 5%;
    height: 45%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;
const Image = styled.img`
    height: 100%;
`;
const Content = styled.div`
    margin-top: 5%;
    height: 20%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.5);
    font-size: 3vw;
    color: #F7EEF6;
    border-radius: 8px;
    text-align: center;
`;
const AddInfo = styled.div`
    height: 10%;
    width: 100%;

    display: flex;
    justify-content: right;
    align-items: top;

    font-size: 4vh;
`;
const StyledBox = styled(Box)`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    background-color: #ffffff;
    border-radius: 8px;
    font-family: 'Jua', sans-serif;
    overflow: auto;
    
    /* 스크롤바 스타일 설정 */
    scrollbar-width: thin;
    scrollbar-color: #CCF38C transparent; /* 스크롤바 썸 색상 / 스크롤바 트랙 색상 */

    /* Chrome, Safari */
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        background: transparent; /* 스크롤바 트랙 색상 */
    }
    &::-webkit-scrollbar-thumb {
        background-color: #CCF38C; /* 스크롤바 썸 색상 */
        border-radius: 4px;
    }
`;
const ModalContent = styled.div`
    display: flex;
    align-items: center;
    margin: 3%;

    font-size: 2.5vw;
    color: #000000;
`;
const Buttons = styled.div`
    margin-bottom: 5%;
    height: 10%;
    width: 100%;

    display: flex;
`;
const Again = styled.div`
    height: 100%;
    width: 45%;
    margin-right: 5%;

    border-radius: 8px;
    background: #CCF38C;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 3.5vw;
`;
const Exit = styled.div`
    height: 100%;
    width: 45%;
    margin-left: 5%;

    border-radius: 8px;
    background: #CCF38C;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 3.5vw;
`;
const EndingButtonIconStyle = {
    fontSize: '3.5vw',
    color: '#000000',
};

function TutorialEndComponent({image, content, addInfo, setPage, prePage}) {

        /* 이전 페이지 이동 */
        function moveBackPage() {
            setPage(prePage);
        };

        // add info 관련
        const [addInfoModalOpen, setAddInfoModalOpen] = useState(false);
        const handlekModalOpen = () => {
            setAddInfoModalOpen(true);
        };
        const handleModalClose = () => {
            setAddInfoModalOpen(false);
        };

        // 새로고침 메소드
        function again() {
            window.location.reload();
        };

        // 나가기 메소드
        function exit() {
            window.history.back();
        };

    return (
        <TutorialEndCotainer>
            {/* 뒤로 가기 버튼 */}
            <MovePageButtonBox>
                <IconButton
                    sx={{...MoveButtonStyle}}
                    onClick={() => moveBackPage()}
                >
                    <KeyboardArrowLeft sx={{...MoveButtonIconStyle}}/>
                </IconButton>
            </MovePageButtonBox>

            {/* 콘텐츠 */}
            <MainContainer>
                <TitleImage><Image src={image}></Image></TitleImage>
                <Content>{content}</Content>
                <AddInfo >{addInfo !== null && <span onClick={handlekModalOpen}>🙋‍♂️</span>}</AddInfo>
                {addInfo !== null &&
                        <Modal
                        open={addInfoModalOpen}
                        onClose={handleModalClose}
                        >
                            <StyledBox  sx={{ '&:focus': { outline: 'none' }}}>
                                {addInfo.map((item, index) => (
                                    <ModalContent key={index}>
                                        {item}
                                    </ModalContent>
                                ))}
                            </StyledBox >
                        </Modal>
                    }
                <Buttons>
                    <Again onClick={() => again()}>
                        <Replay sx={{...EndingButtonIconStyle}}/>
                        &nbsp;다시하기
                    </Again>
                    <Exit onClick={() => exit()}>
                        <Logout sx={{...EndingButtonIconStyle}}/>
                        &nbsp;끝내기
                    </Exit>
                </Buttons>
            </MainContainer>

            {/* 앞으로 가기 버튼 */}
            <MovePageButtonBox/>
        </TutorialEndCotainer>
    )
}

export default TutorialEndComponent;