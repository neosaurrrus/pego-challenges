// This is a React component that renders a single user's details.
import React, { useState, useEffect } from "react";
import { convertUnixTimeToHumanTime } from "../utils/utils";

type Props = {
  userId: string;
};

type User = {
  created: number;
  id: string;
  karma: number;
  submitted: number[];
};

export default function UserDetails({ userId }: Props) {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    if (userId) {
      fetch(`https://hacker-news.firebaseio.com/v0/user/${userId}.json`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          // This is a very basic error handling
          console.error("Error:", error);
        });
    }
  }, [userId]);

  const { id, created, karma, submitted } = user;

  if (!user || !created || !karma) {
    // Very basic unhappy path handling
    return <div>...</div>;
  }

  return (
    <div>
      <p>
        <strong>{id}</strong> | Karma: {karma} | Created:{" "}
        {convertUnixTimeToHumanTime(created)} | Stories submitted:{" "}
        {submitted.length}
      </p>
    </div>
  );
}
