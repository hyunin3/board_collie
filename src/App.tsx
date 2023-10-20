import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LobbyPage from './pages/LobbyPage/LobbyPage';
import MainPage from './pages/MainPage/MainPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<LobbyPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
