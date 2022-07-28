import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing-page/LandingPage'
import FishFinderIndex from './components/fish-finder/FishFinderIndex';
import NewsIndex from './components/news/NewsIndex';
import './app.css';

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="fish-finder/species/*" element={<FishFinderIndex />} />
          <Route path="news" element={<NewsIndex />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
