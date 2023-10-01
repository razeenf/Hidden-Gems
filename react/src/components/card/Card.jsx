import React, { useState } from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCircleXmark, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';

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
            {/* this works but we need to fix css for it so ill add it later */}
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

  const savePost = () => {
    console.log("saved post")
    setIsSaved(!isSaved);
  };

  const bookmarkClass = isSaved ? 'saved-button' : '';


  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-image" style={{ backgroundImage: `url(${card.imageUrl})` }} />
          <div className="modal-info">
            <p className="modal-name">{card.name}</p>
            <em><p className="modal-location">{card.address}, {card.city.charAt(0).toUpperCase() + card.city.slice(1)}</p></em>
            <p className="modal-description">{card.description}</p>
          </div>
          <div className='modal-buttons'>
            <button onClick={onClose}>
              <span className='close-button'><FontAwesomeIcon icon={faCircleXmark} /></span>
            </button>
            <button onClick={savePost}>
              <span className={bookmarkClass}><FontAwesomeIcon icon={faBookmark} /></span>
            </button>
            <button>
              <span><FontAwesomeIcon icon={faTrashCan} style={{ color: "#000000", }} /></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
