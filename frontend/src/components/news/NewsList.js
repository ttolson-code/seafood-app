import React from 'react';
import { useParams } from 'react-router-dom';
import NewsItem from './NewsItem';
import './css/newsList.css'


export default function NewsList({ newsData }) {
  const params = useParams();
  const profileId = params.profileId;


  function renderNewsItems(newsData)  {
    return newsData.map((newsItem) => {
      return (
        <NewsItem
          key={newsItem._id}
          title={newsItem.title}
          caption={newsItem.caption}
          date={newsItem.date}
          url={newsItem.url}
        />
      );
    });
  }
        
  return (
    <div className="news-items-container">
      <ul className="news-items-list">
        {renderNewsItems(newsData)}
      </ul>
    </div>
  );
}