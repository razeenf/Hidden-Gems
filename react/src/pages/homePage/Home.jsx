import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// 9 img
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';
import img4 from '../../assets/img4.png';
import img5 from '../../assets/img5.jpg';
import img6 from '../../assets/img6.jpg';
import img7 from '../../assets/img7.jpg';
import img8 from '../../assets/img8.jpg';
import img9 from '../../assets/img9.jpg';


import directions from '../../assets/directions.png';
import travel from '../../assets/travel.png';
import map from '../../assets/map.png';
import share from '../../assets/share.png';

export default function Home() {
  const navigate = useNavigate();

  const allImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

  const [randomImages, setRandomImages] = useState([]);

  // Function to shuffle an array randomly
  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    const shuffledImages = shuffleArray(allImages);
    const selectedImages = shuffledImages.slice(0, 3);
    setRandomImages(selectedImages);
  }, []);

  const handleButtonClick = () => {
    navigate('/explore');
  };

  return (
    <>
      <div className="home-wrapper">
        <div className="intro">
          <h1>The best spots are often hiding!</h1>
          <p>We don't gatekeep around here, explore the coolest hidden gems in any city and feel free to share your favorite gems with the world.</p>
          <button className="explore-button" onClick={handleButtonClick}>Find Gems ➜</button>
        </div>

        <div className="imgs">
          {randomImages.map((image, index) => (
            <div className="img" key={index}>
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <section className="features-section">
        <h2>Discover the <span className='underline'>unseen</span></h2>
        <div className="features-grid">
          <div className="feature-card">
            <div>
              <img src={directions} className='feature-img' />
            </div>
            <div>
              <h3>Beyond the mainstream</h3>
              <p>Unveil hidden gem spots that few have had the privilege to explore and create unforgettable memories.</p>
            </div>
          </div>
          <div className="feature-card">
            <div>
              <img src={travel} className='feature-img' />
            </div>
            <div>
              <h3>Scout ahead of the trip</h3>
              <p>Add some hidden gems to your travel itinerary before visiting, and embark on a journey filled with unique experiences.</p>
            </div>
          </div>
          <div className="feature-card">
            <div>
              <img src={share} className='feature-img' />
            </div>
            <div>
              <h3>Save and share spots</h3>
              <p>Bookmark spots you want to visit, making them readily accessible on your account for that upcomming trip.</p>
            </div>
          </div>
          <div className="feature-card">
            <div>
              <img src={map} className='feature-img' />
            </div>
            <div>
              <h3>Put 'em on the map</h3>
              <p>Promote small businesses through sharing lesser-known yet deserving spots, positively impacting your community.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
