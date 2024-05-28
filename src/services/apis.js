const BASE_URL = "http://localhost:4000/api/v1/auth";
const BASE_URL_PROB = "http://localhost:4000/api/v1/problems";

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/signup",
  LOGIN_API: BASE_URL + "/login",
  GETPROBLEMS_API: BASE_URL_PROB + "/",
  CREATEPROB_API : BASE_URL_PROB + "/create",
  GETPROBLEMBYID_API: BASE_URL_PROB + "/single",
  UPDATEPROBLEMID_API:BASE_URL_PROB +"/update",
  DELETEPROBLEM_API:BASE_URL_PROB +"/delete",
  RESETPASS_API:BASE_URL + "/resetpassword",
};
