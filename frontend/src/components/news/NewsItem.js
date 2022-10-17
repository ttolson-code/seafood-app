import React from 'react';
import moment from 'moment';
import './css/newsItem.css';

const NewsItem = (props) => {
  const formattedDate = moment(props.date).format('LL');

  return (
    <li className="news-item">
      <div className="news-item-content">
        <h2 className="news-item-heading">
          <a
            className="news-item-link"
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.title}
          </a>
        </h2>
        <p className="news-item-caption">{props.caption}</p>
        <p className="news-item-date">{formattedDate}</p>
      </div>
      <img
        className="news-item-image"
        src={props.imageURL}
        alt={props.title}
      ></img>
    </li>
  );
};

export default NewsItem;
