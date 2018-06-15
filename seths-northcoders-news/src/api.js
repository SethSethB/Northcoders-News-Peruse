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

export const postArticle = (topicName, title, body, username) => {
  return axios.post(`${url}/topics/${topicName.toLowerCase()}/articles`, {
    title,
    body,
    username
  });
};

export const postComment = async (comment, articleID, postingUsername) => {
  const articles = await axios.post(`${url}/articles/${articleID}/comments`, {
    comment,
    postingUsername
  });
  return articles;
};

export const fetchArticlesByTopic = async currentTopic => {
  const articles = await axios.get(
    `${url}/topics/${currentTopic.toLowerCase()}/articles`
  );
  return articles;
};
