import styled from 'styled-components';
import 'animate.css';

/* 스타일 */
const ChatbotQRContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
`;
const MovePageButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
`;
const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 70%;
`;
const InnerContainer = styled.div`
    height: 70%;
    width: 100%;

    border-radius: 20px;
    background-color: #ffffff;

    display: flex;
    flex-direction: column;
`;
const QRImageWrapper = styled.div`
    width: 100%;
    height: 58%;

    display: flex;
    justify-content: center;
`;
const QRImage = styled.img`
    height: 100%;
`;
const LogoImageWrapper = styled.div`
    width: 100%;
    height: 30%;

    display: flex;
    justify-content: center;
    align-items: end;
`;
const LogoImage = styled.img`
    height: 70%;
`;
const Text = styled.div`
    width: 100%;
    height: 12%;

    display: flex;
    justify-content: center;
    align-items: top;

    font-size: 3vw;
`;
const OuterContainer = styled.div`
    height: 15%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;
const BackButton = styled.div`
    height: 50%;
    width: 15%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #CCF38C;
    border-radius: 8px;

    font-size: 2vw;
`;

function ChatbotQRComponent ({qrImg, setPage, prePage}) {

    /* 이전 페이지 이동 */
    function moveBackPage() {
        setPage(prePage);
    };

    return (
        <ChatbotQRContainer>
            {/* 뒤로 가기 버튼 */}
            <MovePageButtonBox/>

            {/* 콘텐츠 */}
            <MainContainer>
                <OuterContainer/>
                <InnerContainer>
                    <QRImageWrapper><QRImage src={qrImg}/></QRImageWrapper>
                    <LogoImageWrapper><LogoImage src={process.env.PUBLIC_URL + "/logo1.png"}/></LogoImageWrapper>
                    <Text className='animate__animated animate__pulse animate__slow animate__infinite'>모바일로 챗봇에 접속하여 편하게 질문해보세요!</Text>
                </InnerContainer>
                <OuterContainer>
                    <BackButton onClick={() => moveBackPage()}>뒤로 가기</BackButton>
                </OuterContainer>
            </MainContainer>

            {/* 앞으로 가기 버튼 */}
            <MovePageButtonBox/>
        </ChatbotQRContainer>
    )
}

export default ChatbotQRComponent;