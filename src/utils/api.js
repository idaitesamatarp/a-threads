import axios from 'axios';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

const putAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const handleRequest = (request) =>
  new Promise((resolve, reject) => {
    request.then((res) => resolve(res.data)).catch((err) => reject(err));
  });

const auth = {
  register: async ({ name, email, password }) =>
    handleRequest(axios.post(`${BASE_URL}/register`, {
      name,
      email,
      password,
    })),
  login: async ({ email, password }) =>
    handleRequest(axios.post(`${BASE_URL}/login`, {
      email,
      password
    })),
};

const users = {
  getOwnProfile: async () => handleRequest(axiosInstance.get('/users/me')),
  getAllUsers: async () => handleRequest(axios.get(`${BASE_URL}/users`))
};

const threads = {
  createThread: async ({ title, body, category }) => handleRequest(axiosInstance.post('/threads', { title, body, category })),
  getAllThreads: async () => handleRequest(axios.get(`${BASE_URL}/threads`)),
  showThread: async (threadId) => handleRequest(axios.get(`${BASE_URL}/threads/${threadId}`))
};

const comments = {
  createComment: async (threadId, content = '') => handleRequest(axiosInstance.post(`/threads/${threadId}/comments`, { content })),
};

const votes = {
  upVoteThread: async (threadId) => handleRequest(axiosInstance.post(`/threads/${threadId}/up-vote`)),
  downVoteThread: async (threadId) => handleRequest(axiosInstance.post(`/threads/${threadId}/down-vote`)),
  neutralVoteThread: async (threadId) => handleRequest(axiosInstance.post(`/threads/${threadId}/neutral-vote`)),
  upVoteComment: async (threadId, commentId) => handleRequest(axiosInstance.post(`/threads/${threadId}/comments/${commentId}/up-vote`)),
  downVoteComment: async (threadId, commentId) => handleRequest(axiosInstance.post(`/threads/${threadId}/comments/${commentId}/down-vote`)),
  neutralVoteComment: async (threadId, commentId) => handleRequest(axiosInstance.post(`/threads/${threadId}/comments/${commentId}/neutral-vote`)),
};

const leaderboards = {
  getLeaderboards: async () => handleRequest(axios.get(`${BASE_URL}/leaderboards`)),
};

export default {
  putAccessToken,
  getAccessToken,
  auth,
  users,
  threads,
  comments,
  votes,
  leaderboards,
};
