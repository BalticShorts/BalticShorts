import React, { useEffect, useRef } from 'react';
import { isSafari, isChrome, isAndroid, isIOS, isMacOs } from 'react-device-detect';

const SimpleBitmovinPlayer = ({ movieURL, urlAddon, subtitles, thumbnail }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const loadPlayer = async () => {

      // if (!movieURL || (!movieURL.dash && !movieURL.hls)) {
      //   console.error('Missing movieURL or its properties (dash/hls).', { movieURL });
      //   return;
      // }

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

        const config = {
          key: '0049f29f-17e2-4bea-b372-f28a42205046',
          analyticsConfig: {
            key: '6c55b090-eb7f-4eb1-b593-114f5d88a197',
            randomizeUserId: false,
            adTrackingDisabled: false,
          },
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
            level: 'debug',
          },
          tweaks: {
            native_hls_parsing: false
          },
          adaptation: {
            desktop: {
              preload: true
            },
            mobile: {
              preload: false
            }
          },
        };

        const createSource = (dash, hls) => ({
          dash,
          hls,
          poster: thumbnail,
          drm: {
            widevine: {
              LA_URL: 'https://e40ff278.drm-widevine-licensing.axprod.net/AcquireLicense',
              headers: { 'X-AxDRM-Message': urlAddon },
            },
            fairplay: {
              LA_URL: 'https://e40ff278.drm-fairplay-licensing.axprod.net/AcquireLicense',
              // certificateURL: 'https://portal.axinom.com/api/testing-certificates/e40ff278-e8d5-4f31-99b2-336908907f62_a9f81500-f1d7-45fb-a0a4-b28a012597cd.cer',
              certificateURL: 'https://vtb.axinom.com/FPScert/fairplay.cer',
              headers: {
                'X-AxDRM-Message': urlAddon,
              },
              getContentId: function (emeOptions, initData) {
                return String.fromCharCode(...new Uint8Array(initData)).replace(/^.*:\/\//, '');
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
        });
  
        console.log('Creating Bitmovin Player instance...');
        const player = new window.bitmovin.player.Player(playerRef.current, config);
        const subtitle = subtitles ? { url: subtitles, kind: 'subtitles', label: 'English', lang: 'en', id: "sub1" } : undefined
  
        const loadSourceWithFallback = async (primarySource, fallbackSource) => {
          try {
            console.log('Attempting to load primary source...');
            await player.load(primarySource);
            console.log('Primary source loaded successfully.');
          } catch (error) {
            console.error('Error loading primary source:', error);
            if (fallbackSource) {
              console.log('Attempting to load fallback source...');
              await player.load(fallbackSource);
              console.log('Fallback source loaded successfully.');
            } else {
              console.error('No fallback source provided.');
            }
          }
          player.subtitles.add(subtitle)
        };
  
        // const primarySource = createSource(movieURL.dash, movieURL.cmafHls);
        // const fallbackSource = createSource(
        //   movieURL.cmafDash,
        //   movieURL.hls
        // );
        // var hlsUrl = isSafari ? movieURL.hls : movieURL.hls
        // var hlsUrl = 'https://drmexample.s3.eu-north-1.amazonaws.com/t_1_11/cmaf/1736621800121.m3u8'
        const primarySource = createSource(movieURL.dash, movieURL.hls);
        const fallbackSource = createSource(movieURL.dash, movieURL.hls);
  
        await loadSourceWithFallback(primarySource, fallbackSource);
  
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

// export const isVideoPlaying = (video) =>
//   !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
