const initialCards = [
  {
    name: "Magnolia Springs",
    link: "https://www.travelandleisure.com/thmb/HskLNeR7eVEZerVuOD4bIq0tW0g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/magnolia-springs-alabama-BEAUTYSTS0522-dd0254bbad464ecab9ebbe64b45e32f2.jpg",
  },
  {
    name: "Elisa National Park",
    link: "https://www.travelandleisure.com/thmb/g727-mPNmnsphYdSQ2_7PW74KvQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/wrangell-st-elias-national-park-alaska-BEAUTYSTS0522-aa733bbb6af64cd4b64d2672a30bc8ac.jpg",
  },
  {
    name: "Grand Canyon National Park",
    link: "https://www.travelandleisure.com/thmb/Ci2_pM0Qf9mBBTw9ij3Oindooqc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GrandCanyon_DonEim02-1af7fa1cf4704ef585e7a700b2aa7da5.jpg",
  },
  {
    name: "St Francis National Park",
    link: "https://www.travelandleisure.com/thmb/3LElCC6HD02cJF7KdAN_Z52pwpI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ozark-national-forest-arkansas-BEAUTYSTS0522-c7606af79d004d6f92332d73729f42ca.jpg",
  },
  {
    name: "Yosemite National Park",
    link: "https://www.travelandleisure.com/thmb/BdEJ459gqdh0nBpauUuTZO46GCQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Yosemite_VinceFergus02-37fd80faef6546eab4e1d9c681283162.jpg",
  },
  {
    name: "Gardens of the Gods",
    link: "https://www.travelandleisure.com/thmb/B1XWpAn2EERgkZDTtiqVt_ofbgc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/garden-of-the-gods-colorado-BEAUTYSTS0522-17d3f1da19434e11a1def9559e8e6997.jpg",
  },
];
const editProfileButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-modal");
const editModalCloseButton = editModal.querySelector(".modal__close-btn");
const editFormElement = editModal.querySelector(".modal__form");
const editFormNameElement = document.querySelector("#name");
const editFormDescriptionElement = document.querySelector("#description");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const cardsList = document.querySelector(".cards__list");

editProfileButton.addEventListener("click", function (e) {
  e.preventDefault();
  editModal.classList.add("modal__opened");
  editFormNameElement.value = profileNameElement.textContent;
  editFormDescriptionElement.value = profileDescriptionElement.textContent;
});
// handlerFunction
function submitEditButtonHandle(e) {
  e.preventDefault();
  profileNameElement.textContent = editFormNameElement.value;
  profileDescriptionElement.textContent = editFormDescriptionElement.value;
  editModal.classList.remove("modal__opened");
}
// Edit form submit button handling
editFormElement.addEventListener("submit", submitEditButtonHandle);
function closeEditModal() {
  editModal.classList.remove("modal__opened");
}
editModalCloseButton.addEventListener("click", closeEditModal);
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

  return cardElement;
}
// looping through initialcards array items
for (let i = 0; i < initialCards.length; i++) {
  const cardEl = getCardElement(initialCards[i]);
  cardsList.append(cardEl);
}
