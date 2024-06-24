"use client";

import { useEffect, useState } from "react";
import { Social } from "@/components/socials";
import H1 from "../view/h1";
import InputPartner from "../Partner/input";
import PartnerResult from "../Partner/result";
import LoadingPage from "../Partner/loading";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import CountUpAnimation from "../view/count-up";

export default function PartnerPage() {
  const [nama, setNama] = useState("");
  const [cari, setCari] = useState({ cewek: null, cowok: null });
  const [result, setResult] = useState({} as any);
  const [processing, setProcessing] = useState(false);
  const [partnerData, setPartnerData] = useState({ p: 0, w: 0, match: 0 });
  const setDefault = () => {
    setResult({});
    setNama("");
    setCari({ cewek: null, cowok: null });
  };
  useEffect(() => {
    fetch("/api/partner").then((r) => {
      r.json().then((rs) => {
        setPartnerData(rs);
      });
    });
    setTimeout(() => {
      window.parent.location.href = "https://www.tiktok.com/@sosokidola";
    }, 1000 * 60 * 30);
  }, []);

  useEffect(() => {
    if (!cari.cewek && !cari.cowok) return;
    setProcessing(true);
    let url = cari.cewek ? "/api/ttphoto?cewek=" : "/api/ttphoto?cowok=";
    fetch(url + (cari.cewek ?? cari.cowok)).then((res) => {
      res
        .json()
        .then((resjson) => {
          setResult(resjson);
          if (resjson.match != null) {
            setCari({ cewek: null, cowok: null });
          }
          fetch("/api/ttphoto", { method: "POST" });
          setProcessing(false);
        })
        .catch((err) => {
          setCari({ cewek: null, cowok: null });
          setProcessing(false);
        });
    });
  }, [cari]);
  if (processing) return <LoadingPage />;
  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-center bg-pink-500 text-white">
      <div className="flex h-full min-h-screen max-w-screen-2xl flex-col items-center justify-center py-10 backdrop-blur-sm">
        <H1 text="FIND PARTNER" />
        {!result.status && !processing && !cari.cewek && !cari.cowok && (
          <InputPartner nama={nama} setNama={setNama} setCari={setCari} />
        )}

        {result.status && (
          <PartnerResult pasangan={result} setDefault={setDefault} />
        )}
        <div className="flex flex-row items-center px-3 py-1 border rounded-md my-2 gap-3">
          <div className="flex flex-row gap-0.5 items-center">
            <Icon icon="mingcute:love-fill" className="text-xl" />

            {partnerData.match == 0 ? (
              "0"
            ) : (
              <CountUpAnimation
                initialValue={0}
                targetValue={partnerData.match}
                duration={2000}
              />
            )}
          </div>
          <div className="flex flex-row gap-0.5 items-center">
            <Icon icon="material-symbols:male" />
            {partnerData.p == 0 ? (
              "0"
            ) : (
              <CountUpAnimation
                initialValue={0}
                targetValue={partnerData.p}
                duration={2000}
              />
            )}
          </div>
          <div className="flex flex-row gap-0.5 items-center">
            <Icon icon="material-symbols:female" />
            {partnerData.w == 0 ? (
              "0"
            ) : (
              <CountUpAnimation
                initialValue={0}
                targetValue={partnerData.w}
                duration={2000}
              />
            )}
          </div>
        </div>
        <Social />
      </div>
    </main>
  );
}
