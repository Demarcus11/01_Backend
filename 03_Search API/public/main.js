const prevPage = document.querySelector(".page-prev");
const productsList = document.querySelector(".products-list");
const pages = document.querySelectorAll(".page-item");

let currentPage = 1;

const getProducts = async () => {
  const API_ENDPOINT = "http://localhost:5000/api/v1/products";

  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const populateProducts = async () => {
  try {
    const data = await getProducts();
    productsList.innerHTML = "";
    productsList.innerHTML = data.products
      .map((item) => `<li class="list-group-item">${item.name}</li>`)
      .join("");
  } catch (error) {
    console.log(error);
  }
};

// Use a forEach loop for the other pages
const pageButtons = document.querySelectorAll(".page-btn");
pageButtons.forEach((btn, i) => {
  btn.addEventListener("click", async () => {
    currentPage = i + 1; // i + 1 because loops are 0-indexed
    console.log(currentPage);
    const API_ENDPOINT = `http://localhost:5000/api/v1/products?page=${currentPage}`;
    console.log(API_ENDPOINT);

    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      productsList.innerHTML = "";
      productsList.innerHTML = data.products
        .map((item) => `<li class="list-group-item">${item.name}</li>`)
        .join("");
    } catch (error) {
      console.log(error);
    }
  });
});

const handlePrevPageClick = async () => {
  currentPage = currentPage - 1;
  if (currentPage < 0) {
    currentPage = 0;
  }
  const API_ENDPOINT = `http://localhost:5000/api/v1/products?page=${currentPage}`;

  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    productsList.innerHTML = "";
    productsList.innerHTML = data.products
      .map((item) => `<li class="list-group-item">${item.name}</li>`)
      .join("");
  } catch (error) {
    console.log(error);
  }
};

const nextPage = document.querySelector(".page-next");
const handleNextPageClick = async () => {
  currentPage = currentPage + 1;
  if (currentPage < pages.length) {
    currentPage = 0;
  }
  const API_ENDPOINT = `http://localhost:5000/api/v1/products?page=${currentPage}`;

  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    productsList.innerHTML = "";
    productsList.innerHTML = data.products
      .map((item) => `<li class="list-group-item">${item.name}</li>`)
      .join("");
  } catch (error) {
    console.log(error);
  }
};

prevPage.addEventListener("click", handlePrevPageClick);
nextPage.addEventListener("click", handleNextPageClick);

populateProducts();
