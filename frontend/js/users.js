import { getAllUserApi } from "./api/user.js";
import {
  renderInfo,
  banUsersFunc,
  removeUserFunc,
  editUserFunc,
  addItemsInfoToDom,
  usersWrapperBody,
  patternOfAllUsers,
  newUserModal,
  createNewUserFunc,
  getUserInfoFunc,
  userEditId,
  showDetailsFunc,
} from "./funcs/user.js";
import { closeModal, openModal, debounce, searchHand } from "./utile/utile.js";
import { SweetAlert } from "./sweetAlert/sweetAlert.js";
import { d } from "./constant/constant.js";

// create new user Modal
const openNewUserModal = d.getElementById("open-new-user-modal");
const closeUserModal = d.querySelectorAll(".modal-user-close");
const newUserFormBtn = d.getElementById("new-user-form");
// edit user modal inputs
const editUserFormBtn = d.getElementById("edit-user-form");
// search Input
const userSearchInput = d.getElementById("user-search");

const banUserHand = async (event, id) => {
  const isBan = +event.currentTarget.dataset.id;

  SweetAlert(
    `${
      isBan === 1
        ? "Are you sure you want to remove the user from the ban?"
        : "Are you sure you want to ban the user? "
    } `,
    "warning",
    true,
    true,
    "yes",
    "no",
    async (res) => {
      if (res.isConfirmed) {
        await banUsersFunc(id);
      }
    },
  );
};
window.banUserHand = banUserHand;

const removeUserHand = async (id) => {
  SweetAlert(
    "Are you sure you want to delete the user?",
    "warning",
    true,
    true,
    "yes",
    "no",
    async (res) => {
      if (res.isConfirmed) {
        await removeUserFunc(id);
      }
    },
  );
};
window.removeUserHand = removeUserHand;

const editUserHand = async (id) => {
  getUserInfoFunc(id);
};
window.editUserHand = editUserHand;

const showDetailsUser = async (id) => {
  showDetailsFunc(id);
};
window.showDetailsUser = showDetailsUser;

window.addEventListener("load", async () => {
  renderInfo();
});
openNewUserModal.addEventListener("click", () => {
  openModal(newUserModal);
});

closeUserModal.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    e.preventDefault();
    const modal = e.currentTarget.dataset.display;
    closeModal(d.getElementById(`${modal}`));
  });
});

newUserFormBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await createNewUserFunc();
});

editUserFormBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await editUserFunc(userEditId);
});

userSearchInput.addEventListener("keyup", (e) => {
  const searchValue = e.currentTarget.value;
  debounce(async () => {
    const res = await getAllUserApi();
    const users = await res.json();
    const searchUsers = searchHand(users.data, "userName", searchValue);

    addItemsInfoToDom(searchUsers, usersWrapperBody, patternOfAllUsers);
  })();
});
