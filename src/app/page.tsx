"use client";

import { useEffect, useState } from "react";
import kodam from "../lib/kodam.json";
import { Social } from "@/components/socials";

type resultKodam = {
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
  const [result, setResult] = useState({} as resultKodam);
  const [panel, setPanel] = useState(false);

  useEffect(() => {
    if (phase == -1) return;
    if (phase > 3) {
      setPhase(-1);
    } else {
      if (phase == 3) {
        let kodamTerpilih =
          kodam[Math.floor(Math.random() * kodam.length + 30)] ??
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
    <main className="flex h-screen min-h-screen flex-col items-center justify-center py-10">
      {panel ? (
        <div className="h-full max-h-screen items-center justify-around flex flex-col">
          <div className="font-extrabold text-center text-2xl lg:text-4xl w-full flex flex-col animate-pulse items-center justify-center text-white">
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
          <div className="flex flex-col items-center gap-6">
            <h1 className="lg:text-6xl text-3xl font-extrabold text-red-800 uppercase caveat-brush-regular">
              Cek Khodam
            </h1>
            <p className="text-center lg:text-xl font-semibold">
              Masukkan nama untuk mengecek Khodam
            </p>
            <input
              value={nama}
              type="text"
              className="font-semibold tracking-wider bg-opacity-20 bg-black border-2 border-red-800 rounded-lg focus:outline-none outline-none px-3 py-2 text-xl text-red-800 uppercase tracking-wider placeholder:text-black placeholder:text-opacity-40"
              placeholder="Masukkan nama"
              onChange={(e) => setNama(e.target.value)}
            />
            <button
              onClick={cekKodam}
              className="border px-2 py-1 bg-900 bg-red-900 transition-all hover:bg-red-950 text-red-500 rounded border-red-800 disabled:bg-red-950 disabled:cursor-not-allowed"
              disabled={nama === ""}
            >
              Cek!!!
            </button>
          </div>

          <div className="animate-bounce text-xl lg:text-3xl">
            {mencariKodam}
          </div>

          <div
            className={`${
              !result.namaOrang && "opacity-0"
            } flex flex-col text-left self-start text-xl font-semibold border-4 border-black p-5 lg:w-[30vw] m-3 rounded uppercase gap-3`}
          >
            <div className="flex flex-col">
              <b>Nama:</b> {result.namaOrang}
            </div>
            <div className="flex flex-col">
              <b>Khodam:</b> {result.kodam}
            </div>
            <div className="flex flex-col">
              <b>Arti:</b> {result.arti}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col font-bold text-lg">
          Input username terlebih dahulu:
          <input
            type="text"
            className="border outline-none rounded-md p-2 my-1"
            onChange={(e) => setUsernameTiktok(e.target.value)}
          ></input>
          <button
            onClick={() => setPanel(true)}
            className="border-2 rounded px-3 py-1 my-2 text-black border-black bg-red-800 hover:bg-red-900"
          >
            MASUK KE CEK KODAM
          </button>
        </div>
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
