const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        sockio: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        isFetching: false,
        error: false,
        sockio: action.payload.sock,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
        sockio: null,
      };
    case "LOGOUT_START":
      return {
        user: action.payload.user,
        isFetching: true,
        error: false,
        sockio: action.payload.sock,
      };
    case "LOGOUT_SUCCESS":
      return {
        user: null,
        isFetching: false,
        error: false,
        sockio: null,
      };
    case "LOGOUT_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
        sockio: null,
      };
    case "UPDATE":
      return {
        user: action.payload.user,
        isFetching: false,
        error: false,
        sockio: action.payload.sock,
      };
    default:
      return state;
  }
};

export default AuthReducer;
