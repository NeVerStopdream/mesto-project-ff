import './styles/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';

const cardsContainer = document.querySelector('.places__list');
const popupBtnEdit = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupBtnAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const closePopButtons = document.querySelectorAll('.popup__close');
const popUps = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElementAddCard = document.forms['new-place'];
const formElementEdit = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameImg = document.querySelector('.popup__input_type_card-name');
const urlImg = document.querySelector('.popup__input_type_url');
const popupAddImg = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption');

// Открытие модальных окон по кнопке +
popupBtnEdit.addEventListener('click', () => {
    openModal(popupEditProfile);
    fillProfileInputs();
});

popupBtnAddCard.addEventListener('click', () => openModal(popupAddCard));

// Закрытие модального окна по кнопке крестик
closePopButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closeModal(popup));
});

// Закрытие модального окна по оверлей
popUps.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if (evt.currentTarget === evt.target) {
            closeModal(item);
        };
      });
});

// Закрытие модального окна по кнопке esc
function handleEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
    };
};

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(popupEditProfile);
};

// Функция добавления стартовых значений в инпут поля
function fillProfileInputs () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
};

formElementEdit.addEventListener('submit', handleProfileFormSubmit);

// Функция открытия картинки
function handleImageClick(cardData) {
    openModal(popupAddImg);

    popupImg.src = cardData.link;
    popupImg.alt = cardData.name;
    popupImgCaption.textContent = cardData.name;
};

// Функция добавления новых карточек
function addNewCard(evt) {
    evt.preventDefault(); 

    const newCard = {
        name: nameImg.value,
        link: urlImg.value
};

    cardsContainer.prepend(createCard(newCard, deleteCard, likeCard, handleImageClick));

    evt.target.reset();

    closeModal(popupAddCard);
};

formElementAddCard.addEventListener('submit', addNewCard);

initialCards.forEach((item) => {
    cardsContainer.append(createCard(item, deleteCard, likeCard, handleImageClick));
});

export {handleEscape, handleProfileFormSubmit}

