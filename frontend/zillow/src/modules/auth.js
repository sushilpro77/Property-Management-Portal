import jwt_decode from "jwt-decode";

const getToken = () => {
  return localStorage.getItem("token");
};

const decodeToken = () => {
  const token = getToken();
  if (token) {
    const userPayload = jwt_decode(token);
    return userPayload;
  }
};

const logoutUser = () => {
  localStorage.removeItem("token");
};

export { getToken, decodeToken, logoutUser };
