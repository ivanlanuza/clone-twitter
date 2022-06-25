import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NewTweet from "components/NewTweet";
import Tweets from "components/Tweets";
import prisma from "lib/prisma";
import { getTweets } from "lib/data.js";
import LoadMore from "components/LoadMore";
import { useState } from "react";

export default function Home({ initialTweets }) {
  const [tweets, setTweets] = useState(initialTweets);
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (!session) {
    router.push("/");
  }

  if (session && !session.user.name) {
    router.push("/setup");
  }

  return (
    <div className="grid place-items-center mt-6">
      <div className="w-2/4 border pb-6 ">
        <NewTweet tweets={tweets} setTweets={setTweets} />
        <Tweets tweets={tweets} />
        <LoadMore tweets={tweets} setTweets={setTweets} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let tweets = await getTweets(prisma, 2);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      initialTweets: tweets,
    },
  };
}
