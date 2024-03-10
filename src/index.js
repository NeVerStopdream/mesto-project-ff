import './styles/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';

const cardsContainer = document.querySelector('.places__list');
const popupBtnEdit = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupBtnAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const btnClosePopup = document.querySelectorAll('.popup__close');
const popUps = document.querySelectorAll('.popup');
const ProfileTitle = document.querySelector('.profile__title');
const ProfileDescription = document.querySelector('.profile__description');
const formElementAddCard = popupAddCard.querySelector('.popup__form');
const formElementEdit = popupEditProfile.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameImg = document.querySelector('.popup__input_type_card-name');
const urlImg = document.querySelector('.popup__input_type_url');

// Открытие модальных окон по кнопке +
popupBtnEdit.addEventListener('click', () => {
    openModal(popupEditProfile);
    StartValueInput();
});

popupBtnAddCard.addEventListener('click', () => openModal(popupAddCard));

// Закрытие модального окна по кнопке крестик
btnClosePopup.forEach((item) => {
    item.addEventListener('click', closeModal);
});

// Закрытие модального окна по оверлей
popUps.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if (evt.currentTarget === evt.target) {
            closeModal();
        };
      });
});

// Закрытие модального окна по кнопке esc
document.addEventListener('keydown', (evt) => {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    if (popupIsOpened && evt.key === 'Escape') {
        closeModal();
    };
});

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); 

    ProfileTitle.textContent = nameInput.value;
    ProfileDescription.textContent = jobInput.value;

    closeModal();
}

// Функция добавления стартовых значений в инпут поля
function StartValueInput () {
    nameInput.value = ProfileTitle.textContent;
    jobInput.value = ProfileDescription.textContent;
};

formElementEdit.addEventListener('submit', handleFormSubmit);

// Функция добавления новых карточек
function addNewCard(evt) {
    evt.preventDefault(); 

     const newCard = {
        name: nameImg.value,
        link: urlImg.value
    };
    const newCardArray = [newCard];

    newCardArray.forEach((item) => {
        cardsContainer.prepend(createCard(item, deleteCard));
    });

    nameImg.value = '';
    urlImg.value = '';

    closeModal();
}

formElementAddCard.addEventListener('submit', addNewCard);

function deleteCard(cardElement) {
    cardElement.remove();
};

initialCards.forEach((item) => {
    cardsContainer.append(createCard(item, deleteCard));
});


