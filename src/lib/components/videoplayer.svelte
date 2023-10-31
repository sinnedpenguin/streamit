<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import Artplayer from 'artplayer';
  import Hls from 'hls.js';
  import { options } from '$lib/config/videoplayer';
  import type { Quality, Subtitle } from '$lib/types/videoplayer';

  export let url = '';
  let videoUrl = '';
  let qualityOptions: Quality[] = [];
  let subtitles: Subtitle[] = [];
  let art: Artplayer & { hls?: Hls } | undefined;

  async function fetchVideoData() {
    const response = await fetch(url);
    const data = await response.json();
    qualityOptions = data.sources;
    subtitles = data.subtitles;

    const autoQualityOption = qualityOptions.find((qualityOption) => qualityOption.quality === 'auto');

    videoUrl = autoQualityOption ? autoQualityOption.url : data.sources[0].url;
  }

  function setupHlsPlayer(video: HTMLMediaElement, url: string, art: Artplayer & { hls?: Hls }) {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;
      art.on('destroy', () => hls.destroy());
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    } else {
      art.notice.show = 'Unsupported playback format: m3u8';
    }
  }

  function initializeArtplayer() {
    art = new Artplayer({
      ...options,
      container: '.artplayer-app',
      url: videoUrl,
      type: 'm3u8',
      customType: {
        m3u8: setupHlsPlayer,
      },
      settings: [
        {
          html: 'Quality',
          icon: `<svg viewBox="0 0 24 24" fill="currentColor" className='w-7 h-7'><path d="M14.5 13.5h2v-3h-2M18 14a1 1 0 01-1 1h-.75v1.5h-1.5V15H14a1 1 0 01-1-1v-4a1 1 0 011-1h3a1 1 0 011 1m-7 5H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11m8-5H5c-1.11 0-2 .89-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
          </svg>`,
          selector: qualityOptions.map((qualityOption) => ({
            default: qualityOption.quality === 'auto',
            html: qualityOption.quality,
            url: qualityOption.url,
          })),
          onSelect: (item) => {
            const qualityOption = qualityOptions.find((q) => q.quality === item.html);
            if (qualityOption) {
              art?.switchQuality(item.url);
              return item.html;
            }
          },
        },
        {
          html: 'Subtitle',
          selector: subtitles.map((subtitle) => ({
            html: subtitle.lang,
            url: subtitle.url,
          })),
          onSelect: (item) => {
            const subtitle = subtitles.find((s) => s.lang === item.html);
            if (subtitle) {
              art?.subtitle.switch(item.url);
              return item.html;
            }
          },
        },
      ],
    });

    art.on('subtitleUpdate', (text: string) => {
      if (art && art.template.$subtitle) {
        art.template.$subtitle.innerHTML = text
          .replaceAll('<p>', '')
          .replaceAll('</p>', ' ')
          .replaceAll('&lt;i&gt;', '<i>')
          .replaceAll('&lt;/i&gt;', '</i>')
          .replaceAll('&lt;b&gt;', '<b>')
          .replaceAll('&lt;/b&gt;', '</b>');
      }
    });
  }

  onMount(async () => {
    await fetchVideoData();
    initializeArtplayer();
  });

  onDestroy(() => {
    if (art) {
      art.destroy(false);
    }
  });
</script>

<div class="artplayer-app h-60 sm:h-auto md:h-[50vh] lg:h-[60vh] xl:h-[70vh]"></div>