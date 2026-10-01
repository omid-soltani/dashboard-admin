import { baseUrl } from "../constant/constant.js";

const getAllUserApi = async () => {
  const res = await fetch(`${baseUrl}/Users`);

  return res;
};
const getAllNewUserApi = async () => {
  const res = await fetch(`${baseUrl}/Users/new`);

  return res;
};
const createUserApi = async (data) => {
  const res = await fetch(`${baseUrl}/Users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

const deleteUserApi = async (id) => {
  const res = await fetch(`${baseUrl}/Users/delete/${id}`, {
    method: "DELETE",
  });
  return res;
};
const editUserApi = async (id, data) => {
  const res = fetch(`${baseUrl}/Users/edit/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
};
const banUserApi = async (id, data) => {
  const res = fetch(`${baseUrl}/Users/ban/${id}`, {
    method: "PATCH",
  });
  return res;
};

const getOneUserApi = async (id) => {
  const res = await fetch(`${baseUrl}/Users/one/${id}`);
  return res;
};
export {
  getAllUserApi,
  getAllNewUserApi,
  createUserApi,
  deleteUserApi,
  editUserApi,
  getOneUserApi,
  banUserApi,
};
