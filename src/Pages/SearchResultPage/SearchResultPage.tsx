import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Divider, Grid, Chip, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import './SearchResultPage.css';
import RecentGamesList from '../../components/RecentGamesList/RecentGamesList';
import FilterBar from '../../components/FilterBar/FilterBar'

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
  const [numberOfPlayers, setNumberOfPlayers] = useState('');

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
      let filteredGames = dummyData.filter(game =>
        game.name.toLowerCase().includes(query.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
  
      if (numberOfPlayers && numberOfPlayers !== "all") { // "all"일 때는 필터링하지 않습니다.
        filteredGames = filteredGames.filter(game => {
          return game.tags.some(tag => {
            const playerMatch = tag.match(/(\d+)-?(\d+)?명/);
            if (playerMatch) {
              const [, min, max] = playerMatch;
              const playerNum = parseInt(numberOfPlayers, 10);
              if (max) {
                return playerNum >= parseInt(min, 10) && playerNum <= parseInt(max, 10);
              }
              return playerNum === parseInt(min, 10);
            }
            return false;
          });
        });
      }
  
      setResults(filteredGames);
    }
  };
  

  const handleGameClick = (gameName: string) => {
  
    const recentGames = JSON.parse(localStorage.getItem('recentGames') || '[]');
    
    const newRecentGames = [...recentGames.filter((name: string) => name !== gameName), gameName];
    
    localStorage.setItem('recentGames', JSON.stringify(newRecentGames));
  };
  

  return (
    <div>
    <SearchBar onSearch={handleSearch} />
    <FilterBar numberOfPlayers={numberOfPlayers} setNumberOfPlayers={setNumberOfPlayers} />
    <Grid container spacing={2}>
      <Grid item xs={9}>
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
                <Stack direction="row" spacing={1} style={{ marginBottom: '20px' }}>
                  {item.tags.map(tag => (
                    <Chip key={tag} label={tag} />
                  ))}
                </Stack>
                {index < results.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        )}
      </Grid>
      <Grid item container xs={3} style={{ alignItems: 'flex-start' }}>
        <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
        <Grid item xs style={{ overflowY: 'auto' }} className="hide-scrollbar">
          <div style={{ textAlign: 'center' }}>
            <h4>최근 본 게임</h4>
            <RecentGamesList />
          </div>
        </Grid>
      </Grid>
    </Grid>
  </div>
  );
}

export default SearchResultsPage;
