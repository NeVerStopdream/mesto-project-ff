
import {openModal} from './modal.js';

function createCard(cardData, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const popUpImg = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImg = cardElement.querySelector('.card__image');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    
    cardTitle.textContent = cardData.name;
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;

    cardLikeBtn.addEventListener('click', () => songLike(cardLikeBtn));

    deleteButton.addEventListener('click', () => { 
        deleteCard(cardElement);
    });

    popUpImg.addEventListener('click', () => openImg(cardData));
    
    return cardElement;
};

function songLike(cardLikeBtn) {
    cardLikeBtn.classList.toggle('card__like-button_is-active');
};

function openImg(cardData) {
    const popupElement = document.querySelector('.popup_type_image');
    openModal(popupElement);

    document.querySelector('.popup__image').src = cardData.link;
    document.querySelector('.popup__caption').textContent = cardData.name;
};

export {createCard};
