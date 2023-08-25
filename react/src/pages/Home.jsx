import { useNavigate } from 'react-router-dom';
import './Home.css';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';

export default function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/explore');
  };

  return (
    <>
    <div className="parent">
        <div className="intro">
            <h1>The best spots are often hiding!</h1>
            <p>We don't gatekeep around here, explore the coolest hidden gems in your city and feel free to share your favorite gems with the world!</p>
            <button className="explore-button" onClick={handleButtonClick}>Find Gems ➜</button>
        </div>

        <div className="imgs">
            <div className="img"><img src={img1}/></div>
            <div className="img"><img src={img2}/></div>
            <div className="img"><img src={img3}/></div>
        </div>
    </div>
    </>
  );
}
