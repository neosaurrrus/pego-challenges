export default function Home() {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto h-4/5 items-center justify-center">
      <div className="text-[70px]">📰</div>
      <h1 className="text-4xl flex flex-col gap-4 items-center">
        Hackernews App
        <a href="/hacker-news" className="text-blue-400 text-lg">
          Login
        </a>{" "}
      </h1>
    </div>
  );
}
