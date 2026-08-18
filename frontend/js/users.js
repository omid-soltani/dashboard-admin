import { getAllNewUser, getAllUser } from "./api/user.js";
import {
  patternOfNewPeople,
  patternOfAllPeople,
  patternOfOldPeople,
} from "./funcs/user.js";
const d = document;
const usersWrapperBody = d.getElementById("users-tbody");
const newUsersWrapper = d.getElementById("new-users");
const oldUsersWrapper = d.getElementById("old-users");
const openNewUserModal = d.getElementById("open-new-user-modal");

window.addEventListener("load", async () => {
  const [allUsers, allNewUsers] = await Promise.all([
    getAllUser(),
    getAllNewUser(),
  ]);

  // Add basic information about Users

  allUsers.data.forEach((user) => {
    usersWrapperBody.insertAdjacentHTML("beforeend", patternOfAllPeople(user));
  });
  allNewUsers.data.forEach((user) => {
    newUsersWrapper.insertAdjacentHTML("beforeend", patternOfNewPeople(user));
  });
  allNewUsers.data.forEach((user) => {
    oldUsersWrapper.insertAdjacentHTML("beforeend", patternOfOldPeople(user));
  });
});

openNewUserModal.addEventListener("click", () => {
  console.log("hi");
});
