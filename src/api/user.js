import apiClient from "./client"; 
// renamed locally, same path

// Login existing user (accepts username OR email)
export const authenticateUser = (identifier, passkey) => {
  return apiClient.post("/user/login", {
    username: identifier,  // backend will check username or email
    email: identifier,
    password: passkey
  });
};

// Register a new user
export const registerNewUser = (chosenName, userEmail, userPass) => {
  return apiClient.post("/user/signup", {
    username: chosenName,
    email: userEmail,
    password: userPass
  });
};
