import { useEffect, useId, useRef, useState } from "react";
import type { ResponsiveImageAsset, ResponsiveVideoSource } from "../../config/assets";
import { prefersReducedMotion, shouldConserveData } from "../../services/network";
import { OptimizedImage } from "./OptimizedImage";

type AdaptiveVideoMode = "pending" | "automatic" | "manual";

type AdaptiveVideoProps = {
  className?: string;
  mediaClassName?: string;
  poster: ResponsiveImageAsset;
  posterAlt?: string;
  posterSizes?: string;
  sources: readonly ResponsiveVideoSource[];
  eagerPoster?: boolean;
  decorative?: boolean;
  playLabel: string;
};

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function AdaptiveVideo({
  className = "",
  mediaClassName = "",
  poster,
  posterAlt = "",
  posterSizes,
  sources,
  eagerPoster = false,
  decorative = true,
  playLabel,
}: AdaptiveVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<AdaptiveVideoMode>("pending");
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry?.isIntersecting ?? false),
      { rootMargin: "160px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nextMode: AdaptiveVideoMode = shouldConserveData() || prefersReducedMotion() ? "manual" : "automatic";
    const idleWindow = window as IdleWindow;
    let timer = 0;
    let idleHandle: number | undefined;

    const settle = () => setMode(nextMode);
    const onLoad = () => {
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(settle, { timeout: 1200 });
      } else {
        timer = window.setTimeout(settle, 500);
      }
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(timer);
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
    };
  }, []);

  useEffect(() => {
    if (mode === "automatic" && isVisible) setShouldLoad(true);
  }, [isVisible, mode]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isReady) return;
    if (isVisible) void video.play().catch(() => setMode("manual"));
    else video.pause();
  }, [isReady, isVisible]);

  function requestPlayback() {
    setShouldLoad(true);
    window.requestAnimationFrame(() => {
      const video = videoRef.current;
      if (video?.readyState && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        void video.play();
      }
    });
  }

  return (
    <div ref={containerRef} className={`adaptive-video ${className}`.trim()}>
      <OptimizedImage
        asset={poster}
        src={poster.src}
        alt={posterAlt}
        className={`adaptive-video__poster ${mediaClassName}`.trim()}
        sizes={posterSizes}
        loading={eagerPoster ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eagerPoster ? "high" : "low"}
      />
      {shouldLoad ? (
        <video
          ref={videoRef}
          id={videoId}
          className={`adaptive-video__media ${isReady ? "adaptive-video__media--ready" : ""} ${mediaClassName}`.trim()}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden={decorative || undefined}
          tabIndex={decorative ? -1 : undefined}
          onCanPlay={() => setIsReady(true)}
        >
          {sources.map((source) => (
            <source key={`${source.src}-${source.media ?? "all"}`} src={source.src} type={source.type} media={source.media} />
          ))}
        </video>
      ) : null}
      {mode === "manual" && !isReady ? (
        <button className="adaptive-video__play" type="button" aria-controls={videoId} onClick={requestPlayback}>
          <span aria-hidden="true">▶</span>
          {playLabel}
        </button>
      ) : null}
    </div>
  );
}

