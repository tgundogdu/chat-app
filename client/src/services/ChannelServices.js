import { customAxios, baseUrl } from "./config";

class ChannelServices {
  static createChannel = async (channel) => {
    try {
      const result = await customAxios.post(
        `${baseUrl}/channel/create`,
        channel
      );
      return result;
    } catch (error) {
      throw error.response.data;
    }
  };
  static getChannels = async () => {
    try {
      const result = await customAxios.get(`${baseUrl}/channel/messages`);
      return result;
    } catch (error) {
      throw error.response.data;
    }
  };
  static getMessages = async (channelId) => {
    try {
      const result = await customAxios.get(`${baseUrl}/message/${channelId}`);
      return result;
    } catch (error) {
      throw error.response.data;
    }
  };
  static sendMessage = async (msgObj) => {
    try {
      const result = await customAxios.post(`${baseUrl}/message/create`, msgObj);
      return result;
    } catch (error) {
      throw error.response.data;
    }
  };
  static sendMsgInfo = async (obj) => {
    try {
      const result = await customAxios.patch(`${baseUrl}/message/updateinfo`, obj);
      return result;
    } catch (error) {
      throw error.response.data;
    }
  };
  static setRecipients = async (obj) => {
    try {
      const result = await customAxios.patch(`${baseUrl}/channel/recipients`, obj);
      return result;
    } catch (error) {
      throw error.response.data;
    }
  };
}

export default ChannelServices;
