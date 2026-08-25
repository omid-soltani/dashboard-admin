const baseUrl = "http://localhost:4000";

const getAllUser = async () => {
  const res = await fetch(`${baseUrl}/Users`);

  return res;
};
const getAllNewUser = async () => {
  const res = await fetch(`${baseUrl}/Users/new`);

  return res;
};
const createUser = async (data) => {
  const res = await fetch(`${baseUrl}/Users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

const deleteUser = async (id) => {
  const res = await fetch(`${baseUrl}/Users/delete/${id}`, {
    method: "DELETE",
  });
  return res;
};
const editUser = async (id, data) => {
  const res = fetch(`${baseUrl}/Users/edit/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
};
const banUser = async (id, data) => {
  const res = fetch(`${baseUrl}/Users/ban/${id}`, {
    method: "PATCH",
  });
  return res;
};

const getOneUser = async (id) => {
  const res = await fetch(`${baseUrl}/Users/one/${id}`);
  return res;
};
export {
  getAllUser,
  getAllNewUser,
  createUser,
  deleteUser,
  editUser,
  getOneUser,
  banUser,
};
