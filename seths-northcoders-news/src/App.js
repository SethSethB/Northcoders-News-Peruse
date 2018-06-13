import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import ArticleDisplay from "./components/ArticleDisplay";
import PostArticle from "./components/PostArticle";
import Article from "./components/ArticleDisplay";
import axios from "axios";
import Loading from "./components/Loading";

class App extends Component {
  state = {
    loggedIn: "",
    availableTopics: []
  };

  componentDidMount = async () => {
    const {
      data: { topics }
    } = await this.fetchTopics();

    this.setState({ availableTopics: topics });
  };

  render() {
    const { loggedIn, availableTopics } = this.state;

    return !availableTopics.length ? (
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
          path="/articles/:articleId"
          render={props => (
            <Article
              {...props}
              loggedIn={this.state.loggedIn}
              availableTopics={this.state.availableTopics}
            />
          )}
        />
      </div>
    );
  }

  fetchTopics = async () => {
    console.log("FETCHING");
    const topics = await axios.get(
      "https://seth-northcoders-news.herokuapp.com/api/topics"
    );

    return topics;
  };
}

export default App;
