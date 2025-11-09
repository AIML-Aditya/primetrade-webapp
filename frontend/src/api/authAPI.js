import api from "../api";


// ✅ EXPORT ALL FUNCTIONS HERE
export const registerUser = (data) => api.post("/auth/signup", data);

export const loginUser = (data) => api.post("/auth/login", data);

export default {
  registerUser,
  loginUser,
};
