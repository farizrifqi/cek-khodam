import localFont from "next/font/local";
import Image from "next/image";
import CountUpAnimation from "../view/count-up";
import { useEffect, useState } from "react";

const caveatbrush = localFont({
  src: "../../fonts/CaveatBrush-Regular.ttf",
});
export default function PartnerResult({
  pasangan,
  setDefault,
}: {
  pasangan: any;
  setDefault: any;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!show) {
      if (pasangan.match == 0) {
        setShow(true);
      } else {
        setTimeout(() => {
          setShow(true);
        }, 4000);
      }
    }
  }, []);
  return (
    <>
      {pasangan.status && (
        <div className="flex flex-col lg:flex-row p-3 gap-5 lg:gap-10 items-center lg:my-10">
          {pasangan.cowok.photo && pasangan.cowok.username && (
            <div className="flex flex-col w-full border-4 border-pink-300 lg:p-5 rounded-lg items-center justify-center">
              <span className="font-bold text-xl">Cowok</span>
              <Image
                src={pasangan.cowok.photo}
                width={256}
                height={256}
                alt="Tiktok"
                className="p-1 border rounded-md lg:my-5 pointer-events-none w-1/3 lg:w-full"
              />
              <span className="text-xl lg:text-3xl font-extrabold tracking-wide text-pink-200 hover:text-pink-100">
                <a href={`https://tiktok.com/@${pasangan.cowok.username}`}>
                  @{pasangan.cowok.username}
                </a>
              </span>
            </div>
          )}
          <div
            className={`${caveatbrush.className} relative w-24 h-12 lg:w-[142px] lg:h-[142px] bg-no-repeat bg-center bg-contain text-center flex items-center justify-center lg:p-10 font-extrabold text-3xl lg:text-8xl tracking-widest `}
            style={{ backgroundImage: "url('/heart.png')" }}
          >
            <span className="">
              {pasangan.status != "Wah belum dapat menemukan untukmu!" ? (
                <CountUpAnimation
                  initialValue={0}
                  targetValue={pasangan.match}
                />
              ) : (
                "0"
              )}
              %
            </span>
          </div>
          {pasangan.cewek.photo && pasangan.cewek.username && (
            <div className="flex flex-col w-full border-4 border-pink-300 lg:p-5 rounded-lg items-center justify-center">
              <span className="font-bold text-xl">Cewek</span>
              <Image
                src={pasangan.cewek.photo}
                width={256}
                height={256}
                alt="Tiktok"
                className="p-1 border rounded-md lg:my-5 pointer-events-none w-1/3 lg:w-full"
              />
              <span className="text-xl lg:text-3xl font-extrabold tracking-wide text-pink-200 hover:text-pink-100">
                <a href={`https://tiktok.com/@${pasangan.cewek.username}`}>
                  @{pasangan.cewek.username}
                </a>
              </span>
            </div>
          )}
        </div>
      )}
      {show && (
        <p className="text-xl lg:text-4xl font-bold my-5 text-center">
          {pasangan.status}
        </p>
      )}
      <button
        onClick={setDefault}
        className="text-lg border border-pink-300 px-3 py-1 lg:mt-5 rounded-md bg-white bg-opacity-5 hover:bg-opacity-10 transition-all"
      >
        Cari Lagi...
      </button>
    </>
  );
}
