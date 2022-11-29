// This is a React component that renders a single story.
// TODO: Consider value of using React.memo for this component
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import UserDetails from "./UserDetails";

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
  const [shouldShowUserDetails, setShouldShowUserDetails] = useState(false);

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setStory(data);
      })
      .catch((error) => {
        // This is a very basic error handling approach...
        console.error("Error:", error);
      });
  }, [storyId]);

  const { title, by, url, score, kids: commentsArray } = story;

  if (!story || !title || !by || !score) {
    // Very basic unhappy path handling
    return <div>...</div>;
  }

  return (
    <div>
      <h3>{url ? <Link href={url}>{title}</Link> : title}</h3>
      {shouldShowUserDetails ? (
        <UserDetails userId={by} />
      ) : (
        <button onClick={() => setShouldShowUserDetails(true)}>{by}</button>
      )}
      <p>Score: {score}</p>
      {commentsArray && (
        <button onClick={() => setShouldShowComments((current) => !current)}>
          {shouldShowComments ? "Hide" : "Show"} {commentsArray.length} Comments
        </button>
      )}
      {shouldShowComments && (
        <div>
          {commentsArray?.map((commentId: number) => (
            <Comment key={commentId} commentId={commentId} />
          ))}
        </div>
      )}
    </div>
  );
}
