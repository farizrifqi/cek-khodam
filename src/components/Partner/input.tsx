export default function InputPartner({ nama, setNama, setCari }: any) {
  return (
    <div className="flex flex-col border-2 rounded-md border-pink-200 p-2 items-center">
      <input
        type="text"
        className="border-b border-white rounded-lg outline-none bg-transparent px-3 py-1.5 text-lg lg:text-2xl font-semibold"
        placeholder="Masukkan Username"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
      <div className="flex w-full justify-between mt-5">
        <button
          onClick={() => setCari({ cewek: nama })}
          className="font-semibold border border-white rounded-lg drop-shadow-md shadow-white px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-10 transition-all"
        >
          Cari COWOK
        </button>
        <button
          onClick={() => setCari({ cowok: nama })}
          className="font-semibold border border-white rounded-lg drop-shadow-md shadow-white px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-10 transition-all"
        >
          Cari CEWEK
        </button>
      </div>
    </div>
  );
}
