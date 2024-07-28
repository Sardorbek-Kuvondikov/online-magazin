const token = window.localStorage.getItem("token");
if (!token) window.location.pathname = "../login.html";

const user = JSON.parse(window.localStorage.getItem("users")) || {};
const elLogOutBtn = document.querySelector(".js-logout-btn");
const elUserModal = document.querySelector(".js-user-data-modal");
const elModalBlockBrn = document.querySelector(".js-modal-block-btn");
const elModalNoneBtn = document.querySelector(".js-user-data-back");
const elUserDataThere = document.querySelector(".js-user-data-there");

const elUserForm = document.querySelector(".js-user-form"),
  elUserImg = elUserForm.querySelector(".js-user-img"),
  elUserName = elUserForm.querySelector(".js-user-name"),
  elUserPochta = elUserForm.querySelector(".js-user-pochta"),
  elUserGender = elUserForm.querySelector(`input[name="gender"]:checked`),
  elUserFamiliy = elUserForm.querySelector(".js-user-familiya"),
  elUserTelnumber = elUserForm.querySelector(".js-user-telnumber"),
  elUserHappy = elUserForm.querySelector(".js-user-happy"),
  elUserLanguage = elUserForm.querySelector(".js-user-language");
elModalBlockBrn.addEventListener("click", (evt) => {
  evt.preventDefault();
  elUserModal.classList.remove("hidden");
  elUserModal.classList.add("flex");
});

elModalNoneBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  elUserModal.classList.add("hidden");
});

if (user) {
  user_lname.textContent = user.lname;
  user_sname.textContent = user.sur_name;
  // user_img.src = user.user_image;
  user_email_text.textContent = user.email;
  user_pol.textContent = user.gender;
  user_tel.textContent = user.tel_number;
  user_date.textContent = user.date;
  user_til.textContent = user.language;
}

elUserForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let newObj = {
    user_image: elUserImg.files[0],
    lname: elUserName.value.trim(),
    sur_name: elUserFamiliy.value.trim(),
    email: elUserPochta.value.trim(),
    gender: elUserGender.value,
    tel_number: elUserTelnumber.value,
    date: elUserHappy.value,
    language: elUserLanguage.value,
  };

  if (newObj) {
    user_lname.textContent = newObj.lname;
    user_sname.textContent = newObj.sur_name;
    user_email_text.textContent = newObj.email;
    //   user_img.src = newObj.user_image;
    user_pol.textContent = newObj.gender;
    user_tel.textContent = newObj.tel_number;
    user_date.textContent = newObj.date;
    user_til.textContent = newObj.language;
  }

  window.localStorage.setItem("users", JSON.stringify(newObj));
  elUserModal.classList.add("hidden");
});

if (user.lname && user.sur_name && user.email)
  elUserDataThere.classList.remove("hidden");
else elUserDataThere.classList.add("hidden");

elLogOutBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  localStorage.removeItem("token");
  window.location.reload();
});
