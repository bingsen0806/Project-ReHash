import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { io } from "socket.io-client";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("rehashUser")) || null, //changed
  isFetching: false,
  error: false,
  sockio: JSON.parse(localStorage.getItem("rehashSockio")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const setLocalStorage = async () => {
      console.log("state user is changed!");
      localStorage.setItem("rehashUser", JSON.stringify(state.user));
      if (state.user) {
        console.log("state.user is true");
        try {
          const sock = await io(); //const sock = await io("ws://localhost:8080");
          sock.on("connect", () => {
            sock.emit("addUser", state.user._id);
            console.log("sock inside try block: ", sock);
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: { user: state.user, sock: sock },
            });
          });
        } catch (err) {
          console.log(err);
        }
      }
    };
    setLocalStorage();
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        sockio: state.sockio,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
