import type { ReactElement } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Hacker News App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="bg-grey-900 flex-1 overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
}
