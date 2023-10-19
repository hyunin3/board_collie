import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<MainPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
