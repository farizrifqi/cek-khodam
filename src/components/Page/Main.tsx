import { Social } from "../socials";

export default function MainPage() {
  return (
    <main className="flex h-screen min-h-screen flex-col bg-slate-500 text-white">
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center py-10 backdrop-blur-sm">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 p-5">
          <a
            href="/khodam"
            className="text-center flex flex-col border rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-500"
          >
            <b>Cek Khodam</b>
          </a>
          <a
            href="/partner"
            className="text-center flex flex-col border rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-500"
          >
            <b>
              Find Partner & Love Meter <small>(Soon)</small>
            </b>
          </a>
          <a
            href="#"
            className="text-center flex flex-col border rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all duration-500 disabled:text-white"
            aria-disabled="true"
          >
            <b>
              Apa lagi ya <small>(Soon)</small>
            </b>
          </a>
        </div>
        <Social />
      </div>
    </main>
  );
}
