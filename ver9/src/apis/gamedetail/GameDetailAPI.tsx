import axios from 'axios';

// 게임 이미지 (임시)
import gameImg from '../../assets/splendor.png'

const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

export interface Game {
    id: number;
    name: string;
    image: string | null;
    qrImage: string | null;
    minPlayer: number;
    maxPlayer: number;
    playTime: number;
    evaluation: string;
    tags: {
        id: number;
        name: string;
        description: string;
    }[];
};

export interface GameFromServer {
    gameId: number;
    gameImage: string | null;
    qrImage: string | null;
    gameTitleKor: string;
    gameTitleEng: string;
    minPlayer: number;
    maxPlayer: number;
    playTime: number;
    gameEvaluation: string;
    tags: Array<{
        tagId: number;
        tagName: string;
        tagDescription: string;
    }>;
    similarGame: any[]; // 'any' 타입은 실제 유사 게임 객체의 구조에 따라 변경해야 합니다.
};

export const transformData = (dataFromServer: GameFromServer): Game => {
    return {
        id: dataFromServer.gameId,
        name: dataFromServer.gameTitleKor,
        image: dataFromServer.gameImage || gameImg, // 만약 gameImage가 null이면 기본 이미지를 사용
        qrImage: dataFromServer.qrImage,
        minPlayer: dataFromServer.minPlayer,
        maxPlayer: dataFromServer.maxPlayer,
        playTime: dataFromServer.playTime,
        evaluation: dataFromServer.gameEvaluation,
        tags: dataFromServer.tags.map(tag => ({
            id: tag.tagId,
            name: tag.tagName,
            description: tag.tagDescription,
        })),
    };
};

// 게임 상세 정보를 가져오는 함수
export const fetchGameDetail = async (gameId: number): Promise<Game | null> => {
    try {
        const response = await axios.get(`${SERVER_API_URL}/game/detail/${gameId}`);
        if (response.data.success) {
          return transformData(response.data.data);
        } else {
          console.error("서버에서 게임 상세 정보를 가져오는데 실패했습니다.");
          return null;
        }
    } catch (error) {
        console.error("게임 디테일 정보를 가져오는데 실패했습니다.", error);
        return null;
    }
};
