import { useState } from "react";

export function VideoModal({ videoSrc, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    const video = document.getElementById("videoPlayer");
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200" onClick={onClose}>
      <div className="bg-white rounded-lg w-3/4 max-w-lg" onClick={(e) => e.stopPropagation()}>
        <video
          id="videoPlayer"
          className="w-full"
          src={videoSrc}
          onClick={togglePlayPause}
          controls={false}
        ></video>
      </div>
    </div>
  );
}
