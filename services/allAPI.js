import { commonAPI } from "./commonAPI";
import { server_url } from "./server_url";

// loginAPI
export const loginAPI = async (user) => {
  return await commonAPI("POST", `${server_url}/api/login`, user, "");
};

// registerAPI
export const registerAPI = async (user) => {
  return await commonAPI("POST", `${server_url}/api/register`, user, "");
};