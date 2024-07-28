const token = window.localStorage.getItem("token");
if (!token) window.location.pathname = "../login.html";
let like = JSON.parse(window.localStorage.getItem("like")) || [];
let karzinka = JSON.parse(window.localStorage.getItem("karzinka")) || [];
const elCount = document.querySelector(".js-count");
const elKarzinkaData = document.querySelector(".js-karzinki-data");
const elKarzinkaCounts = document.querySelector(".js-karzinka-counts");
const elGoodsNumer = document.querySelector(".js-goods-number");
const elGoodsCount = document.querySelector(".js-tovar-count");
const elAllSum = document.querySelector(".js-all-sum");
const elRenderOrderList = document.querySelector(".js-karzinka-text");
const elTemplate = document.querySelector(".js-karzinka-template").content;

function renderList(array, node) {
  node.innerHTML = "";
  const docFrg = document.createDocumentFragment();
  array.forEach((item) => {
    const cloneTemplate = elTemplate.cloneNode(true);
    cloneTemplate.querySelector(
      ".js-karzinka-img"
    ).src = `http://localhost:5000/${item.product_img}`;
    cloneTemplate.querySelector(".js-karzinka-name").textContent =
      item.product_name;
    cloneTemplate.querySelector(".js-karzinka-desc").textContent =
      item.product_desc;
    cloneTemplate.querySelector(
      ".js-karzinka-price"
    ).textContent = `${item.product_price} so'm`;
    cloneTemplate.querySelector(".js-karzinka-delete").dataset.deleteId =
      item.id;
    cloneTemplate.querySelector(".js-karzinkato-like").dataset.likeId = item.id;
    docFrg.appendChild(cloneTemplate);
  });
  node.appendChild(docFrg);

  if (like.length === 0) {
    elCount.style.display = "none";
  } else {
    elCount.style.display = "block";
    elCount.textContent = like.length;
  }
}

if (karzinka.length) {
  elKarzinkaData.classList.add("hidden");
  let reduce = karzinka.reduce((acc, item) => {
    let number = Number(item.product_price.replaceAll(",", ""));
    return (acc += number);
  }, 0);
  elAllSum.textContent = `${reduce} so'm`;
  elKarzinkaCounts.classList.remove("hidden");
  elKarzinkaCounts.textContent = karzinka.length;
  elGoodsNumer.textContent = karzinka.length;
  elGoodsCount.textContent = `${karzinka.length} ta maxsulot`;
} else {
  elKarzinkaData.classList.add("flex");
  elKarzinkaCounts.classList.add("hidden");
}

function deleteFn(id) {
  karzinka = karzinka.filter((item) => item.id !== parseInt(id));
  window.localStorage.setItem("karzinka", JSON.stringify(karzinka));
  renderList(karzinka, elRenderOrderList);
}

elRenderOrderList.addEventListener("click", (evt) => {
  const deleteBtn = evt.target.closest(".js-karzinka-delete");
  if (deleteBtn) {
    const deleteId = deleteBtn.dataset.deleteId;
    deleteFn(deleteId);
    window.location.reload();
  }
});

const elSearchForm = document.querySelector(".js-search"),
  elSearchInp = document.querySelector(".js-search-inp");

elSearchForm.addEventListener("input", (evt) => {
  evt.preventDefault();
  let searchValue = elSearchInp.value.trim();
  let regEx = new RegExp(searchValue, "gi");
  let search = karzinka.filter((el) => el.product_name.match(regEx));
  renderList(search, elRenderOrderList);
});

renderList(karzinka, elRenderOrderList);
