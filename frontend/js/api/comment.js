const baseUrl = "http://localhost:4000";

const getComments = async () => {
  const res = await fetch(`${baseUrl}/Comments`);
  return res;
};

const getBanComment = async () => {
  const res = await fetch(`${baseUrl}/Comments/banned`);
  return res;
};

const getNewComment = async () => {
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

const createComment = (data) => {
  const res = fetch(`${baseUrl}/Comments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
};

export {
  getComments,
  getBanComment,
  getNewComment,
  replyCommentApi,
  getOneCommentApi,
};
