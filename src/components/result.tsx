import localFont from "next/font/local";
import { resultKhodam } from "./Page/Khodam";

const caveatbrush = localFont({
  src: "../fonts/CaveatBrush-Regular.ttf",
});
export default function ResultComponent({
  result,
  setResult,
}: {
  result: resultKhodam;
  setResult: any;
}) {
  return (
    <div
      className={`${
        !result.namaOrang && "opacity-0"
      } flex items-center justify-center flex-col`}
    >
      <div
        className={` flex flex-col text-center self-start text-xl font-semibold border-4 border-black p-5 lg:w-[30vw] m-3 rounded-xl uppercase gap-3 backdrop-blur-xl drop-shadow-md shadow-black`}
      >
        <div className="flex flex-col text-2xl font-extrabold">
          {result.namaOrang}
        </div>

        <div className="flex items-center justify-center">
          <span
            className={`${caveatbrush.className} uppercase absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-white via-red-800 to-white-800 bg-clip-text  box-content font-extrabold text-transparent text-center select-none`}
          >
            {result.kodam}
          </span>
          <h1
            className={`${caveatbrush.className} uppercase relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-black via-red-800 to-black bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto`}
          >
            {result.kodam}
          </h1>
        </div>

        <div className="flex flex-col text-base">{result.arti}</div>
      </div>
      <button
        onClick={setResult}
        className="border px-3 py-1 bg-900 bg-white bg-opacity-5 transition-all hover:bg-opacity-10 text-gray-800 rounded border-gray-800 disabled:bg-gray-950 disabled:cursor-not-allowed text-base"
      >
        Cek lagi
      </button>
    </div>
  );
}
