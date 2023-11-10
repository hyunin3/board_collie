import { IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import styled from 'styled-components';
import { useState, useEffect } from "react";
import reactStringReplace from 'react-string-replace';

/* 스타일 */
const TitleAndThreeButtonCotainer = styled.div`
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
    margin-bottom: 5%;
    height: 48%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    font-size: 5vw;
`;
const RedTextContent = styled.span`
    color: red;
`;
const Buttons = styled.div`
    height: 42%;
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

function TitleAndThreeButtonComponent({title, buttonInfo, setPage, prePage}) {
    
    /* 이전 페이지 이동 */
    function moveBackPage() {
        setPage(prePage);
    };

    /* 선택에 맞게 페이지 이동 */
    function moveNextFlow(nextFlow) {
        setPage(nextFlow);
    }

    const [highlightedTitle, setHighlightedTitle] = useState(title);
    // title 강조 부분
    useEffect(() => {
        const parsedTitle = reactStringReplace(title, /<RedText>(.*?)<\/RedText>/g, (match, i) => (
            <RedTextContent key={match}>{match}</RedTextContent>
        ));
        setHighlightedTitle(parsedTitle);
    }, [title]);

    return (
        <TitleAndThreeButtonCotainer>
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
                <Title><p>{highlightedTitle}</p></Title>
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
        </TitleAndThreeButtonCotainer>
    )
}

export default TitleAndThreeButtonComponent;