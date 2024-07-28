const token = window.localStorage.getItem("token");
if (!token) window.location.pathname = "../login.html";
// karzinka
const karzinka = JSON.parse(window.localStorage.getItem("karzinka"));
const elKarzinkaCountAdmin = document.querySelector(".js-karzinka-count");

// modal
const elEditModal = document.querySelector(".js-modal");
const elEditNoneModal = document.querySelector(".js-none-modal");
// html elements
const elEditedBtn = document.querySelector(".js-edited-btn");
const elProductForm = document.querySelector(".js-admin-form"),
  elProductName = elProductForm.querySelector(".js-product-name"),
  elProductDesc = elProductForm.querySelector(".js-product-desc"),
  elProductPrice = elProductForm.querySelector(".js-product-price"),
  elProductImg = elProductForm.querySelector(".js-product-img");

const elEditProductForm = document.querySelector(".js-edit-admin-form"),
  elEditProductName = elEditProductForm.querySelector(".js-edit-product-name"),
  elEditProductDesc = elEditProductForm.querySelector(".js-edit-product-desc"),
  elEditProductPrice = elEditProductForm.querySelector(
    ".js-edit-product-price"
  ),
  elEditProductImg = elEditProductForm.querySelector(".js-edit-product-img");
// render list one
const elRenderList = document.querySelector(".js-pradict-text");
const elTemplate = document.querySelector(".js-admin-template").content;
// render list two
const elLotRenderList = document.querySelector(".js-lot-text");
const elLotTemplate = document.querySelector(".js-lot-template").content;
// carusel
const items = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
let currentItem = 0;
const totalItems = items.length;
const intervalTime = 5000;
let autoSlide;

function showSlide(index) {
  items.forEach((item, i) => {
    item.classList.remove("active");
    dots[i].classList.remove("active");
    if (i === index) {
      item.classList.add("active");
      dots[i].classList.add("active");
    }
  });
  currentItem = index;
  resetAutoSlide();
}

function nextSlide() {
  currentItem = (currentItem + 1) % totalItems;
  showSlide(currentItem);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, intervalTime);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

items[currentItem].classList.add("active");
dots[currentItem].classList.add("active");
autoSlide = setInterval(nextSlide, intervalTime);

// ========================
// RENDER LIST
function renderList(arr, node) {
  node.innerHTML = "";
  const docFrg = document.createDocumentFragment();
  arr.forEach((item) => {
    const cloneTemplate = elTemplate.cloneNode(true);
    cloneTemplate.querySelector(
      ".js-product-img"
    ).src = `http://localhost:5000/${item.product_img}`;
    cloneTemplate.querySelector(".js-product-img").alt = item.product_name;
    cloneTemplate.querySelector(".js-product-name").textContent =
      item.product_name;
    cloneTemplate.querySelector(".js-product-desc").textContent =
      item.product_desc;
    cloneTemplate.querySelector(
      ".js-product-price"
    ).textContent = `${item.product_price} so'm`;
    cloneTemplate.querySelector(".js-edit-btn").dataset.dataId = item.id;
    cloneTemplate.querySelector(".js-delete-btn").dataset.deleteId = item.id;
    docFrg.appendChild(cloneTemplate);
  });
  node.appendChild(docFrg);

  if (karzinka.length) {
    elKarzinkaCountAdmin.classList.remove("hidden");
  }
}

// RENDER LOT DATA
function renderLotList(arr, node) {
  let array = arr.slice(-10);
  node.innerHTML = "";
  const docFrg = document.createDocumentFragment();
  array.forEach((item) => {
    const cloneTemplate = elLotTemplate.cloneNode(true);
    cloneTemplate.querySelector(
      ".js-lot-img"
    ).src = `http://localhost:5000/${item.product_img}`;
    cloneTemplate.querySelector(".js-lot-img").alt = item.product_name;
    cloneTemplate.querySelector(".js-lot-name").textContent = item.product_name;
    cloneTemplate.querySelector(".js-lot-desc").textContent = item.product_desc;
    cloneTemplate.querySelector(
      ".js-lot-price"
    ).textContent = `${item.product_price} so'm`;
    docFrg.appendChild(cloneTemplate);
  });
  node.appendChild(docFrg);
}

// POST DATA
async function postData() {
  const formData = new FormData();
  formData.append("product_name", elProductName.value.trim());
  formData.append("product_desc", elProductDesc.value.trim());
  formData.append("product_img", elProductImg.files[0]);
  formData.append("product_price", elProductPrice.value);
  try {
    let res = await fetch("http://localhost:5000/product", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });
    if (!res.ok) {
      console.log("Xatolik mavjud!");
    }
    let data = await res.json();
    getData();
  } catch (error) {
    console.log(error);
  }
}

// GET DATA
async function getData() {
  let res = await fetch("http://localhost:5000/product", {
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) {
    console.log("Xatolik mavjud!!!");
  }
  let data = await res.json();
  renderList(data, elRenderList);
  renderLotList(data, elLotRenderList);
}

// PUT DATA
async function putData(id) {
  const formData = new FormData();
  formData.append("product_name", elEditProductName.value.trim());
  formData.append("product_desc", elEditProductDesc.value.trim());
  formData.append("product_img", elEditProductImg.files[0]);
  formData.append("product_price", elEditProductPrice.value);
  try {
    let res = await fetch(`http://localhost:5000/product/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    });
    let data = await res.json();
    if (data) {
      edited_text.classList.remove("hidden");
      edited_text.style.transition = "transform 0.5s ease";
      setTimeout(() => {
        edited_text.style.transform = "translateX(-30px)";
      }, 0);
    }
    setTimeout(() => {
      edited_text.style.transform = "translateX(220px)";
    }, 2500);
    setTimeout(() => {
      edited_text.classList.add("hidden");
    }, 2800);
  } catch (error) {
    console.log(error);
  }
}

// DELETE DATA
async function deleteData(id) {
  let res = await fetch(`http://localhost:5000/product/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  let data = await res.json();
  if (data) {
    deleted_text.style.display = "block";
    deleted_text.style.transition = "transform 0.5s ease";
    setTimeout(() => {
      deleted_text.style.transform = "translateX(-30px)";
    }, 0);
  }
  setTimeout(() => {
    deleted_text.style.transform = "translateX(200px)";
  }, 2500);
  setTimeout(() => {
    deleted_text.style.display = "none";
  }, 2700);
  getData();
}

elProductForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  postData();
  elProductForm.reset();
});

elRenderList.addEventListener("click", (evt) => {
  evt.preventDefault();
  // DATA EDIT
  if (evt.target.closest(".js-edit-btn")) {
    let id = Number(evt.target.closest(".js-edit-btn").dataset.dataId);
    elEditModal.style.display = "flex";
    editedData(id);
  }
  // DATA DELETE
  if (evt.target.closest(".js-delete-btn")) {
    let id = evt.target.closest(".js-delete-btn").dataset.deleteId;
    deleteData(id);
  }
});

elEditNoneModal.addEventListener("click", (evt) => {
  elEditModal.style.display = "none";
});

function editedData(id) {
  elEditedBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    putData(id);
    setTimeout(() => {
      window.location.reload();
    }, 2800);
  });
}

getData();
