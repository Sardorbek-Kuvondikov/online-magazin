const token = window.localStorage.getItem("token");
if (token) window.location.pathname = "../main.html";

const elForm = document.querySelector(".js-register-form"),
  elUserNameInp = elForm.querySelector(".js-name"),
  elUserPhoneInp = elForm.querySelector(".js-phone"),
  elUserEmailInp = elForm.querySelector(".js-email"),
  elUserPasswordInp = elForm.querySelector(".js-password");

async function postData() {
  try {
    let res = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_name: elUserNameInp.value.trim(),
        phone: elUserPhoneInp.value,
        email: elUserEmailInp.value.trim(),
        password: elUserPasswordInp.value,
      }),
    });

    if (!res.ok) {
      console.log("Xatolik bor!!!");
    }
    let data = await res.json();
    if (data.token) {
      window.localStorage.setItem("token", data.token);
      window.location.pathname = "../main.html";
    }
    // if (
    //   elUserEmailInp.value.trim() === "admin@gmail.com" &&
    //   elUserPasswordInp.value === "admin1234"
    // ) {
    //   window.localStorage.setItem("token", data.token);
    //   window.location.pathname = "../admin.html";
    // }
  } catch (error) {
    console.log(error);
  }
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  postData();
});
