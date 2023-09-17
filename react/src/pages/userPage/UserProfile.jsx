import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css';
import Navbar from "../../components/navbar/Navbar";
import Card from '../../components/card/Card';
import axios from 'axios';
import Footer from '../../components/footer/Footer';
import notFound from '../../assets/notFound.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBorderAll } from '@fortawesome/free-solid-svg-icons';


export default function User() {
  const { id } = useParams();

  // State to manage which tab is currently active (default to 'posts')
  const [activeTab, setActiveTab] = useState('posts');

  const [savedPosts, setSavedPosts] = useState([]);
  const [userPosts, setuserPosts] = useState([]);
  const isMounted = useRef(false); // useRef to track mounting state

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const storedData = localStorage.getItem('userPosts');
    if (storedData) {
      setuserPosts(JSON.parse(storedData));
    } else {
      getPosts();
    }
  }, []);

  async function getPosts() {
    const result = await axios.get("/api/posts/toronto");
    if (result.data.length > 0) {
      setuserPosts(result.data); // if result.data is not empty, set state
      localStorage.setItem('userPosts', JSON.stringify(result.data));
    } else {
      setuserPosts([]); // if result.data is empty, set state to empty array to clear previous search results
    }
  }

  // Define content for the 'posts' and 'saved' tabs
  const postsContent = (
    <>
      {userPosts.length === 0 ? (
        <div className='not-found'>
          <img src={notFound} alt="Not Found" />
          <p>No saved posts.</p>
        </div>
      ) : (
        <>
          <div className="user-card-grid">
            <Card cardData={userPosts} />
          </div>
        </>
      )}
    </>
  );

  const savedContent = (
    <>
      {savedPosts.length === 0 ? (
        <div className='not-found'>
          <img src={notFound} alt="Not Found" />
          <p>No saved posts.</p>
        </div>
      ) : (
        <>
          <div className="user-card-grid">
            <Card cardData={savedPosts} />
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <Navbar />
      <div className="content">
        <div className="user-profile">
          {/* User profile header (username and other user information) */}
          <div className="profile-header">
            <h1 className='user-name'>{id}</h1>
            {/* Add more user information here */}
          </div>

          {/* Tab navigation */}
          <div className="tab-navigation">
            <button
              className={activeTab === 'posts' ? 'active' : ''}
              onClick={() => setActiveTab('posts')}
            >
              <FontAwesomeIcon icon={faBorderAll} style={{ color: "#85bd42", }} /> &nbsp;&nbsp;Posts
            </button>
            <button
              className={activeTab === 'saved' ? 'active' : ''}
              onClick={() => setActiveTab('saved')}
            >
              <FontAwesomeIcon icon={faBookmark} style={{ color: "#85bd42", }} /> &nbsp;&nbsp;Saved
            </button>
          </div>

          {/* Content based on the active tab */}
          {activeTab === 'posts' ? postsContent : savedContent}
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

