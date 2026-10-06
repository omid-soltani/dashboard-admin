import {
  dateHandler,
  ClearInputs,
  addItemsInfoToDom,
  closeModal,
  openModal,
  pagination,
  setUrlSearchParam,
  hideModal,
} from "../utile/utile.js";
import { d } from "../constant/constant.js";
import { SweetAlert } from "../sweetAlert/sweetAlert.js";
import {
  getAllNewUserApi,
  getAllUserApi,
  banUserApi,
  deleteUserApi,
  getOneUserApi,
  editUserApi,
  createUserApi,
} from "../api/user.js";

// create users inputs
const EmailInput = d.getElementById("nu-email");
const NameInput = d.getElementById("nu-name");
const PasswordInput = d.getElementById("nu-password");
const roleInput = d.getElementById("nu-role");

// edit users inputs
const editPasswordInput = d.getElementById("edit-password-input");
const editEmailInput = d.getElementById("edit-email-input");
const editUserInput = d.getElementById("edit-userName-input");
const editRoleInput = d.getElementById("edit-role-input");

// user details
const userRoleDetail = d.getElementById("user-role-detail");
const userStatusDetail = d.getElementById("user-status-detail");
const userJoinedDetail = d.getElementById("user-joined-detail");
// main wrapper
export const usersWrapperBody = d.getElementById("users-tbody");
const newUsersWrapper = d.getElementById("new-users");
const oldUsersWrapper = d.getElementById("old-users");

const numOfUsersTag = d.querySelectorAll(".num-numbers");

// modals
const newUserModal = d.getElementById("new-user-modal");
const editUserModal = d.getElementById("edit-user-modal");
const userDetailsModal = d.getElementById("user-details-modal");

export let userEditId = null;
export let allUsers = [];

const patternOfEmptyUsers = () => {
  return `<tr id="users-empty-row" >
            <td colspan="6" class="px-5 py-12 sm:py-16">
                <div class="flex flex-col items-center justify-center text-center animate-fade-in">

                    <!-- Icon -->
                    <div class="relative mb-4 sm:mb-5">
                        <span class="absolute inset-0 rounded-2xl bg-neon-500/20 blur-xl animate-pulse-dot"></span>
                        <div class="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl
                            bg-linear-to-br from-neon-400/20 to-neon-700/20 dark:from-neon-400/10 dark:to-neon-700/10
                            border border-neon-500/20 dark:border-neon-400/20 grid place-items-center shadow-neon-sm">
                            <svg class="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-neon-600 dark:text-neon-400"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                    </div>

                    <!-- Text -->
                    <h3 class="font-inter-semibold text-sm sm:text-base md:text-lg text-ink-light dark:text-ink-dark">
                        No users found
                    </h3>
                    <p class="mt-1 sm:mt-1.5 max-w-xs sm:max-w-sm text-[11px] sm:text-xs md:text-sm text-ink-light/45 dark:text-ink-dark/45">
                        There are no users matching your search or filter. Try adjusting them, or add a new user to get started.
                    </p>

                    <!-- Actions -->
                    <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                        
                        
                    </div>
                </div>
            </td>
        </tr>`;
};
const patternOfNewUsers = (user) => {
  return `<li class="py-2.5 sm:py-3 flex items-center justify-between gap-3 group cursor-pointer">
                <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div class="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0">
                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Yasi"
                            class="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-neon-500/20"
                            alt="Avatar" />
                        <span
                            class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-neon-500 ring-2 ring-white dark:ring-surface-dark-2"></span>
                    </div>
                    <div class="min-w-0">
                        <p
                            class="font-inter-medium text-xs sm:text-sm text-ink-light dark:text-ink-dark truncate group-hover:text-neon-600 dark:group-hover:text-neon-400 transition-colors">
                            ${user.userName}
                        </p>
                        <p
                            class="font-inter-regular text-[11px] sm:text-xs text-ink-light/45 dark:text-ink-dark/45 truncate">
                            ${user.email}
                        </p>
                    </div>
                </div>
                <span
                    class="font-inter-regular text-[10px] sm:text-xs text-neon-600 dark:text-neon-400 shrink-0 tabular bg-neon-500/10 px-2 py-0.5 rounded-full">
                    ${dateHandler(user.createdAt)}
                </span>
            </li>`;
};

const patternOfOldUsers = (user) => {
  return `
    <li class="py-2.5 sm:py-3 flex items-center justify-between gap-3 group cursor-pointer">
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div class="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Shirin" class="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-neon-500/20" alt="Avatar">
                <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-neon-500 ring-2 ring-white dark:ring-surface-dark-2"></span>
            </div>
            <div class="min-w-0">
                <p class="font-inter-medium text-xs sm:text-sm text-ink-light dark:text-ink-dark truncate group-hover:text-neon-600 dark:group-hover:text-neon-400 transition-colors">
                    ${user.userName}
                </p>
                <p class="font-inter-regular text-[11px] sm:text-xs text-ink-light/45 dark:text-ink-dark/45 truncate">
                    ${user.email}
                </p>
            </div>
        </div>
        <span  class=" font-inter-regular text-[10px] sm:text-xs text-ink-light/45 dark:text-ink-dark/45 shrink-0 tabular">
            ${new Date(user.createdAt).toLocaleDateString("en-US")}
        </span>
    </li>
    `;
};
const patternOfAllUsers = (user) => {
  return `
        <tr class="tr-row user-row transition-all duration-300 hover:bg-neon-500/5">
            <td class="px-4 sm:px-5 py-3.5" data-cell="user">
                <div class="flex items-center gap-3 min-w-0">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Ali" class="w-10 h-10 rounded-full ring-2 ring-neon-500/20 shrink-0" alt="Avatar">
                    <div class="min-w-0">
                        <p class="text-sm md:text-sm font-inter-medium text-ink-light dark:text-ink-dark truncate" data-cell="name">${user.userName} </p>
                        <p class="text-[10px] md:text-xs text-ink-light/45 dark:text-ink-dark/45 truncate" data-cell="email">${user.email}</p>
                    </div>
                </div>
            </td>
            <td class="px-4 sm:px-5 py-3.5" data-cell="role">
                <span class="inline-flex items-center gap-1.5 text-xs font-medium text-neon-600 dark:text-neon-400 bg-neon-500/10 px-2.5 py-1 rounded-full">
                    <span class="w-1.5 h-1.5 rounded-full bg-neon-500"></span>
                    ${user.role}
                </span>
            </td>
            <td class="hidden sm:table-cell px-5 py-3.5" data-cell="status">
                <span class="inline-flex items-center gap-1.5 text-xs font-medium text-neon-600 dark:text-neon-400 bg-neon-500/10 px-2.5 py-1 rounded-full">
                    <span class="w-1.5 h-1.5 rounded-full bg-neon-500"></span>
                    ${user.isBan ? "Ban" : "Free"}
                </span>
            </td>
            <td class="hidden sm:table-cell px-5 py-3.5 text-sm text-ink-light/70 dark:text-ink-dark/70 tabular" data-cell="joined">${new Date(user.createdAt).toLocaleDateString("en-US")}</td>
            <td class="hidden sm:table-cell px-5 py-3.5 text-sm text-ink-light/70 dark:text-ink-dark/70 tabular" data-cell="last-active">${new Date(user.createdAt).toLocaleTimeString("en-US")}</td>
            <td class="px-4 sm:px-5 py-3.5">
                <div class="flex items-center justify-center">
                    <div class="actions-default flex items-center gap-1">
                        <button onclick ="showDetailsUser('${user._id}')" type="button" data-action="view-details" title="User details" class="sm:hidden btn
        hover:bg-neon-500/10 hover:text-neon-600 dark:hover:text-neon-400
        ">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button  onclick="editUserHand('${user._id}')" type="button" data-action="edit" title="Edit user" class="btn
         hover:bg-neon-500/10 hover:text-neon-600 dark:hover:text-neon-400">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button data-id= ${user.isBan} onclick ="banUserHand(event,'${user._id}')" type="button" data-action="request-ban" title="Ban user" class="btn
        hover:bg-amber-500/10 hover:text-amber-500">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                            </svg>
                        </button>
                        <button  onclick = removeUserHand('${user._id}') type="button" data-action="request-delete" title="Delete user" class="w-9 h-9 grid place-items-center rounded-lg
        text-ink-light/60 dark:text-ink-dark/60
        hover:bg-red-500/10 hover:text-red-500
        transition-all duration-200 active:scale-90">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"></path>
                                <path d="M10 11v6M14 11v6"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    `;
};

const renderInfo = async () => {
  try {
    const [allUsersRes, allNewUsersRes] = await Promise.all([
      getAllUserApi(),
      getAllNewUserApi(),
    ]);
    allUsers = await allUsersRes.json();
    const allNewUsers = await allNewUsersRes.json();

    if (!allUsersRes.ok || !allNewUsersRes.ok) {
      throw new Error("Failed to fetch users");
    }

    setUrlSearchParam("page", 1);

    numOfUsersTag.forEach((tag) => {
      tag.textContent = allUsers.data.length;
    });

    addItemsInfoToDom(
      allNewUsers.data.slice(0, 5),
      newUsersWrapper,
      patternOfNewUsers,
    );
    addItemsInfoToDom(allUsers.data, usersWrapperBody, patternOfAllUsers, true);
    addItemsInfoToDom(
      allUsers.data.slice(0, 5),
      oldUsersWrapper,
      patternOfOldUsers,
    );
  } catch (error) {
    SweetAlert(error, "error");
  }
};

const banUsersFunc = async (id) => {
  try {
    const response = await banUserApi(id);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    SweetAlert(data.message, "success");
    renderInfo();
  } catch (err) {
    SweetAlert(err.message, "error");
  }
};

const removeUserFunc = async (id) => {
  try {
    const result = await deleteUserApi(id);
    const data = await result.json();
    if (!result.ok) {
      throw new Error(data.message);
    }
    SweetAlert("User deletion was successful.", "success", false);
    renderInfo();
  } catch (err) {
    SweetAlert(err.message, "error");
  }
};

const createNewUserFunc = async (e) => {
  const newUser = {
    email: EmailInput.value.trim(),
    userName: NameInput.value.trim(),
    password: PasswordInput.value.trim(),
    role: roleInput.value.trim(),
  };
  try {
    const resUser = await createUserApi(newUser);
    const data = await resUser.json();

    if (!resUser.ok) {
      throw new Error(data.message);
    }
    SweetAlert("User creation was successful.", "success", false, true);
    hideModal(newUserModal);
    ClearInputs([EmailInput, NameInput, PasswordInput]);
    renderInfo();
  } catch (err) {
    SweetAlert(err.message, "error");
  }
};

const getUserInfoFunc = async (id) => {
  userEditId = id;
  try {
    const res = await getOneUserApi(id);
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

const editUserFunc = async (userEditId) => {
  const userInfo = {
    password: editPasswordInput.value.trim(),
    email: editEmailInput.value.trim(),
    userName: editUserInput.value.trim(),
    role: editRoleInput.value.trim(),
  };

  try {
    const res = await editUserApi(userEditId, userInfo);
    if (!res.ok) {
      throw new Error(res.message);
    }
    SweetAlert("User edit was successful.", "success");
    closeModal(editUserModal);
    renderInfo();
  } catch (err) {
    SweetAlert(err.message, "error");
  }
};

const showDetailsFunc = async (id) => {
  try {
    const res = await getOneUserApi(id);
    const userInfo = await res.json();

    if (!res.ok) {
      throw new Error(userInfo.message);
    }

    fillUserDetail(userInfo.data);
  } catch (err) {
    SweetAlert(err.message, "error");
  }
  openModal(userDetailsModal);
};

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

export {
  renderInfo,
  banUsersFunc,
  removeUserFunc,
  editUserFunc,
  addItemsInfoToDom,
  patternOfAllUsers,
  createNewUserFunc,
  getUserInfoFunc,
  fillUserDetail,
  showDetailsFunc,
  patternOfEmptyUsers,
  newUserModal,
};
