const articleSort = (articles, category) => {
  articles.sort((a, b) => {
    if (category === "title") {
      if (a[category] < b[category]) return -1;
      if (a[category] > b[category]) return 1;
      return 0;
    } else {
      if (b[category] < a[category]) return -1;
      if (b[category] > a[category]) return 1;
      return 0;
    }
  });
};

export default articleSort;
