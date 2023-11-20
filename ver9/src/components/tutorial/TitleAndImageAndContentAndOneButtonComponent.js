import { IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import styled from 'styled-components';
import { useState, useEffect } from "react";
import reactStringReplace from 'react-string-replace';
import 'animate.css';

/* 스타일 */
const TitleAndImageAndContentAndOneButtonContainer = styled.div`
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
    fontSize: '6vw',
    color: '#ffffff',
};
const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 70%;
`;
const Title = styled.div`
    width: 100%;
    margin-top: 5%;
    height: 10%;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    font-size: 4.5vw;
`;
const Image = styled.img`
    width: 100%;
    margin-top: 2%;
    height: 40%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Content = styled.div`
    width: 100%;
    height: 25%;
    margin-top: 2%;
    margin-bottom: 2%;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    font-size: 3vw;
    // color: #F7EEF6;

    // background-color: rgba(0, 0, 0, 0.5);
    // border-radius: 8px;
`;
const RedTextContent = styled.span`
    color: red;
`;
const Button = styled.div`
    width: 100%;
    margin-bottom: 4%;
    height: 10%;

    border-radius: 8px;
    background: #CCF38C;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    font-size: 2.8vw;

    /* 그림자 스타일 */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
`;

function TitleAndImageAndContentAndOneButtonComponent({title, image, content, buttonPageInfo, buttonTextInfo, setPage, prePage}) {

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
            <RedTextContent key={match}>{match}</RedTextContent>
        ));
        setHighlightedContent(parsedContent);
    }, [content]);

    return (
        <TitleAndImageAndContentAndOneButtonContainer>
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
                <Image src={image}/>
                <Content><p>{highlightedContent}</p></Content>
                <Button
                    onClick={() => moveNextFlow(buttonPageInfo)}
                    className='animate__animated animate__pulse animate__repeat-2'
                >
                    {buttonTextInfo}
                </Button>
            </MainContainer>

            {/* 앞으로 가기 버튼 */}
            <MovePageButtonBox/>
        </TitleAndImageAndContentAndOneButtonContainer>
    )
}

export default TitleAndImageAndContentAndOneButtonComponent;