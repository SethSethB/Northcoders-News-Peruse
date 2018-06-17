import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import ArticleDisplay from "./components/ArticleDisplay";
import RedirectPage from "./components/RedirectPage";
import PostArticle from "./components/PostArticle";
import Article from "./components/Article";
import People from "./components/People";
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
    const loggedIn = localStorage.getItem("loggedIn");
    const topics = await this.updateTopics();

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
        <h1>NEWS PERUSE</h1>

        <Nav loggedIn={loggedIn} toggleLogin={this.toggleLogin} />

        <Route exact path="/" component={RedirectPage} />

        <Route
          path="/peruse/:topic"
          render={props => (
            <ArticleDisplay
              {...props}
              loggedIn={loggedIn}
              availableTopics={availableTopics}
            />
          )}
        />

        <Route exact path="/peruse/" component={RedirectPage} />

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
          path="/people/:username"
          render={props => <People {...props} loggedIn={loggedIn} />}
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

    const { username } = this.state.loggedIn;

    api
      .postArticle(topicName, currentTitle, currentText, username)
      .then(res => {
        if (currentTopic === "New Topic") {
          this.updateTopics().then(availableTopics => {
            this.setState({
              availableTopics
            });
          });
        }
        this.props.history.push(`/articles/${res.data._id}`);
      });
  };

  updateTopics = async () => {
    const {
      data: { topics }
    } = await api.fetchTopics();

    return topics;
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

    api.fetchUser(username).then(({ data }) => {
      localStorage.setItem("loggedIn", JSON.stringify(data));

      this.setState({
        loggedIn: data
      });
    });
  };
}

export default withRouter(App);
