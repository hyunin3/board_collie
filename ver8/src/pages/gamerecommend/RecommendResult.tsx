/* eslint-disable */

import { useState } from 'react'
import { useSpring, useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import styled from 'styled-components'

import { Slider } from '../../components/common/slider/Slider'

/**
 * Recommend Result 
 *
 * @author 허주혁
 * @todo 
 * 1. 첫 클릭만에 rot 0와 함께 확대
 * 2. 마지막 카드까지 useDrag 후엔 일자 슬라이드 형식의 UI로 전환
 * 3. 새로받기
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
  
  function Deck() {
    const [zoomed, setZoomed] = useState(new Array(cards.length).fill(false));
    const [showSlider, setShowSlider] = useState(false);

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
    };

    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right

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
        // setTimeout(() => {
        //   gone.clear()
        //   setZoomed(new Array(cards.length).fill(false)); // zoomed 상태를 초기화합니다.
        //   api.start(i => ({
        //     ...to(i),
        //     from: from(i),
        //     scale: 1, // scale 값을 초기화합니다.
        //     rot: -10 + Math.random() * 20, // rot 값을 초기화합니다.
        //     rotateX: 30, // rotateX 값을 초기화합니다.
        //     immediate: false, // 애니메이션을 적용하기 위해 immediate를 false로 설정합니다.
        //   }));
        // }, 600)
      }
    })

    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return (
        <>
        {props.map(({ x, y, rot, scale }, i) => (
          <DeckDiv key={i} style={{ x, y }}>
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
    return (
      <Container>
        <Deck />
      </Container>
    )
  }