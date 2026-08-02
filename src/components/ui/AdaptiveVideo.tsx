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
  startAt?: number;
  eagerPoster?: boolean;
  decorative?: boolean;
  playLabel: string;
};

export function AdaptiveVideo({
  className = "",
  mediaClassName = "",
  poster,
  posterAlt = "",
  posterSizes,
  sources,
  startAt = 0,
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
  const [isPlaying, setIsPlaying] = useState(false);

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
    let firstFrame = 0;
    let secondFrame = 0;

    // Two animation frames let the lightweight poster and hero copy paint first,
    // then capable connections can begin fetching the video without waiting for
    // every image and third-party resource on the page to finish loading.
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setMode(nextMode));
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  useEffect(() => {
    if (mode === "automatic" && isVisible) setShouldLoad(true);
  }, [isVisible, mode]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isReady) return;
    if (isVisible) void video.play().catch(() => setMode("manual"));
    else {
      video.pause();
      if (startAt > 0) video.currentTime = startAt;
    }
  }, [isReady, isVisible, startAt]);

  function alignOpeningFrame() {
    const video = videoRef.current;
    if (!video || startAt <= 0 || !Number.isFinite(video.duration) || video.duration <= startAt) return;
    video.currentTime = startAt;
  }

  function markReadyWhenAligned() {
    const video = videoRef.current;
    if (!video) return;
    if (startAt > 0 && Math.abs(video.currentTime - startAt) > 0.08) return;
    setIsReady(true);
  }

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
          className={`adaptive-video__media ${isPlaying ? "adaptive-video__media--ready" : ""} ${mediaClassName}`.trim()}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden={decorative || undefined}
          tabIndex={decorative ? -1 : undefined}
          onLoadedMetadata={alignOpeningFrame}
          onLoadedData={markReadyWhenAligned}
          onCanPlay={markReadyWhenAligned}
          onSeeked={markReadyWhenAligned}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          {sources.map((source) => (
            <source key={`${source.src}-${source.media ?? "all"}`} src={source.src} type={source.type} media={source.media} />
          ))}
        </video>
      ) : null}
      {mode === "manual" && !isPlaying ? (
        <button className="adaptive-video__play" type="button" aria-controls={videoId} onClick={requestPlayback}>
          <span aria-hidden="true">▶</span>
          {playLabel}
        </button>
      ) : null}
    </div>
  );
}
