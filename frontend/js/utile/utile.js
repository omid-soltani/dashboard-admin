const ClearInputs = (inputArray) => {
  inputArray.forEach((input) => [(input.value = "")]);
};
const openModal = (modal) => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
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

export { ClearInputs, openModal, closeModal, dateHandler };
