import styles from "styles/Home.module.css";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import StoryGroup from "../../components/StoryGroup";

type Props = {
  askStories: number[];
  showStories: number[];
  jobStories: number[];
};

function HackerNewsPage({ askStories, showStories, jobStories }: Props) {
  return (
    <div className={styles.container}>
      <h2>Ask Stories</h2>
      <StoryGroup storiesArray={askStories} />
      <h2>Show Stories</h2>
      <StoryGroup storiesArray={showStories} />
      <h2>Job Stories</h2>
      <StoryGroup storiesArray={jobStories} />
    </div>
  );
}

export default withPageAuthRequired(HackerNewsPage);

export async function getStaticProps() {
  const [askRes, showRes, jobRes] = await Promise.all([
    fetch("https://hacker-news.firebaseio.com/v0/askstories.json"),
    fetch("https://hacker-news.firebaseio.com/v0/showstories.json"),
    fetch("https://hacker-news.firebaseio.com/v0/jobstories.json"),
  ]);

  const [askStories, showStories, jobStories] = await Promise.all([
    askRes.json(),
    showRes.json(),
    jobRes.json(),
  ]);

  return {
    props: { askStories, showStories, jobStories },
    revalidate: 60,
  };
}
