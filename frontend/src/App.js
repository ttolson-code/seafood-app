import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import AppNav from './components/app/AppNav';
import LandingPage from './components/landing-page/LandingPage'
import FishFinderIndex from './components/fish-finder/FishFinderIndex';
import NewsIndex from './components/news/NewsIndex';
import './app.css';

const App = () => {
 
  return (
    <div className="app-container">

      <Switch>

        {/* Url matches exactly / */}
        <Route exact path="/">
          <LandingPage />
        </Route>
        
        {/* Url matches fish-finder/* */}
        <Route path="/fish-finder">
          <FishFinderIndex />
        </Route>
        
        {/* Url matches /news/* */}
        <Route path="/news">
          <NewsIndex />
        </Route>
        
        {/* If url does not match /fishfinder/*, /news/*, or "/" redirect to "/" */}
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default App;
