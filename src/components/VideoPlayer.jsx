import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';
import 'videojs-contrib-dash';

const VideoPlayer = ({ movieURL, subtitles, thumbnail }) => {

  const videoNode = useRef(null);
  const player = useRef(null);

  useEffect(() => {
    videojs.options.autoSetup = false;

    if (movieURL !== '' && movieURL !== undefined) {
      const videoJsOptions = {
        autoplay: false,
        preload: "auto",
        controls: true,
        poster: thumbnail,
        sources: [
          {
            src: movieURL,
            type: "application/dash+xml"  
          }
        ],
        tracks: [{src: subtitles, kind:'captions', srclang: 'en', label: 'English'}],
        html5: {
          vhs: {
            withCredentials: true,
            overrideNative: true
          },
          dash: {
            withCredentials: true,
            overrideNative: true
          }
        }
      };
    
      videojs.Html5DashJS.hook('beforeinitialize', function(player, media_player) {
        console.log('beforeinitialize') 
        function loader() {
          var load = this.parent.load
          return {
            load: function(req) {
              req.withCredentials = true
              load(req)
          }}
        }
        media_player.extend('XHRLoader', loader, true)
        media_player.setXHRWithCredentialsForType('GET',true)
        media_player.setXHRWithCredentialsForType('MPD',true)
        media_player.setXHRWithCredentialsForType('MediaSegment',true)
        media_player.setXHRWithCredentialsForType('InitializationSegment',true)
        media_player.setXHRWithCredentialsForType('IndexSegment',true)
        media_player.setXHRWithCredentialsForType('other',true)
      })

      player.current = videojs(videoNode.current, videoJsOptions, function onPlayerReady() {
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