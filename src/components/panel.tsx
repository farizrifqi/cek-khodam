"use client";
import { Dispatch, SetStateAction } from "react";
import GlowingText from "./view/glowing";

export default function PanelKodam({
  nama,
  setNama,
  cekKodam,
}: {
  nama: string;
  setNama: any;
  cekKodam: any;
}) {
  return (
    <div className="flex flex-col items-center gap-6">
      <>
        <GlowingText text="Nama Lengkap" size="xl lg:text-2xl" />

        <input
          value={nama}
          type="text"
          className="font-semibold bg-opacity-20 bg-black border-2 border-gray-800 drop-shadow-md shadow-white rounded-lg focus:outline-none outline-none px-3 py-2 text-xl text-gray-300 uppercase tracking-wider placeholder:text-black placeholder:text-opacity-40"
          placeholder="Masukkan nama"
          onChange={(e) => setNama(e.target.value)}
        />
      </>
      <button
        onClick={cekKodam}
        className="border-2 rounded px-5 py-1 my-2 text-gray-800 border-gray-800 bg-white bg-opacity-5 hover:bg-opacity-10 disabled:hover:cursor-not-allowed"
        disabled={nama === ""}
      >
        CEK !!!
      </button>
    </div>
  );
}
