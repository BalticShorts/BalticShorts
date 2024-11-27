import React, { useEffect, useState } from "react";
import "bitmovin-player/bitmovinplayer-ui.css";
import { BitmovinPlayer } from "bitmovin-player-react";

const SimpleBitmovinPlayer = ({ movieURL, urlAddon, subtitles, thumbnail }) => {
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    if (!movieURL || (!movieURL.dash && !movieURL.hls)) {
      console.error("Missing movieURL or its properties (dash/hls).", { movieURL });
      return;
    }
    if (!urlAddon) {
      console.error("Missing urlAddon or its properties (dash/hls).", { urlAddon });
      return;
    }
    setIsVideoReady(true);  // Set to true when URLs are valid
  }, [movieURL, urlAddon]);

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
        preload: true,
      },
      mobile: {
        preload: true,
      },
    },
  };
  // const add = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJ2ZXJzaW9uIjogMSwKICAiY29tX2tleV9pZCI6ICI2OWU1NDA4OC1lOWUwLTQ1MzAtOGMxYS0xZWI2ZGNkMGQxNGUiLAogICJtZXNzYWdlIjogewogICAgInR5cGUiOiAiZW50aXRsZW1lbnRfbWVzc2FnZSIsCiAgICAidmVyc2lvbiI6IDIsCiAgICAibGljZW5zZSI6IHsKICAgICAgImFsbG93X3BlcnNpc3RlbmNlIjogdHJ1ZQogICAgfSwKICAgICJjb250ZW50X2tleXNfc291cmNlIjogewogICAgICAiaW5saW5lIjogWwogICAgICAgIHsKICAgICAgICAgICJpZCI6ICI5ZmQzODVkNS1mMzg5LTQ4YjUtYjdjMy1iMTg2M2VlMTA4ODgiLAogICAgICAgICAgImVuY3J5cHRlZF9rZXkiOiAiS3ZhaytZZVF1NGU2QnRvcEQ2Wm1JUT09IiwKICAgICAgICAgICJ1c2FnZV9wb2xpY3kiOiAiUG9saWN5IEEiCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgImNvbnRlbnRfa2V5X3VzYWdlX3BvbGljaWVzIjogWwogICAgICB7CiAgICAgICAgIm5hbWUiOiAiUG9saWN5IEEiLAogICAgICAgICJwbGF5cmVhZHkiOiB7CiAgICAgICAgICAibWluX2RldmljZV9zZWN1cml0eV9sZXZlbCI6IDE1MCwKICAgICAgICAgICJwbGF5X2VuYWJsZXJzIjogWwogICAgICAgICAgICAiNzg2NjI3RDgtQzJBNi00NEJFLThGODgtMDhBRTI1NUIwMUE3IgogICAgICAgICAgXQogICAgICAgIH0KICAgICAgfQogICAgXQogIH0KfQ.CNEEm6UhOFiXadbcxQrs64NEb9ys7YdPZ7TmTO8aTbg'
  // const add = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJ2ZXJzaW9uIjogMSwKICAiY29tX2tleV9pZCI6ICI2OWU1NDA4OC1lOWUwLTQ1MzAtOGMxYS0xZWI2ZGNkMGQxNGUiLAogICJtZXNzYWdlIjogewogICAgInR5cGUiOiAiZW50aXRsZW1lbnRfbWVzc2FnZSIsCiAgICAidmVyc2lvbiI6IDIsCiAgICAibGljZW5zZSI6IHsKICAgICAgImFsbG93X3BlcnNpc3RlbmNlIjogdHJ1ZQogICAgfSwKICAgICJjb250ZW50X2tleXNfc291cmNlIjogewogICAgICAiaW5saW5lIjogWwogICAgICAgIHsKICAgICAgICAgICJpZCI6ICI1M2RjM2VhYS01MTY0LTQxMGEtOGY0ZS1lMTUxMTNiNDMwNDAiLAogICAgICAgICAgImVuY3J5cHRlZF9rZXkiOiAiSk00UnNXR0M5dVpjd1llRk5NakNPdz09IiwKICAgICAgICAgICJ1c2FnZV9wb2xpY3kiOiAiUG9saWN5IEEiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAiaWQiOiAiOWRiYWNlOWUtNDEwMy00YzUyLTk2YWEtNjMyMjdkYzVmNzczIiwKICAgICAgICAgICJlbmNyeXB0ZWRfa2V5IjogInliTUNkUkRnamgvR215cG9mTVdDa3c9PSIsCiAgICAgICAgICAidXNhZ2VfcG9saWN5IjogIlBvbGljeSBBIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgImlkIjogImE3NmYwY2E2LThlN2QtNDBkMC04YTM3LTkwNmYzZTI0ZGRlMiIsCiAgICAgICAgICAiZW5jcnlwdGVkX2tleSI6ICJTTnlTSFlEZ3MzYkJtamhPTlh5SmRBPT0iLAogICAgICAgICAgInVzYWdlX3BvbGljeSI6ICJQb2xpY3kgQSIKICAgICAgICB9CiAgICAgIF0KICAgIH0sCiAgICAiY29udGVudF9rZXlfdXNhZ2VfcG9saWNpZXMiOiBbCiAgICAgIHsKICAgICAgICAibmFtZSI6ICJQb2xpY3kgQSIsCiAgICAgICAgInBsYXlyZWFkeSI6IHsKICAgICAgICAgICJtaW5fZGV2aWNlX3NlY3VyaXR5X2xldmVsIjogMTUwLAogICAgICAgICAgInBsYXlfZW5hYmxlcnMiOiBbCiAgICAgICAgICAgICI3ODY2MjdEOC1DMkE2LTQ0QkUtOEY4OC0wOEFFMjU1QjAxQTciCiAgICAgICAgICBdCiAgICAgICAgfQogICAgICB9CiAgICBdCiAgfQp9.SSRguglJk2l3VahbSq8N5O4Qhxv78n2gSL5Za8HZJmk'
  // const add = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJ2ZXJzaW9uIjogMSwKICAiY29tX2tleV9pZCI6ICI2OWU1NDA4OC1lOWUwLTQ1MzAtOGMxYS0xZWI2ZGNkMGQxNGUiLAogICJtZXNzYWdlIjogewogICAgInR5cGUiOiAiZW50aXRsZW1lbnRfbWVzc2FnZSIsCiAgICAidmVyc2lvbiI6IDIsCiAgICAibGljZW5zZSI6IHsKICAgICAgImFsbG93X3BlcnNpc3RlbmNlIjogdHJ1ZQogICAgfSwKICAgICJjb250ZW50X2tleXNfc291cmNlIjogewogICAgICAiaW5saW5lIjogWwogICAgICAgIHsKICAgICAgICAgICJpZCI6ICJhYmNjNDRlNS1jMTIyLTQ1YWItYWM4MC1hNWIzNTIyYTBhMzEiLAogICAgICAgICAgImVuY3J5cHRlZF9rZXkiOiAiZnM2VUx1UzR3SFQxdkI2M0RONnI5UT09IiwKICAgICAgICAgICJ1c2FnZV9wb2xpY3kiOiAiUG9saWN5IEEiCiAgICAgICAgfQogICAgICBdCiAgICB9LAogICAgImNvbnRlbnRfa2V5X3VzYWdlX3BvbGljaWVzIjogWwogICAgICB7CiAgICAgICAgIm5hbWUiOiAiUG9saWN5IEEiLAogICAgICAgICJwbGF5cmVhZHkiOiB7CiAgICAgICAgICAibWluX2RldmljZV9zZWN1cml0eV9sZXZlbCI6IDE1MCwKICAgICAgICAgICJwbGF5X2VuYWJsZXJzIjogWwogICAgICAgICAgICAiNzg2NjI3RDgtQzJBNi00NEJFLThGODgtMDhBRTI1NUIwMUE3IgogICAgICAgICAgXQogICAgICAgIH0KICAgICAgfQogICAgXQogIH0KfQ.5rM_qUo4dKrHNDKQO0yzbCiufJxFUzHeOQc13Z48rv4'
      // hls: 'https://vod.balticshorts.com/clear_cmaf_1080p_h265/manifest.m3u8',
    // hls: 'https://vod.balticshorts.com/protected_cmaf_1080p_h265_multikey/manifest.m3u8',
    // hls: 'https://vod.balticshorts.com/protected_hls_1080p_h265_singlekey/manifest.m3u8',
    // hls: 'https://vod.balticshorts.com/t/1732741810769.m3u8',
  const sourceConfig = {
    dash: movieURL?.dash,
    hls: movieURL?.cmafHls,
    poster: thumbnail,
    drm: {
      widevine: {
        LA_URL: "https://e40ff278.drm-widevine-licensing.axprod.net/AcquireLicense",
        headers: {
          "X-AxDRM-Message": urlAddon,
        },
        withCredentials: true,
      },
      fairplay: {
        LA_URL: "https://e40ff278.drm-fairplay-licensing.axprod.net/AcquireLicense",
        certificateURL: "https://vtb.axinom.com/FPScert/fairplay.cer",
        headers: {
          "X-AxDRM-Message": urlAddon,
        },
        withCredentials: true,
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
      {isVideoReady &&
        <div className="absolute top-0 left-0 w-full max-h-[80vh] video">
          <BitmovinPlayer
            config={playerConfig}
            source={sourceConfig}          
          />
        </div>
      }
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

