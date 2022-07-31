import React from 'react';
import { useLocation } from 'react-router-dom';
import './css/fishFinderBanner.css'

// No prop is passed to FishFinderBanner,
// instead it uses useLocation hook to get the current URL. 
// It then isolates the last item in the URL and uses it as the banner text.

const FishFinderBanner = ({ speciesName }) => {
  // Grab current url pathname.
  const { pathname } = useLocation();
  
  // Delimit pathname by last forward slash ("/") and grab/pop() last item.
  // Replace any "-" (hypens) with a space.
  // Uppercasing first letter of words done via CSS.
  const bannerText = pathname.substring(pathname.lastIndexOf('/') + 1).replace(/-/g, ' ');
 
  return (
    <div className="fishFinder-species-banner">
      <h2 className="fishFinder-species-banner-content">
        {(bannerText === 'all') || (bannerText === 'wild') || (bannerText === 'farmed') ? `${bannerText} Profiles` : speciesName}
      </h2>
    </div>
  )
}

export default FishFinderBanner;