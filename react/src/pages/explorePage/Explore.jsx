import { useEffect, useState, useRef } from 'react'
import './Explore.css';
import Card from '../../components/card/Card';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';
import notFound from '../../assets/notFound.png';

export default function Explore() {
  const [searchValue, setSearchValue] = useState('');
  const [recentPosts, setRecentPosts] = useState([]);
  const [nearbyPosts, setNearbyPosts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const storedRecent = localStorage.getItem('explore-recent');
    const storedNearby = localStorage.getItem('explore-nearby');
    if (storedRecent && storedNearby) {
      setRecentPosts(JSON.parse(storedRecent));
      setNearbyPosts(JSON.parse(storedNearby))
      const id = JSON.parse(storedRecent)[0].id;
      checkForNewPosts(id);
    } else if (storedRecent) {
      setRecentPosts(JSON.parse(storedRecent));
      getNearbyPosts();
      const id = JSON.parse(storedRecent)[0].id;
      checkForNewPosts(id);
    } else {
      getRecentPosts();
      getNearbyPosts();
    }
  }, []);

  async function getRecentPosts() {
    const recentPosts = await axios.get("/api/posts");

    if (recentPosts.data.length > 0) {
      setRecentPosts(recentPosts.data);
      localStorage.setItem('explore-recent', JSON.stringify(recentPosts.data));
    }
  }

  async function getNearbyPosts() {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          const nearbyPosts = await axios.get(`/api/posts/nearby/${latitude}/${longitude}`);

          if (nearbyPosts.data.length > 0) {
            setNearbyPosts(nearbyPosts.data);
            localStorage.setItem('explore-nearby', JSON.stringify(nearbyPosts.data));
          }
        }, (error) => {
          console.error('Error getting geolocation:', error.message);
        });
      } else {
        console.error('Geolocation is not supported in this browser.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  async function checkForNewPosts(id) {
    const result = await axios.get("/api/posts/new/" + id);
    const posts = result.data;
    if (posts.length > 0) {
      const cachedExploreData = JSON.parse(localStorage.getItem('explore-recent'));
      for (const post of posts.reverse()) {
        cachedExploreData.unshift(post);
        if (cachedExploreData.length > 5) {
          cachedExploreData.pop();
        }
        // if new post is a city thats been cached add to cache
        const cachedCityData = JSON.parse(localStorage.getItem('queriedData-' + post.city.toLowerCase()));
        if (cachedCityData) {
          cachedCityData.unshift(post);
          localStorage.setItem('queriedData-' + post.city.toLowerCase(), JSON.stringify(cachedCityData));
        }
      }
      localStorage.setItem('explore-recent', JSON.stringify(cachedExploreData));
      setRecentPosts(cachedExploreData);
    }
  };

  return (
    <>
      <div className='explore-wrapper'>
        <SearchBar
          style={{
            backgroundColor: '#dee8da',
            borderRadius: '15px',
            boxShadow: 'none',
            width: '100%',
            margin: '35px auto',
          }}
          placeholder='Enter a City'
          cancelOnEscape={true}
          onRequestSearch={(newValue) => {
            if (newValue !== '') {
              setSearchValue(newValue),
                setShowSearchResults(true);
            }
          }}
          onCancelSearch={() => {
            setSearchValue('');
            setShowSearchResults(false);
          }}
        />
        {showSearchResults ? (
          <SearchResult city={searchValue} />
        ) : (
          <>
            <h3>Recent Gems</h3>
            <div className="explore-card-grid">
              <Card cardData={recentPosts} />
            </div>
            <h3>Gems Near You</h3>
            {nearbyPosts.length > 0 ? (
              <div className="explore-card-grid">
                <Card cardData={nearbyPosts} />
              </div>
            ) : (
              <p className='location-off'>Nothing near you :(</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

function SearchResult({ city }) {
  const [queriedData, setQueriedData] = useState([]);
  const isMounted = useRef(false); // useRef to track mounting state

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const storedData = localStorage.getItem('queriedData-' + city.toLowerCase());
    if (storedData) {
      setQueriedData(JSON.parse(storedData));
    } else {
      getPosts();
    }
  }, [city]);

  async function getPosts() {
    const result = await axios.get(`/api/posts/${city}`);
    if (result.data.length > 0) {
      setQueriedData(result.data); // if result.data is not empty, set state
      localStorage.setItem('queriedData-' + city.toLowerCase(), JSON.stringify(result.data));
    } else {
      setQueriedData([]); // if result.data is empty, set state to empty array to clear previous search results
    }
  }

  return (
    <>
      {queriedData.length === 0 ? (
        <div className='not-found'>
          <img src={notFound} alt="Not Found" />
          <p>No gems found in {city}.</p>
        </div>
      ) : (
        <>
          <div className="search-card-grid">
            <Card cardData={queriedData} />
          </div>
        </>
      )}
    </>
  );

}