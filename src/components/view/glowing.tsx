export default function GlowingText({
  text,
  color,
  from,
  via,
  to,
  size,
}: {
  text: string;
  color?: string;
  from?: string;
  via?: string;
  to?: string;
  size?: string;
}) {
  if (!color) color = "white";

  if (!from) from = "white-500";
  if (!via) via = "white-500";
  if (!to) to = "white-500";
  if (!size) size = "base";
  return (
    <div className="">
      <span
        className={` uppercase absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-white via-white to-white bg-clip-text text-3xl box-content font-extrabold text-transparent text-center select-none`}
      >
        {text}
      </span>
      <h1
        className={`uppercase relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-black via-black to-black bg-clip-text text-3xl font-extrabold text-transparent text-center select-auto`}
      >
        {text}
      </h1>
    </div>
  );
}
