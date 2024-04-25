import { deleteOwnerCard, likeCards, deleteLikeCard } from './api.js';
import { openModal, closeModal } from './modal';

const popupDeleteCard = document.querySelector('.popup_type_confirm_delete'); 
const formDeleteCard = document.forms['delete-card'];

function deleteCard(cardId, card) {
    deleteOwnerCard(cardId)
        .then(() => {
            card.remove();
            closeModal(popupDeleteCard);
        })
        .catch((err) => {
            console.log(err);
        });
}

let cardToDelete, cardToDeleteId;

formDeleteCard.addEventListener('submit', function(evt) {
    evt.preventDefault();
    deleteCard(cardToDeleteId, cardToDelete);
});

const deleteCallback = (card, cardId) => {
    openModal(popupDeleteCard);
    cardToDelete = card;
    cardToDeleteId = cardId;
}
  
function createCard(cardData, deleteCard, likeCard, handleImageClick, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImg = cardElement.querySelector('.card__image');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');

    if (cardData.owner._id !== userId) {
        deleteButton.disabled = true;
        deleteButton.classList.add('visually-hidden');
    }
    
    cardTitle.textContent = cardData.name;
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardLikeCounter.textContent = cardData.likes.length;

    if (cardData.likes.some((user) => user._id === userId)) {
        cardLikeBtn.classList.add('card__like-button_is-active');
    }

    deleteButton.addEventListener('click', function() {
        deleteCallback(cardElement, cardData._id);
    });

    cardLikeBtn.addEventListener('click', (evt) => {
        const likeMethod = cardLikeBtn.classList.contains('card__like-button_is-active') ? deleteLikeCard : likeCards;
        likeMethod(cardData._id)
            .then((res) => {
                cardLikeCounter.textContent = res.likes.length;
                likeCard(evt);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    cardImg.addEventListener('click', () => {
        handleImageClick(cardData)
    });
    
    return cardElement;
};

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard };
