import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Divider } from '@mui/material';

type Game = {
  name: string;
  tags: string[];
};

const dummyData: Game[] = [
  {
    name: '반지의 제왕',
    tags: ['어려움', '4명', '1시간', '판타지']
  },
  {
    name: '모노폴리',
    tags: ['보통', '2-6명', '2시간', '전략']
  },
  {
    name: '해리포터',
    tags: ['쉬움', '4명', '30분', '판타지']
  },
  {
    name: '델토라 퀘스트',
    tags: ['어려움', '2-4명', '1시간', '판타지']
  },
  {
    name: '카탄의 개척자들',
    tags: ['보통', '3-4명', '1시간', '전략']
  },
  {
    name: '카드게임 UNO',
    tags: ['쉬움', '2-10명', '30분', '가족']
  },
  {
    name: '코끼리 공주',
    tags: ['쉬움', '2-5명', '20분', '어린이']
  },
  {
    name: '독립 경제학자',
    tags: ['어려움', '3-5명', '2시간', '전략']
  },
  {
    name: '바둑',
    tags: ['어려움', '2명', '1-2시간', '전략']
  },
  {
    name: '체스',
    tags: ['보통', '2명', '1시간', '전략']
  }
];




const SearchResultsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Game[]>([]);


  const centerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 60px)', // 60px를 검색바의 높이로 가정합니다. 실제 높이에 맞게 조절해야 합니다.
    fontFamily: 'Jua, sans-serif',
    fontSize: '24px'
  };


  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const filteredGames = dummyData.filter(game =>
        game.name.toLowerCase().includes(query.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filteredGames);
    }
  };
  

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {results.length === 0 ? (
        <div style={centerStyle}>검색결과가 없습니다.</div>
      ) : (
        <div>
          {results.map((item, index) => (
            <div key={item.name}>
              <h3>{item.name}</h3>
              <ul>
                {item.tags.map(tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {index !== results.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
