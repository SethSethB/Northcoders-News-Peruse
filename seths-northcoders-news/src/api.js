import axios from "axios";

const url = "https://seth-northcoders-news.herokuapp.com/api";

export const fetchTopics = async () => {
  const topics = await axios.get(`${url}/topics`);
  return topics;
};

export const fetchArticles = async () => {
  const articles = await axios.get(`${url}/articles`);

  return articles;
};

export const fetchUsers = async () => {
  const users = await axios.get(`${url}/users`);

  return users;
};

export const fetchArticle = async id => {
  const articles = await axios.get(`${url}/articles/${id}`);
  return articles;
};

export const fetchComments = async id => {
  const comments = await axios.get(`${url}/articles/${id}/comments`);
  return comments;
};

export const articleVote = async (vote, id) => {
  await axios.put(`${url}/articles/${id}?vote=${vote}`);
};

export const commentVote = async (vote, id) => {
  await axios.put(`${url}/comments/${id}?vote=${vote}`);
};

export const postArticle = (belongs_to, title, body) => {
  return axios.post(`${url}/topics/${belongs_to.toLowerCase()}/articles`, {
    title,
    body
  });
};
