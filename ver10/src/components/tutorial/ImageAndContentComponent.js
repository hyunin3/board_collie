import { IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styled from 'styled-components';
import reactStringReplace from 'react-string-replace';
import { useState, useEffect } from "react";
import TypeIt from "typeit-react";

/* 스타일 */
const ImageAndContentContainer = styled.div`
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
const Image = styled.img`
    width: 100%;
    margin-top: 10%;
    height: 50%;
`;
const Content = styled.div`
    width: 100%;
    height: 40%;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    font-size: 4vw;
`;

function ImageAndContentComponent({image, content, setPage, prePage, nextPage}) {

    const [typeAniContent, setTypeAniContent] = useState(content);

    // 콘텐츠 애니메이션 적용
    useEffect(() => {
        let parsedContent = reactStringReplace(content, /<TypeIt>(.*?)<\/TypeIt>/g, (match, i) => (
            <TypeIt
                key={match}
                options={{
                    strings: [match],
                    speed: 20,
                    waitUntilVisible: true,
                    cursor: false,
                }}
            />
        ));
        setTypeAniContent(parsedContent);
    }, [content]);

    /* 이전 페이지 이동 */
    function moveBackPage() {
        setPage(prePage);
    };
    /* 다음 페이지 이동 메소드 */
    function moveForwardPage () {
        setPage(nextPage);
    }

    return (
        <ImageAndContentContainer>
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
                <Image src={image}/>
                <Content>{typeAniContent}</Content>
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
        </ImageAndContentContainer>
    )
}

export default ImageAndContentComponent;