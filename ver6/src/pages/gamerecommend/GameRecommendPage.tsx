/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import 'animate.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


// images
import chatIcon from '../../assets/chat_icon.png';

// styles
import styled, { keyframes } from 'styled-components';

// icon
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { faDiceOne, faDiceTwo, faDiceThree  } from "@fortawesome/free-solid-svg-icons";

import ChatBubble from '../../components/chatbubble/ChatBubble';

/**
 * Game Recommend Page
 *
 * @author 허주혁
 * @todo 
 * 1. 애니메이션 간의 time delay 조절 문제 (속도 조절이 안 됨)
 * 2. 버튼이 선택되면 배경색이 바뀌는데, 문제는 이게 문제마다 다시 원래 색으로 초기화가 되어야하는데, 계속 바뀐 색이 다음 질문에서도 유지되는 경우
 * 3. 뒤로가기 버튼을 눌렀을 때, 그대로 선택된 버튼을 버튼이 눌려 색깔이 변경된 처리를 해주고, 다른 선택지를 고르면 그 index로 교체가 되도록 코드 수정
 */

const Padding = styled.div`
  height: 12vh;
`;

const ChatIcon = styled.div`
  background-image: url(${chatIcon});
  background-size: contain;
  background-repeat: no-repeat;
  width: 18vw;
  height: 20vh;
  display: block;

  position: absolute;
  top: 20vh;
  left: 10vw;
`;

const PositionedChatBubble = styled.div`
  position: absolute;
  top: 26vh;
  left: 28vw;
`;

const AdvisorText = styled.div`
  position: absolute;
  top: 22vh; 
  left: 28vw;
  font-size: 1.3rem;
  font-weight: 800;
`;

const SelectButtonContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
  place-items: center;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
`;

const SingleButton = styled.button`
  display: flex; // Flexbox를 사용
  align-items: center; // 버튼 내의 아이템들을 세로 중앙 정렬
  justify-content: center; // 버튼 내의 아이템들을 가로 중앙 정렬
  position: relative; // 내부 아이콘 컨테이너를 절대 위치로 배치하기 위함

  width: 80vw; 
  height: 9vh; 
  background-color: #3CB371;

  color: white;
  font-size: 22px;
  font-weight: 600;
  font-family: 'Arial, sans-serif'; 

  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #90B299;
  }
`;

// 아이콘을 담을 컨테이너
const IconContainer = styled.div`
  position: absolute; // 버튼 내 절대 위치
  left: 2vw; // 왼쪽 여백
  top: 50%; // 상단에서 50% 위치
  transform: translateY(-50%); // Y축으로 50% 이동하여 세로 중앙 정렬
`;

// 글씨를 담을 컨테이너
const TextContainer = styled.div`
  text-align: center; // 텍스트 중앙 정렬
`;

const PageNumber = styled.div`
  position: absolute;
  top: 93%;
  left: 93%;

  font-size: 1.4rem;
  font-weight: 700;

`;

const BackButton = styled.div`
  position: absolute;
  top: 93%;
  left: 7%;
`;

// 버튼 애니메이션 정의
const buttonInAnimation = keyframes`
  0% { transform: translateY(100vh); visibility: visible; }
  100% { transform: translateY(0); }
`;

const buttonOutAnimation = keyframes`
  0% { transform: translateY(0); visibility: visible; }
  100% { transform: translateY(100vh); }
`;

// SingleButton 스타일을 상속받아 새로운 AnimatedButton 컴포넌트를 생성합니다.
const AnimatedButton = styled(SingleButton).withConfig({
  shouldForwardProp: (prop) => !['animateIn', 'index'].includes(prop),
})<{ animateIn: boolean; index: number }>`
  animation: ${({ animateIn }) => (animateIn ? buttonInAnimation : buttonOutAnimation)} 1s both;
  animation-delay: ${({ index }) => index * 0.1}s;
`;

type ButtonContents = {
  [key: number]: string[];
};

const GameRecommendPage: React.FC = () => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [handleButtonClicked, setHandleButtonClicked] = useState(false);
  const [animateButtonsIn, setAnimateButtonsIn] = useState(true);

  // 질문의 대답을 저장하는 리스트 로그
  useEffect(() => {
    console.log("선택된 버튼 배열: ", selectedButtons);
  }, [selectedButtons]);

  // 질문 페이지가 아닌 경우에 자동으로 다음 페이지로 넘어가는 기능
  useEffect(() => {
    if ([0, 3, 7].includes(currentQuestion)) {
      const timer = setTimeout(() => {
        handleClick();
      }, 9000);

      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);


  // ChatBubble 안의 내용 문구들 상태 변수 저장
  const [chatMessage, setChatMessage] = useState([
    '안녕하세요! AI 집사, 보드콜리 집사입니다.\n사용자님께 맞는 최적의 게임을 추천해드리기 위해 간단한 질문 몇 개만 하겠습니다.',
    '보드게임 플레이 타임은 어느 정도로 생각하시나요?',
    '게임 난이도는 어느 정도를 생각하시나요?',
    '이제부터 게임 스타일에 대한 선택지를 드리겠습니다.\n선호하시는 플레이 스타일을 선택하세요.',
    '경쟁하는 게임이 좋으실까요? 협동하는 게임이 좋으실까요?',
    '전략적인 요소 좋아하시나요? 아니면 운적인 요소를 선호하실까요?',
    '다른 사람의 플레이가 내 플레이에 영향을 끼치는 것에 대해 어떻게 생각하시나요?',
    '사용자님 마음에 들 게임들이 있습니다!\n후보들을 보여드릴테니, 천천히 둘러보시길 바랍니다.',
  ]);

  // 버튼 내용을 저장하는 상태
  const buttonContents: ButtonContents = {
    1: ['플레이 타임이 길어도 상관 없어요! (1시간 이상)', '플레이 타임은 짧았으면 좋겠어요! (1시간 미만)', '상관 없음'],
    2: ['어려움', '보통', '쉬움'],
    4: ['경쟁', '협동', '상관 없음'],
    5: ['전략', '운빨', '상관 없음'],
    6: ['상호작용 존재 (중상모략의 세계로~)', '독립적 (내 할 것만 하자)', '상관 없음'],
  };

  // 버튼 클릭(선택지 선택) 시 동작
  const handleClick = (buttonNumber?: number) => {
    console.log(currentQuestion);
    console.log(handleButtonClicked);

    setHandleButtonClicked(true);

    // 버튼이 아래로 내려가는 애니메이션
    setAnimateButtonsIn(false);

    setTimeout(() => {
      // 버튼 번호가 제공된 경우에만 배열에 추가
      if (buttonNumber !== undefined) {
        setSelectedButtons([...selectedButtons, buttonNumber]);
      }

      // 다음 질문으로 이동
      setCurrentQuestion(currentQuestion + 1);

      // 버튼을 올라오게 하는 애니메이션
      setAnimateButtonsIn(true);
    }, 1000);
  };

  // 상태 업데이트를 감지하여 chatMessage 업데이트
  useEffect(() => {
    const newChatMessage = [...chatMessage];
    const questionIndex = currentQuestion; // 현재 질문 인덱스 사용
    switch (questionIndex) {
      case 0:
        newChatMessage[currentQuestion] = '안녕하세요! AI 집사, 보드콜리 집사입니다.\n사용자님께 맞는 최적의 게임을 추천해드리기 위해 간단한 질문 몇 개만 하겠습니다.';
        break;
      case 1:
        newChatMessage[currentQuestion] = '보드게임 플레이 타임은 어느 정도로 생각하시나요?';
        break;
      case 2:
        newChatMessage[currentQuestion] = '게임 난이도는 어느 정도를 생각하시나요?';
        break;
      case 3:
        newChatMessage[currentQuestion] = '이제부터 게임 스타일에 대한 선택지를 드리겠습니다.\n선호하시는 플레이 스타일을 선택하세요.';
        break;
      case 4:
        newChatMessage[currentQuestion] = '경쟁하는 게임이 좋으실까요? 협동하는 게임이 좋으실까요?';
        break;
      case 5:
        newChatMessage[currentQuestion] = '전략적인 요소 좋아하시나요? 아니면 운적인 요소를 선호하실까요?';
        break;
      case 6:
        newChatMessage[currentQuestion] = '다른 사람의 플레이가 내 플레이에 영향을 끼치는 것에 대해 어떻게 생각하시나요?';
        break;
      case 7:
        newChatMessage[currentQuestion] = '사용자님 마음에 들 게임들이 있습니다!\n후보들을 보여드릴테니, 천천히 둘러보시길 바랍니다.';
        break;
      default:
        newChatMessage[currentQuestion] = '';
        break;
    }
    setChatMessage(newChatMessage);
  }, [currentQuestion]); // currentQuestion 변경될 때마다 실행

  // 이전 질문으로 이동하기
  const handleBack = () => {
    // 마지막 선택을 배열에서 제거
    setSelectedButtons(selectedButtons.slice(0, -1));

    setHandleButtonClicked(false);

    // 버튼이 아래로 내려가는 애니메이션
    setAnimateButtonsIn(false);

    setTimeout(() => {
      // 이전 질문으로 이동
      if (currentQuestion === 4) {
        setCurrentQuestion(currentQuestion - 2);
      } else {
        setCurrentQuestion(currentQuestion - 1);
      }

      // 버튼을 올라오게 하는 애니메이션
      setAnimateButtonsIn(true);
    }, 1000);
  };
  

  // 질문 페이지만 계산하여 페이지 번호를 표시하는 기능
  const getDisplayPageNumber = () => {
    const questionPages = [1, 2, 4, 5, 6]; // 질문 페이지들의 currentQuestion 값
    return questionPages.indexOf(currentQuestion) + 1;
  };

  // 애니메이션 효과 순서 지정
  const [zoomInDone, setZoomInDone] = useState(false);
  const [fadeInDone, setFadeInDone] = useState(false);
  const [startType, setStartType] = useState(false);

  useEffect(() => {
    // ZoomIn 애니메이션이 끝난 후
    const zoomInTimer = setTimeout(() => {
      setZoomInDone(true);
    }, 1000); // ZoomIn 애니메이션의 길이
    
    return () => clearTimeout(zoomInTimer);
  }, []);

  useEffect(() => {
    // FadeIn 애니메이션이 끝난 후
    if (zoomInDone) {
      const fadeInTimer = setTimeout(() => {
        setFadeInDone(true);
      }, 1000); // FadeIn 애니메이션의 길이

      return () => clearTimeout(fadeInTimer);
    }
  }, [zoomInDone]);

  useEffect(() => {
    if (fadeInDone) {
      const starttypeTimer = setTimeout(() => {
        setStartType(true);
      }, 1000); 

      return () => clearTimeout(starttypeTimer);
    }
  }, [fadeInDone]);

  // useEffect(() => {
  //   // TypeAnimation의 예상 실행 시간을 계산
  //   const typeAnimationDuration = chatMessage[currentQuestion].length * 70 + 1000;
  //   // 여기서 70은 각 글자를 타이핑하는 데 걸리는 시간(ms), 1000은 추가 지연 시간(ms)입니다.
  
  //   // FadeIn 애니메이션이 끝난 후 TypeAnimation이 시작됩니다.
  //   if (fadeInDone) {
  //     setStartType(true);
  
  //     // TypeAnimation이 끝나고 나서 버튼 애니메이션을 실행합니다.
  //     const typeAnimationTimer = setTimeout(() => {
  //       setAnimateButtonsIn(true);
  //     }, typeAnimationDuration);
  
  //     return () => clearTimeout(typeAnimationTimer);
  //   }
  // }, [fadeInDone, chatMessage, currentQuestion]);

  // 마지막 페이지 도달 시 결과 페이지로 이동 & API 요청
  const navigate = useNavigate();

  useEffect(() => {
    if (currentQuestion === 8) {
      // API 요청을 보내는 함수
      const postData = async () => {
        try {
          // const response = await axios.post('YOUR_API_ENDPOINT', {
          //   selectedButtons,
          // });

          // console.log(response.data);

          // 데이터를 성공적으로 전송한 후, 사용자를 다른 페이지로 리디렉션
          navigate('/recommendresult');

        } catch (error) {
          console.error('There was an error!', error);
        }
      };

      postData();
    }
  }, [currentQuestion, history]);

  return (
    <>
      <Padding />
      <ChatIcon className={`animate__animated ${zoomInDone ? '' : 'animate__zoomIn'}`} />

      <AdvisorText>보드콜리 집사</AdvisorText>
      <PositionedChatBubble className={`animate__animated ${fadeInDone ? '' : (zoomInDone ? 'animate__fadeIn' : '')}`}>
        {startType && (
          <ChatBubble position='left'>
            {handleButtonClicked ? (
              <TypeAnimation
                key={currentQuestion}
                preRenderFirstString={true}
                style={{whiteSpace: 'pre-line',}}
                sequence={
                  [
                    chatMessage[currentQuestion - 1],
                    1000,
                    ' ',
                    chatMessage[currentQuestion], 
                    1000,
                  ]
                }
                  speed={70}
              />
            ) :
              <TypeAnimation
                key={currentQuestion}
                style={{whiteSpace: 'pre-line',}}
                sequence={
                  [
                    chatMessage[currentQuestion],
                    1000,
                  ]
                }
                  speed={70}
              />
            }
          </ChatBubble>
        )}
      </PositionedChatBubble>

      {![0, 3, 7].includes(currentQuestion) && (
        <>
          <SelectButtonContainer>
            {buttonContents[currentQuestion]?.map((content, index) => (
              <AnimatedButton 
                key={index}
                animateIn={animateButtonsIn}
                index={index}
                style={selectedButtons[currentQuestion] === index + 1 ? { backgroundColor: '#90B299' } : {}}
                onClick={() => handleClick(index + 1)}
              >
                <IconContainer>
                  {index === 0 && <FontAwesomeIcon icon={faDiceOne} size="2xl" />}
                  {index === 1 && <FontAwesomeIcon icon={faDiceTwo} size="2xl" />}
                  {index === 2 && <FontAwesomeIcon icon={faDiceThree} size="2xl" />}
                </IconContainer>

                <TextContainer>
                  {content}
                </TextContainer>

              </AnimatedButton>
            ))}
          </SelectButtonContainer>

          <PageNumber>
            {`${getDisplayPageNumber()}/5`}
          </PageNumber>

          <BackButton>
            {currentQuestion > 1 && ( // 1보다 클 때만 뒤로 가기 버튼 표시
              <ArrowBackIosNewIcon onClick={handleBack} />
            )}
          </BackButton>
        </>
      )}
    </>
  );
};

export default GameRecommendPage;