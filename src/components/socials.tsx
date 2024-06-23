import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

export function Social() {
  return (
    <div className="flex flex-row text-red-200 items-center mt-10 text-sm gap-3">
      <a
        href="https://tiktok.com/@sosokidola"
        className="flex flex-row items-center gap-0.5 hover:text-red-100 transition-colors"
        target="_blank"
      >
        <Icon icon="simple-icons:tiktok" className="text-xs" />
        sosokidola
      </a>
      <a
        href="https://instagram.com/frz.ra"
        className="flex flex-row items-center gap-0.5 hover:text-red-100 transition-colors"
        target="_blank"
      >
        <Icon icon="akar-icons:instagram-fill" />
        frz.ra
      </a>
      <a
        href="https://twitter.com/zeranel"
        className="flex flex-row items-center gap-0.5 hover:text-red-100 transition-colors"
        target="_blank"
      >
        <Icon icon="akar-icons:x-fill" className="social-link" />
        zeraneL
      </a>
    </div>
  );
}
