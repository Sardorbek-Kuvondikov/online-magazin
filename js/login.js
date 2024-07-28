const token = window.localStorage.getItem("token");
if (token) window.location.pathname = "../main.html";

const elLoginForm = document.querySelector(".js-login-form"),
  elLoginEmail = elLoginForm.querySelector(".js-login-email"),
  elLoginPassword = elLoginForm.querySelector(".js-login-password");

async function loginPostData() {
  try {
    let res = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: elLoginEmail.value.trim(),
        password: elLoginPassword.value,
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
    if (
      elLoginEmail.value.trim() == "admin@gmail.com" &&
      elLoginPassword.value == "admin1234"
    ) {
      window.localStorage.setItem("token", data.token);
      window.location.pathname = "../admin.html";
    }
  } catch (error) {
    console.log(error);
  }
}

elLoginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  loginPostData();
});
