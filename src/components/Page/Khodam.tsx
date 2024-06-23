"use client";

import { useEffect, useState } from "react";
import kodam from "@/lib/kodam.json";
import { Social } from "@/components/socials";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import ResultComponent from "@/components/result";
import PanelKodam from "@/components/panel";
import Intro from "@/components/intro";
import { getRandomInt } from "@/lib/utils";
import H1 from "../view/h1";

export type resultKhodam = {
  namaOrang?: string;
  kodam: string;
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

export default function KhodamPage({
  totalViews,
}: {
  totalViews: number | boolean;
}) {
  const [nama, setNama] = useState("");
  const [mencariKodam, setMencariKodam] = useState("");
  const [phase, setPhase] = useState(-1);
  const [usernameTiktok, setUsernameTiktok] = useState("");
  const [result, setResult] = useState({} as resultKhodam);
  const [panel, setPanel] = useState(false);
  const [gachaBg, setGachaBg] = useState(1);
  useEffect(() => {
    setGachaBg(getRandomInt(1, 4));
    setTimeout(() => {
      window.parent.location.href = "https://www.tiktok.com/@sosokidola";
    }, 1000 * 60 * 30);
  }, []);
  useEffect(() => {
    if (phase == -1) return;
    if (phase > 3) {
      setPhase(-1);
    } else {
      if (phase == 3) {
        if (
          nama.toLowerCase() == "aley" ||
          nama.toLowerCase() == "aleyra" ||
          nama.toLowerCase() == "ariel setiawan"
        ) {
          setResult({
            namaOrang: nama,
            kodam: "Pantat",
            arti: "Kamu Pantat",
          });
        } else {
          let kodamTerpilih =
            kodam[Math.floor(Math.random() * kodam.length + 100)] ??
            kodam[kodam.length - 1];
          setResult({
            namaOrang: nama,
            kodam: kodamTerpilih.name,
            arti: kodamTerpilih.meaning,
          });
        }
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
    if (totalViews) {
      fetch("/api/khodam", {
        method: "POST",
        body: JSON.stringify({ nama: nama, username: usernameTiktok }),
      });
    }
  };

  return (
    <main
      className="flex h-screen min-h-screen flex-col bg-no-repeat bg-cover"
      style={{ backgroundImage: `url("/khodam/bg-${gachaBg}.png")` }}
    >
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center py-10 backdrop-blur-sm">
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
            <H1 text="cek khodam" />
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
        {totalViews && (
          <div className=" text-center font-semibold border rounded-md text-white border-white text-xs px-3 py-1 my-5">
            {totalViews}x mengecek kodam
          </div>
        )}
        <Social />
      </div>
    </main>
  );
}
