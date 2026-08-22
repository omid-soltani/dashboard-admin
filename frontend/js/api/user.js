const baseUrl = "http://localhost:4000";

const getAllUser = async () => {
  const res = await fetch(`${baseUrl}/Users`);
  const data = await res.json();

  return data;
};
const getAllNewUser = async () => {
  const res = await fetch(`${baseUrl}/Users/new`);
  const data = await res.json();
  return data;
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
export { getAllUser, getAllNewUser, createUser };
