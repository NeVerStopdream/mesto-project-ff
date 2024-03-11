
// функция открытия попап по клику кнопок
function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape); 
};

// функция скрытия попап по клику
function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape); 
};

// Закрытие модального окна по кнопке esc
function handleEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
    };
};

export {openModal, closeModal}; 