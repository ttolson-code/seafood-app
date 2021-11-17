import React from 'react';
import { useLocation } from 'react-router-dom';
import './css/newsBanner.css'

const NewsBanner = () => {
  // Grab current url pathname.
  // const location = useLocation();
  // const path = location.pathname;

  // Delimit pathname by last forward slash ("/") and grab/pop() last item.
  // Replace any "-" (hypens) with a space.
  // Uppercase first letter of words done via CSS.
  // const bannerText = path.substr(path.lastIndexOf('/') + 1).replace(/-/g, ' ');
 
  return (
    <div className="news-banner">
      <h2 className="news-banner-content">Seafood News</h2>
    </div>
  )
}

export default NewsBanner;