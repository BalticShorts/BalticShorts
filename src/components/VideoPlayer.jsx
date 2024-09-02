// import React, { useEffect, useRef } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import 'videojs-contrib-quality-levels';
// import 'videojs-hls-quality-selector';
// import 'videojs-contrib-dash';
// import {isSafari} from 'react-device-detect';

// const VideoPlayer = ({ movieURL, subtitles, thumbnail }) => {

//   const videoNode = useRef(null);
//   const player = useRef(null);

//   useEffect(() => {
//     videojs.options.autoSetup = false;

//     if (movieURL !== '' && movieURL !== undefined) {
//       const videoJsOptions = {
//         autoplay: false,
//         preload: "auto",
//         controls: true,
//         poster: thumbnail,
//         sources: [
//           {
//             src: movieURL,
//             type: isSafari ? "application/x-mpegURL" : "application/dash+xml"  
//           }
//         ],
//         tracks: [{src: subtitles, kind:'captions', srclang: 'en', label: 'English'}],
//         html5: {
//           vhs: {
//             withCredentials: true,
//             overrideNative: true
//           }
//         }
//       };
//       if(!isSafari){
//         videojs.Html5DashJS.hook('beforeinitialize', function(player, media_player) {
//           function loader() {
//             var load = this.parent.load
//             return {
//               load: function(req) {
//                 req.withCredentials = true
//                 load(req)
//             }}
//           }
//           media_player.extend('XHRLoader', loader, true)
//           media_player.setXHRWithCredentialsForType('GET',true)
//           media_player.setXHRWithCredentialsForType('MPD',true)
//           media_player.setXHRWithCredentialsForType('MediaSegment',true)
//           media_player.setXHRWithCredentialsForType('InitializationSegment',true)
//           media_player.setXHRWithCredentialsForType('IndexSegment',true)
//           media_player.setXHRWithCredentialsForType('other',true)
//         })
//       }

//       player.current = videojs(videoNode.current, videoJsOptions, function onPlayerReady() {
//         this.qualityLevels();
//         this.hlsQualitySelector({ displayCurrentQuality: true });
//       });
//     }
//     return () => {
//       if (player.current) {
//         player.current.dispose();
//       }
//     };

//   }, [movieURL]);

//   return (
//     <div className='top-10'>
//       <video id='video-player' ref={videoNode} className="video-js vjs-default-skin w-full h-[80vh] object-fill" />
//     </div>
//   );
// };


// export default VideoPlayer;


import React, { useEffect, useRef } from 'react';

const SimpleBitmovinPlayer = ({ movieURL, subtitles, thumbnail }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const loadPlayer = async () => {
      try {
        // Dynamically import the Bitmovin Player script
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.bitmovin.com/player/web/8/bitmovinplayer.js';
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });

        // Ensure Bitmovin Player script has loaded
        if (!window.bitmovin || !window.bitmovin.player) {
          throw new Error('Bitmovin Player library not loaded');
        }

        // Configure the player
        const config = {
          key: '6b174f8e-e685-43f0-9e76-fee7d8ec1260',
          ui: {
            playbackSpeedSelector: true,
            qualitySelector: true,
            fullscreen: true,
          },
          playback: {
            muted: false,
            autoplay: false,
          },
          network: {
            preprocessHttpRequest: function(type, request) {
              console.log(type)
              //  if (type === bitmovin.player.HttpRequestType.MEDIA_VIDEO ||
                // type === bitmovin.player.HttpRequestType.MEDIA_AUDIO) {
                  request.withCredentials = true;
                  request.url += '?token='
                  console.log(request)
                  // return request;
              // }
              return Promise.resolve(request);
            }
          }
        };

        // Create the player instance
        const player = new window.bitmovin.player.Player(playerRef.current, config);

        // Load the source
        const source = {
          dash: movieURL.dash, // DASH URL
          hls: movieURL.hls, // HLS URL
          poster: thumbnail, // Poster image
          subtitle: subtitles ? {
            url: subtitles,
            kind: 'subtitles',
            label: 'English',
            srclang: 'en'
          } : undefined,
          options: {
            withCredentials: true,
            manifestWithCredentials: true,
            hlsWithCredentials: true,
            dashWithCredentials: true,
          },
        };

        player.load(source).then(() => {
          console.log('Successfully loaded source');
        }).catch((error) => {
          console.error('Error loading source:', error);
        });

        // Clean up on unmount
        return () => {
          if (player) {
            player.destroy();
          }
        };
      } catch (error) {
        console.error('Error setting up Bitmovin Player:', error);
      }
    };

    loadPlayer();
  }, [movieURL, subtitles, thumbnail]); // Add dependencies to reinitialize player on prop changes

  return (
    <div className="relative w-full max-h-[80vh]">
      <div
        ref={playerRef}
        className="absolute top-0 left-0 w-full max-h-[80vh]"
      ></div>
    </div>
  );
};

export default SimpleBitmovinPlayer;
export const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
