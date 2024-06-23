import GlowingText from "./view/glowing";

export default function Intro({ setUsernameTiktok, setPanel }: any) {
  return (
    <div className="flex flex-col font-bold text-lg">
      <GlowingText text="Username Tiktok" size="3xl" />
      <small className="text-center">Kosongkan saja jika tidak live.</small>
      <input
        type="text"
        className="border outline-none rounded-md p-2 my-1"
        placeholder="Tanpa @"
        onChange={(e) => setUsernameTiktok(e.target.value)}
      ></input>
      <button
        onClick={() => setPanel(true)}
        className="border-2 rounded px-3 py-1 my-2 text-black border-black bg-white bg-opacity-5 hover:bg-opacity-10"
      >
        MASUK KE CEK KODAM
      </button>
    </div>
  );
}
