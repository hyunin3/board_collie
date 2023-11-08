/* eslint-disable */

import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { TypeAnimation } from 'react-type-animation';
import { PacmanLoader } from 'react-spinners';

// images
import iconLogo from '../../assets/logo.png'
import chatIcon from '../../assets/chat_icon.png';

// icon
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';


// 채팅방 컨테이너
const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Padding = styled.div`
  height: 9vh;
`;

// NavBar
const NavBarContainer = styled.div`
  width: 100%;
  height: 9vh;

  position: fixed;
  top: 0;
  left: 0;

  background-color: #EDFFD0;
  color: black;

  // NabBar 내부의 레이아웃 조정
  display: flex;
  justify-content: space-between; // NavBar 내의 콘텐츠를 균등하게 분배하여 간격 생성
  align-items: center; // NavBar 내 항목들 수직 가운데 정렬

  padding: 0 0px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  background-image: url(${iconLogo});
  background-size: contain;
  background-repeat: no-repeat;
  width: 15vw;  
  height: 8vh;
  padding: 0 1vw;
`;

const GameName = styled.div`
  padding: 0 1vw;
  font-size: 1.3rem;
  font-weight: bold;
  fontFamily: 'Jolly Lodger, cursive',
`;

// ChatBubble
// 공통 채팅 버블 스타일
const ChatBubbleBlock = styled.div`
  max-width: 70%;
  padding: 5px 10px;
  border-radius: 7px;
  margin-bottom: 15px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

// 질문 버블 스타일
const QuestionBubble = styled(ChatBubbleBlock)`
  align-self: flex-end;
  background-color: #dcf8c6;
`;

// 답변과 챗 아이콘을 포함하는 컨테이너 스타일
const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  // margin-bottom: 10px;
`;

// 답변 버블 스타일
const AnswerBubble = styled(ChatBubbleBlock)`
  background-color: #E9E9EB;
`;

const TalkText = styled.div`
  padding: 0.1em;
  text-align: left;
  line-height: 1.5em;
  font-size: 0.8rem;
  font-weight: 550;
  font-family: 'Arial, sans-serif'; 

  p {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

// 챗 아이콘 스타일
const ChatIcon = styled.div`
  background-image: url(${chatIcon});
  background-size: contain;
  background-repeat: no-repeat;
  width: 12vw;
  height: 10vh;
  display: block;
  margin-right: 0.7rem;
`;


// 메시지 목록 영역
const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
  flex: 1;
`;

// 입력 영역
const InputArea = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #ADC178; // 두꺼운 태두리 적용
  border-radius: 20px; // 모서리를 둥글게
  background-color: #ffffff; // 내부 배경색 하얀색
  padding: 5px; // 패딩으로 내부 여백을 조금 줌
  margin: 10px; // 주변 여백 추가
`;

// 입력 필드
const InputField = styled.input`
  flex: 1;
  border: none;
  background-color: #EDFFD0; // 배경색 적용
  border-radius: 15px; // 입력 필드 모서리 둥글게
  padding: 10px 15px; // 좌우 패딩으로 너비 조정
  margin-right: 10px; // 버튼과의 간격
  font-size: 1rem; // 글씨 크기 조정
  &::placeholder {
    color: #a8a8a8; // 플레이스홀더 글씨색
  }
  &:focus {
    outline: none;
  }
`;

// 전송 버튼
const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; // 버튼 너비
  height: 40px; // 버튼 높이
  border: none;
  background-color: #858E99;
  border-radius: 50%; // 원형 버튼으로 만들기
  padding: 0;
  &:hover {
    background-color: #6c757d; // 호버 시 색상 변경
  }
`;

// 로딩 컴포넌트 스타일
const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  z-index: 9999; // 상위에 표시
`;

// 로딩 컴포넌트
const LoadingSpinner = () => (
  <LoadingOverlay>
    <PacmanLoader />
  </LoadingOverlay>
);

// 답변 버블과 챗 아이콘을 포함하는 컴포넌트
const AnswerBubbleWithIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AnswerContainer>
    <ChatIcon />
    <AnswerBubble>
      {children}
    </AnswerBubble>
  </AnswerContainer>
);

// 애니메이션 효과가 적용된 TalkText 컴포넌트
const AnimatedTalkText: React.FC<{ text: string }> = ({ text }) => (
  <TalkText>
    <TypeAnimation
      cursor={false}
      sequence={[text]}
      wrapper="p"
    />
  </TalkText>
);

// InputArea 내부에 InputField와 SendButton을 배치합니다.
const InputAreaWithButton: React.FC<{ onSend: () => void, text: string, setText: (text: string) => void }> = ({ onSend, text, setText }) => (
  <InputArea>
    <InputField
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Message"
      onKeyDown={(e) => e.key === 'Enter' && onSend()}
    />
    <SendButton onClick={onSend}>
      <SendIcon style={{ color: 'white' }} />
    </SendButton>
  </InputArea>
);

interface Question {
  id: string;
  text: string;
}

interface Answer {
  id: string;
  text: string;
}

// 채팅방 컴포넌트
const ChatBotPage: React.FC = () => {
  
  const title = '스플랜더';

  const [isLoading, setIsLoading] = React.useState(false);

  // 종료 : 현재 창 닫기
  const handleClose = () => {
    window.close();
  };

  const [questions, setQuestions] = React.useState<Question[]>([
    { id: uuidv4(), text: '가져올 수 있는 노란 보석이 없으면 찜을 못 해?'},
  ]);

  const [answers, setAnswers] = React.useState<Answer[]>([
    { id: uuidv4(), text: `게임 : ${title}\n상세한 게임룰이나 헷갈리는 규칙이 있을 경우 질문 주세요!`},
    { id: uuidv4(), text: '골드 토큰이 없는 경우에도 예약 행동은 가능합니다. 단, 골드 토큰을 받지는 못하게 됩니다.'},
  ]);

  const [inputText, setInputText] = React.useState('');

  const handleSend = async () => {
    if (inputText.trim()) {
      const newQuestion: Question = {
        id: uuidv4(),
        text: inputText,
      };
      setQuestions([...questions, newQuestion]);

      try {
        setIsLoading(true); // 로딩 시작

        // POST 요청으로 사용자의 메시지를 전송하고, 답변을 받습니다.
        await axios.post('/api/message/send', { message: inputText });
        // GET 요청으로 답변을 받습니다.
        const response = await axios.get('/api/message/receive', { params: { questionId: newQuestion.id } });

        const receivedAnswer: Answer = {
          id: uuidv4(),
          text: response.data.reply, // 가정: 응답 데이터에 답변이 'reply' 필드에 있음
        };
        setAnswers(currentAnswer => [...currentAnswer, receivedAnswer]);
      } catch (error) {
        console.error('API 요청 중 오류가 발생했습니다', error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }

      setInputText('');
    }
  };

  // 질문과 답변을 번갈아 출력하는 함수
  const renderMessages = () => {
    const messageItems = [];
    
    // 항상 answers의 첫 번째 항목을 먼저 표시
    if (answers.length > 0) {
      messageItems.push(
        <AnswerBubbleWithIcon key={answers[0].id}>
          <AnimatedTalkText text={answers[0].text} />
        </AnswerBubbleWithIcon>
      );
    }

    // 그 다음부터는 questions와 answers를 번갈아가면서 표시
    for (let i = 0; i < questions.length; i++) {
      messageItems.push(
        <QuestionBubble key={questions[i].id}>
          <TalkText>
            {questions[i].text}
          </TalkText>
        </QuestionBubble>
      );

      if (answers[i + 1]) { // +1은 첫 번째 답변은 이미 표시했기 때문에
        messageItems.push(
          <AnswerBubbleWithIcon key={answers[i + 1].id}>
            <AnimatedTalkText text={answers[i + 1].text} />
          </AnswerBubbleWithIcon>
        );
      }
    }

    return messageItems;
  };

  return (
    <ChatRoomContainer>
      {/* 로딩 상태일 때만 로딩 컴포넌트를 렌더링 */}
      {isLoading && <LoadingSpinner />}

      <Padding />

      <NavBarContainer>
        <Logo />
        <GameName>{`${title}`}</GameName>
        <LogoutIcon style={{ fontSize: 27, padding: '0 2vw'}} onClick={handleClose} />
      </NavBarContainer>

      <MessageList>
        {renderMessages()}
      </MessageList>

      <InputAreaWithButton onSend={handleSend} text={inputText} setText={setInputText} />

    </ChatRoomContainer>
  );
};

export default ChatBotPage;
