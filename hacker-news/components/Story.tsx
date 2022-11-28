// This is a React component that renders a single story.
// TODO: Update this component match required functionality (placeholder for now).
import Link from "next/link";
import React, { useState, useEffect } from "react";

type Props = {
  storyId: number;
};

type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export default function Story({ storyId }: Props) {
  const [story, setStory] = useState({} as Story);
  const [shouldShowComments, setShouldShowComments] = useState(false);

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setStory(data);
      });
  }, [storyId]);

  if (!story) {
    return <div>Loading...</div>;
  }
  const { title, by, url, score, descendants, kids } = story;

  return (
    <div>
      <h3>{url ? <Link href={url}>{title}</Link> : title}</h3>
      <p>By: {by}</p>
      <p>Score: {score}</p>
      {kids && (
        <button onClick={() => setShouldShowComments((current) => !current)}>
          Comments: {kids.length}
        </button>
      )}
      {shouldShowComments && <p>Placeholder for comments</p>}
    </div>
  );
}
