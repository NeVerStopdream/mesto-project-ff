import {openModal} from './modal.js';
import {handleProfileFormSubmit} from '../index.js'

function createCard(cardData, deleteCard, likeCard, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImg = cardElement.querySelector('.card__image');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    
    cardTitle.textContent = cardData.name;
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;

    cardLikeBtn.addEventListener('click', () => {
        likeCard(cardLikeBtn);
    });

    deleteButton.addEventListener('click', () => { 
        deleteCard(cardElement);
    });

    cardImg.addEventListener('click', () => {
        handleImageClick(cardData)
    });
    
    return cardElement;
};

function likeCard(cardLikeBtn) {
    cardLikeBtn.classList.toggle('card__like-button_is-active');
};

function deleteCard(cardElement) {
    cardElement.remove();
};


export {createCard, deleteCard, likeCard};
