import KhodamPage from "@/components/Page/Khodam";
import { Redis } from "@upstash/redis";
import { Metadata } from "next";

export default async function HomeKhodam() {
  let views: any = false;
  try {
    const redis = Redis.fromEnv();
    views = await redis.mget<number[]>("pageviews-khodam");
  } catch (err) {}
  return <KhodamPage totalViews={views[0]} />;
}
export const metadata: Metadata = {
  title: "Cek Khodam",
  description:
    "Cek kodam Anda dengan aplikasi kami! Temukan kekuatan dan karakter unik yang tersembunyi dalam diri Anda. Mulai dari kodam hewan hingga makhluk mistis dan lucu, aplikasi kami membantu Anda mengungkap identitas spiritual Anda.",
};
