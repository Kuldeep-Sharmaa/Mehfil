import "./MusicPlayer.css";

/**
 * MusicPlayer
 *
 * Two visual elements, kept intentionally separate:
 * 1. .youtube-mount — the actual YouTube player. Visually hidden
 *    (required in the DOM by the IFrame API), plays the real audio.
 * 2. .track-disk-img — a decorative spinning thumbnail image, built
 *    from the track's public thumbnail (img.youtube.com). Visual
 *    flair only, does not control playback.
 */
export function MusicPlayer({
  containerRef,
  playing,
  isBuffering,
  currentTime,
  duration,
  muted,
  videoTitle,
  channelTitle,
  currentVideoId,
  hasMultipleTracks,
  onTogglePlay,
  onSeek,
  onToggleMute,
  onNext,
  onPrev,
}) {
  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (event) => {
    const bar = event.currentTarget;
    const rect = bar.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    onSeek(ratio * duration);
  };

  const thumbnailUrl = currentVideoId
    ? `https://img.youtube.com/vi/${currentVideoId}/hqdefault.jpg`
    : null;

  return (
    <div className="music-player">
      {/* Real, visible YouTube player — hidden, plays the audio */}
      <div className="youtube-mount" ref={containerRef} />

      <div className={`disk-wrapper ${playing ? "is-spinning" : ""}`}>
        {thumbnailUrl && (
          <img
            className="track-disk-img"
            key={currentVideoId}
            src={thumbnailUrl}
            alt=""
            aria-hidden="true"
          />
        )}
        <svg className="vinyl-grooves" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" />
          <circle cx="50" cy="50" r="36" />
          <circle cx="50" cy="50" r="26" />
          <circle cx="50" cy="50" r="8" className="vinyl-center" />
        </svg>
      </div>

      <div className="player-main">
        <div className="track-info">
          <span className="track-title" key={currentVideoId}>
            {videoTitle || "Loading…"}
          </span>
          {channelTitle && <span className="track-artist">{channelTitle}</span>}
        </div>

        <div className="progress-container">
          <div
            className={`progress-bar ${isBuffering ? "is-buffering" : ""}`}
            onClick={handleProgressClick}
          >
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="time-display">
            <span className="current-time">{formatTime(currentTime)}</span>
            <span className="separator"> / </span>
            <span className="duration">{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="player-controls">
        {hasMultipleTracks && (
          <button
            className="control-btn nav-btn"
            aria-label="Previous track"
            onClick={onPrev}
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor" />
            </svg>
          </button>
        )}

        <button
          className={`control-btn play-btn ${playing ? "is-playing" : ""}`}
          aria-label={playing ? "Pause" : "Play"}
          onClick={onTogglePlay}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          )}
        </button>

        {hasMultipleTracks && (
          <button
            className="control-btn nav-btn"
            aria-label="Next track"
            onClick={onNext}
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M16 6h2v12h-2zM6 6v12l8.5-6z" fill="currentColor" />
            </svg>
          </button>
        )}

        <button
          className="control-btn mute-btn"
          aria-label={muted ? "Unmute" : "Mute"}
          onClick={onToggleMute}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M3 9v6h4l5 5V4L7 9H3zm12.5 3L18 9.5 16.9 8.4 14.4 11 12 8.6 10.9 9.7l2.4 2.4-2.4 2.4 1.1 1.1 2.4-2.4 2.5 2.5 1.1-1.1z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
