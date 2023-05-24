import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const signUp = async (email, password, username) => {
  try {
      const res = await axios({
      method: 'post',
      url: baseUrl + '/auth/register',
      data: {
        email,
        password,
        username,
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
}


export const login = async (email, password) => {
  try {
      const res = await axios({
      method: 'post',
      url: baseUrl + '/auth/login',
      data: {
        email,
        password
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export const logout = async (token) => {
  try {
      await axios({
      method: 'post',
      url: baseUrl + '/auth/logout',
      headers: {
        "token": token
      },
    });
  } catch (error) {
    throw error;
  }
}