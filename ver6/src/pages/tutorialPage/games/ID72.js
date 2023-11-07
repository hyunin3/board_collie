/* Splendor 스플렌더 */

import styled from 'styled-components';
import { useState, useEffect } from "react";

import ChatbotQRComponent from '../../../components/tutorial/ChatbotQRComponent';
import GameSettingComponent from "../../../components/tutorial/GameSettingComponent";
import ImageAndContentComponent from '../../../components/tutorial/ImageAndContentComponent';
import TitleAndContentAndFourButtonComponent from '../../../components/tutorial/TitleAndContentAndFourButtonComponent';
import TitleAndContenAndTwoButtonComponent from '../../../components/tutorial/TitleAndContentAndTwoButtonComponent';
import TitleAndImageAndContentAndOneButtonComponent from '../../../components/tutorial/TitleAndImageAndContentAndOneButtonComponent';
import TitleAndTwoButtonComponent from '../../../components/tutorial/TitleAndTwoButtonComponent';
import TitleComponent from '../../../components/tutorial/TitleComponent';
import TutorialEndComponent from '../../../components/tutorial/TutorialEndComponent';
import TutorialStartComponent from "../../../components/tutorial/TutorialStartComponent";

/* 이미지 */
const title = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/title.png';
const background1 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/background1.jpg';
const background2 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/background2.jpg';
const background3 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/background3.jpg';
const chatbot = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/chatbot/qr/QR72.jpg';
const info1 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/info1.png';
const info2 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/info2.png';
const info3 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/info3.png';
const setting1 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/setting1.jpg';
const setting2 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/setting2.jpg';
const setting3_2 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/setting3-2.jpg';
const setting3_3 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/setting3-3.jpg';
const setting3_4 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/setting3-4.jpg';
const setting4_2 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/setting4-2.jpg';
const setting4_3 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/setting4-3.jpg';
const setting4_4 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/setting4-4.jpg';
const summary1 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/summary1.png';
const summary2 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/summary2.png';
const summary3 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/summary3.png';
const summary4 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/summary4.png';
const contentImg1 = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/summary2.png';

/* bgm */
const backgroundMusic = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/72/background-music.mp3';

/* 스타일 */
const SplenderContainer = styled.div`
    height: 100%;
`;

function Splender({players, setBackgroundImage, bgmIsPlaying, setBgmIsPlaying}) {

    const settingIndex = players > 4 ? 2 : players - 2;
    const [page, setPage] = useState(0);

    /* 세팅 관련 */
    const setting = [
        [ // 0: 2명 세팅
            [
                setting1, // 1번 세팅 이미지
                '개발 카드를 같은 단계별로 나눠서 위와 같은 순서로 세로 열을 이루게 놓아주세요.' // 1번 세팅 설명
            ],
            [
                setting2, // 2번 세팅 이미지
                '각 단계별 개발 카드를 4장씩 펼쳐 놓아주세요.' // 2번 세팅 설명
            ],
            [
                setting3_2, // 3번 세팅 이미지
                '귀족 타일을 섞은 다음 <RedText>3개</RedText>를 펼쳐 놓아주세요.\n(귀족 타일은 인원수 + 1개 놓아줍니다.)\n\n남은 타일은 게임 중에 사용되지 않으므로 상자에 다시 넣어 둡시다.' // 3번 세팅 설명
            ],
            [
                setting4_2, // 4번 세팅 이미지
                '토큰을 색깔별로 분류하여 쌓아 놓아주세요.\n\n황금 조커 토큰: <RedText>5개</RedText>\n나머지 토큰: <RedText>4개</RedText> (2명: 4개, 3명: 5개, 4명: 7개)' // 4번 세팅 설명
            ]
        ],
        [ // 1: 3명 세팅
            [
                setting1, // 1번 세팅 이미지
                '개발 카드를 같은 단계별로 나눠서 위와 같은 순서로 세로 열을 이루게 놓아주세요.' // 1번 세팅 설명
            ],
            [
                setting2, // 2번 세팅 이미지
                '각 단계별 개발 카드를 4장씩 펼쳐 놓아주세요.' // 2번 세팅 설명
            ],
            [
                setting3_3, // 3번 세팅 이미지
                '귀족 타일을 섞은 다음 <RedText>4개</RedText>를 펼쳐 놓아주세요.\n(귀족 타일은 인원수 + 1개 놓아줍니다.)\n\n남은 타일은 게임 중에 사용되지 않으므로 상자에 다시 넣어 둡시다.' // 3번 세팅 설명
            ],
            [
                setting4_3, // 4번 세팅 이미지
                '토큰을 색깔별로 분류하여 쌓아 놓아주세요.\n\n황금 조커 토큰: <RedText>5개</RedText>\n나머지 토큰: <RedText>5개</RedText> (2명: 4개, 3명: 5개, 4명: 7개)' // 4번 세팅 설명
            ]
        ],
        [ // 2: 4명 세팅
            [
                setting1, // 1번 세팅 이미지
                '개발 카드를 같은 단계별로 나눠서 위와 같은 순서로 세로 열을 이루게 놓아주세요.' // 1번 세팅 설명
            ],
            [
                setting2, // 2번 세팅 이미지
                '각 단계별 개발 카드를 4장씩 펼쳐 놓아주세요.' // 2번 세팅 설명
            ],
            [
                setting3_4, // 3번 세팅 이미지
                '귀족 타일을 섞은 다음 <RedText>5개</RedText>를 펼쳐 놓아주세요.\n(귀족 타일은 인원수 + 1개 놓아줍니다.)\n\n남은 타일은 게임 중에 사용되지 않으므로 상자에 다시 넣어 둡시다.' // 3번 세팅 설명
            ],
            [
                setting4_4, // 4번 세팅 이미지
                '토큰을 색깔별로 분류하여 쌓아 놓아주세요.\n\n황금 조커 토큰: <RedText>5개</RedText>\n나머지 토큰: <RedText>7개</RedText> (2명: 4개, 3명: 5개, 4명: 7개)' // 4번 세팅 설명
            ]
        ]
    ];
    const [settingStartPage, setSettingStartPage] = useState(0);

    /* 세팅 정보 관련 */
    const settingInfo = [
        [
            info1,
            '토큰 총 40장'
        ],
        [
            info2,
            '개발 카드 총 90장'
        ],
        [
            info3,
            '귀족 타일 총 10개'
        ],
    ];

    /* 튜토리얼 플로우 관련 */
    const flow = [
        [ // 0: 튜토리얼 시작 페이지
            'TutorialStartComponent', // 템플릿
            title, // 타이틀 이미지
            '스플렌더', // 타이틀
            '인원수별 세팅 방법이 달라집니다.\n인원수를 다시 한번 확인해 주세요.', // 추가 메시지
            'START', 18 // 버튼, 이동 페이지 flow 번호
        ],
        [ // 1: 게임 세팅 페이지
            'GameSettingComponent', // 템플릿
            setting, // 세팅 플로우 전달
            19, // 이전 페이지 flow 번호
            2 // 다음 페이지 flow 번호
        ],
        [ // 2: 튜토리얼 시작 페이지
            'TitleComponent', // 템플릿
            '모든 준비가 완료되었습니다!\n이제부터 게임을 시작해봅시다.', // 타이틀 내용
            1, // 이전 페이지 flow 번호
            20 // 다음 페이지 flow 번호
        ],
        [ // 3: 액션 수행
            'TitleAndContentAndFourButtonComponent', // 템플릿
            '가장 어린 플레이어부터 시작합니다!', // title
            '다음 4가지 액션 중\n하나를 선택하여 수행할 수 있습니다.', // content
            [ // 버튼 내용
                [4, '각기 다른 색깔의 토큰 3개 가져가기'],
                [5, '같은 색깔의 토큰 2개 가져가기'],
                [6, '개발 카드 찜하기'],
                [7, '개발 카드 1장 구매하기']
            ],
            27 // 이전 페이지 flow 번호
        ],
        [ // 4: 선택 액션 설명
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '각기 다른 색깔의 토큰\n3개를 가져가시겠습니까?', // title
            '토큰이 잘 보이도록 앞에 놓아주세요.\n\n토큰은 10개까지만 가지고 있을 수 있습니다.\n원하는 토큰을 남기고 나머지는 버려주세요.', // content
            null, // additional information
            [ // 버튼 내용
                [9, '예, 가져갈래요.'],
                [3, '다른 액션 선택할래요.']
            ],
            3 // 이전 페이지 flow 번호
        ],
        [ // 5: 선택 액션 설명
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '같은 색깔의 토큰을\n2개 가져가시겠습니까?', // title
            '가져가려는 토큰이 <RedText>4개 이상</RedText>일때만\n같은 색깔의 토큰을 2개 가져갈 수 있습니다.\n\n토큰은 10개까지만 가지고 있을 수 있습니다.\n원하는 토큰을 남기고 나머지는 버려주세요.', // content
            null, // additional information
            [ // 버튼 내용
                [9, '예, 가져갈래요.'],
                [3, '다른 액션 선택할래요.']
            ],
            3 // 이전 페이지 flow 번호
        ],
        [ // 6: 선택 액션 설명
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '개발 카드를 찜하시겠습니까?', // title
            '테이블에 펼쳐진 개발 카드나\n개발 카드 더미의 맨 위 카드 1장을 골라 손에 듭니다!\n이때 황금 조커 토큰을 하나 가져오세요.\n\n손에는 <RedText>3장까지만</RedText> 들 수 있습니다.\n\n빈 자리에 같은 단계의 카드를 새로 펼쳐주세요.', // content
            [ // additional information
                '💎 황금 조커 토큰은 다른 보석 토큰을 대체해 사용할 수 있습니다.',
                '💎 찜할 카드의 내용을 다른 플레이어에게 보여주지 않아도 됩니다.',
                '💎 한번 손에 든 카드는 게임 중에 버릴 수 없으며, 구매하는 것 말고는 없앨 방법이 없습니다.',
                '💎 황금 조커 토큰이 남아있지 않아도 찜할 수 있습니다.',
                '💎 찜한 카드를 전부 구매할 필요는 없습니다.',
            ],
            [ // 버튼 내용
                [9, '예, 찜 할래요.'],
                [3, '다른 액션 선택할래요.']
            ],
            3 // 이전 페이지 flow 번호
        ],
        [ // 7: 선택 액션 설명
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '개발 카드 1장을 구매하시겠습니까?', // title
            '카드에 표시된 만큼의 토큰을 내야하고,\n<RedText>가지고 있는 보너스만큼 할인</RedText> 받을 수 있습니다.\n\n사용한 토큰은 돌려 놓습니다.\n\n빈 자리에 같은 단계의 카드를 새로 펼쳐주세요.', // content
            [ // additional information
                '💎 황금 조커 토큰은 어떤 색깔의 토큰이든 대체할 수 있습니다.',
                '💎 테이블에 펼쳐진 개발 카드나 찜한 개발 카드 중 하나를 구매할 수 있습니다.',
                '💎 토큰 없이, 보너스만으로 개발 카드를 구매할 수 있습니다.',
                '💎 구매한 개발 카드는 보너스와 승점이 누구나 잘 보이게 정렬해 놓습니다.',
            ],
            [ // 버튼 내용
                [8, '예, 구매할래요.'],
                [3, '다른 액션 선택할래요.']
            ],
            3 // 이전 페이지 flow 번호
        ],
        [ // 8:  액션 선택 이후 정보 전달
            'TitleAndImageAndContentAndOneButtonComponent', // 템플릿
            '개발 카드를 구매했다면 확인해주세요!', // title
            contentImg1, // image
            '귀족 타일에 표시된 만큼의 카드를 보유하고 있다면\n<RedText>귀족 타일 획득</RedText> 가능합니다.\n\n귀족 카드는 <RedText>한 차례에 하나만</RedText> 얻을 수 있습니다.', // content
            9, '확인했어요.', // 버튼 내용
            7 // 이전 페이지 flow 번호
        ],
        [ // 9: 다음 플레이어 턴
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '다음 플레이어 차례입니다.', // title
            '모든 플레이어가 시계 방향으로 돌아가며\n전과 같은 방법으로 액션을 골라 플레이 해주세요.', // content
            null, // additional information
            [ // 버튼 내용
                [15, '모든 플레이어가 한 번씩 액션을 완료했어요.'],
                [10, '액션 다시 확인할래요.']
            ],
            3 // 이전 페이지 flow 번호
        ],
        [ // 10: 액션 수행
            'TitleAndContentAndFourButtonComponent', // 템플릿
            '한 턴에 다음 4가지의 액션 중\n하나를 선택하여 수행할 수 있습니다.', // title
            null, // content
            [ // 버튼 내용
                [11, '각기 다른 색깔의 보석 토큰 3개 가져가기'],
                [12, '같은 색깔의 보석 2개 가져가기'],
                [13, '개발 카드 찜하기'],
                [14, '개발 카드 1장 구매하기']
            ],
            9 // 이전 페이지 flow 번호
        ],
        [ // 11: 선택 액션 설명
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '각기 다른 색깔의 토큰\n3개를 가져가시겠습니까?', // title
            '토큰이 잘 보이도록 앞에 놓아주세요.\n\n토큰은 10개까지만 가지고 있을 수 있습니다.\n원하는 토큰을 남기고 나머지는 버려주세요.', // content
            null, // additional information
            [ // 버튼 내용
                [10, '다른 액션 설명도 보기'],
                [9, '이제 그만 볼래요.']
            ],
            10 // 이전 페이지 flow 번호
        ],
        [ // 12: 선택 액션 설명
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '같은 색깔의 토큰을\n2개 가져가시겠습니까?', // title
            '가져가려는 토큰이 <RedText>4개 이상</RedText>일때만\n같은 색깔의 토큰을 2개 가져갈 수 있습니다.\n\n토큰은 10개까지만 가지고 있을 수 있습니다.\n원하는 토큰을 남기고 나머지는 버려주세요.', // content
            null, // additional information
            [ // 버튼 내용
                [10, '다른 액션 설명도 보기'],
                [9, '이제 그만 볼래요.']
            ],
            10 // 이전 페이지 flow 번호
        ],
        [ // 13: 선택 액션 설명
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '개발 카드를 찜하시겠습니까?', // title
            '테이블에 펼쳐진 개발 카드나\n개발 카드 더미의 맨 위 카드 1장을 골라 손에 듭니다!\n이때 황금 조커 토큰을 하나 가져오세요.\n\n손에는 <RedText>3장까지만</RedText> 들 수 있습니다.\n\n빈 자리에 같은 단계의 카드를 새로 펼쳐주세요.', // content
            [ // additional information
                '💎 황금 조커 토큰은 다른 보석 토큰을 대체해 사용할 수 있습니다.',
                '💎 찜할 카드의 내용을 다른 플레이어에게 보여주지 않아도 됩니다.',
                '💎 한번 손에 든 카드는 게임 중에 버릴 수 없으며, 구매하는 것 말고는 없앨 방법이 없습니다.',
                '💎 황금 조커 토큰이 남아있지 않아도 찜할 수 있습니다.',
                '💎 찜한 카드를 전부 구매할 필요는 없습니다.',
            ],
            [ // 버튼 내용
                [10, '다른 액션 설명도 보기'],
                [9, '이제 그만 볼래요.']
            ],
            10 // 이전 페이지 flow 번호
        ],
        [ // 14: 선택 액션 설명
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '개발 카드 1장을 구매하시겠습니까?', // title
            '카드에 표시된 만큼의 토큰을 내야하고,\n<RedText>가지고 있는 보너스만큼 할인</RedText> 받을 수 있습니다.\n\n사용한 토큰은 돌려 놓습니다.\n\n빈 자리에 같은 단계의 카드를 새로 펼쳐주세요.', // content
            [ // additional information
                '💎 황금 조커 토큰은 어떤 색깔의 토큰이든 대체할 수 있습니다.',
                '💎 테이블에 펼쳐진 개발 카드나 찜한 개발 카드 중 하나를 구매할 수 있습니다.',
                '💎 토큰 없이, 보너스만으로 개발 카드를 구매할 수 있습니다.',
                '💎 구매한 개발 카드는 보너스와 승점이 누구나 잘 보이게 정렬해 놓습니다.',
            ],
            [ // 버튼 내용
                [10, '다른 액션 설명도 보기'],
                [9, '이제 그만 볼래요.']
            ],
            10 // 이전 페이지 flow 번호
        ],
        [ // 15: 한 턴 끝
            'TitleComponent', // 템플릿
            '잘 하셨습니다!\n이런 방식으로 계속 턴이 진행됩니다!', // 타이틀 내용
            9, // 이전 페이지 flow 번호
            16 // 다음 페이지 flow 번호
        ],
        [ // 16: 플레이 대기
            'TitleAndTwoButtonComponent', // 템플릿
            '게임 진행 중\n한 플레이어의 점수가\n<RedText>15점 이상</RedText>이 되었다면\n저를 다시 불러주세요!', // title
            [ // 버튼 내용
                [17, '질문 있어요!'],
                [25, '15점이 되었어요!']
            ],
            15 // 이전 페이지 flow 번호
        ],
        [ // 17: 챗봇
            'ChatbotQRComponent', // 템플릿
            chatbot, // qr url
            16
        ],
        [ // 18: 인트로(1)
            'TitleComponent', // 템플릿
            '<TypeIt>스플렌더에서 플레이어들은<br/>르네상스 시기의<br/>👳‍♀️부유한 상인👳‍♂️<br/>역할을 맡습니다.</TypeIt>', // 타이틀 내용
            0, // 이전 페이지 flow 번호
            19 // 다음 페이지 flow 번호
        ],
        [ // 19: 인트로(2)
            'TitleComponent', // 템플릿
            '<TypeIt>플레이어는<br/>자신의 자원을 사용하여<br/>광산이나 교통 수단을 얻고,<br/>당신의 원석을 아름다운 보석으로 바꿔줄<br/>장인을 고용할 수 있습니다.</TypeIt>', // 타이틀 내용
            18, // 이전 페이지 flow 번호
            1 // 다음 페이지 flow 번호
        ],
        [ // 20: 개요(1)
            'TitleComponent', // 템플릿
            '<TypeIt>한 플레이어가<br/>🏆승점 15점 이상🏆<br/>모으면 승리합니다!</TypeIt>', // 타이틀 내용
            2, // 이전 페이지 flow 번호
            21 // 다음 페이지 flow 번호
        ],
        [ // 21: 개요(2)
            'ImageAndContentComponent', // 템플릿
            summary1, // image
            '<TypeIt>토큰으로<br/>개발 카드를 구매하여<br/>승점과 보너스를 얻을 수 있습니다.</TypeIt>', // content
            20, // 이전 페이지 flow 번호
            22 // 다음 페이지 flow 번호
        ],
        [ // 22: 개요(3)
            'ImageAndContentComponent', // 템플릿
            summary2, // image
            '<TypeIt>보너스를 충분히 확보한 순간<br/>귀족👸이 방문합니다!<br/><br/>귀족은 승점을 제공합니다.</TypeIt>', // content
            21, // 이전 페이지 flow 번호
            23 // 다음 페이지 flow 번호
        ],
        [ // 23: 개요(4)
            'ImageAndContentComponent', // 템플릿
            summary3, // image
            '<TypeIt>또한, 보너스는<br/>앞으로 구매할 개발 카드의 비용을 줄여줍니다.</TypeIt>', // content
            22, // 이전 페이지 flow 번호
            27 // 다음 페이지 flow 번호
        ],
        [ // 24: 15점이 되었을 때
            'TitleComponent', // 템플릿
            '모든 플레이어가\n같은 횟수의 액션을 수행할 수 있게\n차례를 마저 진행해주세요.', // 타이틀 내용
            16, // 이전 페이지 flow 번호
            25 // 다음 페이지 flow 번호
        ],
        [ // 25
            'TitleComponent', // 템플릿
            '모두 자신의 점수를 합산해주세요.\n\n🎯귀족 승점🎯을 잊지마세요!', // 타이틀 내용
            24, // 이전 페이지 flow 번호
            26 // 다음 페이지 flow 번호
        ],
        [ // 26
            'TutorialEndComponent', // 템플릿
            title, // image
            '승점이 가장 높은 플레이어가 🎉승자🎉입니다!', // content
            [
                '🎉 동점일 경우 귀족 타일을 제외한 카드를 더 적게 가지고 있는 분이 승리합니다.',
                '🎉 그것도 같다면, 귀족 타일을 더 많이 가지고 있는 분이 승리합니다.',
                '🎉 그것도 같다면, 토큰이 더 많이 가지고 있는 분이 승리합니다.',
            ], // additional information
            25 // 이전 페이지 flow 번호
        ],
        [ // 27: 개요(5)
            'ImageAndContentComponent', // 템플릿
            summary4,
            '<TypeIt>개발 카드를 나만 구입할 수 있게<br/>찜할 수도 있습니다!<br/>이때 황금 조커 토큰을 가져올 수 있고,<br/>다른 토큰을 대신해서 사용할 수 있습니다.</TypeIt>', // content
            23, // 이전 페이지 flow 번호
            3 // 다음 페이지 flow 번호
        ],
    ];

    /* 배경사진 관련 */
    useEffect(() => {
        if(page === 0) {
            setBackgroundImage(background1);
        }
        else if(page === 1) {
            setBackgroundImage(background2);
        }
        else {
            setBackgroundImage(background3);
        }
    }, [page, setBackgroundImage])

    /* 배경음악 */
    const [audio] = useState(new Audio(backgroundMusic));
    useEffect(() => {
        audio.loop = true;

        return () => {
            audio.pause();
        };
    }, [audio])
    useEffect(() =>{
        if(bgmIsPlaying === 'on') {
            audio.play();
        }
        else {
            audio.pause();
        }
    }, [bgmIsPlaying, audio]);

    return (
        <SplenderContainer>
            {
                (flow[page] && flow[page][0] === 'TutorialStartComponent') ?
                    <TutorialStartComponent
                        title_image={flow[page][1]}
                        title={flow[page][2]}
                        message={flow[page][3]}
                        button1={flow[page][4]}
                        audio={audio}
                        setBgmIsPlaying={setBgmIsPlaying}
                        movePage1={flow[page][5]}
                        setPage={setPage}
                    />
                :
                (flow[page] && flow[page][0] === 'GameSettingComponent') ?
                    <GameSettingComponent
                        settingList={flow[page][1][settingIndex]}
                        infoList={settingInfo}
                        startStep={settingStartPage}
                        setSettingStartPage={setSettingStartPage}
                        setPage={setPage}
                        prePage={flow[page][2]}
                        nextPage={flow[page][3]}
                    />
                :
                (flow[page] && flow[page][0] === 'TitleComponent') ?
                    <TitleComponent
                        title={flow[page][1]}
                        setPage={setPage}
                        prePage={flow[page][2]}
                        nextPage={flow[page][3]}
                    />
                :
                (flow[page] && flow[page][0] === 'TitleAndContentAndFourButtonComponent') ?
                    <TitleAndContentAndFourButtonComponent
                        title={flow[page][1]}
                        content={flow[page][2]}
                        buttonInfo={flow[page][3]}
                        setPage={setPage}
                        prePage={flow[page][4]}
                    />
                :
                (flow[page] && flow[page][0] === 'TitleAndContenAndTwoButtonComponent') ?
                    <TitleAndContenAndTwoButtonComponent
                        title={flow[page][1]}
                        content={flow[page][2]}
                        addInfo={flow[page][3]}
                        buttonInfo={flow[page][4]}
                        setPage={setPage}
                        prePage={flow[page][5]}
                    />
                :
                (flow[page] && flow[page][0] === 'TitleAndTwoButtonComponent') ?
                    <TitleAndTwoButtonComponent
                        title={flow[page][1]}
                        buttonInfo={flow[page][2]}
                        setPage={setPage}
                        prePage={flow[page][3]}
                    />
                :
                (flow[page] && flow[page][0] === 'ChatbotQRComponent') ?
                    <ChatbotQRComponent
                        qrImg={flow[page][1]}
                        setPage={setPage}
                        prePage={flow[page][2]}
                    />
                :
                (flow[page] && flow[page][0] === 'ImageAndContentComponent') ?
                    <ImageAndContentComponent
                        image={flow[page][1]}
                        content={flow[page][2]}
                        setPage={setPage}
                        prePage={flow[page][3]}
                        nextPage={flow[page][4]}
                    />
                :
                (flow[page] && flow[page][0] === 'TutorialEndComponent') ?
                    <TutorialEndComponent
                        image={flow[page][1]}
                        content={flow[page][2]}
                        addInfo={flow[page][3]}
                        setBgmIsPlaying={setBgmIsPlaying}
                        setPage={setPage}
                        prePage={flow[page][4]}
                    />
                :
                (flow[page] && flow[page][0] === 'TitleAndImageAndContentAndOneButtonComponent') ?
                    <TitleAndImageAndContentAndOneButtonComponent
                        title={flow[page][1]}
                        image={flow[page][2]}
                        content={flow[page][3]}
                        buttonPageInfo={flow[page][4]}
                        buttonTextInfo={flow[page][5]}
                        setPage={setPage}
                        prePage={flow[page][6]}
                    />
                :
                null
            }
        </SplenderContainer>
    )
}

export default Splender;