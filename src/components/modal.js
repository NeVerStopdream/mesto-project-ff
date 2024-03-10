import {handleEscape} from '../index.js';

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

export {openModal, closeModal}; 