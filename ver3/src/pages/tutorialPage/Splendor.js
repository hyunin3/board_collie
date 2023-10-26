import styled from 'styled-components';
import { useState, useEffect } from "react";
import TutorialStartComponent from "../../components/tutorial/TutorialStartComponent";

/* 스타일 */
const SplenderContainer = styled.div`

`;

function Splender() {

    const [page, setPage] = useState(0);
    const flow = [
        [ // 0: 튜토리얼 시작 페이지
            'TutorialStartComponent', // 템플릿
            process.env.PUBLIC_URL + '/tutorial/splendor/title.png', // 타이틀 이미지
            '스플렌더', // 타이틀
            '인원 수별 세팅 방법이 달라집니다.\n인원수를 다시 한번 확인해 주세요.', // 추가 메시지
            'START', 1 // 버튼, 이동 페이지 flow 번호
        ],
        [
            // 1: 게임 세팅 페이지
            'GameSettingComponent', // 템플릿
            
        ]
    ]

    useEffect(() => {
        console.log(page);
    }, [page])

    return (
        <SplenderContainer>
            {
                (flow[page] && flow[page][0] === 'TutorialStartComponent') ?
                <TutorialStartComponent
                    title_image={flow[page][1]}
                    title={flow[page][2]}
                    message={flow[page][3]}
                    button1={flow[page][4]}
                    movePage1={flow[page][5]}
                    setPage={setPage}
                />
                :
                null
            }
        </SplenderContainer>
    )
}

export default Splender;
