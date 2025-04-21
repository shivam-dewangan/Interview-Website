import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import './AiMl.css';

const AiMl = () => {
  return (
    <div className="maintenance-page">
      <Player
        autoplay
        loop
        src="https://assets1.lottiefiles.com/packages/lf20_Cc8Bpg.json"
        style={{ height: '300px', width: '300px' }}
      />
      <h1>We're Under Maintenance</h1>
      <p>Our Developers is fixing things up. We'll be back soon!</p>

      <div className="loading-bar">
        <div className="bar" />
      </div>
    </div>
  );
};

export default AiMl;
