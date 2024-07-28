const token = window.localStorage.getItem("token");
if (!token) window.location.pathname = "../login.html";

let array = JSON.parse(window.localStorage.getItem("like")) || [];
let karzinka = JSON.parse(window.localStorage.getItem("karzinka")) || [];

const elSearchForm = document.querySelector(".js-search"),
  elSearchInp = document.querySelector(".js-search-inp");

const elKarzinkaCounts = document.querySelector(".js-karzinka-counts");
const elAllDeleteLike = document.querySelector(".js-alldelete-like");

const elCount = document.querySelector(".js-count");
const elRenderList = document.querySelector(".js-like-text");
const elTemplate = document.querySelector(".js-like-template").content;
const noData = document.querySelector(".no-data");
const elKarzinkaData = document.querySelector(".js-karzinki-data");

function renderList(array, node) {
  node.innerHTML = "";
  const docFrg = document.createDocumentFragment();
  array.forEach((item) => {
    const cloneTemplate = elTemplate.cloneNode(true);
    cloneTemplate.querySelector(
      ".js-like-img"
    ).src = `http://localhost:5000/${item.product_img}`;
    cloneTemplate.querySelector(".js-like-img").alt = item.product_name;
    cloneTemplate.querySelector(".js-like-name").textContent =
      item.product_name;
    cloneTemplate.querySelector(".js-like-desc").textContent =
      item.product_desc;
    cloneTemplate.querySelector(
      ".js-like-price"
    ).textContent = `${item.product_price} so'm`;
    cloneTemplate.querySelector(".js-like-delete").dataset.likeId = item.id;
    docFrg.appendChild(cloneTemplate);
  });
  node.appendChild(docFrg);

  if (array.length === 0) {
    noData.style.display = "block";
    elCount.style.display = "none";
    elKarzinkaData.classList.remove("hidden");
  } else {
    elKarzinkaData.classList.add("hidden");
    noData.style.display = "none";
    elCount.style.display = "block";
    elCount.textContent = array.length;
  }
}
if (karzinka.length) {
  elKarzinkaCounts.classList.remove("hidden");
  elKarzinkaCounts.textContent = karzinka.length;
} else {
  elKarzinkaCounts.classList.add("hidden");
}

function deleteItem(id) {
  array = array.filter((item) => item.id !== id);
  window.localStorage.setItem("like", JSON.stringify(array));
  renderList(array, elRenderList);
}

elRenderList.addEventListener("click", (event) => {
  if (event.target.matches(".js-like-delete")) {
    const likeId = parseInt(event.target.dataset.likeId);
    deleteItem(likeId);
  }
});

elAllDeleteLike.addEventListener("click", () => {
  localStorage.removeItem("like");
  window.location.reload();
});
if (array.length) {
  elAllDeleteLike.classList.remove("hidden");
}

elSearchForm.addEventListener("input", (evt) => {
  evt.preventDefault();
  let searchValue = elSearchInp.value.trim();
  let regEx = new RegExp(searchValue, "gi");
  let search = array.filter((el) => el.product_name.match(regEx));
  renderList(search, elRenderList);
});

renderList(array, elRenderList);
