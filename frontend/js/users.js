import { getAllNewUser, getAllUser, createUser } from "./api/user.js";
import {
  patternOfNewPeople,
  patternOfAllPeople,
  patternOfOldPeople,
} from "./funcs/user.js";
import { ClearInputs, closeModal, openModal } from "./utile/utile.js";
import { SweetAlert } from "./sweetAlert/sweetAlert.js";

const d = document;
// wrapper for users
const usersWrapperBody = d.getElementById("users-tbody");
const newUsersWrapper = d.getElementById("new-users");
const oldUsersWrapper = d.getElementById("old-users");
// create new user Modal
const openNewUserModal = d.getElementById("open-new-user-modal");
const newUserModal = d.getElementById("new-user-modal");
const closeNewUserModal = d.getElementById("new-user-close");
const cancelNewUserModal = d.getElementById("new-user-cancel");
const newUserFormBtn = d.getElementById("new-user-form");

const renderInfo = async () => {
  const [allUsers, allNewUsers] = await Promise.all([
    getAllUser(),
    getAllNewUser(),
  ]);

  // Add basic information about Users
  usersWrapperBody.innerHTML = "";
  allUsers.data.forEach((user) => {
    usersWrapperBody.insertAdjacentHTML("beforeend", patternOfAllPeople(user));
  });

  newUsersWrapper.innerHTML = "";
  allNewUsers.data.forEach((user) => {
    newUsersWrapper.insertAdjacentHTML("beforeend", patternOfNewPeople(user));
  });

  oldUsersWrapper.innerHTML = "";
  allUsers.data.forEach((user) => {
    oldUsersWrapper.insertAdjacentHTML("beforeend", patternOfOldPeople(user));
  });
};

window.addEventListener("load", async () => {
  renderInfo();
});

openNewUserModal.addEventListener("click", () => {
  openModal(newUserModal);
});

closeNewUserModal.addEventListener("click", () => {
  closeModal(newUserModal);
});
cancelNewUserModal.addEventListener("click", () => {
  closeModal(newUserModal);
});

newUserFormBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const EmailInput = d.getElementById("nu-email");
  const NameInput = d.getElementById("nu-name");
  const PasswordInput = d.getElementById("nu-password");
  const roleInput = d.getElementById("nu-role");

  const newUser = {
    email: EmailInput.value.trim(),
    userName: NameInput.value.trim(),
    password: PasswordInput.value.trim(),
    role: roleInput.value.trim(),
  };
  const resUser = await createUser(newUser);

  if (resUser.ok) {
    SweetAlert("User creation was successful.", "success", false, true);
    closeModal(newUserModal);
    ClearInputs([EmailInput, NameInput, PasswordInput, roleInput]);
    renderInfo();
  } else {
    const errorMassage = await resUser.json();
    SweetAlert(errorMassage.massage, "error", true, false);
  }
});
