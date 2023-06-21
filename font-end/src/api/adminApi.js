import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getUsers = (token) => {
  try {
      const res = axios({
      method: 'get',
      url: baseUrl + '/user',
      headers: {
        'token': token,
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export const changeStatusUser = (id, token) => {
  try {
      const res = axios({
      method: 'put',
      url: baseUrl + '/user/' + id + '/changeStatus',
      headers: {
        'token': token,
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export const deleteUser = (id, token) => {
  try {
      const res = axios({
      method: 'delete',
      url: baseUrl + '/user/' + id,
      headers: {
        'token': token,
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export const deleteNews = (id, token) => {
  try {
      const res = axios({
      method: 'delete',
      url: baseUrl + '/news/' + id,
      headers: {
        'token': token,
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export const createNews = async (news, token) => {
  try {
      const res = await axios({
      method: 'post',
      url: baseUrl + '/news/createNews',
      headers: {
        'token': token,
      },
      data: {
        type: news.type,
        title: news.title,
        image: news.image,
        content: news.content
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
}