import React from 'react';
import './css/newsItem.css'

const NewsItem = (props) => {
  return (
    <li className="news-item">
      <div className="news-item-content">
        <h2 className="news-item-heading"><a className="news-item-link"href={props.url} target="_blank">{props.title}</a></h2>
        <p className="news-item-caption">{props.caption}</p>
        <p className="news-item-date">{props.date}</p>
      </div>
      <img className="news-item-image" src={props.imageURL}></img>
    </li>
  )
}

export default NewsItem;