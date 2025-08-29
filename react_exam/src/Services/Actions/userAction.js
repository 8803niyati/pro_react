export const logoutUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING" });
    try {

      localStorage.removeItem("user");


      await fetch("http://localhost:3000/logoutHistory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...user,
          loggedOutAt: new Date().toISOString()
        }),
      });

      dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (error) {
      dispatch({ type: "LOGOUT_FAIL", payload: error.message });
    }
  };
};