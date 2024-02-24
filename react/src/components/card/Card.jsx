import React, { useState } from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCircleXmark, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode'; // Import the jwt_decode function directly

export default function Card({ cardData }) {
  const [selectedCard, setSelectedCard] = useState(null);

  const openModal = (card) => {
    setSelectedCard(card);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setSelectedCard(null);
    document.body.classList.remove('modal-open');
  };

  return (
    <>
      {cardData.map(card => (
        <div className="card" key={card.id} onClick={() => openModal(card)}>
          <div className="card-image" style={{ backgroundImage: `url(${card.imageUrl})` }}>
            {/* <img src={card.imageUrl} alt="" loading="lazy" /> */}
            {/* this works but need to fix css for it so ill add it later */}
            <div className="banner">
              <p className="card-name">{card.name}</p>
            </div>
          </div>
        </div>
      ))}
      {selectedCard && <Modal card={selectedCard} onClose={closeModal} />}
    </>
  );
}

// Modal component
function Modal({ card, onClose }) {

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchUserSavedPosts();
  }, []);

  const fetchUserSavedPosts = async () => {
    try {
      const response = await axios.get("/api/user/savedPosts");

      // Check if the current post is among the user's saved posts
      const savedPostIds = response.data.map(savedPost => savedPost.id);
      const postIsSaved = savedPostIds.includes(card.id);

      // Set the initial value of isSaved based on the result
      setIsSaved(postIsSaved);
    } catch (error) {
      console.error('Error fetching user saved posts:', error);
    }
  };


  const toggleSave = async () => {
    const postId = card.id;
    const response = await axios.post("/api/user/toggleSave", { postId, save: saveFlag });
    if (response.status === 200) {
      // If the save operation is successful
      if (saveFlag) {
        card.totalSaves += 1;
      } else {
        card.totalSaves -= 1;
      }
      setIsSaved(!isSaved);
    }
  };
  // need to find a way to keep the green save after a post is saved and not reset after closing modal

  const bookmarkClass = isSaved ? 'saved-button' : '';

  // Decode JWT token to get user ID
  const currentUserToken = localStorage.getItem('token'); // Assuming token is stored in localStorage
  const currentUserId = currentUserToken ? jwtDecode(currentUserToken).userId : null;

  const canDeletePost = currentUserId === card.authorId;
  const canSavePost = currentUserId !== null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-image" style={{ backgroundImage: `url(${card.imageUrl})` }} />
          <div className="modal-info">
            <h2 className="modal-name">{card.name}</h2>
            <em><p className="modal-location">{card.address}, {card.city.charAt(0).toUpperCase() + card.city.slice(1)}</p></em>
            <p className="modal-description">{card.description}</p>
            <p className='author'>{card.authorName}</p>
          </div>
          <div className='modal-buttons'>
            <button onClick={onClose}>
              <span className='close-button'><FontAwesomeIcon icon={faCircleXmark} /></span>
            </button>
            {canSavePost && (
              <button onClick={toggleSave()}>
                <span className={bookmarkClass}><FontAwesomeIcon icon={faBookmark} /></span>
                <p className='total-saves'>{card.totalSaves}</p>
              </button>
            )}
            {canDeletePost && (
              <button>
                <span><FontAwesomeIcon icon={faTrashCan} style={{ color: "#000000" }} /></span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
