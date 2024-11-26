import React, { useEffect, useRef } from 'react';
import { isSafari, isChrome, isAndroid, isIOS, isMacOs } from 'react-device-detect';

const SimpleBitmovinPlayer = ({ movieURL, urlAddon, subtitles, thumbnail }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const loadPlayer = async () => {
      // const keyValuePairs = urlAddon.substring(1).split("&");
      const params = {};
      // keyValuePairs.forEach(pair => {
      //     const [key, value] = pair.split("=");
      //     params[key] = decodeURIComponent(value);
      // });
      console.log(urlAddon)

      if (!movieURL || (!movieURL.dash && !movieURL.hls)) {
        console.error('Missing movieURL or its properties (dash/hls).', { movieURL });
        return;
      }

      try {
        // Dynamically import the Bitmovin Player script
        console.log('Loading Bitmovin Player script...');
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.bitmovin.com/player/web/8/bitmovinplayer.js';
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
        console.log('Bitmovin Player script loaded successfully.');

        // Ensure Bitmovin Player script has loaded
        if (!window.bitmovin || !window.bitmovin.player) {
          throw new Error('Bitmovin Player library not loaded.');
        }

        // Configure the player
        const config = {
          key: '43d906bf-4318-4a73-9465-177331135a1d',
          ui: {
            playbackSpeedSelector: true,
            qualitySelector: true,
            fullscreen: true,
          },
          playback: {
            muted: false,
            autoplay: false,
          },
          logs: {
            level: 'debug', // Enable verbose logging
          },
          tweaks: {
            native_hls_parsing: true
          },
          adaptation: {
            desktop: {
              preload: false
            },
            mobile: {
              preload: false
            }
          },
        };

        console.log('Player configuration:', config);

        // Create the player instance
        console.log('Creating Bitmovin Player instance...');
        const player = new window.bitmovin.player.Player(playerRef.current, config);

        // Prepare the source
        console.log('Preparing source for Bitmovin Player...');
                // Load the source
          // ...((!isSafari || !isIOS || !isMacOs) ? { dash: movieURL.dash } : {}),
        // 
        console.log(movieURL)

        const source = {
          dash: movieURL.dash,
          hls: movieURL.hls,
          poster: thumbnail,
          drm: {
            widevine: {
              LA_URL: 'https://e40ff278.drm-widevine-licensing.axprod.net/AcquireLicense',
              headers: { 'X-AxDRM-Message': urlAddon },
            },
            fairplay: {
              LA_URL: 'https://e40ff278.drm-fairplay-licensing.axprod.net/AcquireLicense',
              certificateURL: 'https://vtb.axinom.com/FPScert/fairplay.cer',
              headers: {
                'X-AxDRM-Message': urlAddon,
              },
              prepareContentId: (uri) => {
                console.log('FairPlay prepareContentId called with URI:', uri);
                return uri.substring(uri.indexOf('skd'));
              },
              prepareLicenseAsync: (ckc) => {
                console.log('FairPlay prepareLicenseAsync called with CKC:', ckc);
                return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.addEventListener('loadend', () => {
                    console.log('FairPlay CKC processing complete.');
                    resolve(new Uint8Array(reader.result));
                  });
                  reader.addEventListener('error', (error) => {
                    console.error('FairPlay CKC processing failed:', error);
                    reject(error);
                  });
                  reader.readAsArrayBuffer(ckc);
                });
              },
              prepareMessage: (event) => {
                console.log('FairPlay prepareMessage called with event:', event);
                return new Blob([event.message], { type: 'application/octet-binary' });
              },
              useUint16InitData: true,
              licenseResponseType: 'blob',
            },
          },
          subtitle: subtitles
            ? {
                url: subtitles,
                kind: 'subtitles',
                label: 'English',
                srclang: 'en',
              }
            : undefined,
        };

        console.log('Source configuration:', source);

        // Load the source
        player.load(source)
          .then(() => {
            console.log('Successfully loaded source.');
          })
          .catch((error) => {
            console.error('Error loading source:', error);
          });

        // Clean up on unmount
        return () => {
          if (player) {
            console.log('Destroying Bitmovin Player instance...');
            player.destroy();
          }
        };
      } catch (error) {
        console.error('Error setting up Bitmovin Player:', error);
      }
    };

    loadPlayer();
  }, [movieURL, urlAddon, subtitles, thumbnail]);

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

export const isVideoPlaying = (video) =>
  !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);



// options: {
//   withCredentials: true,
//   manifestWithCredentials: true,
//   hlsWithCredentials: true,
//   dashWithCredentials: true,
// },
// network: {
//   preprocessHttpRequest: function(type, request) {
//         request.withCredentials = true;
//         request.url += urlAddon;
//     return Promise.resolve(request);
//   }
// },
// tweaks: {
//   native_hls_parsing: false,
//   query_parameters :{
//     'Policy' : params.Policy,
//     'Signature' : params.Signature,
//     'Key-Pair-Id' : params['Key-Pair-Id']
//   },
// }
// network: {
//   preprocessHttpRequest: function (requestType, requestConfig) {
//       requestConfig.url = requestConfig.url + "?AxDrmMessage="+urlAddon;
//   }
// },

