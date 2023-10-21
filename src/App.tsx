import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LobbyPage from './pages/LobbyPage/LobbyPage';
import MainPage from './pages/MainPage/MainPage';
import SearchResultPage from './pages/SearchResultPage/SearchResultPage'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LobbyPage />} /> 
        <Route path="/main" element={<MainPage />} />
        <Route path="/searchresult" element={<SearchResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
