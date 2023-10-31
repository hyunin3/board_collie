import { IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styled from 'styled-components';

/* 스타일 */
const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
`;
const BackButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
`;
const ForwardButtonBox = styled.div`
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
const TitleContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
`;
const Title = styled.div`
    text-align: center;
    font-size: 4vw;
`;

function TitleComponent({title, setPage, prePage, nextPage}) {

    /* 이전 페이지 이동 메소드 */
    function moveBackPage () {
        setPage(prePage);
    };
    /* 다음 페이지 이동 메소드 */
    function moveForwardPage () {
        setPage(nextPage);
    }

    return (
        <TitleContainer>
            {/* 뒤로 가기 버튼 */}
            <BackButtonBox>
                <IconButton
                    sx={{...MoveButtonStyle}}
                    onClick={() => moveBackPage()}
                >
                    <KeyboardArrowLeft sx={{...MoveButtonIconStyle}}/>
                </IconButton>
            </BackButtonBox>

            {/* 본문 */}
            <TitleContent>
                <Title>{title}</Title>
            </TitleContent>

            {/* 앞으로 가기 버튼 */}
            <ForwardButtonBox>
                <IconButton
                    sx={{...MoveButtonStyle}}
                    onClick={() => moveForwardPage()}
                >
                    <KeyboardArrowRight sx={{...MoveButtonIconStyle}}/>
                </IconButton>
            </ForwardButtonBox>
        </TitleContainer>
    )
}

export default TitleComponent;