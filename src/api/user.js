import client from "./client";

export const loginUser = (usernameOrEmail, password) => {
  return client.post("/user/login", {
    username: usernameOrEmail,
    email: usernameOrEmail,
    password
  });
};

export const signupUser = (username, email, password) => {
  return client.post("/user/signup", {
    username,
    email,
    password
  });
};
