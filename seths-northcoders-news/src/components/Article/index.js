import React from "react";

class Article extends React.Component {
  state = { article: {}, author: {} };

  componentDidMount = async () => {
    console.log(this.props);
    //fetch article off id in match
    //fetch comments here as well
  };
  render() {
    const { loggedIn, users } = this.props;
    console.log(loggedIn, users);
    return <h1>ARTICLE HERE</h1>;
  }
}

export default Article;
