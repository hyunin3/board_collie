import { IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { useState, useEffect } from "react";
import reactStringReplace from 'react-string-replace';
import styled from 'styled-components';

/* 스타일 */
const TitleAndContentAndOneButtonCotainer = styled.div`
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
    font-size: 4.5vw;
`;
const Content = styled.div`
    margin-top: 5%;
    margin-bottom: 5%;
    height: 51%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    font-size: 3vw;

    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.8);
`;
const RedTextContent = styled.span`
    color: red;
`;
const Button = styled.div`
    height: 10%;
    margin-bottom: 4%;
    width: 100%;

    border-radius: 8px;
    background: #CCF38C;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    font-size: 2.8vw;
`;

function TitleAndContentAndOneButtonComponent({title, content, buttonPageInfo, buttonTextInfo, setPage, prePage}) {

    /* 이전 페이지 이동 */
    function moveBackPage() {
        setPage(prePage);
    };

    /* 선택에 맞게 페이지 이동 */
    function moveNextFlow(nextFlow) {
        setPage(nextFlow);
    }

    const [highlightedContent, setHighlightedContent] = useState(content);

    // content 강조 부분
    useEffect(() => {
        const parsedContent = reactStringReplace(content, /<RedText>(.*?)<\/RedText>/g, (match, i) => (
            <RedTextContent key={i}>{match}</RedTextContent>
        ));
        setHighlightedContent(parsedContent);
    }, [content]);

    return (
        <TitleAndContentAndOneButtonCotainer>
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
                <Content><p>{highlightedContent}</p></Content>
                <Button onClick={() => moveNextFlow(buttonPageInfo)}>{buttonTextInfo}</Button>
            </MainContainer>

            {/* 앞으로 가기 버튼 */}
            <MovePageButtonBox/>
        </TitleAndContentAndOneButtonCotainer>
    )
}

export default TitleAndContentAndOneButtonComponent;