const ClearInputs = (inputArray) => {
  console.log(inputArray);
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

export { ClearInputs, openModal, closeModal };
