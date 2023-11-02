import React from 'react';
import styled, { keyframes } from 'styled-components';

const Padding = styled.div`
    height: 12vh;
`;

const slideUp = keyframes`
  from {
    transform: translateY(50%);
  }
  to {
    transform: translateY(50%);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  animation: ${slideUp} 0.5s ease-out;
`;

function GameRecommendPage () {
    return (
        <div>
            <Padding />
            <Button>Click Me</Button>
        </div>
    )
}

export default GameRecommendPage;