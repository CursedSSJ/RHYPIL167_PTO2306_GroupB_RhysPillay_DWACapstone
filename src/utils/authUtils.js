export const handlePostLogin = async (response, navigate) => {
  const state = {
    user: response.data.user.email,
  };

  navigate("/content", { state: state });
};
