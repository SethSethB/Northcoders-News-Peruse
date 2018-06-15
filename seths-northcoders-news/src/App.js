import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import ArticleDisplay from "./components/ArticleDisplay";
import PostArticle from "./components/PostArticle";
import Article from "./components/Article";
import UserPick from "./components/UserPick";
import * as api from "./api";
import Loading from "./components/Loading";
import guestUser from "./data";

class App extends Component {
  state = {
    loggedIn: guestUser,
    availableTopics: []
  };

  componentDidMount = async () => {
    const {
      data: { topics }
    } = await api.fetchTopics();
    const loggedIn = localStorage.getItem("loggedIn");

    loggedIn
      ? this.setState({
          availableTopics: topics,
          loggedIn: JSON.parse(loggedIn)
        })
      : this.setState({
          availableTopics: topics,
          loggedIn: guestUser
        });
  };

  render() {
    const { loggedIn, availableTopics } = this.state;

    return !availableTopics.length ? (
      <Loading />
    ) : (
      <div>
        <Nav loggedIn={loggedIn} toggleLogin={this.toggleLogin} />
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
          path="/people"
          render={props => <UserPick {...props} loggedIn={loggedIn} />}
        />

        <Route
          path="/articles/:articleId"
          render={props => (
            <Article {...props} loggedIn={this.state.loggedIn} />
          )}
        />
      </div>
    );
  }

  toggleLogin = e => {
    e.preventDefault();

    if (this.state.loggedIn.username !== "guest") {
      localStorage.setItem("loggedIn", JSON.stringify(guestUser));

      return this.setState({
        loggedIn: guestUser
      });
    }

    const username = e.target.username.value;

    localStorage.setItem(
      "loggedIn",
      JSON.stringify({
        username: "happyamy2016",
        name: "Amy Happy",
        avatar_url:
          "http://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729"
      })
    );

    this.setState({
      loggedIn: {
        username: "happyamy2016",
        name: "Amy Happy",
        avatar_url:
          "http://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729"
      }
    });
  };
}

export default App;
