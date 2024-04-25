import './styles/index.css';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, patchUserInfo, addCard, updateAvatar } from './components/api.js';

const cardsContainer = document.querySelector('.places__list');
const popupBtnEdit = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupBtnAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const closePopButtons = document.querySelectorAll('.popup__close');
const popUps = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formElementAddCard = document.forms['new-place'];
const formElementEdit = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameImg = document.querySelector('.popup__input_type_card-name');
const urlImg = document.querySelector('.popup__input_type_url');
const popupAddImg = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption');
//Переменные с попапом аватар
const popupAvatar = document.querySelector('.popup_type_avatar_edit');
const editAvatarButton = document.querySelector('.profile__avatar-button');
const formEditAvatar = document.forms['edit-avatar'];
const avatarInput = formEditAvatar['avatar'];

// Открытие модальных окон по кнопке +
popupBtnEdit.addEventListener('click', () => {
    openModal(popupEditProfile);
    fillProfileInputs();
    clearValidation(formElementEdit, enableValidation);
});

popupBtnAddCard.addEventListener('click', () => {
  openModal(popupAddCard);
  clearValidation(formElementAddCard);
});

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

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    renderLoading(true);

    patchUserInfo({
        name: nameInput.value,
        about: jobInput.value
      })
        .then((userData) => {
          profileTitle.textContent = userData.name;
          profileDescription.textContent = userData.about;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
        renderLoading(false);  
        closeModal(popupEditProfile);
        });
};

// обновление данных пользователя
getUserInfo()
  .then((user) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style = `background-image: url('${user.avatar}')`;
  })
  .catch((err) => {
    console.log(err);
  });

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
    renderLoading(true);
    
    addCard({
      name: nameImg.value,
      link: urlImg.value
    })
      .then((cardData) => {
        cardsContainer.prepend(createCard(cardData, deleteCard, likeCard, handleImageClick, cardData.owner._id));
        formElementAddCard.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false);
        closeModal(popupAddCard);
      });
  }

formElementAddCard.addEventListener('submit', addNewCard);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;
    cards.forEach((card) => {
        cardsContainer.append(createCard(card, deleteCard, likeCard, handleImageClick , userId));
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Валидация форм
enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: ".button_inactive",
    inputErrorClass: ".form__input-error_active",
    errorClass: ".form__input-error_active",
  });
  

editAvatarButton.addEventListener('click', function() {
    openModal(popupAvatar);
    avatarInput.value = '';
    clearValidation(formEditAvatar, enableValidation);
  });

formEditAvatar.addEventListener('submit', function(evt) {
    evt.preventDefault();
    renderLoading(true);
    updateAvatar(avatarInput.value)
      .then((userData) => {
        profileImage.style = `background-image: url('${userData.avatar}')`;
      })
      .finally(() => {
        renderLoading(false);
        closeModal(popupAvatar);
      });
  });


function renderLoading(isLoading) {
    const activePopup = document.querySelector('.popup_is-opened');
    if (activePopup) {
        const activeButton = activePopup.querySelector('.popup__button');
        if (isLoading) {
        activeButton.textContent = 'Сохранение...';
        } else {
        activeButton.textContent = 'Сохранить';
        }
    }
}

