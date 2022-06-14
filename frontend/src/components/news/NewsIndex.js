import React, { useState, useEffect } from 'react';
import NewsBanner from '../news/NewsBanner';
import AppHeader from '../app/AppHeader';
import NewsList from './NewsList';

const NewsIndex = () => {
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchNewsAPI() {
    // The fetch url needs to be made an environment variable using process.env in the brackets didnt work
    // const res = await fetch('https://api.seafood-app.com/fish-finder/all-profiles');
    const res = await fetch('http://localhost:3001/news/all');
    const resJson = await res.json();
    setNewsData(resJson);
    setLoading(true);
  }
  useEffect(() => {
    fetchNewsAPI();
  }, []);

  if (!loading) {
    return (
      <div className="fishFinder-loader-container">
        <div className="fishFinder-loader"></div>
      </div>
    )
  }

  return (
    <div className="news-container">
      <AppHeader />
      <NewsBanner />
      <NewsList newsData={newsData} />
    </div>
  );
};

export default NewsIndex;