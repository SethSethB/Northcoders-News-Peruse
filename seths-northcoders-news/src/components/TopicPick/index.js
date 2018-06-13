import React from "react";
import { Input } from "react-materialize";

const TopicPick = ({ availableTopics, defaultOption, handleTopicPick }) => {
  availableTopics.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
  return (
    <Input
      s={2}
      type="select"
      label="ChooseTopic"
      defaultValue={defaultOption}
      onChange={handleTopicPick}
    >
      <option value={defaultOption}>{defaultOption}</option>
      {availableTopics.map(topic => {
        return (
          <option key={topic.slug} value={topic.slug}>
            {topic.title}
          </option>
        );
      })}
    </Input>
  );
};

export default TopicPick;