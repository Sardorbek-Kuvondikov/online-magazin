const token = window.localStorage.getItem("token");
if (!token) window.location.pathname = "../login.html";

const likes = JSON.parse(window.localStorage.getItem("like")) || [];
const karzinkaLocal = JSON.parse(window.localStorage.getItem("karzinka")) || [];
let handleArray = [];
let karzinkaArray = [];
let count = 0;
const elKarzinkaCount = document.querySelector(".js-karzinka-count");
const elCount = document.querySelector(".js-count");
if (likes.length) {
  elCount.classList.remove("hidden");
  elCount.textContent = likes.length;
}

const elRenderList = document.querySelector(".js-pradict-text");
const elTemplate = document.querySelector(".js-main-template").content;

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

function renderList(arr, node) {
  likeFn(arr);
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
    cloneTemplate.querySelector(".js-unlike-btn").dataset.unlinkId = item.id;
    cloneTemplate.querySelector(".js-karzinka").dataset.karzinkaId = item.id;
    docFrg.appendChild(cloneTemplate);
  });
  node.appendChild(docFrg);
}

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
}
getData();

function likeFn(arr) {
  elRenderList.addEventListener("click", (evt) => {
    let unLiked = evt.target.closest(".js-unlike-btn");
    let karzinkaBtn = evt.target.closest(".js-karzinka");
    if (unLiked) {
      arr.find((item) => {
        let unLike = unLiked.dataset.unlinkId;
        if (unLike == item.id) {
          let likeNo = unLiked.querySelector(".like_no");
          let likeYes = unLiked.querySelector(".like_yes");

          let isLiked = handleArray.find((el) => el.id == item.id);

          if (isLiked) {
            likeNo.classList.remove("hidden");
            likeYes.classList.add("hidden");
            handleArray = handleArray.filter((el) => el.id !== item.id);
            elCount.textContent = --count;
            if (count == 0) elCount.classList.add("hidden");
          } else {
            likeNo.classList.add("hidden");
            likeYes.classList.remove("hidden");
            handleArray.push(item);
            elCount.textContent = ++count;
            if (count > 0) elCount.classList.remove("hidden");
          }

          window.localStorage.setItem("like", JSON.stringify(handleArray));
          console.log(handleArray);
        }
      });
    }
    if (karzinkaBtn) {
      arr.forEach((item) => {
        let id = karzinkaBtn.dataset.karzinkaId;
        if (id == item.id) {
          let karzinkaCount = karzinkaBtn.querySelector(".js-karzinka-count");
          let arrow = karzinkaBtn.querySelector(".js-arrow");
          karzinkaCount.classList.remove("hidden");
          arrow.classList.remove("hidden");

          let exists = karzinkaArray.some((el) => el.id === item.id);
          if (!exists) {
            addObject(karzinkaArray, item);
          }
          incrementCount(karzinkaArray, item.id);

          let updatedItem = karzinkaArray.find((el) => el.id === item.id);
          karzinkaCount.textContent = updatedItem.count;
          elKarzinkaCount.textContent = karzinkaArray.length;

          window.localStorage.setItem(
            "karzinka",
            JSON.stringify(karzinkaArray)
          );
        }
      });
    }
  });
}

if (karzinkaLocal.length) {
  elKarzinkaCount.classList.remove("hidden");
  elKarzinkaCount.textContent = karzinkaLocal.length;
}

function addObject(arr, newObj) {
  const exists = arr.find((obj) => obj.id === newObj.id);
  if (!exists) {
    newObj.count = 0;
    arr.push(newObj);
  }
}

function incrementCount(arr, objId) {
  const obj = arr.find((obj) => obj.id === objId);
  if (obj) obj.count++;
}
