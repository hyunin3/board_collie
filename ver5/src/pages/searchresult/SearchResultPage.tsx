import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/searchbar/SearchBar';
import { Divider, Grid, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import './SearchResultPage.css';
import RecentGamesList from '../../components/recentgameslist/RecentGamesList';
import FilterBar from '../../components/filterbar/FilterBar'
import InfiniteScroll from 'react-infinite-scroll-component';
import gameImg from '../../assets/splendor.png'
import axios from 'axios';

type Game = {
  id: number;
  name: string;
  tags: string[];
  image: string;
};

type GameFromServer = {
  gameId: number;
  gameTitle: string;
  gameImage: string | null;
  gameTag: Array<{
    tagId: number;
    tagName: string;
    tagDescription: string;
  }>;
};

const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

const transformData = (dataFromServer: GameFromServer[]): Game[] => {
  return dataFromServer.map(game => ({
    id: game.gameId,
    name: game.gameTitle,
    tags: game.gameTag.map(tag => tag.tagName),
    image: game.gameImage || gameImg,
  }));
};

const SearchResultsPage: React.FC = () => {
  
  const [results, setResults] = useState<Game[]>([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState('');
  const [query, setQuery] = useState('');
  const [visibleResults, setVisibleResults] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버에 GET 요청을 보냅니다.
        const response = await axios.get(`${SERVER_API_URL}/game`, {
          params: {
            q: query,
            people: numberOfPlayers,
          },
        });
        
        // 받아온 데이터를 transformData 함수를 사용하여 변환합니다.
        const games = transformData(response.data.data);
        setResults(games);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setResults([]);
      }
    };
    fetchData();
  }, [query, numberOfPlayers]);

  const handleSearch = (query: string) => {
    setQuery(query); // 입력받은 검색어를 state에 저장합니다.
  };

  const centerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 6vh)', 
    fontFamily: 'Jua, sans-serif',
    fontSize: '24px'
  };

  const handleGameClick = (gameId: number) => {
    const recentGames = JSON.parse(localStorage.getItem('recentGames') || '[]');
    const clickedGame = results.find(game => game.id === gameId);
  
    if (!clickedGame) return;
  
    const newRecentGame = { id: clickedGame.id, name: clickedGame.name };
  
    const newRecentGames = [
      ...recentGames.filter((game: { id: number; name: string }) => game.id !== gameId),
      newRecentGame,
    ];
  
    localStorage.setItem('recentGames', JSON.stringify(newRecentGames));
  };

  useEffect(() => {
    // 태그 필터가 변경되었을 때 실행됩니다.
    if (tagFilter) {
      const filteredResults = results.filter(game => game.tags.includes(tagFilter));
      setVisibleResults(filteredResults.slice(0, 10));
    } else {
      setVisibleResults(results.slice(0, 10));
    }
  }, [tagFilter, results]);

  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
    <SearchBar onSearch={handleSearch} style={{ position: 'relative' }}/>
    <FilterBar
      numberOfPlayers={numberOfPlayers}
      setNumberOfPlayers={setNumberOfPlayers}
      tagFilter={tagFilter}
      setTagFilter={setTagFilter}
      style={{ marginTop: '2.1vh' }}
    />

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
              <Link 
                to={`/game/${item.id}`} 
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => handleGameClick(item.id)}
                >
                <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
              </Link>

              <div>
                <h3>
                  <Link 
                    to={`/game/${item.id}`} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    onClick={() => handleGameClick(item.id)}
                  >
                    {item.name}
                  </Link>
                </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {item.tags.map(tag => (
                  <Chip key={tag} label={tag} style={{ margin: '4px', marginBottom: '8px', backgroundColor: '#dce7c7' }} />
                    ))}
                  </div>
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
        <Grid item xs style={{ overflowY: 'auto', maxHeight: '90vh', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }} className="hide-scrollbar">
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
