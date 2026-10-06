import { baseUrl } from "../constant/constant.js";

const getCommentsApi = async () => {
  const res = await fetch(`${baseUrl}/Comments`);
  return res;
};

const getBanCommentApi = async () => {
  const res = await fetch(`${baseUrl}/Comments/banned`);
  return res;
};

const getNewCommentApi = async () => {
  const res = await fetch(`${baseUrl}/Comments/new`);
  return res;
};

const getOneCommentApi = async (id) => {
  const res = await fetch(`${baseUrl}/Comments/one/${id}`);
  return res;
};

const replyCommentApi = async (id, data) => {
  console.log("body:", JSON.stringify({ replyText: data }));
  const res = await fetch(`${baseUrl}/Comments/reply/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ replyText: data }),
  });
  return res;
};

const createCommentApi = (data) => {
  const res = fetch(`${baseUrl}/Comments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
};

const banCommentApi = (id, data) => {
  const res = fetch(`${baseUrl}/Comments/ban/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isBan: data }),
  });
  return res;
};

export {
  createCommentApi,
  getCommentsApi,
  getBanCommentApi,
  getNewCommentApi,
  replyCommentApi,
  getOneCommentApi,
  banCommentApi,
};
