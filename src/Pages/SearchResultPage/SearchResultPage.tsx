import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';


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
  // 기타 게임 데이터 추가...
];



const SearchResultsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Game[]>([]);


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
        <div>검색결과가 없습니다.</div>
      ) : (
        <div>
          {results.map(item => (
            <div key={item.name}>
              <h3>{item.name}</h3>
              <ul>
                {item.tags.map(tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
