import { IconButton, Box, Modal } from '@mui/material';
import { KeyboardArrowLeft, Info } from '@mui/icons-material';
import styled from 'styled-components';
import { useState, useEffect } from "react";
import reactStringReplace from 'react-string-replace';

/* 스타일 */
const TitleAndContenAndTwoButtonContainer = styled.div`
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
const Title = styled.div`
    margin-top: 5%;
    height: 20%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    font-size: 5vw;
`;
const Content = styled.div`
    height: 37%;
    margin-top: 5%;
    margin-bottom: 5%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    text-align: center;
    font-size: 3vw;
`;
const RedTextContent = styled.span`
    color: red;
`;
const infoIconStyle = {
    fontSize: '2.5vw',
    color: '#000000'
};
const StyledBox = styled(Box)`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    background-color: #000000;
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
    color: #ffffff;
`;
const Buttons = styled.div`
    height: 28%;
    width: 100%;
`;
const ChoiceButton = styled.div`
    height: 10vh;
    margin-bottom: 4vh;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    font-size: 2.8vw;

    border-radius: 8px;
    background: #CCF38C;
`;

function TitleAndContenAndTwoButtonComponent ({title, content, addInfo, buttonInfo, setPage, prePage}) {

    const [highlightedContent, setHighlightedContent] = useState(content);

    // content 강조 부분
    useEffect(() => {
        const parsedContent = reactStringReplace(content, /<RedText>(.*?)<\/RedText>/g, (match, i) => (
            <RedTextContent key={i}>{match}</RedTextContent>
        ));
        setHighlightedContent(parsedContent);
    }, [content]);

    /* 이전 페이지 이동 */
    function moveBackPage() {
        setPage(prePage);
    };

    /* 선택에 맞게 페이지 이동 */
    function moveNextFlow(nextFlow) {
        setPage(nextFlow);
    }

    // add info 관련
    const [addInfoModalOpen, setAddInfoModalOpen] = useState(false);
    const handlekModalOpen = () => {
        setAddInfoModalOpen(true);
    };
    const handleModalClose = () => {
        setAddInfoModalOpen(false);
    };

    return (
        <TitleAndContenAndTwoButtonContainer>
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
                <Title>{title}</Title>
                <Content>
                    <p>
                        {highlightedContent}
                        {addInfo !== null &&
                                <IconButton onClick={handlekModalOpen}>
                                    <Info sx={{...infoIconStyle}}/>
                                </IconButton>
                        }
                    </p>
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
                </Content>
                <Buttons>
                    {buttonInfo.map((item, index) => (
                        <ChoiceButton key={index} onClick={() => moveNextFlow(item[0])}>
                            {item[1]}
                        </ChoiceButton>
                    ))}
                </Buttons>
            </MainContainer>

            {/* 앞으로 가기 버튼 */}
            <MovePageButtonBox/>
        </TitleAndContenAndTwoButtonContainer>
    )
}

export default TitleAndContenAndTwoButtonComponent;