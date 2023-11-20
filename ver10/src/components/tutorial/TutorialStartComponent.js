import styled from 'styled-components';
import { Button } from '@mui/material';
import 'animate.css';

/* 스타일 */
const TutorialStartContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`;
const TitleImageWrapper = styled.div`
    width: 100%;
    height: 42%;
    margin-top: 5%;
    margin-bottom: 3%;

    display: flex;
    align-items: center;
    justify-content: center;
`;
const TitleImage = styled.img`
    height: 100%;
    width: auto;
`;
const Title = styled.div`
    font-size: 5vw;
    height: 10%;
    margin-bottom: 3%;
`;
const Message = styled.div`
    width: 70%;
    height: 14%;
    margin-bottom: 3%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vw;
    color: #F7EEF6;
    border-radius: 8px;
    line-height: 1.5;
    text-align: center;
`;
const StartButton = styled.div`
    height: 20%;
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
            <TitleImageWrapper>
                <TitleImage src={title_image}/>
            </TitleImageWrapper>
            <Title className='animate__animated animate__jackInTheBox'>{title} 튜토리얼 시작하기</Title>
            <Message>{message}</Message>
            <StartButton>
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
            </StartButton>
        </TutorialStartContainer>
    )
}

export default TutorialStartComponent;