import MainPage from "@/components/Page/Main";
import { Metadata } from "next";

export default async function Home() {
  return <MainPage />;
}

export const metadata: Metadata = {
  title: "Cek",
  description:
    "Cek apapun dengan aplikasi kami! Temukan kekuatan dan karakter unik yang tersembunyi dalam diri Anda. aplikasi kami membantu Anda mengungkap identitas spiritual dan masa depan Anda.",
};
