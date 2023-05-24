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
