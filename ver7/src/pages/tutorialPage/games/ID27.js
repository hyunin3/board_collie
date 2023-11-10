/* Rummikub 루미큐브 */

import styled from 'styled-components';
import { useState, useEffect } from "react";

import ChatbotQRComponent from '../../../components/tutorial/ChatbotQRComponent';
import GameSettingComponent from "../../../components/tutorial/GameSettingComponent";
import ImageAndContentComponent from '../../../components/tutorial/ImageAndContentComponent';
import TitleAndContentAndOneButtonComponent from '../../../components/tutorial/TitleAndContentAndOneButtonComponent';
import TitleAndThreeButtonComponent from '../../../components/tutorial/TitleAndThreeButtonComponent';
import TitleAndContenAndTwoButtonComponent from '../../../components/tutorial/TitleAndContentAndTwoButtonComponent';
import TitleComponent from '../../../components/tutorial/TitleComponent';
import TutorialEndComponent from '../../../components/tutorial/TutorialEndComponent';
import TutorialStartComponent from "../../../components/tutorial/TutorialStartComponent";

/* 이미지 */
const title = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/27/title.png';
const background = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/27/background.jfif';
const chatbot = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/chatbot/qr/QR27.jpg';
const setting1 = process.env.PUBLIC_URL + "/tutorial/rummikub/setting1.png"; // 임시
const setting2 = process.env.PUBLIC_URL + "/tutorial/rummikub/setting2.png"; // 임시
const setting3 = process.env.PUBLIC_URL + "/tutorial/rummikub/setting3.png"; // 임시
const setting4 = process.env.PUBLIC_URL + "/tutorial/rummikub/setting4.png"; // 임시
const info1 = process.env.PUBLIC_URL + "/tutorial/rummikub/title.png"; // 임시
const info2 = process.env.PUBLIC_URL + "/tutorial/rummikub/title.png"; // 임시
const info3 = process.env.PUBLIC_URL + "/tutorial/rummikub/title.png"; // 임시
const contentImage1 = process.env.PUBLIC_URL + "/tutorial/rummikub/contentImage1.jpg"; // 임시
const contentImage2 = process.env.PUBLIC_URL + "/tutorial/rummikub/contentImage2.png"; // 임시
const contentImage3 = process.env.PUBLIC_URL + "/tutorial/rummikub/contentImage3.png"; // 임시
const contentImage4 = process.env.PUBLIC_URL + "/tutorial/rummikub/contentImage4.png"; // 임시
const contentImage5 = process.env.PUBLIC_URL + "/tutorial/rummikub/contentImage5.png"; // 임시
const contentImage6 = process.env.PUBLIC_URL + "/tutorial/rummikub/contentImage6.png"; // 임시
const contentImage7 = process.env.PUBLIC_URL + "/tutorial/rummikub/contentImage7.png"; // 임시
const contentImage8 = process.env.PUBLIC_URL + "/tutorial/rummikub/contentImage8.png"; // 임시

/* bgm */
const backgroundMusic = 'https://s3.ap-northeast-2.amazonaws.com/boardcollie.com/tutorial/27/backgroundMusic.mp3';

/* 스타일 */
const RummikubContainer = styled.div`
    height: 100%;
`;

function ID27({setBackgroundImage, bgmIsPlaying, setBgmIsPlaying}) {

    const [page, setPage] = useState(0);

    /* 세팅 관련 */
    const setting = [
        [ // 0
            setting1,
            '타일을 잘 섞어 중앙에 뒤집어줍니다.'
        ],
        [ // 1
            setting2,
            '먼저 선을 정합시다.\n각자 타일을 하나씩 집어주세요.'
        ],
        [ // 2
            setting3,
            '가장 높은 숫자를 집은 사람이 선입니다.\n게임은 시계 방향으로 진행됩니다.'
        ],
        [ // 3
            setting4,
            '14개씩 타일을 뽑아서 자신의 받침대 위에 놓아주세요.'
        ],
    ];
    const [settingStartPage, setSettingStartPage] = useState(0);

    /* 세팅 정보 관련 */
    const settingInfo = [
        [
            info1,
            '1~13까지의 수가 적힌 타일 4종 2세트\n(총 104개)'
        ],
        [
            info2,
            '조커 타일 2종\n(총 2개)'
        ],
        [
            info3,
            '타일 받침대\n(총 4개)'
        ],
    ];

    /* 튜토리얼 플로우 관련 */
    const flow = [
        [ // 0: 튜토리얼 시작 페이지
            'TutorialStartComponent', // 템플릿
            title, // 타이틀 이미지
            '루미큐브', // 타이틀
            '한국루미큐브 공식 홈페이지의 룰을 따릅니다.', // 추가 메시지
            'START', 1 // 버튼, 이동 페이지 flow 번호
        ],
        [ // 1
            'ImageAndContentComponent', // 템플릿
            contentImage1, // image
            '<TypeIt>루미큐브는<br/>14개의 타일을 가지고 시작해<br/>가장 먼저 타일을 다 낸 사람이<br/>이기는 게임입니다!</TypeIt>', // content
            0, // 이전 페이지 flow 번호
            2 // 다음 페이지 flow 번호
        ],
        [ // 2: 세팅
            'GameSettingComponent', // 템플릿
            setting, // 세팅 플로우 전달
            1, // 이전 페이지 flow 번호
            3 // 다음 페이지 flow 번호
        ],
        [ // 3
            'ImageAndContentComponent', // 템플릿
            contentImage2, // image
            '<TypeIt>루미큐브에서<br/>타일을 내는 방법은<br/>2가지가 있습니다.</TypeIt>', // content
            2, // 이전 페이지 flow 번호
            4 // 다음 페이지 flow 번호
        ],
        [ // 4
            'ImageAndContentComponent', // 템플릿
            contentImage3, // image
            '같은 숫자 3개 또는 4개 놓기', // content
            3, // 이전 페이지 flow 번호
            5 // 다음 페이지 flow 번호
        ],
        [ // 5
            'ImageAndContentComponent', // 템플릿
            contentImage4, // image
            '같은 색 숫자를 3개 이상\n연속되게 놓기', // content
            4, // 이전 페이지 flow 번호
            6 // 다음 페이지 flow 번호
        ],
        [ // 6
            'ImageAndContentComponent', // 템플릿
            contentImage5, // image
            '<TypeIt>자신의 타일과 놓여진 타일들을<br/>마음대로 붙였다 뗐다<br/>조합할 수 있습니다.</TypeIt>', // content
            5, // 이전 페이지 flow 번호
            7 // 다음 페이지 flow 번호
        ],
        [ // 7
            'ImageAndContentComponent', // 템플릿
            contentImage6, // image
            '자신의 턴이 끝날 때는\n중앙에 놓은 모든 타일이\n3개 이상\n붙어있어야 합니다.', // content
            6, // 이전 페이지 flow 번호
            8 // 다음 페이지 flow 번호
        ],
        [ // 8
            'ImageAndContentComponent', // 템플릿
            contentImage7, // image
            '<TypeIt>🌝조커🌝는<br/>아무 타일이나 대체할 수 있습니다.</TypeIt>', // content
            7, // 이전 페이지 flow 번호
            9 // 다음 페이지 flow 번호
        ],
        [ // 9
            'TitleComponent', // 템플릿
            '이제 게임을 시작해봅시다!', // 타이틀 내용
            8, // 이전 페이지 flow 번호
            10 // 다음 페이지 flow 번호
        ],
        [ // 10
            'TitleComponent', // 템플릿
            '<TypeIt>먼저, 루미큐브에서<br/>타일을 내기 위해서는<br/>🧾등록🧾이 필요합니다.</TypeIt>', // 타이틀 내용
            9, // 이전 페이지 flow 번호
            11 // 다음 페이지 flow 번호
        ],
        [ // 11
            'ImageAndContentComponent', // 템플릿
            contentImage8, // image
            '등록을 하기 위해서는\n타일의 총합이\n30 이상이어야 합니다.', // content
            10, // 이전 페이지 flow 번호
            12 // 다음 페이지 flow 번호
        ],
        [ // 12
            'TitleAndContenAndTwoButtonComponent', // 템플릿
            '등록을 시작해주세요!', // title
            '제한 시간은 1분입니다.\n\n<RedText>등록을 할 때는</RedText>\n<RedText>중앙에 놓여진 타일들과 조합할 수 없다는 점</RedText>을\n유의해주세요.', // content
            null, // additional information
            [ // 버튼 내용
                [13, '등록을 완료했어요.'],
                [14, '30을 만들 수 없어요.']
            ],
            11 // 이전 페이지 flow 번호
        ],
        [ // 13
            'TitleComponent', // 템플릿
            '축하드립니다!\n\n다음 차례부터는\n다른 타일들과 조합하여\n타일을 놓을 수 있습니다.', // 타이틀 내용
            12, // 이전 페이지 flow 번호
            15 // 다음 페이지 flow 번호
        ],
        [ // 14
            'TitleAndContentAndOneButtonComponent', // 템플릿
            '안타깝군요...', // 타이틀 내용
            '등록이 가능할 때까지\n타일을 한 장씩 가져오고\n차례를 넘겨주세요.\n\n타일이 무수히 많아질 수 있습니다.', // content
            13, '드디어 등록 성공했어요!',
            12 // 이전 페이지 flow 번호
        ],
        [ // 15
            'TitleComponent', // 템플릿
            '<TypeIt>등록이 완료되었다면<br/>타일을 모두 낼 수 있도록<br/>자유롭게 조합해보세요.</TypeIt>', // 타이틀 내용
            13, // 이전 페이지 flow 번호
            16 // 다음 페이지 flow 번호
        ],
        [ // 16
            'TitleComponent', // 템플릿
            '<TypeIt>만약 낼 수 있는 타일이 없다면</br>타일을 한 장 가져온 뒤</br>차례를 넘겨야 합니다.</TypeIt>', // 타이틀 내용
            15, // 이전 페이지 flow 번호
            17 // 다음 페이지 flow 번호
        ],
        [ // 17
            'TitleAndThreeButtonComponent', // 템플릿
            '타일을 모두 낸 사람은\n<RedText>루미큐브!</RedText>를\n외쳐주세요.', // title
            [ // 버튼 내용
                [18, '루미큐브!'],
                [19, '질문있어요!'],
                [20, '더 재밌게 플레이하기']
            ],
            16 // 이전 페이지 flow 번호
        ],
        [ // 18
            'TutorialEndComponent', // 템플릿
            title, // image
            '가장 먼저 루미큐브를 외친 플레이어가\n🎉승자🎉입니다!', // content
            null, // additional information
            17 // 이전 페이지 flow 번호
        ],
        [ // 19: 챗봇
            'ChatbotQRComponent', // 템플릿
            chatbot, // qr url
            17
        ],
        [ // 20
            'TitleAndThreeButtonComponent', // 템플릿
            '몰라도 되지만\n게임을 더욱 재밌게 할 수 있는\n룰을 알려드립니다.', // title
            [ // 버튼 내용
                [21, '중앙 타일을 원래대로 못돌리겠어요.'],
                [22, '순위를 정하고 싶어요.'],
                [17, '그만보기']
            ],
            17 // 이전 페이지 flow 번호
        ],
        [ // 21
            'TitleAndContentAndOneButtonComponent', // 템플릿
            '중앙 타일을 원래대로 못돌리겠어요.', // 타이틀 내용
            '1분 안에 조합을 완성하지 못했다면\n즉시 멈추고 이전의 상태로 돌려 놓아야 하며\n<RedText>벌칙으로 타일 3개</RedText>를 가져가야 합니다.\n\n만약 원위치 시키지 못한 타일이 있다면\n중앙에 뒤집어 섞어 놓고\n그 개수만큼 타일을 가져갑니다.', // content
            20, '다른 룰 보기',
            20 // 이전 페이지 flow 번호
        ],
        [ // 22
            'TitleAndContentAndOneButtonComponent', // 템플릿
            '순위를 정하고 싶어요.', // 타이틀 내용
            '모든 타일을 내리고 <RedText>루미큐브!</RedText>를 외치면 <RedText>1등</RedText>이 됩니다.\n\n나머지 사람들은 남은 타일의 숫자를 더한만큼\n<RedText>벌점</RedText>을 받게 됩니다.\n(조커는 벌점 50점입니다.)\n\n<RedText>벌점이 낮은 순</RedText>으로 순위를 매기면 됩니다.', // content
            20, '다른 룰 보기',
            20 // 이전 페이지 flow 번호
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
        <RummikubContainer>
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
                (flow[page] && flow[page][0] === 'TitleComponent') ?
                    <TitleComponent
                        title={flow[page][1]}
                        setPage={setPage}
                        prePage={flow[page][2]}
                        nextPage={flow[page][3]}
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
                (flow[page] && flow[page][0] === 'TitleAndThreeButtonComponent') ?
                    <TitleAndThreeButtonComponent
                        title={flow[page][1]}
                        buttonInfo={flow[page][2]}
                        setPage={setPage}
                        prePage={flow[page][3]}
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
        </RummikubContainer>
    )
}

export default ID27;