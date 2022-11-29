// This is a React component that handles pagination and renders a group of stories.
import React, { useState, useEffect } from "react";
import Story from "./Story";

type Props = {
  storiesArray: number[];
};

export default function StoryGroup({ storiesArray }: Props) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    if (storiesArray.length < currentStoryIndex) {
      setCurrentStoryIndex(storiesArray.length);
    }
  }, [currentStoryIndex, storiesArray]);

  const storiesToShow = storiesArray.slice(
    currentStoryIndex,
    currentStoryIndex + 10
  );

  const renderPagination = () => {
    // Very basic pagination
    if (storiesArray.length > currentStoryIndex) {
      return (
        <div>
          <button
            onClick={() => setCurrentStoryIndex((current) => current - 10)}
            disabled={currentStoryIndex < 10}
          >
            Previous 10 Stories
          </button>
          <button
            onClick={() => setCurrentStoryIndex((current) => current + 10)}
            disabled={currentStoryIndex + 10 >= storiesArray.length}
          >
            Next 10 Stories
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      {renderPagination()}
      {storiesToShow?.map((storyId) => (
        <Story key={storyId} storyId={storyId} />
      ))}
    </div>
  );
}
