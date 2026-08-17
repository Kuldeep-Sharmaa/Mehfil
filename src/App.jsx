import { MehfilScene } from "./components/scene/MehfilScene";
import { Clock } from "./components/ui/Clock";
import { MusicPlayer } from "./components/player/MusicPlayer";
import { AmbientParticles } from "./components/ui/AmbientParticles";
import { PresenceIndicator } from "./components/ui/PresenceIndicator";
import { useYouTubePlayer } from "./hooks/useYouTubePlayer";
import { playlist } from "./data/track";
import "./App.css";

function App() {
  const {
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
    togglePlay,
    seek,
    toggleMute,
    nextTrack,
    prevTrack,
  } = useYouTubePlayer(playlist.id);

  return (
    <div className="app">
      <MehfilScene />
      <AmbientParticles />
      <div className="ui-overlay">
        <div className="ui-top-left">
          <Clock />
          <PresenceIndicator />
        </div>
        <div className="ui-bottom">
          <MusicPlayer
            containerRef={containerRef}
            playing={playing}
            isBuffering={isBuffering}
            currentTime={currentTime}
            duration={duration}
            muted={muted}
            videoTitle={videoTitle}
            channelTitle={channelTitle}
            currentVideoId={currentVideoId}
            hasMultipleTracks={hasMultipleTracks}
            onTogglePlay={togglePlay}
            onSeek={seek}
            onToggleMute={toggleMute}
            onNext={nextTrack}
            onPrev={prevTrack}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
