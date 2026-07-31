import { useState } from "react";
import type { ResponsiveImageAsset } from "../../config/assets";
import { OptimizedImage } from "./OptimizedImage";

type DeferredYouTubeProps = {
  videoId: string;
  title: string;
  preview: ResponsiveImageAsset;
};

export function DeferredYouTube({ videoId, title, preview }: DeferredYouTubeProps) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button className="deferred-youtube" type="button" aria-label={`Play ${title}`} onClick={() => setActive(true)}>
      <OptimizedImage
        asset={preview}
        src={preview.src}
        alt=""
        width={preview.width}
        height={preview.height}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 760px) 92vw, 48vw"
      />
      <span className="deferred-youtube__play" aria-hidden="true">▶</span>
      <span className="deferred-youtube__label">Play startup video</span>
    </button>
  );
}
