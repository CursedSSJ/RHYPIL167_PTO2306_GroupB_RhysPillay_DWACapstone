export const handlePostLogin = async (data, navigate) => {
  const userId = data.user.id;

  localStorage.setItem("userId", userId);
  localStorage.setItem("authToken", data.session.access_token);

  const state = {
    user: data.user.email,
  };

  navigate("/content", { state: state });
};
