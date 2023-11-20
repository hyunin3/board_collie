import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/searchbar/SearchBar';
import { Divider, Grid, Chip, Modal, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './SearchResultPage.css';
import RecentGamesList from '../../components/recentgameslist/RecentGamesList';
import FilterBar from '../../components/filterbar/FilterBar'
import InfiniteScroll from 'react-infinite-scroll-component';
import gameImg from '../../assets/splendor.png'
import axios from 'axios';
import { useSearch } from '../../contexts/SearchContext';
import { HashLoader } from 'react-spinners';

type TagInfo = {
  name: string;
  description: string;
};

type Game = {
  id: number;
  name: string;
  tags: TagInfo[];
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
    tags: game.gameTag.map(tag => ({
      name: tag.tagName,
      description: tag.tagDescription
    })),
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
  const { searchTag, setSearchTag, searchType, setSearchType } = useSearch();
  const [open, setOpen] = useState(false);
  const [selectedTagName, setSelectedTagName] = useState("");
  const [selectedTagDescription, setSelectedTagDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => setOpen(false);
  const handleTagClick = (tagName: string, tagDescription: string) => {
    setSelectedTagName(tagName);
    setSelectedTagDescription(tagDescription);
    setOpen(true);
    // setQuery(tagName);
  };
  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    // 검색창이 비어있을 때 초기 상태로 설정
    handleSearch('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterGamesByTag = (games: Game[], tagFilter: string | null): Game[] => {
    if (!tagFilter) return games;
    return games.filter(game => 
      game.tags.some(tag => tag.name === tagFilter)
    );
  };
  
  const loadMore = () => {
    console.log("Load More is called");
    // 필터링된 결과를 기준으로 더 많은 데이터를 불러옵니다.
    const filteredResults = filterGamesByTag(results, tagFilter);
    if (visibleResults.length >= filteredResults.length) {
      setHasMore(false);
      return;
    }
    const moreResults = filteredResults.slice(visibleResults.length, visibleResults.length + 10);
    setVisibleResults(visibleResults.concat(moreResults));
  };

  useEffect(() => {
    const filteredResults = filterGamesByTag(results, tagFilter);
    setVisibleResults(filteredResults.slice(0, 10));
    setHasMore(filteredResults.length > 10);
  }, [tagFilter, results]);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const searchQuery = searchTag || query;
        const response = await axios.get(`${SERVER_API_URL}/game`, {
          params: {
            q: searchQuery,
            people: numberOfPlayers,
            type: searchType,
          },
        });
        const games = transformData(response.data.data);
        console.log("#1", searchType, searchQuery)
        setResults(games);
        if (searchTag) {
          setQuery(searchTag);
          setSearchTag('');
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setResults([]);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [searchTag, query, numberOfPlayers, setSearchTag, setQuery, searchType]);

  const handleSearch = (query: string) => {
    setQuery(query); // 입력받은 검색어를 state에 저장합니다.
  };
  const handleViewThemeGames = () => {
    setQuery(selectedTagName);
    setSearchType('tag');
    setSearchTag(selectedTagName);
    handleClose();
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
      const filteredResults = results.filter(game => 
        game.tags.some(tag => tag.name === tagFilter)
      );
      setVisibleResults(filteredResults.slice(0, 10));
    } else {
      setVisibleResults(results.slice(0, 10));
    }
  }, [tagFilter, results]);
  

  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
    <SearchBar onSearch={handleSearch} style={{ position: 'relative' }} searchType={searchType} setSearchType={setSearchType} currentQuery={query}/>
    <FilterBar
      numberOfPlayers={numberOfPlayers}
      setNumberOfPlayers={setNumberOfPlayers}
      tagFilter={tagFilter}
      setTagFilter={setTagFilter}
      style={{ marginTop: '2.1vh' }}
    />

    <Grid container spacing={2}>
      <Grid item xs={9} style={{ overflowY: 'auto', maxHeight: '80vh', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="hide-scrollbar">
      {isLoading ? (
    // 데이터 로딩 중일 때 HashLoader 표시
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <HashLoader color="#36d7b7" />
    </div>
  ) : results.length === 0 ? (
    // 검색 결과가 없을 때 메시지 표시
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
            <div key={item.name} style={{ marginLeft: '5vw' }} >
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
                  <Chip 
                  key={tag.name} 
                  label={tag.name} 
                  onClick={() => handleTagClick(tag.name, tag.description)} 
                  style={{ margin: '4px', marginBottom: '8px', backgroundColor: '#dce7c7' }}
                />
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
        <Grid item xs style={{ overflowY: 'auto', maxHeight: '80vh', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }} className="hide-scrollbar">
          <div style={{ textAlign: 'center' }}>
            <h4>최근 본 게임</h4>
            <RecentGamesList />
          </div>
        </Grid>
      </Grid>
    </Grid>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h5" style={{ fontFamily: 'Jua, sans-serif' }}>
            {selectedTagName}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {selectedTagDescription}
          </Typography>
          <Button onClick={handleViewThemeGames} sx={{ marginLeft: '-7px' }}>해당 테마 게임 모아보기</Button>
        </Box>
      </Modal>
  </div>
  );
}

export default SearchResultsPage;
