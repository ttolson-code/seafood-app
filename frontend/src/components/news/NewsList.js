import React from 'react';
import NewsItem from './NewsItem';
import './css/newsList.css'

const NewsList = ({ newsData }) => {
  const renderNewsItems = (newsData) => {
    return newsData.map((newsItem) => {
      return (
        <NewsItem
          key={newsItem._id}
          title={newsItem.title}
          caption={newsItem.caption}
          date={newsItem.date}
          url={newsItem.url}
          imageURL={newsItem.imageUrl}
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

export default NewsList;