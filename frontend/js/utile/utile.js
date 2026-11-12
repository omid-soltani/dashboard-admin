import { patternOfEmptyUsers } from "../funcs/user.js";
export const perPage = 5;

const paginationNextAndPrevHandler = (
  type,
  items,
  key,
  searchValue,
  wrapper,
  pattern,
) => {
  let currentPage = getUrlSearchParam("page");

  if (type === "prev") {
    if (currentPage > 1) {
      changePagination(
        --currentPage,
        items,
        key,
        searchValue,
        wrapper,
        pattern,
      );
    }
  } else {
    const numOfPage = Math.ceil(items.length / perPage);
    console.log(numOfPage);
    if (currentPage < numOfPage) {
      changePagination(
        ++currentPage,
        items,
        key,
        searchValue,
        wrapper,
        pattern,
      );
    }
  }
};

const ClearInputs = (inputArray) => {
  inputArray.forEach((input) => [(input.value = "")]);
};
const openModal = (modal) => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};
const changePagination = (
  page,
  items,
  searchKey,
  searchValue,
  wrapper,
  pattern,
) => {
  setUrlSearchParam("page", page);

  const searchedItems = searchHand(items.slice(), searchKey, searchValue);

  addItemsInfoToDom(searchedItems, wrapper, pattern, true);
};
const patternOfPagination = (page) => {
  const currentPage = getUrlSearchParam("page") || 1;
  return `<button data-page = "${page}"  type="button" class="page-link-btn ${page === currentPage ? "active-page-link " : ""}  w-9 h-9 grid place-items-center b border border-neon-500/20 rounded-lg text-sm font-medium text-ink-light/60 dark:text-ink-dark/60 hover:bg-neon-500/10 hover:text-neon-600 dark:hover:text-neon-400 transition-all duration-200">${page}
  </button>`;
};

const debounce = (callback, delay = 500) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const searchHand = (array, key, value) => {
  const searchUsers = [...array].filter((item) => {
    return item[key].toLowerCase().trim()?.includes(value.toLowerCase().trim());
  });

  return searchUsers;
};
const pagination = (array, perPage = 3) => {
  const currentPage = +getUrlSearchParam("page") || 1;
  const paginationWrapper = document.getElementById("pagination-wrapper");
  let i = 1;
  const numOfPage = Math.ceil(array.length / perPage);
  paginationWrapper.innerHTML = "";
  for (i; i <= numOfPage; i++) {
    paginationWrapper.insertAdjacentHTML("beforeend", patternOfPagination(i));
  }

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return array.slice(startIndex, endIndex);
};

const addItemsInfoToDom = (items, wrapper, pattern, hasPagination = false) => {
  wrapper.innerHTML = "";
  if (items.length === 0) {
    wrapper.insertAdjacentHTML("beforeend", patternOfEmptyUsers());
  } else {
    if (hasPagination) {
      const paginationItems = pagination(items, perPage);
      paginationItems.forEach((user) => {
        wrapper.insertAdjacentHTML("beforeend", pattern(user));
      });
    } else {
      items.forEach((user) => {
        wrapper.insertAdjacentHTML("beforeend", pattern(user));
      });
    }
  }
};

const setUrlSearchParam = (key, value) => {
  const params = new URLSearchParams(window.location.search);
  params.set(key, value);
  if (key === "page") {
    history.pushState({}, "", `?${params.toString()}`);
  }
};

const getUrlSearchParam = (key) => {
  const param = new URLSearchParams(window.location.search);
  const currentPage = +param.get("page") || 1;
  return currentPage;
};

const closeModal = (parentEvent) => {
  const modal = parentEvent.currentTarget.dataset.display;

  const modalTag = document.getElementById(`${modal}`);

  modalTag.classList.add("hidden");
  modalTag.classList.remove("flex");
};

const hideModal = (tag) => {
  tag.classList.remove("flex");
  tag.classList.add("hidden");
};

const dateHandler = (createAt) => {
  const date = new Date(createAt);
  const daysAgo = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));

  return `${daysAgo} days ago `;
};

export {
  ClearInputs,
  openModal,
  closeModal,
  dateHandler,
  debounce,
  addItemsInfoToDom,
  searchHand,
  pagination,
  setUrlSearchParam,
  changePagination,
  getUrlSearchParam,
  paginationNextAndPrevHandler,
  hideModal,
};
