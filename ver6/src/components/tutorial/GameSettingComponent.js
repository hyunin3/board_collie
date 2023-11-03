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
    position: relative;
`;
const Title = styled.div`
    font-size: 5vw;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 8vh;
    margin-top: 7vh;
    position: relative;
`;
const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;
const TitleText = styled.span`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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
    margin-top: 1.5vh;
`;
const SkipButton = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000;
    background-color: #CCF38C;
    margin: 0.5vw;
    width: 8vw;
    height: 4vh;
    font-size: 1.7vw;
    border-radius: 10px;
    font-family: 'Jolly Lodger', cursive;
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


function GameSettingComponent({settingList, infoList, startStep, setSettingStartPage, setPage, prePage, nextPage}) {
    
    const [step, setStep] = useState(startStep);

    /* 단계 이동 메소드 */
    function moveBack () {
        if(step === 0) {
            setSettingStartPage(0);
            setPage(prePage);
        }
        else {
            setStep(step - 1);
        }
    };
    function moveForward () {
        if(step === settingList.length - 1) {
            setSettingStartPage(step);
            setPage(nextPage);
        }
        else {
            setStep(step + 1);
        }
    };

    /* 스킵 */
    function skip() {
        setSettingStartPage(step);
        setPage(nextPage);
    };

    return (
        <GameSettingContainer>
            {/* 뒤로 가기 버튼 */}
            <BackButtonBox>
                <IconButton
                    sx={{...MoveButtonStyle}}
                    onClick={() => moveBack()}
                >
                    <KeyboardArrowLeft sx={{...MoveButtonIconStyle}}/>
                </IconButton>
            </BackButtonBox>
            {/* 세팅 정보 */}
            <GameSettingContent>
                <Title>
                    <TitleWrapper><TitleText>게임 시작 전 세팅</TitleText></TitleWrapper>
                    {infoList !== null && <InfoComponent type='setting' info={infoList}/>}
                </Title>
                <StepImage src={settingList[step][0]}></StepImage>
                <StepTextBox><StepText>{settingList[step][1]}</StepText></StepTextBox>
                {
                    step !== settingList.length - 1
                    &&
                    <SkipButtonBox><SkipButton onClick={() => skip()}>Skip</SkipButton></SkipButtonBox>
                }
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