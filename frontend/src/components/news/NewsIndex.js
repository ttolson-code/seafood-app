import React, { useState, useEffect } from 'react';
import news from '../../apis/news';
import NewsBanner from '../news/NewsBanner';
import AppHeader from '../app/AppHeader';
import NewsList from './NewsList';

const NewsIndex = () => {
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchNewsAPI() {
    const res = await news.get('/news/all');
    setNewsData(res.data);
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
    );
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
