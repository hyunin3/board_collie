import { useState, useEffect } from "react";
import { IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styled from 'styled-components';
import reactStringReplace from 'react-string-replace';
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

    height: 100%;
`;
const Title = styled.div`
    font-size: 5vw;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 8%;
    margin-top: 8%;
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
    height: 48%;
    margin-top: 2%;
    margin-bottom: 2%;
`;
const StepTextBox = styled.div`
    width: 70vw;
    height: 22%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
`;
const StepText = styled.div`
    color: #F7EEF6;
    margin: 1.5vw;
    font-size: 2vw;
`;
const SkipButtonBox = styled.div`
    width: 70vw;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
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
    fontSize: '6vw',
    color: '#ffffff',
};
const RedTextContent = styled.span`
    color: red;
`;


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

    /* 설명 강조 부분 */
    const [highlightedText, setHighlightedText] = useState(settingList[step][1]);
    useEffect(() => {
        const parsedText = reactStringReplace(settingList[step][1], /<RedText>(.*?)<\/RedText>/g, (match, i) => (
            <RedTextContent key={i}>{match}</RedTextContent>
        ));
        setHighlightedText(parsedText);
    }, [step, settingList]);

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
                <StepTextBox><StepText>{highlightedText}</StepText></StepTextBox>
                <SkipButtonBox>
                    {
                        step !== settingList.length - 1
                        &&
                        <SkipButton onClick={() => skip()}>Skip</SkipButton>
                    }
                </SkipButtonBox>
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