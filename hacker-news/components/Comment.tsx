// This is a React component that renders a single comment.
import React, { useState, useEffect } from "react";
import { convertUnixTimeToHumanTime } from "../utils/utils";
import parse from "html-react-parser";

type Props = {
  commentId: number;
};

type Comment = {
  by: string;
  parent: number;
  id: number;
  text: string;
  time: number;
  title: string;
  type: string;
};

export default function Story({ commentId }: Props) {
  const [comment, setComment] = useState({} as Comment);

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setComment(data);
      });
  }, [commentId]);

  if (!comment) {
    return <div>Loading...</div>;
  }

  const { by, text, time } = comment;

  return (
    <div>
      <p>
        By: {by} {convertUnixTimeToHumanTime(time)}
      </p>
      <p>{text && parse(text)}</p>
    </div>
  );
}
