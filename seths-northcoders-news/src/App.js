import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

class App extends Component {
  state = {
    loggedIn: "guest",
    articles: []
  };

  render() {
    const { loggedIn } = this.state;
    return (
      <div>
        <NavBar loggedIn={loggedIn} />
        <h1> app here</h1>
      </div>
    );
  }
}

export default App;
