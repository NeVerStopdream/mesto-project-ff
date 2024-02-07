// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard(cardData, deleteCard) {
    
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardElement.querySelector('.card__title').textContent = initialCards.name;
    cardElement.querySelector('.card__image').src = initialCards.link;
    cardElement.querySelector('.card__image').alt = initialCards.alt;

    deleteButton.addEventListener('click', () => { 
        deleteCard(cardElement);
    });
    
    return cardElement;
};

function deleteCard(cardElement) {
    cardElement.remove();
}

initialCards.forEach((item) => {
    cardsContainer.append(createCard(item, deleteCard));
});