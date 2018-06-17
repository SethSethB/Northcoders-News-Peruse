import React from "react";
import ArticlePreview from "../ArticlePreview";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ArticleCarousel({ articles }) {
  return (
    <Carousel
      centerMode
      width="100%"
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      autoPlay
      useKeyboardArrows={true}
      infiniteLoop={true}
    >
      {articles.map(article => (
        <ArticlePreview key={article._id} article={article} />
      ))}
    </Carousel>
  );
}

export default ArticleCarousel;
