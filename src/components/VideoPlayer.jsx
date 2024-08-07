import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';
import axios from 'axios';
import Cookies from 'js-cookie';

export const isVideoPlaying = video =>
  !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);

const VideoPlayer = ({ movieURL, subtitles, thumbnail, cookies }) => {
  const videoNode = useRef(null);
  const player = useRef(null);

  useEffect(() => {
    videojs.options.autoSetup = false;
    const cookieHeader = Object.keys(cookies).map(key => `${key}=${cookies[key]}`).join('; ');
    // console.log(cookieHeader);

    // const setCookies = (cookies) => {
    //   for (const [name, value] of Object.entries(cookies)) {
    //     console.log(name, value);
    //     Cookies.set(name, value, { path: '/', domain: '.balticshorts.com', secure: true, sameSite: 'Lax' });
    //   }
    // };
    // setCookies(cookies);


    // Create an axios instance with custom headers
    const axiosInstance = axios.create({
      headers: {
        'x-custom-info': cookieHeader
      },
      withCredentials: true
    });

    const fetchManifest = async () => {
      try {
        const response = await axiosInstance.get(movieURL);

        if (response.status !== 200) {
          throw new Error('Failed to fetch HLS manifest');
        }

        return response.data; // Assuming response is text content of HLS manifest
      } catch (error) {
        console.error('Error fetching HLS manifest:', error);
        return null;
      }
    };

    const initializePlayer = async () => {
      const manifestContent = await fetchManifest();

      if (!manifestContent) {
        console.error('Failed to fetch HLS manifest');
        return;
      }

      const videoJsOptions = {
        autoplay: false,
        preload: 'auto',
        controls: true,
        poster: thumbnail,
        sources: [
          {
            src: URL.createObjectURL(new Blob([manifestContent], { type: 'application/vnd.apple.mpegurl' })),
            type: 'application/x-mpegURL',
          },
        ],
        tracks: [
          {
            src: subtitles,
            kind: 'captions',
            srclang: 'en',
            label: 'English',
          },
        ],
      };

      player.current = videojs(videoNode.current, videoJsOptions, function onPlayerReady() {
        console.log('Player is ready');
        this.qualityLevels();
        this.hlsQualitySelector({ displayCurrentQuality: true });

        this.on('error', (error) => {
          console.error('VideoJS Error:', error);
        });
      });
    };

    initializePlayer();

    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [movieURL, subtitles, thumbnail, cookies]);

  return (
    <div className='top-10'>
      <video
        id='video-player'
        ref={videoNode}
        className='video-js vjs-default-skin w-full h-[80vh] object-fill'
      />
    </div>
  );
};

export default VideoPlayer;
