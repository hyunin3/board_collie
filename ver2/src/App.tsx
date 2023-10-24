import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LobbyPage from './pages/lobby/LobbyPage';
import MainPage from './pages/main/MainPage';
import NavBar from './components/common/navbar/NavBar';
import SearchResultPage from './pages/searchresult/SearchResultPage'
import GameDetailPage from './pages/gamedetail/GameDetailPage';

const App: React.FC = () => {
  const [players, setPlayers] = useState(2);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LobbyPage players={players} setPlayers={setPlayers} />} /> 
        <Route path="/" element={<NavBar players={players} />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/searchresult" element={<SearchResultPage />} />
          <Route path="/game/:name" element={<GameDetailPage />} />
        </Route>  
      </Routes>
    </Router>
  );
}

export default App;
