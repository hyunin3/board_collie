/* eslint-disable */

import { useEffect, useState } from 'react';
import axios from 'axios';

// 게임 이미지 (임시)
import gameImg from '../../assets/splendor.png'

const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

export interface Game {
  id: number;
  name: string;
  tags: string[];
  image: string;
};

export interface GameFromServer {
  gameId: number;
  gameTitle: string;
  gameImage: string | null;
  gameTag: Array<{
    tagId: number;
    tagName: string;
    tagDescription: string;
  }>;
};

const transformData = (dataFromServer: GameFromServer[]): Game[] => {
  return dataFromServer.map((game) => ({
    id: game.gameId,
    name: game.gameTitle,
    tags: game.gameTag.map((tag) => tag.tagName),
    image: game.gameImage || gameImg,
  }));
};

const useFetchGames = (query: string, numberOfPlayers: number) => {
  const [results, setResults] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/game`, {
          params: {
            q: query,
            people: numberOfPlayers,
          },
        });
        const games = transformData(response.data.data);
        setResults(games);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setResults([]);
      }
    };

    fetchData();
  }, [query, numberOfPlayers]);

  return results;
};

export default useFetchGames;
