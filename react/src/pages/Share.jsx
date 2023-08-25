import React, { useState } from 'react';
import './Share.css'; 
import axios from 'axios'

export default function FormPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async event => {
    event.preventDefault();


    // Create an object with the form data to be submitted
    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('category', selectedCategory);
    formData.append('description', description);
    formData.append('image', imageFile);

    // API call to the POST /posts endpoint
    // await axios.post("http://localhost:8080/api/posts", formData, { headers: {'Content-Type': 'multipart/form-data'}})
    //   .then(response => {
    //     if (response.status === 200) {
    //       setSubmitted(true);
    //     }
    //   })
    //   .catch(error => {
    //     console.log("An error occurred:", error);
    //     setSubmitted(false);
    //   });

    // Reset form fields
    
    setSubmitted(true);
    // Redirect to the home page
    
  };

  return (
    <>
    {submitted ? (<Submitted />) : 
        (
          <>
            <h1 className='form-title'>Share your spot!</h1>
              <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                  Name:
                  <input
                    required
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <div className='form-location-labels'>
                <label className="form-label">
                  Address:
                  <input
                    required 
                    type="text"
                    className="form-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
                <label className="form-label">
                  City:
                  <input
                    required 
                    type="text"
                    className="form-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </label>
                </div>
                <label className="form-label">
                  Category:
                  <select
                    required
                    className="form-input"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    <option value="category1">Culinary</option>
                    <option value="category2">Nature</option>
                    <option value="category3">Literary</option>
                    <option value="category4">Historical</option>
                    <option value="category5">Artistic</option>
                    <option value="category7">Other</option>
                  </select>
                </label>
                <label className="form-label">
                  Description:
                  <textarea
                    className="form-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
                <label className="form-label">
                  Image:
                  <input
                    required
                    type="file"
                    accept="image/*"
                    className="form-input"
                    onChange={handleImageChange}
                  />
                </label>
                <button type="submit" className="form-button">
                  Submit
                </button>
              </form>
        </>
      )}
    </>
  );
}


function Submitted() {
  return (
    <>
      <div className='submit-res'>
        <h3>Thank you for sharing your spot!</h3>
        <p>Share another? or Explore gems!</p>
      </div>
    </>
  );
}