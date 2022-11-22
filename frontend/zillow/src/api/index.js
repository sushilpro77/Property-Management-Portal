import axios from "axios";
import { getToken } from "../modules/auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
});

function authSetupOptions() {
  const token = getToken();
  let authHeader = {};
  if (token) {
    authHeader["Authorization"] = `Bearer ${token}`;
  }
  return authHeader;
}

const post = (url, body, headers) => {
  return axiosInstance.post(
    url,
    { ...body },
    { headers: { ...headers, ...authSetupOptions() } }
  );
};

const get = (url, headers) => {
  return axiosInstance.get(url, {
    headers: { ...headers, ...authSetupOptions() },
  });
};

const put = (url, body, headers) => {
  return axiosInstance.put(
    url,
    { ...body },
    { headers: { ...headers, ...authSetupOptions() } }
  );
};

const deleteRequest = (url, headers) => {
  return axiosInstance.delete(url, {
    headers: { ...headers, ...authSetupOptions() },
  });
};

export { post, get, put, deleteRequest };
