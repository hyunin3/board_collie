import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";

interface SliderProps {
    children: React.ReactNode;
    // 여기에 Slider 컴포넌트에서 사용할 다른 props를 추가할 수 있습니다.
}

const SliderHolder = styled.div`
    position: relative; // 필요에 따라 position을 지정합니다.
    width: 100%; // 부모의 전체 너비를 차지합니다.
    margin: 0 auto; // 중앙 정렬
    overflow: hidden; // 내부 요소가 넘칠 때 숨김 처리
`;

const SliderItemsHolder = styled(animated.div)`
  display: flex;
  cursor: grab;
  overflow: hidden;
  width: 100%; // 전체 너비를 차지하도록 설정

  &.grabbing {
    cursor: grabbing;
  }

  -ms-overflow-style: none; // IE 10+
  scrollbar-width: none; // Firefox;

  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
`;

export const Slider: React.FC<SliderProps> = ({ children }) => {
    const [{ x }, set] = useSpring(() => ({ x: 0 }));
    const bind = useDrag(({ down, movement: [mx], cancel }) => {
        if (down && Math.abs(mx) > window.innerWidth * 0.5) {
            cancel();
        }
        set({ x: down ? mx : 0, immediate: down });
    });

    return (
        <SliderHolder>
            <SliderItemsHolder
                {...bind()}
                style={{ x }}
            >
                {children}
            </SliderItemsHolder>
        </SliderHolder>
    );
};
