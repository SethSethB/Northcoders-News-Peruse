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
import { withRouter } from "react-router";

class App extends Component {
  state = {
    loggedIn: guestUser,
    availableTopics: []
  };

  componentDidMount = async () => {
    this.updateTopics();
  };

  // componentDidUpdate = async (prevProps, prevState) => {
  //   const { availableTopics } = this.state;
  //   if (prevState.currentTopic.length !== availableTopics.length) {
  //     this.setState({ articles });
  //   }
  // };

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
              postArticle={this.postArticle}
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

  postArticle = (currentTopic, currentText, currentTitle, newTopicName) => {
    const errors = [];

    if (currentTopic === "New Topic" && !newTopicName)
      errors.push("Topic Name");
    if (!currentTitle) errors.push("Title");
    if (!currentText) errors.push("Content");

    if (errors.length)
      return alert(
        `Please complete the following before submitting:\n\n${errors.join(
          "\n"
        )}`
      );
    const topicName =
      currentTopic === "New Topic" ? newTopicName : currentTopic;

    const {
      history: { push }
    } = this.props;

    api.postArticle(topicName, currentTitle, currentText).then(res => {
      if (currentTopic === "New Topic") this.updateTopics();
      push(`/articles/${res.data._id}`);
    });
  };

  updateTopics = async () => {
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

export default withRouter(App);
