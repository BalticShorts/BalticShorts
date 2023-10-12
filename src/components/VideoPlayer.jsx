import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';

const VideoPlayer = ({ movieURL }) => {

  const videoNode = useRef(null);
  const player = useRef(null);

  useEffect(() => {
    // Make sure videojs does not initialize automatically
    // maybe need to comment out
    videojs.options.autoSetup = false;

    // Setup the player
    if (movieURL !== '') {
      // Setup the player
      const videoJsOptions = {
        autoplay: false,
        preload: "auto",
        controls: true,
        poster: "",
        sources: [
          {
            src: movieURL,
            type: "application/x-mpegURL"
          }
        ]
      };
    

      player.current = videojs(videoNode.current, videoJsOptions, function onPlayerReady() {
        console.log('Player is ready');
        console.log(videoNode.current)
        this.qualityLevels();
        this.hlsQualitySelector({ displayCurrentQuality: true });
      });
    }
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };

  }, [movieURL]);

  return (
    <div >
      <video id='video-player' ref={videoNode} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;
