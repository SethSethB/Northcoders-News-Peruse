import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import ArticleDisplay from "./components/ArticleDisplay";
import PostArticle from "./components/PostArticle";

import UserPick from "./components/UserPick";
import axios from "axios";
import Loading from "./components/Loading";

class App extends Component {
  state = {
    loggedIn: "",
    availableTopics: [],
    users: []
  };

  componentDidMount = async () => {
    const {
      data: { topics }
    } = await this.fetchTopics();

    const data = await this.fetchUsers();
    const { users } = data.data;

    this.setState({ availableTopics: topics, users });
  };

  render() {
    const { loggedIn, availableTopics, users } = this.state;

    return !availableTopics.length || !users.length ? (
      <Loading />
    ) : (
      <div>
        <Nav loggedIn={loggedIn} />
        <Route
          exact
          path="/"
          render={props => (
            <ArticleDisplay
              {...props}
              loggedIn={loggedIn}
              availableTopics={availableTopics}
              users={users}
            />
          )}
        />
        <Route
          path="/post"
          render={props => (
            <PostArticle
              {...props}
              loggedIn={loggedIn}
              availableTopics={availableTopics}
            />
          )}
        />

        <Route
          path="/people"
          render={props => (
            <UserPick {...props} loggedIn={loggedIn} users={users} />
          )}
        />
      </div>
    );
  }

  fetchTopics = async () => {
    const topics = await axios.get(
      "https://seth-northcoders-news.herokuapp.com/api/topics"
    );

    return topics;
  };

  fetchUsers = async () => {
    const users = await axios.get(
      "https://seth-northcoders-news.herokuapp.com/api/users"
    );

    return users;
  };
}

export default App;
