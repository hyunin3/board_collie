/* eslint-disable */

import { useState, useEffect, createContext } from 'react'
import { useSpring, useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios';
import { fetchRecommendedGames } from '../../apis/gamerecommend/GameRecommendAPI'

// images
import cardPattern from '../../assets/card_pattern.png';

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
  playTimes: { [key: number]: number };
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
  background-image: url(${cardPattern}); // cardPattern 이미지로 배경 설정
  background-size: contain; // 배경 이미지가 카드를 완전히 커버하도록 설정
  background-repeat: no-repeat; // 배경 이미지가 반복되지 않도록 설정
  background-position: center; // 이미지를 카드 중앙에 위치시킴

  width: 39vh;
  height: 64vh;
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
  background: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
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
  background-color: #99582a;
  color: white;
  padding: 1.5vh 4vw;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const GameCard = ({ game, style, onClick, playTimes }: { game: Game; style?: any; onClick?: () => void, playTimes: { [key: number]: number };}) => {
  const navigate = useNavigate();
 
  return (
    <CardWrapper style={style} onClick={onClick}>
      <Similarity>보더콜리 추천도 : {Math.round((game.similarity + Number.EPSILON) * 10000) / 100}%</Similarity>
      <GameImage src={game.image} alt={game.name} />
      <GameTitle>{game.name}</GameTitle>
      <div>플레이타임: {playTimes[game.id]}분</div>
      <DetailButton onClick={() => navigate(`/game/${game.id}`)}>
        게임 상세 페이지로 이동
      </DetailButton>
    </CardWrapper>
  );
};

function Deck({ recommendedGames, playTimes }: DeckProps) {
  const [zoomed, setZoomed] = useState(new Array(recommendedGames.length).fill(false));
  const [isSpread, setIsSpread] = useState(false);
  const [zIndices, setZIndices] = useState(recommendedGames.map((_, i) => i));

  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, api] = useSprings(recommendedGames.length, i => ({
    ...to(i),
    from: from(i),

    // 클릭된 카드가 확대되면 scale을 증가시키고 rotateX를 0으로 설정합니다.
    scale: zoomed[i] ? 1.2 : 1,
    rot: zoomed[i] ? 0 : -10 + Math.random() * 20,
    config: { friction: 50, tension: 500 },
  })) // Create a bunch of springs using the helpers above

  // 카드 클릭 이벤트를 처리합니다.
  const handleClick = (index : number) => {
    const alreadyZoomedIndex = zoomed.findIndex(z => z);
    const isCurrentCardZoomed = zoomed[index];

    if (alreadyZoomedIndex === -1 || isCurrentCardZoomed) {
      // 클릭된 카드의 확대 상태를 토글합니다.
      const newZoomed = zoomed.map((z, i) => (i === index ? !z : z));
      setZoomed(newZoomed);

      if (isSpread) {
          const newZIndices = [...zIndices];
          newZIndices[index] = newZoomed[index] ? 10 : 0; // 선택된 카드의 zIndex를 조정해서 다른 카드들보다 앞에 위치하도록 / 선택되지 않은 카드들은 모두 zIndex 0으로
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
      } else {
        const newZoomed = new Array(recommendedGames.length).fill(false); // 모든 요소를 false로 초기화
        newZoomed[index] = !zoomed[index]; // 현재 클릭된 카드만 토글
        setZoomed(newZoomed);

        api.start(i => {
          if (index !== i) return;
          return {
            y: newZoomed[index] ? 50 : -4, // 확대된 카드는 y 위치를 50으로, 아니면 0으로
            scale: newZoomed[index] ? 1.2 : 1, // 새로운 zoomed 상태에 따라 스케일을 설정
            rot: newZoomed[index] ? 0 : -10 + Math.random() * 20, // 새로운 zoomed 상태에 따라 회전 값을 설정
            immediate: false,
          };
        });
      }

      const rotateXValue = newZoomed[index] ? 0 : 30; // rotateX 계산
      console.log(`Card ${index} rotateX: ${rotateXValue}`); // rotateX 로그 출력
      console.log(zoomed)
    }
  }

  // React Spring의 동작 (useDrag) 정의 파트
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    // Spread 상태일 때는 드래그를 무시합니다.
    if (isSpread) return;

    const trigger = velocity > 0.2 // 강하게 drag 시 spin (돌면서) 퇴장
    const dir = xDir < 0 ? -1 : 1 // 퇴장 방향은 오직 좌우로만

    if (!down && trigger) {
      gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out

      // isSpread가 false이고, 카드가 gone에 추가되면, 해당 카드의 선택을 해제합니다.
      if (!isSpread) {
        const newZoomed = [...zoomed];
        newZoomed[index] = false;
        setZoomed(newZoomed);
      }
    } 
    
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
            <GameCard game={recommendedGames[i]}  playTimes={playTimes}/>
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
  const [playTimes, setPlayTimes] = useState({}); 
  useEffect(() => {
    if (selectedButtons) {
      fetchRecommendedGames(selectedButtons).then((games) => {
        if (games) {
          const reversedGames = [...games].reverse();
          const newCards = reversedGames.map(game => ({
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
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const fetchPlayTime = async (gameId: number) => {
    try {
      const response = await axios.get(`${SERVER_API_URL}/game/detail/${gameId}`);
      if (response.data.success) {
        const playTime = response.data.data.playTime;
        setPlayTimes(prev => ({ ...prev, [gameId]: playTime }));
      }
    } catch (error) {
      console.error("플레이타임 정보를 가져오는데 실패했습니다.", error);
    }
  };
  useEffect(() => {
    recommendedGames.forEach(game => {
      fetchPlayTime(game.id);
    });
  }, [recommendedGames]);

  console.log("전달 받은 버튼 배열: ", selectedButtons);
  console.log("추천 게임 리스트: ", recommendedGames);

  return (
    <Container>
      <Deck recommendedGames={recommendedGames} playTimes={playTimes}/>
    </Container>
  )
}