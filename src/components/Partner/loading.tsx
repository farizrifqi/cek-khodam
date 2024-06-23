"use client";
import LoadingLoveVector from "@/lib/lottie/loading-love";

export default function LoadingPage() {
  const items = [<LoadingLoveVector key={"a"} />];
  return (
    <div className="absolute w-screen h-screen top-0 left-0 bg-white z-10">
      <div className="flex w-full h-full items-center justify-center">
        <div className="w-2/3 md:w-1/6 flex flex-col">
          {items[0]}
          <span className="text-xl text-center text-pink-500 my-2">
            Sedang berusaha mencari...
          </span>
        </div>
      </div>
    </div>
  );
}
