import React, { useEffect } from "react";
import "bitmovin-player/bitmovinplayer-ui.css";
import { BitmovinPlayer } from "bitmovin-player-react";

const SimpleBitmovinPlayer = ({ movieURL, urlAddon, subtitles, thumbnail }) => {
  useEffect(() => {
    if (!movieURL || (!movieURL.dash && !movieURL.hls)) {
      console.error("Missing movieURL or its properties (dash/hls).", { movieURL });
      return;
    }
  }, [movieURL]);

  const playerConfig = {
    key: "43d906bf-4318-4a73-9465-177331135a1d",
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
      level: "debug", // Enable verbose logging
    },
    tweaks: {
      native_hls_parsing: false,
    },
    adaptation: {
      desktop: {
        preload: false,
      },
      mobile: {
        preload: false,
      },
    },
  };

  const sourceConfig = {
    dash: movieURL?.dash,
    // hls: 'https://bitmovin-a.akamaihd.net/content/dataset/multi-codec/hevc/stream_fmp4.m3u8',
    hls: movieURL?.hls,
    poster: thumbnail,
    drm: {
      widevine: {
        LA_URL: "https://e40ff278.drm-widevine-licensing.axprod.net/AcquireLicense",
        headers: {
          "X-AxDRM-Message": urlAddon,
        },
      },
      fairplay: {
        LA_URL: "https://e40ff278.drm-fairplay-licensing.axprod.net/AcquireLicense",
        certificateURL: "https://vtb.axinom.com/FPScert/fairplay.cer",
        headers: {
          "X-AxDRM-Message": urlAddon,
        },
        prepareContentId: (uri) => {
          console.log("FairPlay prepareContentId called with URI:", uri);
          return uri.substring(uri.indexOf("skd"));
        },
        prepareLicenseAsync: (ckc) => {
          console.log("FairPlay prepareLicenseAsync called with CKC:", ckc);
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("loadend", () => {
              console.log("FairPlay CKC processing complete.");
              resolve(new Uint8Array(reader.result));
            });
            reader.addEventListener("error", (error) => {
              console.error("FairPlay CKC processing failed:", error);
              reject(error);
            });
            reader.readAsArrayBuffer(ckc);
          });
        },
        prepareMessage: (event) => {
          console.log("FairPlay prepareMessage called with event:", event);
          return new Blob([event.message], { type: "application/octet-binary" });
        },
        useUint16InitData: true,
        licenseResponseType: "blob",
      },
    },
    subtitle: subtitles
      ? {
          url: subtitles,
          kind: "subtitles",
          label: "English",
          srclang: "en",
        }
      : undefined,
  };

  return (
    <div className="relative w-full max-h-[80vh]">
      <div className="absolute top-0 left-0 w-full max-h-[80vh] video">
        <BitmovinPlayer
          config={playerConfig}
          source={sourceConfig}          
        />
      </div>
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

