import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import './SearchResultPage.css';
import RecentGamesList from '../../components/RecentGamesList/RecentGamesList';

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

  const handleGameClick = (gameName: string) => {
    // 로컬 스토리지에서 최근 본 게임 목록을 불러옴
    const recentGames = JSON.parse(localStorage.getItem('recentGames') || '[]');
    
    // 현재 클릭된 게임을 목록에 추가
    // 만약 이미 목록에 있다면, 중복을 방지하기 위해 먼저 제거함
    const newRecentGames = [...recentGames.filter((name: string) => name !== gameName), gameName];
    
    // 변경된 목록을 로컬 스토리지에 저장
    localStorage.setItem('recentGames', JSON.stringify(newRecentGames));
  };
  

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
        <Grid container spacing={2}>
          <Grid item xs={9}>
    {/* 검색 결과를 보여주는 부분 */}
      {results.length === 0 ? (
      <div style={centerStyle}>검색 결과가 없습니다.</div>
    ) : (
      <div>
        {results.map((item, index) => (
          <div key={item.name}>
            <h3>
              <Link 
                to={`/game/${item.name}`} 
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => handleGameClick(item.name)}
                >
                {item.name}
              </Link>
            </h3>
            <ul>
              {item.tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {index < results.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    )}
  </Grid>
  <Grid item container xs={3} style={{ alignItems: 'flex-start' }}>
    <Divider orientation="vertical" flexItem sx={{  height: '100%' }} />
    <Grid item xs style={{ overflowY: 'auto' }} className="hide-scrollbar">
      <div style={{ textAlign: 'center' }}>
        <h4>최근 본 게임</h4>
        {/* 여기에 최근 본 게임 리스트를 추가 */}
        <RecentGamesList /> {/* 최근 본 게임 목록 컴포넌트 */}
      </div>
    </Grid>
  </Grid>
</Grid>

    </div>
  );
}

export default SearchResultsPage;
