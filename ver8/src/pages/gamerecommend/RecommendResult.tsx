/* eslint-disable */

import { useState } from 'react'
import { useSpring, useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'

/**
 * Recommend Result 
 *
 * @author 허주혁
 * @todo 
 * 1. 첫 클릭만에 rot 0와 함께 확대 & stack deck 상태일 때도 다중 선택 막기 
 * 3. 새로받기
 * 4. 옆에서 spreading
 */

const cards = [
  'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
  'https://updates.theme-fusion.com/wp-content/uploads/2017/12/acf_pro.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
]

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

const Card = styled(animated.div)<{ bg: string }>`
  background-color: white;
  background-image: url(${props => props.bg});
  background-size: auto 85%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 45vh;
  // max-width: 450px;
  height: 65vh;
  // max-height: 600px;
  will-change: transform;
  border-radius: 10px;
  box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3);
`

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
    x: i * (window.innerWidth / (cards.length + 1)) - window.innerWidth / 3,
    rot: 0,
    scale: 1,
    y: 0,
    delay: i * 30,
  });

  function Deck() {
    const [zoomed, setZoomed] = useState(new Array(cards.length).fill(false));
    const [isSpread, setIsSpread] = useState(false);
    const [zIndices, setZIndices] = useState(Array(cards.length).fill(0));

    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
    const [props, api] = useSprings(cards.length, i => ({
      ...to(i),
      from: from(i),

      // 클릭된 카드가 확대되면 scale을 증가시키고 rotateX를 0으로 설정합니다.
      scale: zoomed[i] ? 1.2 : 1,
      rot: zoomed[i] ? 0 : -10 + Math.random() * 20,
      rotateX: zoomed[i] ? 0 : 30,
      config: { friction: 50, tension: 500 },
    })) // Create a bunch of springs using the helpers above

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
              return isCurrentCardZoomed ? i : 1000; // 이미 확대된 경우 원래 z-index, 아니면 1000
            }
            return i; // 다른 카드는 z-index를 0으로 설정
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

      if (!down && gone.size === cards.length){
        setTimeout(() => {
          gone.clear()
          setIsSpread(true); // spread 상태를 true로 설정

          setZoomed(new Array(cards.length).fill(false)); // zoomed 상태를 초기화합니다.

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
            <Card
              {...bind(i)}
              bg={cards[i]}
              style={{
                transform: interpolate([rot, scale], (r, s) => trans(r, s, zoomed[i] ? 0 : 30)),
                backgroundImage: `url(${cards[i]})`,
              }}
              onClick={() => handleClick(i)} // 카드에 클릭 이벤트 핸들러를 추가합니다.
            />
          </DeckDiv>
        ))}
      </>
    )
  }
  
  export default function RecommendResult() {
    const location = useLocation();
    const { selectedButtons } = location.state || {}; // selectedButtons가 undefined일 경우를 대비한 기본값 설정
    
    console.log("전달 받은 버튼 배열: ",selectedButtons);

    return (
      <Container>
        <Deck />
      </Container>
    )
  }