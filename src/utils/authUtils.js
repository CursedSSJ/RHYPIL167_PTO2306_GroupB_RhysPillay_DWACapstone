export const handlePostLogin = async (response, navigate) => {
  const state = {
    token: response.data.session.access_token,
    user: response.data.user.email,
  };

  // Store data in local storage
  localStorage.setItem("token", state.token);
  localStorage.setItem("user", state.user);

  // Navigate to the home page
  navigate("/", { state: state });
};
