import MainPage from "@/components/Page/Main";
import { Redis } from "@upstash/redis";

export default async function Home() {
  let views: any = false;
  try {
    const redis = Redis.fromEnv();

    views = await redis.mget<number[]>("pageviews-khodam");
  } catch (err) {}
  return <MainPage totalViews={views[0]} />;
}
