import {
  getAllNewUser,
  getAllUser,
  createUser,
  getOneUser,
  editUser,
  banUser,
  deleteUser,
} from "./api/user.js";
import {
  patternOfOldUsers,
  patternOfNewUsers,
  patternOfAllUsers,
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
const closeUserModal = d.querySelectorAll(".modal-user-close");
const newUserFormBtn = d.getElementById("new-user-form");

// edit user Modal
const editUserModal = d.getElementById("edit-user-modal");

// edit user modal inputs
const editPasswordInput = d.getElementById("edit-password-input");
const editEmailInput = d.getElementById("edit-email-input");
const editUserInput = d.getElementById("edit-userName-input");
const editRoleInput = d.getElementById("edit-role-input");
const editUserFormBtn = d.getElementById("edit-user-form");
let userEditId = null;

// mobil only => show users details
const userDetailsModal = d.getElementById("user-details-modal");
const userRoleDetail = d.getElementById("user-role-detail");
const userStatusDetail = d.getElementById("user-status-detail");
const userJoinedDetail = d.getElementById("user-joined-detail");

const fillEditUsersInput = (object) => {
  editPasswordInput.value = object.password;
  editEmailInput.value = object.email;
  editUserInput.value = object.userName;
};

const fillUserDetail = (object) => {
  userRoleDetail.textContent = object.role;
  userStatusDetail.textContent = `${object.isBan ? "Ban" : "Free"}`;
  userJoinedDetail.textContent = `${new Date(object.createdAt).toLocaleDateString("en-US")}`;
};

const renderInfo = async () => {
  try {
    const [allUsersRes, allNewUsersRes] = await Promise.all([
      getAllUser(),
      getAllNewUser(),
    ]);
    const allUsers = await allUsersRes.json();
    const allNewUsers = await allNewUsersRes.json();

    if (!allUsersRes.ok || !allNewUsersRes.ok) {
      throw new Error("Failed to fetch users");
    }

    usersWrapperBody.innerHTML = "";

    allUsers.data.forEach((user) => {
      usersWrapperBody.insertAdjacentHTML("beforeend", patternOfAllUsers(user));
    });

    newUsersWrapper.innerHTML = "";

    allNewUsers.data.forEach((user) => {
      newUsersWrapper.insertAdjacentHTML("beforeend", patternOfNewUsers(user));
    });

    oldUsersWrapper.innerHTML = "";

    allUsers.data.forEach((user) => {
      oldUsersWrapper.insertAdjacentHTML("beforeend", patternOfOldUsers(user));
    });
  } catch (error) {
    SweetAlert("Unable to connect to the server.", "error");
  }
};

const banUserHand = async (event, id) => {
  const isBan = +event.currentTarget.dataset.id;
  console.log(isBan);
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
        try {
          const response = await banUser(id);
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message);
          }
          SweetAlert(data.message, "success");
          renderInfo();
        } catch (err) {
          SweetAlert(err.message, "error");
        }
      }
    },
  );
};
window.banUserHand = banUserHand;

const removeUser = async (id) => {
  SweetAlert(
    "Are you sure you want to delete the user?",
    "warning",
    true,
    true,
    "yes",
    "no",
    async (res) => {
      if (res.isConfirmed) {
        try {
          const result = await deleteUser(id);
          const data = await result.json();
          if (!result.ok) {
            throw new Error(data.message);
          }
          SweetAlert("User deletion was successful.", "success", false);
          renderInfo();
        } catch (err) {
          SweetAlert(err.message, "error");
        }
      }
    },
  );
};
window.removeUser = removeUser;

const editUserModalOpen = async (id) => {
  userEditId = id;

  try {
    const res = await getOneUser(id);
    const userInfo = await res.json();
    if (!res.ok) {
      throw new Error(userInfo.message);
    }

    fillEditUsersInput(userInfo.data);
    openModal(editUserModal);
  } catch (err) {
    SweetAlert(err.massage, "error");
  }
};
window.editUserModalOpen = editUserModalOpen;

const showDetailsUser = async (id) => {
  try {
    const res = await getOneUser(id);
    const userInfo = await res.json();

    if (!res.ok) {
      throw new Error(userInfo.message);
    }
    console.log(userInfo);
    fillUserDetail(userInfo.data);
  } catch (err) {
    SweetAlert(err.message, "error");
  }
  openModal(userDetailsModal);
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
    closeModal(newUserModal);
    closeModal(editUserModal);
    closeModal(userDetailsModal);
  });
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
  try {
    const resUser = await createUser(newUser);
    const data = await resUser.json();

    if (!resUser.ok) {
      throw new Error(data.message);
    }
    SweetAlert("User creation was successful.", "success", false, true);
    closeModal(newUserModal);
    ClearInputs([EmailInput, NameInput, PasswordInput, roleInput]);
    renderInfo();
  } catch (err) {
    SweetAlert(err.message, "error");
  }
});

editUserFormBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const userInfo = {
    password: editPasswordInput.value.trim(),
    email: editEmailInput.value.trim(),
    userName: editUserInput.value.trim(),
    role: editRoleInput.value.trim(),
  };
  const res = await editUser(userEditId, userInfo);
  if (res.ok) {
    SweetAlert("User edit was successful.", "success");
    closeModal(editUserModal);
  }
});
