import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/searchbar/SearchBar';
import { Divider, Grid, Chip, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import './SearchResultPage.css';
import RecentGamesList from '../../components/recentgameslist/RecentGamesList';
import FilterBar from '../../components/filterbar/FilterBar'
import InfiniteScroll from 'react-infinite-scroll-component';
import gameimg from '../../assets/splendor.png'

type Game = {
  name: string;
  tags: string[];
};

type GameFromServer = {
  game_id: number;
  game_title: string;
  game_tag: Array<{
    tag_id: number;
    tag_name_kor: string;
  }>;
};

const dummyDataFromServer: GameFromServer[] = [
  {
    game_id: 1,
    game_title: '스플렌더',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '2-4명' },
      { tag_id: 3, tag_name_kor: '45분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 2,
    game_title: '모노폴리',
    game_tag: [
      { tag_id: 1, tag_name_kor: '보통' },
      { tag_id: 2, tag_name_kor: '2-8명' },
      { tag_id: 3, tag_name_kor: '180분' },
      { tag_id: 4, tag_name_kor: '경영' }
    ]
  },
  {
    game_id: 3,
    game_title: '다빈치코드',
    game_tag: [
      { tag_id: 1, tag_name_kor: '쉬움' },
      { tag_id: 2, tag_name_kor: '2-4명' },
      { tag_id: 3, tag_name_kor: '20분' },
      { tag_id: 4, tag_name_kor: '추리' }
    ]
  },
  {
    game_id: 4,
    game_title: '장미전쟁',
    game_tag: [
      { tag_id: 1, tag_name_kor: '보통' },
      { tag_id: 2, tag_name_kor: '2명' },
      { tag_id: 3, tag_name_kor: '25분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 5,
    game_title: '센추리: 향신료의 길',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '2-5명' },
      { tag_id: 3, tag_name_kor: '40분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 6,
    game_title: '마헤',
    game_tag: [
      { tag_id: 1, tag_name_kor: '보통' },
      { tag_id: 2, tag_name_kor: '4-7명' },
      { tag_id: 3, tag_name_kor: '30분' },
      { tag_id: 4, tag_name_kor: '경주' }
    ]
  },
  {
    game_id: 7,
    game_title: '부루마불',
    game_tag: [
      { tag_id: 1, tag_name_kor: '보통' },
      { tag_id: 2, tag_name_kor: '2-4명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '경영' }
    ]
  },
  {
    game_id: 8,
    game_title: '테라포밍마스',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '2-5명' },
      { tag_id: 3, tag_name_kor: '120분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 9,
    game_title: '인코그니토',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '4명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '추리' }
    ]
  },
  {
    game_id: 10,
    game_title: '시타델',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '4-7명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 11,
    game_title: '시타델2',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '4-7명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 12,
    game_title: '시타델3',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '4-7명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 13,
    game_title: '시타델4',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '4-7명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 14,
    game_title: '시타델5',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '4-7명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 15,
    game_title: '시타델6',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '4-7명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 16,
    game_title: '테스트1',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '4-7명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
  {
    game_id: 17,
    game_title: '테스트2',
    game_tag: [
      { tag_id: 1, tag_name_kor: '어려움' },
      { tag_id: 2, tag_name_kor: '4-7명' },
      { tag_id: 3, tag_name_kor: '60분' },
      { tag_id: 4, tag_name_kor: '전략' }
    ]
  },
 
 
];
const transformData = (dataFromServer: GameFromServer[]): Game[] => {
  return dataFromServer.map(game => ({
    id: game.game_id,
    name: game.game_title,
    tags: game.game_tag.map(tag => tag.tag_name_kor),
  }));
};

const dummyData = transformData(dummyDataFromServer);



const SearchResultsPage: React.FC = () => {
  
  const [results, setResults] = useState<Game[]>([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState('');

  const [visibleResults, setVisibleResults] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // 검색창이 비어있을 때 초기 상태로 설정
    handleSearch('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    console.log("Load More is called");
    if (visibleResults.length >= results.length) {
      setHasMore(false);
      return;
    }
    const moreResults = results.slice(visibleResults.length, visibleResults.length + 10);
    setVisibleResults(visibleResults.concat(moreResults));
  };

  useEffect(() => {
    // 검색 결과가 바뀔 때마다 visibleResults를 리셋하고 무한 스크롤을 다시 활성화합니다.
    setVisibleResults(results.slice(0, 10));
    setHasMore(true);
  }, [results]);

  const centerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 6vh)', 
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
    <div style={{ overflow: 'hidden', height: '100vh' }}>
    <SearchBar onSearch={handleSearch} style={{ position: 'relative', zIndex: 1000 }}/>
    <FilterBar numberOfPlayers={numberOfPlayers} setNumberOfPlayers={setNumberOfPlayers} style={{ marginTop: '2.1vh' }} />
    <Grid container spacing={2}>
      <Grid item xs={9} style={{ overflowY: 'auto', maxHeight: '90vh', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="hide-scrollbar">
        {results.length === 0 ? (
          <div style={centerStyle}>검색 결과가 없습니다.</div>
        ) : (
          
          <InfiniteScroll
          dataLength={visibleResults.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={'80vh'}
          className="hide-scrollbar"
        >
          {visibleResults.map((item, index) => (
            <div key={item.name} style={{ marginLeft: '10vw' }} >
              <div style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
                <img src={gameimg} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
                <div>
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
                </div>
              </div>
              {index < visibleResults.length - 1 && <Divider />}
            </div>
          ))}
        </InfiniteScroll>
        

        
        )}
      </Grid>
      <Grid item container xs={3} style={{ alignItems: 'flex-start' }}>
        <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
        <Grid item xs style={{ overflowY: 'auto', maxHeight: '90vh', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }} >
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
