import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useYouTubePlayer - Wraps the official YouTube IFrame Player API.
 */
export function useYouTubePlayer(playlistId) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const pollRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMutedState] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [channelTitle, setChannelTitle] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState("");
  const [playlistLength, setPlaylistLength] = useState(0);

  // Load the IFrame API script once, idempotently.
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]',
    );

    if (!existingScript) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousCallback === "function") previousCallback();
      initPlayer();
    };

    return () => {
      stopPolling();
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistId]);

  function initPlayer() {
    if (!containerRef.current || playerRef.current || !playlistId) return;

    playerRef.current = new window.YT.Player(containerRef.current, {
      width: "200",
      height: "200",
      playerVars: {
        listType: "playlist",
        list: playlistId,
        controls: 0,
        rel: 0,
      },
      events: {
        onReady: (event) => {
          setIsReady(true);
          setDuration(event.target.getDuration());
          readVideoData(event.target);
          readPlaylistInfo(event.target);
        },
        onStateChange: (event) => {
          const YT = window.YT.PlayerState;
          const isPlaying = event.data === YT.PLAYING;
          setPlaying(isPlaying);
          setIsBuffering(event.data === YT.BUFFERING);

          if (isPlaying) {
            startPolling();
            readVideoData(event.target);
            readPlaylistInfo(event.target);
          } else {
            stopPolling();
          }
        },
      },
    });
  }

  function readVideoData(player) {
    const data = player.getVideoData ? player.getVideoData() : null;
    setVideoTitle(data?.title || "");
    setChannelTitle(data?.author || "");
    // Powers the thumbnail URL (img.youtube.com/vi/<id>/hqdefault.jpg),
    // no API key needed.
    setCurrentVideoId(data?.video_id || "");
  }

  function readPlaylistInfo(player) {
    const list = player.getPlaylist ? player.getPlaylist() : null;
    setPlaylistLength(Array.isArray(list) ? list.length : 0);
  }

  function startPolling() {
    stopPolling();
    pollRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime());
        setDuration(playerRef.current.getDuration());
      }
    }, 250);
  }

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [playing]);

  const seek = useCallback((time) => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(time, true);
    setCurrentTime(time);
  }, []);

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    if (muted) {
      playerRef.current.unMute();
      setMutedState(false);
    } else {
      playerRef.current.mute();
      setMutedState(true);
    }
  }, [muted]);

  // Native playlist navigation — the IFrame API tracks position
  // within the playlist itself, no manual index bookkeeping needed.
  const nextTrack = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.nextVideo();
    setCurrentTime(0);
  }, []);

  const prevTrack = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.previousVideo();
    setCurrentTime(0);
  }, []);

  return {
    containerRef,
    isReady,
    playing,
    isBuffering,
    currentTime,
    duration,
    muted,
    videoTitle,
    channelTitle,
    currentVideoId,
    hasMultipleTracks: playlistLength > 1,
    togglePlay,
    seek,
    toggleMute,
    nextTrack,
    prevTrack,
  };
}
