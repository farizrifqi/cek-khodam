export default function Intro({ setUsernameTiktok, setPanel }: any) {
  return (
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
  );
}
