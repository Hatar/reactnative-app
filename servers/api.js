import BASE_URL from "../config/env"
const request = async (endpoint, method = 'GET', body = null, headers = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
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
