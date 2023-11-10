import { IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styled from 'styled-components';
import { useState, useEffect } from "react";
import reactStringReplace from 'react-string-replace';

/* 스타일 */
const TitleAndImageAndContentContainer = styled.div`
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
    height: 44%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Content = styled.div`
    width: 100%;
    height: 35%;
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

function TitleAndImageAndContentComponent({title, image, content, setPage, prePage, nextPage}) {

    /* 이전 페이지 이동 */
    function moveBackPage() {
        setPage(prePage);
    };

    /* 다음 페이지 이동 메소드 */
    function moveForwardPage () {
        setPage(nextPage);
    };

    const [highlightedContent, setHighlightedContent] = useState(content);
    // content 강조 부분
    useEffect(() => {
        const parsedContent = reactStringReplace(content, /<RedText>(.*?)<\/RedText>/g, (match, i) => (
            <RedTextContent key={match}>{match}</RedTextContent>
        ));
        setHighlightedContent(parsedContent);
    }, [content]);

    return (
        <TitleAndImageAndContentContainer>
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
            </MainContainer>

            {/* 앞으로 가기 버튼 */}
            <MovePageButtonBox>
                <IconButton
                    sx={{...MoveButtonStyle}}
                    onClick={() => moveForwardPage()}
                >
                    <KeyboardArrowRight sx={{...MoveButtonIconStyle}}/>
                </IconButton>
            </MovePageButtonBox>
        </TitleAndImageAndContentContainer>
    )
}

export default TitleAndImageAndContentComponent;