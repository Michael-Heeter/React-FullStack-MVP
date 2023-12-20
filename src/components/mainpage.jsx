import React from 'react';
import backgroundImage from '../assets/AdobeStock_143737660.jpeg';

const MainPage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'black',
    height: '85.9vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div id="mainpage" style={backgroundStyle}>
      Tasks made to be EZ
    </div>
  );
};

export default MainPage;