import localFont from "next/font/local";

const protestriot = localFont({
  src: "../../fonts/ProtestRiot-Regular.ttf",
});
export default function H1({ text }: { text: string }) {
  return (
    <div className="">
      <span
        className={`${protestriot.className} uppercase absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-red-800 bg-clip-text text-3xl lg:text-6xl box-content font-extrabold text-transparent text-center select-none`}
      >
        {text}
      </span>
      <h1
        className={`${protestriot.className} uppercase relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-red-800 bg-clip-text text-3xl lg:text-6xl font-extrabold text-transparent text-center select-auto`}
      >
        {text}
      </h1>
    </div>
  );
}
