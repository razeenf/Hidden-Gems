import { useEffect, useState } from 'react'
import './Explore.css';
import Card from '../components/Card';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';
import notFound from '../assets/notFound.png';

export default function Explore({ cardData }) {
  const [searchValue, setSearchValue] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [data, setData] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  
  useEffect(() => {
    async function getPosts() {
      const result = await axios.get("http://localhost:8080/api/posts");
      setData(result.data);
      setHasFetchedData(true);
    }
  
    if (!hasFetchedData) {
      getPosts();
    }
  }, [hasFetchedData]);

  const handleRequestSearch = () => {
    if (searchValue !== '') {
      setShowSearchResults(true);
    }
  };

  return (
    <>
      <SearchBar
        style={{
          backgroundColor: '#dee8da',
          borderRadius: '15px',
          boxShadow: 'none',
          width: '47%',
          margin: 'auto',
          marginTop: '40px',
        }}
        placeholder='Enter a City'
        onChange={(newValue) => setSearchValue(newValue)}
        onRequestSearch={handleRequestSearch}
      />
      <div className='explore-wrapper'>
        {showSearchResults ? (
          <SearchResult cityName={searchValue}  />
        ) : (
          <>
            <h3>Gems Near You</h3>
            <div className="card-grid">
              <Card cardData={cardData} />
            </div>
            <h3>Recent Gems</h3>
            <div className="card-grid">
              <Card cardData={cardData} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

function SearchResult({ cityName }) {
  const [queriedData, setqueriedData] = useState([]);
  
  useEffect(() => {
    async function getPosts() {
      // const result = await axios.get("/api/posts/" + cityName)
      // setqueriedData(result.data)
    }
    getPosts()
  }, [])

  if (queriedData.length === 0) {
    return (
      <div className='not-found'>
        <img src={notFound} />
        <p>No gems found in {cityName}.</p>
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
