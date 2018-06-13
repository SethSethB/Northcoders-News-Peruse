import React from "react";

const ArticlePreview = ({ article }) => {
  console.log(article);
  return (
    <div>
      <h1>{article.title}</h1>
      <article>{article.body}</article>
    </div>
  );
};

export default ArticlePreview;
