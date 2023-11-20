import axios from 'axios';

// 게임 이미지 (임시)
import gameImg from '../../assets/splendor.png';

export interface Game {
    id: number;
    name: string;
    image: string | null;
    similarity: number;
};

export interface GamesResponse {
    games: Array<{
        game_id: number;
        similarity: number;
        game_title_kor: string;
        game_image: string;
    }>;
};

// 서버에서 받은 데이터를 Game 객체로 변환하는 함수
export const transformGameList = (dataFromServer: GamesResponse): Game[] => {
    return dataFromServer.games.map(game => ({
        id: game.game_id,
        name: game.game_title_kor,
        image: game.game_image || gameImg, // 만약 gameImage가 null이면 기본 이미지 사용
        similarity: game.similarity,
    }));
};

// 게임 추천 목록을 가져오는 함수
export const fetchRecommendedGames = async (params: any): Promise<Game[] | null> => {
    try {
        const response = await axios.post(`https://boardcollie.com/api/s2/recommend`, { params });
        if (response.data) {
            return transformGameList(response.data);
        } else {
            console.error("서버에서 게임 추천 목록을 가져오는데 실패했습니다.");
            return null;
        }
    } catch (error) {
        console.error("게임 추천 목록을 가져오는데 실패했습니다.", error);
        return null;
    }
};
