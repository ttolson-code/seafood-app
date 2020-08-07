import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppNav from './components/app/AppNav';
import LandingPage from './components/landing-page/LandingPage'
import FishFinderIndex from './components/fish-finder/FishFinderIndex';
import NewsIndex from './components/news/NewsIndex';
import './app.css';

const App = () => {
 
  return (
    <div className="app-container">
      <AppNav />

      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>

        <Route path="/fish-finder">
          <FishFinderIndex />
        </Route>

        <Route path="/news">
          <NewsIndex />
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default App;
