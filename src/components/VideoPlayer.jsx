import React, { useEffect, useRef } from 'react';
import { isSafari, isChrome, isAndroid, isIOS, isMacOs } from 'react-device-detect';

const SimpleBitmovinPlayer = ({ movieURL, urlAddon, subtitles, thumbnail, shouldAutoplay }) => {
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
            level: 'none',
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
              certificateURL: 'https://portal.axinom.com/api/testing-certificates/e40ff278-e8d5-4f31-99b2-336908907f62_a9f81500-f1d7-45fb-a0a4-b28a012597cd.cer',
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
  
        const player = new window.bitmovin.player.Player(playerRef.current, config);
        const subtitle = subtitles ? { url: subtitles, kind: 'subtitles', label: 'English', lang: 'en', id: "sub1" } : undefined
  
        const loadSourceWithFallback = async (primarySource, fallbackSource) => {
          try {
            await player.load(primarySource);
          } catch (error) {
            if (fallbackSource) {
              await player.load(fallbackSource);
            } else {
            }
          }
          player.subtitles.add(subtitle)
        };
  
        const primarySource = createSource(movieURL.dash, movieURL.hls);
        const fallbackSource = createSource(movieURL.dash, movieURL.hls);
  
        await loadSourceWithFallback(primarySource, fallbackSource);
  
        if (shouldAutoplay && player) {
          try {
            player.play();
          } catch (e) {}
        }

        return () => {
          if (player) {
            player.destroy();
          }
        };
      } catch (error) {
        // console.error('Error setting up Bitmovin Player:', error);
      }
    };

    loadPlayer();
  }, [movieURL, urlAddon, subtitles, thumbnail, shouldAutoplay]);

  return (
    <div className="relative w-full max-h-[65vh]">
      <div
        ref={playerRef}
        className="absolute top-0 left-0 w-full max-h-[65vh]"
      ></div>
    </div>
  );
};

export default SimpleBitmovinPlayer;
