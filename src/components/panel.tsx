"use client";
import { Dispatch, SetStateAction } from "react";

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
      <p className="text-center lg:text-xl font-semibold">
        Masukkan nama untuk mengecek Khodam
      </p>
      <input
        value={nama}
        type="text"
        className="font-semibold bg-opacity-20 bg-black border-2 border-red-800 rounded-lg focus:outline-none outline-none px-3 py-2 text-xl text-red-800 uppercase tracking-wider placeholder:text-black placeholder:text-opacity-40"
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
  );
}
