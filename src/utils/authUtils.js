export const handlePostLogin = async (response, navigate) => {
  const state = {
    token: response.data.session.access_token,
    user: response.data.user.email,
  };
  navigate("/", { state: state });
};
