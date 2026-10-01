const ClearInputs = (inputArray) => {
  inputArray.forEach((input) => [(input.value = "")]);
};
const openModal = (modal) => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
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

const addItemsInfoToDom = (items, wrapper, pattern) => {
  wrapper.innerHTML = "";
  items.forEach((user) => {
    wrapper.insertAdjacentHTML("beforeend", pattern(user));
  });
};

const closeModal = (modal) => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
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
};
