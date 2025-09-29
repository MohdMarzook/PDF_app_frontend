"use client"; 
import { useEffect, useState } from 'react';

export default function InAppBrowserBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Check for LinkedIn, Instagram, Facebook, etc.
    if (/linkedin|instagram|fbav/i.test(userAgent)) {
      setShowBanner(true);
    }
  }, []);

  if (!showBanner) {
    return null; // Don't render anything if it's a normal browser
  }

  // Basic styling for the banner
  const bannerStyle = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '12px',
    fontSize: '14px',
    zIndex: 1000,
  };

  const linkStyle = {
    color: '#87CEEB',
    textDecoration: 'underline',
    fontWeight: 'bold',
  };

  return (
    <div style={bannerStyle}>
      <span>For the best experience, please open this site in your main browser.</span>
      {/* The link below is a placeholder; there's no way to force it */}
      <a href={window.location.href} style={linkStyle} target="_blank" rel="noopener noreferrer"> Open in Browser</a>
    </div>
  );
}