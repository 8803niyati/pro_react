// import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"


// const loading = () => {
//     return {
//         type: "LOADING"
//     }
// }
// const errorMsg = (msg) => {
//     return {
//         type: "ERROR",
//         payload: msg
//     }
// }

// const loginSuc = (user) => {
//     return {
//         type: "LOGIN_SUC",
//         payload: user
//     }
// }

// const logOut = () => {
//     return {
//         type: "LOGOUT_SUC"
//     }
// }
// const registerSuc = () => {
//     return {
//         type: "REGISTER"
//     }
// }

// export const registerAsync = (data) => {
//     return async (dispatch) => {
//         dispatch(loading());
//         try {
//             let refDoc = await createUserWithEmailAndPassword(auth, data.email, data.password);
//            dispatch(registerSuc());
//         } catch (error) {
//             console.log(error);
//             dispatch(errorMsg(error.message))
//         }
//     }
// }

// export const signInAsync = (data) => {
//     return async (dispatch) => {
//         dispatch(loading());
//         try {
//             let refDoc = await signInWithEmailAndPassword(auth, data.email, data.password);
//             console.log(refDoc);
//            dispatch(loginSuc(refDoc.user));
//         } catch (error) {
//             console.log(error);
//             dispatch(errorMsg(error.message))
//         }
//     }
// }

// export const signInWithGoogleAsync = () => {
//     return async (dispatch) => {
//         dispatch(loading());
//         try {
//             const provider = new GoogleAuthProvider();
//             let refDoc = await signInWithPopup(auth, provider);
//             console.log(refDoc);
//            dispatch(loginSuc(refDoc.user));
//         } catch (error) {
//             console.log(error);
//             dispatch(errorMsg(error.message))
//         }
//     }
// }

// export const logOutAsync = () => {
//     return async (dispatch) => {
//         try {
//             await signOut(auth);
//            dispatch(logOut());
//         } catch (error) {
//             console.log(error);
//             dispatch(errorMsg(error.message))
//         }
//     }
// }
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