import axios from "axios";

export const fetchTopics = async () => {
  const topics = await axios.get(
    "https://seth-northcoders-news.herokuapp.com/api/topics"
  );
  return topics;
};

export const fetchArticle = async id => {
  const articles = await axios.get(
    `https://seth-northcoders-news.herokuapp.com/api/articles/${id}`
  );
  return articles;
};

export const fetchComments = async id => {
  const comments = await axios.get(
    `https://seth-northcoders-news.herokuapp.com/api/articles/${id}/comments`
  );
  return comments;
};

export const fetchArticles = async () => {
  const articles = await axios.get(
    "https://seth-northcoders-news.herokuapp.com/api/articles"
  );

  return articles;
};

export const fetchUsers = async () => {
  const users = await axios.get(
    "https://seth-northcoders-news.herokuapp.com/api/users"
  );

  return users;
};
