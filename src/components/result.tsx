import { resultKhodam } from "@/app/page";

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
        className={` flex flex-col text-center self-start text-xl font-semibold border-4 border-black p-5 lg:w-[30vw] m-3 rounded-xl uppercase gap-3`}
      >
        <div className="flex flex-col text-lg font-semibold">
          {result.namaOrang}
        </div>
        <div className="flex flex-col lg:text-6xl text-4xl text-red-700 font-extrabold my-5">
          <b>{result.kodam}</b>
        </div>
        <div className="flex flex-col text-base">{result.arti}</div>
      </div>
      <button
        onClick={setResult}
        className="border px-3 py-1 bg-900 bg-red-900 transition-all hover:bg-red-950 text-red-500 rounded border-red-800 disabled:bg-red-950 disabled:cursor-not-allowed text-base"
      >
        Cek lagi
      </button>
    </div>
  );
}
