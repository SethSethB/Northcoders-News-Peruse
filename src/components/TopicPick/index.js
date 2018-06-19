import React from "react";

const TopicPick = ({ availableTopics, defaultOption, handleTopicPick }) => {
  const topicList = [...availableTopics].sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
  return (
    <div className="selector">
      <label>CHOOSE TOPIC</label>
      <select
        onChange={handleTopicPick}
        defaultValue={defaultOption}
        className="browser-default"
      >
        <option value={defaultOption}>{defaultOption}</option>
        {topicList.map(topic => {
          return (
            <option key={topic.slug} value={topic.slug}>
              {topic.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TopicPick;
