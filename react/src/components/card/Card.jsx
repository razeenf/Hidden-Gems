import React, { useState } from 'react';
import './Card.css';

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
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-image" style={{ backgroundImage: `url(${card.imageUrl})` }} />
          <div className="modal-info">
            <p className="modal-name">{card.name}</p>
            <p className="modal-location">{card.address}</p>
            <p className="modal-description">{card.description}</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <span className="close-icon">✖</span>
          </button>
        </div>
      </div>
    </div>
  );
}
