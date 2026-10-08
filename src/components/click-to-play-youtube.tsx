import { useState } from "react";

type Props = {
  videoId: string;
  title: string;
};

export function ClickToPlayYouTube({ videoId, title }: Props) {
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
      className="relative flex size-full items-center justify-center bg-[#102A3D] text-white"
      aria-label={`Play ${title}`}
    >
      <span
        className="absolute inset-0 bg-gradient-to-br from-[#1D5048] to-[#102A3D]"
        aria-hidden="true"
      />
      <span className="relative flex flex-col items-center gap-3 px-5 text-center">
        <span
          className="flex size-16 items-center justify-center rounded-full border-2 border-white bg-black/25 text-2xl shadow-md"
          aria-hidden="true"
        >
          ▶
        </span>
        <span className="font-semibold">{title}</span>
        <span className="text-xs text-white/80">Click to play video</span>
      </span>
    </button>
  );
}
