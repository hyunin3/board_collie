import { useState } from "react";
import { IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styled from 'styled-components';
import InfoComponent from '../../components/tutorial/InfoComponent';

/* 스타일 */
const GameSettingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
`;

const GameSettingContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    font-family: 'Jua', sans-serif;
    position: relative;
`;
const Title = styled.div`
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 7vh;
`;
const TitleText = styled.span`
    margin-right: 0.5rem;
`;
const StepImage = styled.img`
    width: 70vw;
    height: 35vw;
    margin-top: 1vh;
    margin-bottom: 2vh;
`;
const StepTextBox = styled.div`
    width: 70vw;
    height: 20vh;
    background-color: rgba(0, 0, 0, 0.5);
    margin-bottom: 0.5vh;
    border-radius: 8px;
`;
const StepText = styled.div`
    color: #F7EEF6;
    margin: 1.5vw;
    font-size: 2vw;
`;
const SkipButtonBox = styled.div`
    width: 70vw;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;
const SkipButton = styled.span`
    color: #EDFFD0;
    margin: 0.5vw;
    font-size: 1.5vw;
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


function GameSettingComponent({settingList, setPage, nextPage}) {
    
    const [step, setStep] = useState(0);

    /* 단계 이동 메소드 */
    function moveBack () {
        if(step !== 0) setStep(step - 1);
    };
    function moveForward () {
        console.log(step);
        if(step === settingList.length - 1) {
            setPage(nextPage);
        }
        else {
            setStep(step + 1);
        }
    };

    return (
        <GameSettingContainer>
            {/* 뒤로 가기 버튼 */}
            <BackButtonBox>
                {
                    step !== 0 &&
                    <IconButton
                        sx={{...MoveButtonStyle}}
                        onClick={() => moveBack()}
                    >
                        <KeyboardArrowLeft sx={{...MoveButtonIconStyle}}/>
                    </IconButton>
                }
            </BackButtonBox>
            {/* 세팅 정보 */}
            <GameSettingContent>
                <Title>
                    <TitleText>게임 시작 전 세팅</TitleText>
                    <InfoComponent/>
                </Title>
                <StepImage src={process.env.PUBLIC_URL + settingList[step][0]}></StepImage>
                <StepTextBox><StepText>{settingList[step][1]}</StepText></StepTextBox>
                <SkipButtonBox><SkipButton>세팅 건너뛰기</SkipButton></SkipButtonBox>
            </GameSettingContent>
            {/* 앞으로 가기 버튼 */}
            <ForwardButtonBox>
                <IconButton
                    sx={{...MoveButtonStyle}}
                    onClick={() => moveForward()}
                >
                    <KeyboardArrowRight sx={{...MoveButtonIconStyle}}/>
                </IconButton>
            </ForwardButtonBox>
        </GameSettingContainer>
    )
}

export default GameSettingComponent;