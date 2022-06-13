import React from 'react';
import { useLocation } from 'react-router-dom';
import './css/fishFinderBanner.css'

const FishFinderBanner = () => {
  // Grab current url pathname.
  const location = useLocation();
  const path = location.pathname;

  // Delimit pathname by last forward slash ("/") and grab/pop() last item.
  // Replace any "-" (hypens) with a space.
  // Uppercase first letter of words done via CSS.
  const bannerText = path.substr(path.lastIndexOf('/') + 1).replace(/-/g, ' ');
 
  return (
    <div className="fishFinder-species-banner">
      <h2 className="fishFinder-species-banner-content">{bannerText} Profiles</h2>
    </div>
  )
}

export default FishFinderBanner;