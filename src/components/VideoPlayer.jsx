import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';
import axios from 'axios';
import Cookies from 'js-cookie';

const VideoPlayer = ({ movieURL, subtitles, thumbnail, cookies }) => {

  const videoNode = useRef(null);
  const player = useRef(null);

  useEffect(() => {
    videojs.options.autoSetup = false;
    const url = movieURL.replace('d3tou2oin9ei82.cloudfront.net', 'vod.balticshorts.com');


    // Setup the player
    if (url !== '') {
      // Setup the player
      const videoJsOptions = {
        autoplay: false,
        preload: "auto",
        controls: true,
        poster: thumbnail,
        sources: [
          {
            src: url,
            type: "application/x-mpegURL"
            
          }
        ],
        tracks: [{src: subtitles, kind:'captions', srclang: 'en', label: 'English'}]
      };
    

      player.current = videojs(videoNode.current, videoJsOptions, function onPlayerReady() {
        // console.log('Player is ready');
        // console.log(videoNode.current)
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
    <div className='top-10'>
      <video id='video-player' ref={videoNode} className="video-js vjs-default-skin w-full h-[80vh] object-fill" />
    </div>
  );
};

export const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);

export default VideoPlayer;