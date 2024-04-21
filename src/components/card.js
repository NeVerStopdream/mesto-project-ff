import { deleteOwnerCard, likeCards, deleteLikeCard } from './api.js';
import { openModal, closeModal } from './modal';

function createCard(cardData, deleteCard, likeCard, handleImageClick, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImg = cardElement.querySelector('.card__image');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');
    const popupDeleteCard = document.querySelector('.popup_type_confirm_delete');
    const formDeleteCard = document.forms['delete-card'];

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
        if (!deleteButton.disabled) {
          openModal(popupDeleteCard);
          formDeleteCard.addEventListener('submit', function(evt) {
            evt.preventDefault();
            deleteCard(cardData._id, cardElement)
          });
        }
      });
        

    cardLikeBtn.addEventListener('click', (evt) => {
        if (cardLikeBtn.classList.contains('card__like-button_is-active')) {
            likeCard(evt);
            deleteLikeCard(cardData._id)
            .then((res) => {
                cardLikeCounter.textContent = res.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            likeCard(evt);
            likeCards(cardData._id)
            .then((res) => {
                cardLikeCounter.textContent = res.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
        }
    });

    cardImg.addEventListener('click', () => {
        handleImageClick(cardData)
    });
    
    return cardElement;
};

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }

function deleteCard(cardId, cardElement) {
    const popupDeleteCard = document.querySelector('.popup_type_confirm_delete');
      deleteOwnerCard(cardId)
        .then(() => {
            cardElement.remove();
            closeModal(popupDeleteCard);
        })
        .catch((err) => {
          console.log(err);
        });
    }

export {createCard, deleteCard};
