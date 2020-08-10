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

      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>

        <Route path="/fish-finder">
          <AppNav />
          <FishFinderIndex />
        </Route>

        <Route path="/news">
          <AppNav />
          <NewsIndex />
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default App;
