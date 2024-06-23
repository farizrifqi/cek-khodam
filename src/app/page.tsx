"use client";

import { useEffect, useState } from "react";
import kodam from "../lib/kodam.json";
import { Social } from "@/components/socials";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import ResultComponent from "@/components/result";
import PanelKodam from "@/components/panel";
import Intro from "@/components/intro";
import localFont from "next/font/local";
const protestriot = localFont({
  src: "../fonts/ProtestRiot-Regular.ttf",
});

export type resultKhodam = {
  namaOrang?: string;
  kodam?: string;
  arti?: string;
};
type phase = {
  status: string;
};

const khodamPhase: phase[] = [
  {
    status: "Mengumpulkan energi...",
  },
  {
    status: "Mencari informasi orang...",
  },
  {
    status: "Menggali leluhur...",
  },
  {
    status: "Mencari informasi kodam...",
  },
];
export default function Home() {
  const [nama, setNama] = useState("");
  const [mencariKodam, setMencariKodam] = useState("");
  const [phase, setPhase] = useState(-1);
  const [usernameTiktok, setUsernameTiktok] = useState("");
  const [result, setResult] = useState({} as resultKhodam);
  const [panel, setPanel] = useState(false);

  useEffect(() => {
    if (phase == -1) return;
    if (phase > 3) {
      setPhase(-1);
    } else {
      if (phase == 3) {
        let kodamTerpilih =
          kodam[Math.floor(Math.random() * kodam.length + 100)] ??
          kodam[kodam.length - 1];
        setResult({
          namaOrang: nama,
          kodam: kodamTerpilih.name,
          arti: kodamTerpilih.meaning,
        });
        setNama("");
        setMencariKodam("");
      } else {
        setMencariKodam(khodamPhase[phase]?.status ?? "");
        setTimeout(() => {
          setPhase((prev) => prev + 1);
        }, getRandomInt(750, 3000));
      }
    }
  }, [phase]);

  const cekKodam = () => {
    setPhase(0);
  };

  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-center py-10 backdrop-blur-md">
      {panel ? (
        <div className="h-3/4 max-h-screen items-center justify-center flex flex-col ">
          <div className="font-extrabold text-center text-2xl lg:text-4xl w-full flex flex-col animate-pulse items-center justify-center text-white my-10">
            <div className="items-center flex flex-row">
              <svg
                viewBox="0 0 448 512"
                fill="currentColor"
                height="1.2em"
                width="1.2em"
                className="mr-2"
              >
                <path d="M448 209.91a210.06 210.06 0 01-122.77-39.25v178.72A162.55 162.55 0 11185 188.31v89.89a74.62 74.62 0 1052.23 71.18V0h88a121.18 121.18 0 001.86 22.17A122.18 122.18 0 00381 102.39a121.43 121.43 0 0067 20.14z" />
              </svg>
              {usernameTiktok}
            </div>
          </div>
          <h1
            className={`bg-gradient-to-r from-black to-red-900 inline-block text-transparent bg-clip-text text-5xl lg:text-7xl ${protestriot.className} font-extrabold my-5 tracking-wider text-center`}
          >
            CEK KHODAM
          </h1>
          {!result?.namaOrang && !mencariKodam && (
            <>
              <PanelKodam setNama={setNama} nama={nama} cekKodam={cekKodam} />
            </>
          )}

          <div
            className={`${
              !mencariKodam && "hidden"
            }  text-xl lg:text-3xl items-center flex flex-col`}
          >
            <div className="animate-bounce flex items-center">
              <Icon icon="line-md:moon-rising-alt-loop" className="mr-1" />{" "}
              {mencariKodam}
            </div>
          </div>

          <ResultComponent result={result} setResult={setResult} />
        </div>
      ) : (
        <Intro setUsernameTiktok={setUsernameTiktok} setPanel={setPanel} />
      )}

      <Social />
    </main>
  );
}

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
