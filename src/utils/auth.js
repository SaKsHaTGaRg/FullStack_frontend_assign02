// Clear JWT token and redirect user to login page
export const signOutUser = () => {
  localStorage.removeItem("token"); // remove stored auth token
  window.location.href = "/login";  // force redirect
};
