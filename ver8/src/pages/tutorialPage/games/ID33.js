/* Mahe 마헤 */

import styled from 'styled-components';
import { useState, useEffect } from "react";

import ChatbotQRComponent from '../../../components/tutorial/ChatbotQRComponent';
import GameSettingComponent from "../../../components/tutorial/GameSettingComponent";
import ImageAndContentComponent from '../../../components/tutorial/ImageAndContentComponent';
import TitleAndContentAndOneButtonComponent from '../../../components/tutorial/TitleAndContentAndOneButtonComponent';
import TitleAndContenAndThreeButtonComponent from '../../../components/tutorial/TitleAndContentAndThreeButtonComponent';
import TitleAndContenAndTwoButtonComponent from '../../../components/tutorial/TitleAndContentAndTwoButtonComponent';
import TitleAndImageAndContentComponent from '../../../components/tutorial/TitleAndImageAndContentComponent';
import TitleAndTwoButtonComponent from '../../../components/tutorial/TitleAndTwoButtonComponent';
import TitleComponent from '../../../components/tutorial/TitleComponent';
import TitleRedTextComponent from '../../../components/tutorial/TitleRedTextComponent';
import TutorialEndComponent from '../../../components/tutorial/TutorialEndComponent';
import TutorialStartComponent from "../../../components/tutorial/TutorialStartComponent";

/* 이미지 */
const title = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/33/title.png';
const background = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/33/background.jpg';
const chatbot = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/chatbot/qr/QR33.jpg';
const setting1 = process.env.PUBLIC_URL + "/tutorial/rummikub/setting1.png"; // 임시
const setting2 = process.env.PUBLIC_URL + "/tutorial/rummikub/setting2.png"; // 임시
const setting3 = process.env.PUBLIC_URL + "/tutorial/rummikub/setting3.png"; // 임시
const info1 = process.env.PUBLIC_URL + "/tutorial/mahe/title.png"; // 임시
const info2 = process.env.PUBLIC_URL + "/tutorial/mahe/title.png"; // 임시
const info3 = process.env.PUBLIC_URL + "/tutorial/mahe/title.png"; // 임시
const info4 = process.env.PUBLIC_URL + "/tutorial/mahe/title.png"; // 임시
const contentImage1 = process.env.PUBLIC_URL + "/tutorial/rummikub/contentImage1.jpg"; // 임시
const contentImage2 = process.env.PUBLIC_URL + "/tutorial/rummikub/contentImage1.jpg"; // 임시
const contentImage3 = process.env.PUBLIC_URL + "/tutorial/rummikub/contentImage1.jpg"; // 임시

/* bgm */
const backgroundMusic = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/33/bgm.mp3';

/* 스타일 */
const MaheContainer = styled.div`
    height: 100%;
`;

function ID33({bgmIsPlaying, setBackgroundImage, setBgmIsPlaying}) {

    const [page, setPage] = useState(0);

    /* 세팅 관련 */
    const setting = [
        [ // 0
            setting1,
            '거북이말을 1개씩 선택하고, 같은 색의 명함 카드를 가지고 가주세요.\n\n(2, 3인이 플레이할 때는 각각 2개씩의 거북이를 갖고 플레이합니다.\n2개의 거북이는 한 차례씩 순서대로 움직일 수 있습니다.)'
        ],
        [ // 1
            setting2,
            '모든 말은 뗏목에 올려둡니다.'
        ],
        [ // 2
            setting3,
            '24장의 알 카드를 잘 섞은 후 <RedText>4장을 빼고</RedText> 게임판 위에 뒤집어 올려 놓습니다.'
        ],
    ];
    const [settingStartPage, setSettingStartPage] = useState(0);

        /* 세팅 정보 관련 */
    const settingInfo = [
        [
            info1,
            '보드 1개'
        ],
        [
            info2,
            '거묵이말, 명함 카드\n각 7개'
        ],
        [
            info3,
            '1~6점의 알 카드\n24장'
        ],
        [
            info4,
            '주사위 3개'
        ],
    ];

    /* 튜토리얼 플로우 관련 */
    const flow = [
        [ // 0: 튜토리얼 시작 페이지
            'TutorialStartComponent', // 템플릿
            title, // 타이틀 이미지
            '마헤', // 타이틀
            '주사위 세 개에 울고 웃는 거북이들의 레이싱', // 추가 메시지
            'START', 1 // 버튼, 이동 페이지 flow 번호
        ],
        [ // 1
            'TitleComponent', // 템플릿
            '<TypeIt>마헤는 🐢거북이들🐢이<br/>서로 많은 알🥚을 낳고자 경쟁하는<br/>레이싱 게임입니다.</TypeIt>', // 타이틀 내용
            0, // 이전 페이지 flow 번호
            2 // 다음 페이지 flow 번호
        ],
        [ // 2
            'ImageAndContentComponent', // 템플릿
            contentImage1, // image
            '<TypeIt>각 거북이들은 서로 업고 업히며<br/>섬 주위를 돌게 됩니다.</TypeIt>', // content
            1, // 이전 페이지 flow 번호
            3 // 다음 페이지 flow 번호
        ],
        [ // 3
            'ImageAndContentComponent', // 템플릿
            contentImage2, // image
            '<TypeIt>거북이가 섬을 돌며<br/>알 카드를 획득하고<br/>카드에 적힌 숫자만큼 알을 낳게 됩니다.</TypeIt>', // content
            2, // 이전 페이지 flow 번호
            4 // 다음 페이지 flow 번호
        ],
        [ // 4
            'TitleComponent', // 템플릿
            '<TypeIt>가장 많은 알을 낳은 거북이가<br/>🏆승리🏆합니다.</TypeIt>', // 타이틀 내용
            3, // 이전 페이지 flow 번호
            5 // 다음 페이지 flow 번호
        ],
        [ // 5: 세팅
            'GameSettingComponent', // 템플릿
            setting, // 세팅 플로우 전달
            4, // 이전 페이지 flow 번호
            6 // 다음 페이지 flow 번호
        ],
        [ // 6
            'TitleComponent', // 템플릿
            '이제 게임을 시작해봅시다!', // 타이틀 내용
            5, // 이전 페이지 flow 번호
            7 // 다음 페이지 flow 번호
        ],
        [ // 7
            'TitleComponent', // 템플릿
            '<TypeIt>주사위🎲 3개 중<br/>하나만 굴려주세요.</TypeIt>', // 타이틀 내용
            6, // 이전 페이지 flow 번호
            8 // 다음 페이지 flow 번호
        ],
        [ // 8
            'TitleComponent', // 템플릿
            '<TypeIt>이제 다음 주사위를<br/>굴릴지 말지<br/>결정할 차례입니다.</TypeIt>', // 타이틀 내용
            7, // 이전 페이지 flow 번호
            9 // 다음 페이지 flow 번호
        ],
        [ // 9
            'TitleAndTwoButtonComponent', // 템플릿
            '주사위 눈의 합이 <RedText>8 이상</RedText>이 되면\n<RedText>뗏목으로</RedText> 돌아가야 합니다.\n\n처음 나온 수에 따라\n주사위를 더 굴릴지 말지\n결정해주세요.', // title
            [ // 버튼 내용
                [10, '한 번 더!'],
                [14, '멈출래요.']
            ],
            8 // 이전 페이지 flow 번호
        ],
        [ // 10
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '두 번째 주사위를 던져주세요!', // title
            '두 주사위의 합이 <RedText>7 이하</RedText>인가요?', // content
            null, // additional information
            [ // 버튼 내용
                [11, '예.'],
                [15, '8 이상이 나왔어요.']
            ],
            9 // 이전 페이지 flow 번호
        ],
        [ // 11
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '축하드립니다!', // title
            '주사위를 두 번 던지면\n<RedText>주사위 합 x 2</RedText>만큼\n앞으로 전진할 수 있습니다.', // content
            null, // additional information
            [ // 버튼 내용
                [12, '한 번 더!'],
                [32, '여기까지!']
            ],
            10 // 이전 페이지 flow 번호
        ],
        [ // 12
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '한번 더 굴리실건가요?', // title
            '마찬가지로 <RedText>8 이상이 나오면</RedText>\n<RedText>뗏목으로</RedText> 돌아가야 합니다!\n\n7 이하라면 <RedText>주사위 합 x 3</RedText>만큼 갈 수 있어요!\n신중히 결정해주세요!', // content
            null, // additional information
            [ // 버튼 내용
                [13, '못참지'],
                [16, '아무래도 여기까지만 할래요.']
            ],
            11 // 이전 페이지 flow 번호
        ],
        [ // 13
            'TitleAndContentAndOneButtonComponent', // 템플릿
            '마지막 주사위를 굴려주세요!', // 타이틀 내용
            '주사위의 합이 <RedText>7 이하</RedText>라면\n<RedText>주사위 합 x 3</RedText>만큼 전진해주세요!\n\n만약 주사위 합이 <RedText>8 이상</RedText>이라면\n안타깝지만 <RedText>뗏목으로</RedText> 돌아가야 합니다.', // content
            17, '확인했어요.',
            12 // 이전 페이지 flow 번호
        ],
        [ // 14
            'TitleAndContentAndOneButtonComponent', // 템플릿
            '소인배시군요!', // 타이틀 내용
            '주사위를 굴려 나온 수만큼 앞으로 전진해주세요.', // content
            17, '확인했어요.',
            9 // 이전 페이지 flow 번호
        ],
        [ // 15
            'TitleAndContentAndOneButtonComponent', // 템플릿
            '이런! 안타깝군요..', // 타이틀 내용
            '주사위 합이 8을 넘으면 뗏목으로 돌아가야 합니다...\n\n다음 차례에서 다시 1번부터 출발해주시면 됩니다.', // content
            18, '확인했어요.',
            10 // 이전 페이지 flow 번호
        ],
        [ // 16
            'TitleAndContentAndOneButtonComponent', // 템플릿
            '좋습니다!', // 타이틀 내용
            '<RedText>주사위 합 x 2</RedText>만큼 전진해주세요!', // content
            17, '확인했어요.',
            12 // 이전 페이지 flow 번호
        ],
        [ // 17
            'TitleAndContentAndOneButtonComponent', // 템플릿
            '한 바퀴를 다 돌았나요?', // 타이틀 내용
            '만약 <RedText>21번 칸</RedText>에 도착하거나 지나간다면\n<RedText>알 카드를 한 장</RedText> 가져가주세요!\n\n카드에 적힌 점수는 마지막에 공개합니다.\n점수가 보이지 않게 보관해주세요.', // content
            18, '확인했어요.',
            7 // 이전 페이지 flow 번호
        ],
        [ // 18
            'TitleAndContenAndThreeButtonComponent', // 템플릿
            '다음 플레이어 차례입니다.', // title
            '전과 같이 주사위를 하나씩 던지며\n다음 주사위를 굴릴지 말지 정하고 전진해주세요!', // content
            null, // additional information
            [ // 버튼 내용
                [19, '주사위 던지는 방법을 다시 보고 싶어요.'],
                [29, '좀 더 전략적으로 플레이 해보고 싶어요.'],
                [20, '이동해야 할 칸에 다른 거북이가 있다면?'],
            ],
            7 // 이전 페이지 flow 번호
        ],
        [ // 19
            'TitleAndContentAndOneButtonComponent', // 템플릿
            '이것만 알면 됩니다!', // 타이틀 내용
            '주사위 1개: 나온 수만큼 전진\n주사위 2개: <RedText>주사위 합 x 2</RedText>만큼 전진\n주사위 3개: <RedText>주사위 합 x 3</RedText>만큼 전진\n주사위 합이 <RedText>8 이상일 경우 뗏목</RedText>으로 돌아가기', // content
            18, '돌아가기',
            18 // 이전 페이지 flow 번호
        ],
        [ // 20
            'TitleAndImageAndContentComponent', // 템플릿
            '신분 상승의 기회!', // title
            contentImage3, // image
            '이미 거북이가 있는 칸에 도착했다면,\n위에 올라탈 수 있습니다!\n이미 업혀있는 거북이가 있다면 맨 위에 업히면 됩니다.', // content
            18, // 이전 페이지 flow 번호
            21 // 다음 페이지 flow 번호
        ],
        [ // 21
            'TitleComponent', // 템플릿
            '밑에 있는 거북이의 차례가 되면,\n맨 위에 업힌 거북이가\n두번째, 세번째 주사위를 굴릴지 말지\n결정합니다.', // 타이틀 내용
            20, // 이전 페이지 flow 번호
            22 // 다음 페이지 flow 번호
        ],
        [ // 22
            'TitleRedTextComponent', // 템플릿
            '주사위의 결과가 <RedText>7 이하</RedText>이면\n그 <RedText>위의 모든 거북이를 업고 이동</RedText>합니다.\n\n<RedText>8 이상</RedText>이라면\n그 <RedText>위의 모든 거북이가</RedText>\n<RedText>뗏목으로 이동</RedText>해야 합니다…\n\n밑에 있던 거북이들은 함께 이동하지 않습니다.', // 타이틀 내용
            21, // 이전 페이지 flow 번호
            23 // 다음 페이지 flow 번호
        ],
        [ // 23
            'TitleRedTextComponent', // 템플릿
            '업혀 있을 때\n21번 칸에 도착하거나 지나게 된다면\n<RedText>맨 위에 있던 거북이만</RedText>\n알 카드를 획득할 수 있습니다.', // 타이틀 내용
            22, // 이전 페이지 flow 번호
            24 // 다음 페이지 flow 번호
        ],
        [ // 24
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '이제 순서대로 주사위를 던지며\n게임을 진행해주세요!', // title
            '알 카드가 다 떨어지면 저를 다시 불러주세요!', // content
            null, // additional information
            [ // 버튼 내용
                [33, '질문있어요!'],
                [25, '알 카드가 떨어졌어요!']
            ],
            23// 이전 페이지 flow 번호
        ],
        [ // 25
            'TitleComponent', // 템플릿
            '<TypeIt>이제 🧨마지막 레이스🧨입니다.</TypeIt>', // 타이틀 내용
            24, // 이전 페이지 flow 번호
            26 // 다음 페이지 flow 번호
        ],
        [ // 26
            'TitleAndContentAndOneButtonComponent', // 템플릿
            '다음 순서부터 다시 게임을 진행해주세요!', // 타이틀 내용
            '지금부터\n제일 먼저 21번 칸에 도착하거나 지나는 사람이\n마지막 점수인 <RedText>7점</RedText>을 얻고\n게임은 끝납니다.', // content
            27, '마지막 레이스까지 끝났습니다.',
            25 // 이전 페이지 flow 번호
        ],
        [ // 27
            'TitleComponent', // 템플릿
            '<TypeIt>이제 획득한 알 카드들을 뒤집어<br/>🎯점수를 환산🎯해주세요!</TypeIt>', // 타이틀 내용
            26, // 이전 페이지 flow 번호
            28 // 다음 페이지 flow 번호
        ],
        [ // 28
            'TutorialEndComponent', // 템플릿
            title, // image
            '점수가 가장 높은 플레이어가 🎉승자🎉입니다!', // content
            null, // additional information
            27 // 이전 페이지 flow 번호
        ],
        [ // 29
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '베리언트', // title
            '자기 차례에 주사위를 굴리는 대신,\n획득한 <RedText>알 카드로 주사위의 눈을 대체</RedText>할 수 있습니다.\n\n한 차례에 카드 1장만 사용 가능하며\n두번째나 세번째의 주사위로만 대체할 수 있습니다.', // content
            null, // additional information
            [ // 버튼 내용
                [30, '계속 보기'],
                [18, '그만 보기']
            ],
            18 // 이전 페이지 flow 번호
        ],
        [ // 30
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '베리언트', // title
            '이 경우에도 주사위의 눈과 알 카드 점수의 합은\n7을 초과해선 안됩니다.\n\n사용된 알 카드는 버려지고, 게임에 다시 사용되지 않으며\n게임이 끝났을 때 점수로 사용할 수 없습니다.', // content
            null, // additional information
            [ // 버튼 내용
                [31, '계속 보기'],
                [18, '그만 보기']
            ],
            29 // 이전 페이지 flow 번호
        ],
        [ // 31
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '베리언트', // title
            '밑에 있는 거북이의 차례일 때,\n맨 위에 있는 거북이는 밑에 있는 거북이에게\n주사위를 굴리도록 하는 대신\n자신의 알 카드를 사용할 수 있습니다.', // content
            null, // additional information
            [ // 버튼 내용
                [29, '다시 보기'],
                [18, '그만 보기']
            ],
            30 // 이전 페이지 flow 번호
        ],
        [ // 32
            'TitleAndContentAndOneButtonComponent', // 템플릿
            '살짝 아쉽군요.', // 타이틀 내용
            '<RedText>주사위 합 x 2</RedText>만큼 전진해주세요!', // content
            17, '확인했어요.',
            11 // 이전 페이지 flow 번호
        ],
        [ // 33: 챗봇
            'ChatbotQRComponent', // 템플릿
            chatbot, // qr url
            24
        ],
    ];

    /* 배경사진 관련 */
    useEffect(() => {
        setBackgroundImage(background);
    }, [setBackgroundImage]);

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
        <MaheContainer>
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
                (flow[page] && flow[page][0] === 'TitleComponent') ?
                    <TitleComponent
                        title={flow[page][1]}
                        setPage={setPage}
                        prePage={flow[page][2]}
                        nextPage={flow[page][3]}
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
                (flow[page] && flow[page][0] === 'GameSettingComponent') ?
                    <GameSettingComponent
                        settingList={flow[page][1]}
                        infoList={settingInfo}
                        startStep={settingStartPage}
                        setSettingStartPage={setSettingStartPage}
                        setPage={setPage}
                        prePage={flow[page][2]}
                        nextPage={flow[page][3]}
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
                (flow[page] && flow[page][0] === 'TitleAndContentAndOneButtonComponent') ?
                    <TitleAndContentAndOneButtonComponent
                        title={flow[page][1]}
                        content={flow[page][2]}
                        buttonPageInfo={flow[page][3]}
                        buttonTextInfo={flow[page][4]}
                        setPage={setPage}
                        prePage={flow[page][5]}
                    />
                :
                (flow[page] && flow[page][0] === 'TitleAndContenAndThreeButtonComponent') ?
                    <TitleAndContenAndThreeButtonComponent
                        title={flow[page][1]}
                        content={flow[page][2]}
                        addInfo={flow[page][3]}
                        buttonInfo={flow[page][4]}
                        setPage={setPage}
                        prePage={flow[page][5]}
                    />
                :
                (flow[page] && flow[page][0] === 'TitleAndImageAndContentComponent') ?
                    <TitleAndImageAndContentComponent
                        title={flow[page][1]}
                        image={flow[page][2]}
                        content={flow[page][3]}
                        setPage={setPage}
                        prePage={flow[page][4]}
                        nextPage={flow[page][5]}
                    />
                :
                (flow[page] && flow[page][0] === 'TitleRedTextComponent') ?
                    <TitleRedTextComponent
                        title={flow[page][1]}
                        setPage={setPage}
                        prePage={flow[page][2]}
                        nextPage={flow[page][3]}
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
                (flow[page] && flow[page][0] === 'ChatbotQRComponent') ?
                    <ChatbotQRComponent
                        qrImg={flow[page][1]}
                        setPage={setPage}
                        prePage={flow[page][2]}
                    />
                :
                null
            }
        </MaheContainer>
    )
}

export default ID33;