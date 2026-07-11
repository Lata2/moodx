"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

function MuteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
      <path d="M16 8.5c1 1 1 6 0 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function UnmuteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
      <path d="M16.5 9.5c1.5 1.3 1.5 3.7 0 5M19 7.5c2.7 2.3 2.7 6.7 0 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function VideoPlayer({
  src,
  poster,
  autoPlay = true,
  onClose,
}: {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  onClose?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset state for the new source.
    setLoading(true);
    setError(null);

    // Autoplay is only reliable when the video starts muted — browsers
    // silently block unmuted autoplay once the "user gesture" window has
    // passed (which it has, by the time hls.js finishes parsing the
    // manifest asynchronously). Start muted, let the person unmute.
    video.muted = true;
    setMuted(true);

    let hls: Hls | null = null;

    const tryPlay = () => {
      setLoading(false);
      if (autoPlay) {
        video.play().catch(() => {
          // Even muted autoplay can be blocked in rare cases (e.g. data-saver
          // mode). The native controls still let the person hit play.
        });
      }
    };

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              setError("Video load nahi ho paaya.");
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari / iOS)
      video.src = src;
      video.addEventListener("loadedmetadata", tryPlay);
    } else {
      setError("Aapka browser HLS support nahi karta.");
    }

    return () => {
      hls?.destroy();
    };
  }, [src, autoPlay]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    // Some browsers need an explicit play() call right after the first
    // user-triggered unmute to keep playback going.
    video.play().catch(() => {});
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-black">
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
          <p className="font-mono text-sm">{error}</p>
          <button
            type="button"
            onClick={() => {
              const video = videoRef.current;
              if (video) {
                setError(null);
                setLoading(true);
                video.load();
              }
            }}
            className="rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wider hover:bg-white/20"
          >
            Retry
          </button>
        </div>
      )}

      <video
        ref={videoRef}
        poster={poster}
        controls
        playsInline
        muted={muted}
        className="h-full w-full"
        style={{ display: error ? "none" : "block" }}
      />

      {!error && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
        >
          {muted ? <MuteIcon className="h-4 w-4" /> : <UnmuteIcon className="h-4 w-4" />}
        </button>
      )}

      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          aria-label="Close"
        >
          ✕
        </button>
      )}
    </div>
  );
}