import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import NewsBanner from '../news/NewsBanner';
import AppHeader from '../app/AppHeader';
import NewsList from './NewsList';

const NewsIndex = () => {
  let route = useRouteMatch();

  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchNewsAPI() {
    // The fetch url needs to be made an environment variable using process.env in the brackets didnt work
    // const res = await fetch('https://api.seafood-app.com/fish-finder/all-profiles');
    const res = await fetch('http://localhost:5000/news/all');
    const resJson = await res.json();
    setNewsData(resJson);
    setLoading(true);
  }

  console.log(newsData);

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
      <AppHeader headerText={route.url}/>
      <NewsBanner />
      <NewsList newsData={newsData} />
    </div>
  );
};

export default NewsIndex;