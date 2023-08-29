import { useEffect, useState, useRef } from 'react'
import './Explore.css';
import Card from '../components/Card';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';
import notFound from '../assets/notFound.png';

export default function Explore() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const isMounted = useRef(false); // Create a ref to track component mount state

  async function getPosts() {
    const result = await axios.get("http://localhost:8080/api/posts");
    if (result.data.length > 0) {
      setData(result.data);
      localStorage.setItem('exploreData', JSON.stringify(result.data));
    }
  }

  async function checkForNewPosts(id) {
    const result = await axios.get("http://localhost:8080/api/posts/new/" + id);
    const posts = result.data;
    if(posts.length > 0) {
      const cachedExploreData = JSON.parse(localStorage.getItem('exploreData'));
      for (const post of posts.reverse()) {
        cachedExploreData.unshift(post);
        if (cachedExploreData.length > 5) {
          cachedExploreData.pop();
        }
        //
        const cachedCityData = JSON.parse(localStorage.getItem('queriedData-' + post.city.toLowerCase()));
        if (cachedCityData) {
          cachedCityData.unshift(post);
          localStorage.setItem('queriedData-' + post.city.toLowerCase(), JSON.stringify(cachedCityData));
        }
      }
      localStorage.setItem('exploreData', JSON.stringify(cachedExploreData));
      setData(cachedExploreData);
      }
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const cachedData = localStorage.getItem('exploreData');
    if (cachedData) {
      setData(JSON.parse(cachedData));
      const id = JSON.parse(cachedData)[0].id;
      checkForNewPosts(id);
    } else {
      getPosts();
    }
}, []);

  return (
    <>
      <SearchBar
        style={{
          backgroundColor: '#dee8da',
          borderRadius: '15px',
          boxShadow: 'none',
          width: '80%',
          margin: 'auto',
          marginTop: '40px',
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
      <div className='explore-wrapper'>
      {showSearchResults ? (
          <SearchResult city={searchValue} />
        ) : (
          <>
            <h3>Gems Near You</h3>
            <div className="card-grid">
              <Card cardData={data} />
            </div>
            <h3>Recent Gems</h3>
            <div className="card-grid">
              <Card cardData={data} />
            </div>
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
    const cachedData = localStorage.getItem('queriedData-' + city.toLowerCase());
    if (cachedData) {
      setQueriedData(JSON.parse(cachedData));
    } else {
      getPosts();
    }
  }, [city]);

  async function getPosts() {
      const result = await axios.get("http://localhost:8080/api/posts/" + city);
      if (result.data.length > 0) {
        setQueriedData(result.data); // if result.data is not empty, set state
        localStorage.setItem('queriedData-' + city.toLowerCase(), JSON.stringify(result.data));
      }else{
        setQueriedData([]); // if result.data is empty, set state to empty array to clear previous search results
      }
  }

  if (queriedData.length === 0) {
    return (
      <div className='not-found'>
        <img src={notFound} />
        <p>No gems found in {city}.</p>
      </div>
    )
  }

  return (
    <>
      <h3>&nbsp;</h3>
      <div className="card-grid">
        <Card cardData={queriedData} />
      </div>
    </>
  );
}