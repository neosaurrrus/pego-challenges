// This is a React component that renders a single story.
// TODO: Consider value of using React.memo for this component
import Link from "next/link";
import parse from "html-react-parser";
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
    return (
      <div className="bg-gray-800/50 flex m-2 p-2 rounded-md gap-2 h-[100px] justify-center items-center opacity-25">
        <p className="text-xl animate-pulse">...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-800 flex flex-col m-4 p-4 rounded-md gap-2 items-start">
        <h3 className={`text-xl ${url && "text-blue-500 hover:text-blue-400"}`}>
          {url ? <Link href={url}>{parse(title)}</Link> : parse(title)}
        </h3>
        <p>Score: {score}</p>
        <div className="flex flex-col text-left">
          {shouldShowUserDetails ? (
            <UserDetails userId={by} />
          ) : (
            <button
              onClick={() => setShouldShowUserDetails(true)}
              className={"text-blue-500 font-bold w-max hover:text-blue-400"}
            >
              {by}
            </button>
          )}
        </div>
        {commentsArray && (
          <button
            onClick={() => setShouldShowComments((current) => !current)}
            className="text-white p-2 m-2 rounded-md bg-gray-700 disabled:opacity-50 hover:bg-gray-600"
          >
            {shouldShowComments ? "Hide" : "Show"} {commentsArray.length}{" "}
            Comments
          </button>
        )}
        {shouldShowComments && (
          <div className="flex flex-col gap-8">
            {commentsArray?.map((commentId: number) => (
              <Comment key={commentId} commentId={commentId} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
