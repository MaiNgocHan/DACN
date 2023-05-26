import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getNews = async (token) => {
  try {
    const res = await axios({
        method: 'get',
        url: baseUrl + '/news',
        headers: {
            "token": token
        }
    });
    return res;
  } catch (error) {
    throw error;
  }
}
export const getMathNews = async (token) => {
  try {
    const res = await axios({
        method: 'get',
        url: baseUrl + '/news/mathNews',
        headers: {
            "token": token
        }
    });
    return res;
  } catch (error) {
    throw error;
  }
}
export const getLiterNews = async (token) => {
  try {
    const res = await axios({
        method: 'get',
        url: baseUrl + '/news/literNews',
        headers: {
            "token": token
        }
    });
    return res;
  } catch (error) {
    throw error;
  }
}
export const getEnglishNews = async (token) => {
  try {
    const res = await axios({
        method: 'get',
        url: baseUrl + '/news/englishNews',
        headers: {
            "token": token
        }
    });
    return res;
  } catch (error) {
    throw error;
  }
}
export const getOtherhNews = async (token) => {
  try {
    const res = await axios({
        method: 'get',
        url: baseUrl + '/news/otherhNews',
        headers: {
            "token": token
        }
    });
    return res;
  } catch (error) {
    throw error;
  }
}