// styles
import styled from 'styled-components';

const ChatBubbleBlock = styled.div`
  margin: 0px;
  display: block;
  position: relative;
  width: 60vw;
  background-color: #E9E9EB;
  border-radius: 20px;
`;

const Triangle = styled.div<{ position: string }>`
  &::before,
  &::after {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    border: 20px solid;
  }

  &::before {
    ${props => {
      switch (props.position) {
        case 'left':
          return `
            left: -40px;
            top: 30px;
            border-color: transparent transparent;
          `;
        case 'right':
          return `
            right: -40px;
            top: 30px;
            border-color: transparent transparent;
          `;
        default:
          return '';
      }
    }}
  }

  &::after {
    ${props => {
      switch (props.position) {
        case 'left':
          return `
            left: -25px;
            top: 30px;
            border-color: #E9E9EB #E9E9EB transparent transparent;
          `;
        case 'right':
          return `
            right: -25px;
            top: 30px;
            border-color: #E9E9EB transparent transparent #E9E9EB;
          `;
        default:
          return '';
      }
    }}
  }
`;

const TalkText = styled.div`
  padding: 1em;
  text-align: left;
  line-height: 1.5em;
  font-size: 1.3rem;
  font-weight: 550;
  font-family: 'Arial, sans-serif'; 

  p {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

interface ChatBubbleProps {
    position: string;
    children: React.ReactNode; // children prop을 추가
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ position, children }) => (
    <ChatBubbleBlock>
    <Triangle position={position} />
    <TalkText>
        {children}
    </TalkText>
    </ChatBubbleBlock>
);

export default ChatBubble;
