
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config";
const request = async (endpoint, method = 'GET', body = null, headers = {}) => {
  try {
    let url = config.BASE_URL
    if(body && body.serverNode) {
      url = 'http://localhost:5500';
      delete body.serverNode;
    } 
    const token = await AsyncStorage.getItem('token')
    const response = await fetch(`${url}/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token.trim()}` : "",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });


    const data = await response.json()
    if (!response.ok) {
      throw  (data.errors instanceof Array && data.errors.length > 0 && data.errors[0].message) ||
      data.message ||
      "Something Wrong !!";
    }
    return data
  } catch (error) {
    throw error;
  }
};

export default request;
