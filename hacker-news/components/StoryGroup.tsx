import React, { useState, useEffect } from "react";
import Story from "./Story";

type Props = {
  storiesArray: number[];
};

export default function StoryGroup({ storiesArray }: Props) {
  const [numberOfStoriesToShow, setNumberOfStoriesToShow] = useState(10);

  useEffect(() => {
    if (storiesArray.length < numberOfStoriesToShow) {
      setNumberOfStoriesToShow(storiesArray.length);
    }
  }, [numberOfStoriesToShow, storiesArray]);

  const storiesToShow = storiesArray.slice(0, numberOfStoriesToShow);

  return (
    <div>
      <button
        onClick={() => setNumberOfStoriesToShow(numberOfStoriesToShow + 10)}
      >
        Show More
      </button>

      {storiesToShow?.map((storyId) => (
        <Story key={storyId} storyId={storyId} />
      ))}
    </div>
  );
}
