import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LobbyPage from './pages/lobby/LobbyPage';
import MainPage from './pages/main/MainPage';
import SearchResultPage from './pages/searchresult/SearchResultPage'
import GameDetailPage from './pages/gamedetail/GameDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LobbyPage />} /> 
        <Route path="/main" element={<MainPage />} />
        <Route path="/searchresult" element={<SearchResultPage />} />
        <Route path="/game/:name" element={<GameDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;