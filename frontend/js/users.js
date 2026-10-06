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
  allUsers,
} from "./funcs/user.js";
import {
  closeModal,
  openModal,
  debounce,
  searchHand,
  setUrlSearchParam,
  changePagination,
  paginationNextAndPrevHandler,
} from "./utile/utile.js";
import { SweetAlert } from "./sweetAlert/sweetAlert.js";
import { d } from "./constant/constant.js";

let searchValue = "";

const paginationWrapper = document.getElementById("pagination-wrapper");
const pageBtns = d.querySelectorAll(".page-btn");

// create new user Modal
const openNewUserModal = d.getElementById("open-new-user-modal");
const closeUserModal = d.querySelectorAll(".modal-user-close");
const newUserFormBtn = d.getElementById("new-user-form");
// edit user modal inputs
const editUserFormBtn = d.getElementById("edit-user-form");
// search Input
const userSearchInput = d.getElementById("user-search");
// pagination buttons

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
        searchValue = "";
        userSearchInput.value = "";
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
        searchValue = "";
        userSearchInput.value = "";
        await removeUserFunc(id);
      }
    },
  );
};
window.removeUserHand = removeUserHand;

const editUserHand = async (id) => {
  getUserInfoFunc(id);
  searchValue = "";
  userSearchInput.value = "";
};
window.editUserHand = editUserHand;

const showDetailsUser = async (id) => {
  showDetailsFunc(id);
};
window.showDetailsUser = showDetailsUser;

window.addEventListener("load", async () => {
  setUrlSearchParam("page", 1);
  renderInfo();
});
openNewUserModal.addEventListener("click", () => {
  openModal(newUserModal);
});

closeUserModal.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    closeModal(event);
  });
});

newUserFormBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await createNewUserFunc(e);
});

editUserFormBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await editUserFunc(userEditId);
});

userSearchInput.addEventListener("keyup", (e) => {
  searchValue = e.currentTarget.value;
  setUrlSearchParam("page", 1);

  debounce(async () => {
    const searchUsers = searchHand(
      allUsers.data.slice(),
      "userName",
      searchValue,
    );

    addItemsInfoToDom(searchUsers, usersWrapperBody, patternOfAllUsers, true);
  })();
});

paginationWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-link-btn")) {
    const page = +e.target.dataset.page;
    changePagination(
      page,
      allUsers.data.slice(),
      "userName",
      searchValue,
      usersWrapperBody,
      patternOfAllUsers,
    );
  }
});

pageBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const type = e.currentTarget.dataset.type;
    paginationNextAndPrevHandler(
      type,
      allUsers.data,
      "userName",
      searchValue,
      usersWrapperBody,
      patternOfAllUsers,
    );
  });
});
