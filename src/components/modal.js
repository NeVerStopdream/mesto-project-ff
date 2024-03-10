// функция открытия попап по клику кнопок
function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
    popupElement.classList.add('popup_is-animated');
}

// функция скрытия попап по клику
function closeModal() {
    const popupElement = document.querySelector('.popup_is-opened');
    popupElement.classList.remove('popup_is-opened');
}

export { openModal, closeModal }; 