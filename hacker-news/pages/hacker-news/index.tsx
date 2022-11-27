import { useUser } from "@auth0/nextjs-auth0";
import styles from "styles/Home.module.css";
import HackerNews from "../../components/HackerNews";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function HackerNewsPage() {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return <div className={styles.container}>{user && <HackerNews />}</div>;
}

export default withPageAuthRequired(HackerNewsPage);
