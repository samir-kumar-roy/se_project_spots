const editProfileButton = document.querySelector(".profile__edit-button");
const newPostButton = document.querySelector(".profile__post-button");

const editModal = document.querySelector("#edit-modal");
const newPostModal = document.querySelector("#new-post-modal");
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const editModalCloseButton = editModal.querySelector(".modal__close-btn");
const newPostModalCloseButton = newPostModal.querySelector(".modal__close-btn");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);
const editProfileFormElement = document.forms["profile-form"];
const editProfileElements = editProfileFormElement.elements;
const newPostFormElement = document.forms["new-post-form"];
// const editFormElement = editModal.querySelector(".modal__form");
const editFormNameElement = editProfileElements[0];
const editFormDescriptionElement = editProfileElements[1];
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const newPostElements = newPostFormElement.elements;
const cardsList = document.querySelector(".cards__list");

editProfileButton.addEventListener("click", function (e) {
  editFormNameElement.value = profileNameElement.textContent;
  editFormDescriptionElement.value = profileDescriptionElement.textContent;
  openModal(editModal);
});
// new post modal opening
newPostButton.addEventListener("click", function (e) {
  openModal(newPostModal);
});
// form submit handlerFunction
function editProfileSubmitHandler(e) {
  e.preventDefault();
  profileNameElement.textContent = editFormNameElement.value;
  profileDescriptionElement.textContent = editFormDescriptionElement.value;
  closeModal(editModal);
}
function newPostSubmitHandler(e) {
  e.preventDefault();
  // something to do with form element
  const imageLink = newPostElements[0].value;
  const imageCaption = newPostElements[1].value;
  const newCardData = { name: imageCaption, link: imageLink };
  initialCards.unshift(newCardData);
  renderCard(newCardData, "prepend");
  newPostElements[0].value = "";
  newPostElements[1].value = "";
  closeModal(newPostModal);
}
// Edit form submit button handling
editProfileFormElement.addEventListener("submit", editProfileSubmitHandler);
newPostFormElement.addEventListener("submit", newPostSubmitHandler);
editModalCloseButton.addEventListener("click", function () {
  closeModal(editModal);
});
newPostModalCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});
// rendering card template
const cardTemplate = document.querySelector("#card_template");
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardName = cardElement.querySelector(".card__name");
  const cardImage = cardElement.querySelector(".card__image");

  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_liked");
  });
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", (evt) => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });
  previewModalCloseButton.addEventListener("click", () => {
    closeModal(previewModal);
  });

  return cardElement;
}
// function for adding card to a section using either prepend, append or any other method
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}
// Looping through initialCards array items using forEach loop
initialCards.forEach(function (card) {
  renderCard(card, "prepend");
});
// opening and closing of modal
function openModal(modal) {
  if (modal) {
    modal.classList.add("modal_opened");
  }
}
function closeModal(modal) {
  if (modal) {
    modal.classList.remove("modal_opened");
  }
}
