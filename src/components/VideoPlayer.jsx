import React, { useEffect, useRef } from 'react';
import {isSafari} from 'react-device-detect';

const SimpleBitmovinPlayer = ({ movieURL, urlAddon, subtitles, thumbnail }) => {
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
                  request.withCredentials = true;
                  request.url += urlAddon;
              return Promise.resolve(request);
            }
          }
        };

        // Create the player instance
        const player = new window.bitmovin.player.Player(playerRef.current, config);

        // Load the source
        const source = {
          dash: !isSafari ? movieURL.dash : null, // DASH URL
          hls: isSafari ? movieURL.hls : null, // HLS URL
          poster: thumbnail,
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
