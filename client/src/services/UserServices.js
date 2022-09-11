import { customAxios, baseUrl } from "./config";

class UserServices {
  static login = async (credentials) => {
    try {
      const result = await customAxios.post(
        `${baseUrl}/user/login`,
        credentials
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  };
  static getInfo = async () => {
    try {
      const result = await customAxios.get(`${baseUrl}/user/info`);
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  static register = async (data) => {
    try {
      const result = await customAxios.post(`${baseUrl}/user/register`, data);
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  static users = async () => {
    try {
      const result = await customAxios.get(`${baseUrl}/user`);
      return result;
    } catch (error) {
      throw error.response.data;
    }
  };
  static userList = async (ids) => {
    try {
      const result = await customAxios.post(`${baseUrl}/user/list`, ids);
      return result;
    } catch (error) {
      throw error.response.data;
    }
  };
}

export default UserServices;
