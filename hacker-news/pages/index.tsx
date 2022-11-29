import type { ReactElement } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <h1 className={styles.title}>
      <a href="/hacker-news">Click</a> to see Hacker News.
    </h1>
  );
}
