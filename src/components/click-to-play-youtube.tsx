import { useState } from "react";

type Props = {
  videoId: string;
  title: string;
  thumbnailSrc?: string;
};

export function ClickToPlayYouTube({
  videoId,
  title,
  thumbnailSrc = "/cbc-westwood-cover.webp",
}: Props) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="size-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block size-full overflow-hidden bg-primary text-white"
      aria-label={`Play ${title}`}
    >
      <img
        src={thumbnailSrc}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <span
        className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35"
        aria-hidden="true"
      />
      <span className="relative flex size-full items-center justify-center">
        <span
          className="flex size-16 items-center justify-center rounded-full border-2 border-white bg-black/40 text-2xl shadow-lg transition-transform group-hover:scale-105"
          aria-hidden="true"
        >
          ▶
        </span>
      </span>
    </button>
  );
}
