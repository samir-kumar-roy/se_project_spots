import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableSubmitButton,
} from "../scripts/validation.js";
// import { initialCards } from "../scripts/cards.js";
import Api from "../utils/Api.js";
const editProfileButton = document.querySelector(".profile__edit-button");
const newPostButton = document.querySelector(".profile__post-button");

const editModal = document.querySelector("#edit-modal");
const deleteModal = document.querySelector("#delete-modal");
const avatarModal = document.querySelector("#edit-avatar");
const newPostModal = document.querySelector("#new-post-modal");
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
// const editModalCloseButton = editModal.querySelector(".modal__close-btn");
// const newPostModalCloseButton = newPostModal.querySelector(".modal__close-btn");
/* const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-btn_type_preview"
); */
const editAvatarFormElement = document.querySelector("#avatar-form");
const newPostFormElement = document.forms["new-post-form"];
const editAvatarbtn = document.querySelector(".profile__avatar-btn");
const editFormElement = editModal.querySelector(".modal__form");
const editProfileFormElement = document.forms["edit_profile"];
const editFormNameElement = editProfileFormElement.elements[0];
const editFormDescriptionElement = editProfileFormElement.elements[1];
const profileAvatarElement = document.querySelector(".profile__avatar");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const newPostElements = newPostFormElement.elements;
const newPostSubmitButton =
  newPostFormElement.querySelector(".modal__submit-btn");
const updateAvatarButton =
  editAvatarFormElement.querySelector(".modal__submit-btn");
const editProfileSubmitButton =
  editProfileFormElement.querySelector(".modal__submit-btn");
const deleteButtonFormElement = deleteModal.querySelector(".modal__submit-btn");
const deleteCancelBtn = deleteModal.querySelector(".modal__cancel-btn");
const cardDeleteConfirmBtn = deleteModal.querySelector("#delete-confirm");
const cardsList = document.querySelector(".cards__list");
// instantiating Api classes
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4fb9b673-9579-45d9-add0-dcec7f348360",
    "Content-Type": "application/json",
  },
});
api
  .getAppInfo()
  .then(([cards, me]) => {
    // rendering all the image cards for server to DOM
    cards.forEach((card) => renderCard(card, "prepend"));
    // rendering prifile data
    profileNameElement.textContent = me.name;
    profileDescriptionElement.textContent = me.about;
    profileAvatarElement.src = me.avatar;
    // to prevent flickering of the hard coded avatar and profile data on this section
    document.querySelector(".page").classList.remove("hidden");
  })
  .catch((err) => console.log(err));
/*
  api
  .getUserInfo()
  .then((data) => {
    profileNameElement.textContent = data.name;
    profileDescriptionElement.textContent = data.about;
    profileAvatarElement.src = data.avatar;
  })
  .catch((err) => console.log("Failed to load data!" + err));
  */

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const avatar = document.querySelector("#avatar-input-link").value;
  updateAvatarButton.textContent = "Updating...";
  api
    .editAvatar(avatar)
    .then((data) => {
      profileAvatarElement.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch((err) => console.log("Could not be updated," + err))
    .finally(() => (updateAvatarButton.textContent = "Update"));
}
editAvatarbtn.addEventListener("click", function (e) {
  e.preventDefault();
  openModal(avatarModal);
});
editAvatarFormElement.addEventListener("submit", handleAvatarSubmit);

editProfileButton.addEventListener("click", function (e) {
  resetValidation(editProfileFormElement, editProfileSubmitButton, settings);
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
  const name = editFormNameElement.value;
  const about = editFormDescriptionElement.value;
  editProfileSubmitButton.textContent = "Saving...";

  api
    .editUserInfo({ name, about })
    .then((res) => {
      profileNameElement.textContent = res.name;
      profileDescriptionElement.textContent = res.about;
      closeModal(editModal);
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => (editProfileSubmitButton.textContent = "Save"));
}
editFormElement.addEventListener("submit", editProfileSubmitHandler);
function newPostSubmitHandler(e) {
  e.preventDefault();
  const imageLink = newPostElements[0].value;
  const imageCaption = newPostElements[1].value;
  const newCardData = { name: imageCaption, link: imageLink };
  newPostSubmitButton.textContent = "Saving...";
  api
    .createCard(imageCaption, imageLink)
    .then((res) => {
      renderCard(res, "prepend");
      newPostFormElement.reset();
      disableSubmitButton(newPostSubmitButton, settings);
      closeModal(newPostModal);
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => (newPostSubmitButton.textContent = "Save"));
}
newPostFormElement.addEventListener("submit", newPostSubmitHandler);
// rendering card template
const cardTemplate = document.querySelector("#card_template");
let cardId;
let cardElementToDelete;

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

  if (data.isLiked) {
    likeButton.classList.add("card__like-button_liked");
  }

  likeButton.addEventListener("click", (evt) => {
    console.log("CardId: " + data._id);
    const isLiked = evt.target.classList.contains("card__like-button_liked")
      ? true
      : false;
    api
      .toggleLike(data._id, isLiked)
      .then((res) => {
        evt.target.classList.toggle("card__like-button_liked");
      })
      .catch((err) => console.log(`Error: ${err}`));
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardId = data._id;
    cardElementToDelete = cardElement;
    openModal(deleteModal);
  });

  cardImage.addEventListener("click", (evt) => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}
cardDeleteConfirmBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  deleteButtonFormElement.textContent = "Deleting...";
  api
    .deleteCard(cardId)
    .then((res) => {
      cardElementToDelete.remove();
      closeModal(deleteModal);
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => (deleteButtonFormElement.textContent = "Delete"));
});
deleteCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});
// function for adding card to a section using either prepend, append or any other method
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}
// opening and closing of modal
function openModal(modal) {
  if (modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", modalCloseOnEscapePress);
  }
}
function closeModal(modal) {
  if (modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", modalCloseOnEscapePress);
  }
}
// handler for closing the modal on pressing the 'Escape' key
function modalCloseOnEscapePress(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}
// clicking on overlay or clicking the close button and close the modal
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (
      evt.target === modal ||
      evt.target.classList.contains("modal__close-btn")
    ) {
      console.log(modal);
      closeModal(modal);
    }
  });
});
enableValidation(settings);
