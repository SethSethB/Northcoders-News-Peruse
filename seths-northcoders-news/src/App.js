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

class App extends Component {
  state = {
    loggedIn: {
      username: "guest",
      name: "Guest User",
      avatar_url:
        "http://www.urbasm.com/wp-content/uploads/2014/10/Mr-Porter.jpeg"
    },
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
          loggedIn: {
            username: "guest",
            name: "Guest User",
            avatar_url:
              "http://www.urbasm.com/wp-content/uploads/2014/10/Mr-Porter.jpeg"
          }
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
      localStorage.setItem(
        "loggedIn",
        JSON.stringify({
          username: "guest",
          name: "Guest User",
          avatar_url:
            "http://www.urbasm.com/wp-content/uploads/2014/10/Mr-Porter.jpeg"
        })
      );

      return this.setState({
        loggedIn: {
          username: "guest",
          name: "Guest User",
          avatar_url:
            "http://www.urbasm.com/wp-content/uploads/2014/10/Mr-Porter.jpeg"
        }
      });
    }

    const username = e.target.username.value;

    localStorage.setItem(
      "loggedIn",
      JSON.stringify({
        username: "dedekind561",
        name: "mitch",
        avatar_url:
          "https://carboncostume.com/wordpress/wp-content/uploads/2017/10/dale-chipanddalerescuerangers.jpg"
      })
    );

    this.setState({
      loggedIn: {
        username: "dedekind561",
        name: "mitch",
        avatar_url:
          "https://carboncostume.com/wordpress/wp-content/uploads/2017/10/dale-chipanddalerescuerangers.jpg"
      }
    });
    console.log("LOGGING IN");
  };
}

export default App;
