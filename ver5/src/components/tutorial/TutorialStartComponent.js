import styled from 'styled-components';
import { Button } from '@mui/material';
import 'animate.css';

/* 스타일 */
const TutorialStartContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;
const TitleImage = styled.img`
    width: 32vw;
    height: 32vw;
    margin-top: 7vh;
    margin-bottom: 2vh;
`;
const Title = styled.div`
    font-size: 5vw;
    margin-bottom: 3vh;
`;
const Message = styled.div`
    width: 70%;
    height: 15vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vw;
    color: #F7EEF6;
    border-radius: 8px;
    line-height: 1.5;
    margin-bottom: 3vh;
    text-align: center;
`;

function TutorialStartComponent({title_image, title, message, button1, setBgmIsPlaying, movePage1, setPage}) {
    
    /* 배경음악 시작 */
    const startMusic = () => {
        setBgmIsPlaying('on');
    }

    /* 페이지 이동 함수 */
    function moveNextPage(setPage, movePageNumber) {
        startMusic();
        setPage(movePageNumber);
    }


    return (
        <TutorialStartContainer>
            <TitleImage src={title_image}></TitleImage>
            <Title className='animate__animated animate__jackInTheBox'>{title} 튜토리얼 시작하기</Title>
            <Message>{message}</Message>
            <Button
                className='animate__animated animate__pulse animate__infinite'
                variant="contained" 
                style={{ 
                    backgroundColor: '#CCF38C', 
                    color: 'black',
                    marginTop: '20px', 
                    fontFamily: 'Jolly Lodger, cursive',
                    borderRadius: "10px",
                    fontSize: "2rem", 
                    padding: '1px 70px',
                }}
                onClick={() => moveNextPage(setPage, movePage1)}
                >
                {button1}
            </Button>
        </TutorialStartContainer>
    )
}

export default TutorialStartComponent;