import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import ArticleDisplay from "./components/ArticleDisplay";
import PostArticle from "./components/PostArticle";

class App extends Component {
  state = {
    loggedIn: "guest",
    availableTopics: [
      { title: "Coding", slug: "coding" },
      { title: "Football", slug: "football" },
      { title: "Cooking", slug: "cooking" }
    ]
  };

  render() {
    const { loggedIn } = this.state;
    return (
      <div>
        <Nav loggedIn={loggedIn} />
        <Route
          exact
          path="/"
          render={props => (
            <ArticleDisplay
              {...props}
              loggedIn={this.state.loggedIn}
              availableTopics={this.state.availableTopics}
            />
          )}
        />
        <Route
          path="/post"
          render={props => (
            <PostArticle
              {...props}
              loggedIn={this.state.loggedIn}
              availableTopics={this.state.availableTopics}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
