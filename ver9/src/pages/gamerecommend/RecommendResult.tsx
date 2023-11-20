/* eslint-disable */

import { useState, useEffect, createContext } from 'react'
import { useSpring, useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { fetchRecommendedGames } from '../../apis/gamerecommend/GameRecommendAPI'

/**
 * Recommend Result 
 *
 * @author 허주혁
 * @todo 
 * 1. 첫 클릭만에 rot 0와 함께 확대 & stack deck 상태일 때도 다중 선택 막기 
 * 3. 새로받기
 * 4. 옆에서 spreading
 */

interface Game {
  id: number;
  name: string;
  image: string;
  similarity: number;
}

interface DeckProps {
  recommendedGames: Game[];
}

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})

const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1500 })

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number, rotateX: number) =>
  `perspective(1500px) rotateX(${rotateX}deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

const spread = (i: number) => ({
  x: i * (window.innerWidth / (6 + 1)) - window.innerWidth / 3,
  rot: 0,
  scale: 1,
  y: 0,
  delay: i * 30,
});

const Container = styled.div`
  background: lightblue;
  cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39, auto;
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
`

const DeckDiv = styled(animated.div)`
  position: absolute;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
`

const CardWrapper = styled(animated.div)`
  position: relative; // 상대적 위치 설정
  display: flex; // Flexbox 사용
  flex-direction: column; // 자식 요소들을 수직 방향으로 정렬
  align-items: center; // 수직 중앙 정렬
  justify-content: center; // 수평 중앙 정렬

  background-color: white;
  width: 45vh;
  height: 65vh;
  will-change: transform;
  border-radius: 10px;
  box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3);
`;

const GameImage = styled.img`
  width: 80%; // 예시: 너비를 CardWrapper의 80%로 설정
  height: auto; // 높이는 자동으로 설정하여 비율 유지
  margin-top: 10px; // 위로 살짝 이동
  display: block; // 블록 레벨 요소로 설정
  margin-left: auto; // 수평 중앙 정렬을 위해
  margin-right: auto; // 수평 중앙 정렬을 위해
`;

const GameTitle = styled.div`
  margin-top: 10px; 
`;

const Similarity = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
`;

const DetailButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const GameCard = ({ game, style, onClick }: { game: Game; style?: any; onClick?: () => void }) => {
  const navigate = useNavigate();

  return (
    <CardWrapper style={style} onClick={onClick}>
      <Similarity>{Math.round((game.similarity + Number.EPSILON) * 10000) / 100}% 유사도</Similarity>
      <GameImage src={game.image} alt={game.name} />
      <GameTitle>{game.name}</GameTitle>
      <DetailButton onClick={() => navigate(`/game/${game.id}`)}>
        Detail
      </DetailButton>
    </CardWrapper>
  );
};

// GameCard를 animated 컴포넌트로 변경
const AnimatedGameCard = animated(GameCard);

function Deck({ recommendedGames }: DeckProps) {
  const [zoomed, setZoomed] = useState(new Array(recommendedGames.length).fill(false));
  const [isSpread, setIsSpread] = useState(false);
  const [zIndices, setZIndices] = useState(Array(recommendedGames.length).fill(0));

  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, api] = useSprings(recommendedGames.length, i => ({
    ...to(i),
    from: from(i),

    // 클릭된 카드가 확대되면 scale을 증가시키고 rotateX를 0으로 설정합니다.
    scale: zoomed[i] ? 1.2 : 1,
    rot: zoomed[i] ? 0 : -10 + Math.random() * 20,
    rotateX: zoomed[i] ? 0 : 30,
    config: { friction: 50, tension: 500 },
  })) // Create a bunch of springs using the helpers above

  useEffect(() => {
    if (recommendedGames.length > 0) {
      api.start(i => ({
        ...to(i),
        from: from(i)
      }));
    }
  }, [recommendedGames, api]); // recommendedGames 배열이 변경될 때 useEffect 실행
  

  // 카드 클릭 이벤트를 처리합니다.
  const handleClick = (index : number) => {
    if (isSpread) {
      // Spread 상태에서 이미 확대된 카드가 있는지 확인합니다.
      const alreadyZoomedIndex = zoomed.findIndex(z => z);
      const isCurrentCardZoomed = zoomed[index];

      // 이미 확대된 카드가 없거나 현재 클릭된 카드가 이미 확대된 카드인 경우에만 동작합니다.
      if (alreadyZoomedIndex === -1 || isCurrentCardZoomed) {
        // 클릭된 카드의 확대 상태를 토글합니다.
        const newZoomed = zoomed.map((z, i) => (i === index ? !z : z));
        setZoomed(newZoomed);

        // z-index를 업데이트
        const newZIndices = zIndices.map((_, i) => {
          if (i === index) {
            // return isCurrentCardZoomed ? i : 1000; // 이미 확대된 경우 원래 z-index, 아니면 1000
            return newZoomed[index] ? 1000 : i; // 확대된 경우 1000, 아니면 원래 z-index
          }
          return i; // 다른 카드는 z-index를 i으로 설정
        });
        setZIndices(newZIndices);

        api.start(i => {
          if (index !== i) return;
          return {
            x: newZoomed[index] ? 0 : spread(i).x,
            y: newZoomed[index] ? 50 : 0, // 확대된 카드를 위로 이동
            scale: newZoomed[index] ? 1.2 : 1, // 클릭 시 스케일을 토글합니다.
            immediate: false,
          };
        });
      }
    } else {
      // 선택된 카드의 확대 상태를 토글합니다.
      setZoomed(zoomed.map((z, i) => (i === index ? !z : z)));
      // api를 사용하여 선택된 카드의 스프링 속성을 업데이트합니다.
      api.start(i => {
        if (index !== i) return;
        const newY = zoomed[i] ? -4 : 50;
        return {
          y: newY,
          scale: zoomed[i] ? 1 : 1.2, // 클릭 시 스케일을 토글합니다.
          rot: zoomed[i] ? -10 + Math.random() * 20 : 0, // 클릭 시 회전 값을 토글합니다.
          rotateX: zoomed[i] ? 30 : 0,
        };
      });
    }
  };

  // React Spring의 동작 (useDrag) 정의 파트
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    // Spread 상태일 때는 드래그를 무시합니다.
    if (isSpread) return;

    const trigger = velocity > 0.2 // 강하게 drag 시 spin (돌면서) 퇴장
    const dir = xDir < 0 ? -1 : 1 // 퇴장 방향은 오직 좌우로만

    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    
    api.start(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      }
    })

    if (!down && gone.size === recommendedGames.length){
      setTimeout(() => {
        gone.clear()
        setIsSpread(true); // spread 상태를 true로 설정

        setZoomed(new Array(recommendedGames.length).fill(false)); // zoomed 상태를 초기화합니다.

        api.start(i => ({
          ...spread(i),
          from:from(i),
          immediate: false,
        }));
      }, 600)
    }
  })

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <DeckDiv key={i} style={{ x, y, zIndex: zIndices[i] }}>
          <CardWrapper {...bind(i)} style={{ transform: interpolate([rot, scale], (r, s) => trans(r, s, zoomed[i] ? 0 : 30)) }} onClick={() => handleClick(i)}>
            <AnimatedGameCard
              game={recommendedGames[i]}
            />
          </CardWrapper>
        </DeckDiv>
      ))}
    </>
  )  
}

export default function RecommendResult() {
  const location = useLocation();
  const { selectedButtons } = location.state || {}; // selectedButtons가 undefined일 경우를 대비한 기본값 설정
  const [recommendedGames, setRecommendedGames] = useState<Game[]>([]);

  useEffect(() => {
    if (selectedButtons) {
      fetchRecommendedGames(selectedButtons).then((games) => {
        if (games) {
          const newCards = games.map(game => ({
            id: game.id,
            name: game.name,
            image: game.image || '기본 이미지 URL',
            similarity: game.similarity,
          }));
          setRecommendedGames(newCards);
        }
      });
    }
  }, [selectedButtons]);

  console.log("전달 받은 버튼 배열: ", selectedButtons);
  console.log("추천 게임 리스트: ", recommendedGames);

  return (
    <Container>
      <Deck recommendedGames={recommendedGames} />
    </Container>
  )
}