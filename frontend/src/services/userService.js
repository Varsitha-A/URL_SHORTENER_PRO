import API from "./api";

// GET PROFILE
export const getProfile = () => {
  return API.get("/user/profile");
};

// UPDATE PROFILE
export const updateProfile = (data) => {
  return API.put("/user/profile", data);
};