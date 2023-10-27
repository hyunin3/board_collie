import styled from 'styled-components';
import { useState, useEffect } from "react";
import TutorialStartComponent from "../../components/tutorial/TutorialStartComponent";
import GameSettingComponent from "../../components/tutorial/GameSettingComponent";

/* 스타일 */
const SplenderContainer = styled.div`
    height: 100%;
`;

function Splender({players, setBackgroundImage}) {

    const settingIndex = players > 4 ? 2 : players - 2;
    const [page, setPage] = useState(0);
    // const info = [

    // ];

    const settingImage = '/tutorial/splendor/setting';
    const setting = [
        [ // 0: 2명 세팅
            [
                settingImage + '1.png', // 1번 세팅 이미지
                '개발 카드를 같은 단계별로 나눠서 섞어준 후,\n테이블 중앙에 위와 같은 순서로 세로 열을 이루게 놓아주세요.' // 1번 세팅 설명
            ],
            [
                settingImage + '2.png', // 2번 세팅 이미지
                '각 단계별 개발 카드를 4장씩 펼쳐 놓아주세요.' // 2번 세팅 설명
            ],
            [
                settingImage + '3-2.png', // 3번 세팅 이미지
                '귀족 타일을 섞은 다음 3개를 펼쳐 놓아주세요.\n남은 타일은 게임 중에 사용되지 않으므로 상자에 다시 넣어 둡시다.' // 3번 세팅 설명
            ],
            [
                settingImage + '4.png', // 4번 세팅 이미지
                '마지막으로 집기 좋은 위치에 토큰을 색깔별로 분류하여 쌓아 놓아주세요.\n(황금 조커 토큰은 5개 모두 놓아주시고, 나머지 토큰들은 4개씩만 놓아주세요.)' // 4번 세팅 설명
            ]
        ],
        [ // 1: 3명 세팅
            [
                settingImage + '1.png', // 1번 세팅 이미지
                '개발 카드를 같은 단계별로 나눠서 섞어준 후,\n테이블 중앙에 위와 같은 순서로 세로 열을 이루게 놓아주세요.' // 1번 세팅 설명
            ],
            [
                settingImage + '2.png', // 2번 세팅 이미지
                '각 단계별 개발 카드를 4장씩 펼쳐 놓아주세요.' // 2번 세팅 설명
            ],
            [
                settingImage + '3-3.png', // 3번 세팅 이미지
                '귀족 타일을 섞은 다음 4개를 펼쳐 놓아주세요.\n남은 타일은 게임 중에 사용되지 않으므로 상자에 다시 넣어 둡시다.' // 3번 세팅 설명
            ],
            [
                settingImage + '4.png', // 4번 세팅 이미지
                '마지막으로 집기 좋은 위치에 토큰을 색깔별로 분류하여 쌓아 놓아주세요.\n(황금 조커 토큰은 5개 모두 놓아주시고, 나머지 토큰들은 5개씩만 놓아주세요.)' // 4번 세팅 설명
            ]
        ],
        [ // 2: 4명 세팅
            [
                settingImage + '1.png', // 1번 세팅 이미지
                '개발 카드를 같은 단계별로 나눠서 섞어준 후,\n테이블 중앙에 위와 같은 순서로 세로 열을 이루게 놓아주세요.' // 1번 세팅 설명
            ],
            [
                settingImage + '2.png', // 2번 세팅 이미지
                '각 단계별 개발 카드를 4장씩 펼쳐 놓아주세요.' // 2번 세팅 설명
            ],
            [
                settingImage + '3-4.png', // 3번 세팅 이미지
                '귀족 타일을 섞은 다음 5개를 펼쳐 놓아주세요.\n남은 타일은 게임 중에 사용되지 않으므로 상자에 다시 넣어 둡시다.' // 3번 세팅 설명
            ],
            [
                settingImage + '4.png', // 4번 세팅 이미지
                '마지막으로 집기 좋은 위치에 토큰을 색깔별로 분류하여 쌓아 놓아주세요.' // 4번 세팅 설명
            ]
        ]
    ]
    const flow = [
        [ // 0: 튜토리얼 시작 페이지
            'TutorialStartComponent', // 템플릿
            '/tutorial/splendor/title.png', // 타이틀 이미지
            '스플렌더', // 타이틀
            '인원 수별 세팅 방법이 달라집니다.\n인원수를 다시 한번 확인해 주세요.', // 추가 메시지
            'START', 1 // 버튼, 이동 페이지 flow 번호
        ],
        [ // 1: 게임 세팅 페이지
            'GameSettingComponent', // 템플릿
            setting, // 세팅 플로우 전달
            2 // 다음 페이지 flow 번호
        ]
    ];

    useEffect(() => {
        if(page === 0) {
            setBackgroundImage(process.env.PUBLIC_URL + '/tutorial/splendor/background1.jpg');
        }
        else {
            setBackgroundImage(process.env.PUBLIC_URL + '/tutorial/splendor/background2.jpg');
        }
    }, [page, setBackgroundImage])

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
                (flow[page] && flow[page][0] === 'GameSettingComponent') ?
                    <GameSettingComponent
                        settingList={flow[page][1][settingIndex]}
                        setPage={setPage}
                        nextPage={flow[page][2]}
                    />
                :
                null
            }
        </SplenderContainer>
    )
}

export default Splender;