<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import Artplayer from 'artplayer';
  import Hls from 'hls.js';
  import { options } from '$lib/config/videoplayer';
  import type { Quality, Subtitle } from '$lib/types/videoplayer';

  export let url = '';
  let videoUrl = '';
  let qualityOptions: Quality[];
  let subtitles: Subtitle[];

  let art: Artplayer & { hls?: Hls } | undefined; 

  async function fetchVideoUrl() {
    const response = await fetch(url);
    const data = await response.json();
    qualityOptions = data.sources;
    subtitles = data.subtitles;

    const autoQualityOption = qualityOptions.find((qualityOption) => qualityOption.quality === 'auto');

    if (autoQualityOption) {
      videoUrl = autoQualityOption.url;
    } else {
      videoUrl = data.sources[0].url;
    }
  }

  function playM3u8(video: HTMLMediaElement, url: string, art: Artplayer & { hls?: Hls }) {
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

  onMount(async () => {
    await fetchVideoUrl();
    art = new Artplayer({
      ...options,
      container: '.artplayer-app',
      url: videoUrl,
      type: 'm3u8',
      customType: {
        m3u8: playM3u8,
      },
      settings: [
        {
          html: 'Quality',
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
            default: subtitle.lang === 'English',
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
    const englishSubtitle = subtitles.find((s) => s.lang === 'English');
    if (englishSubtitle) {
      art?.subtitle.switch(englishSubtitle.url);
    }
  });

  onDestroy(() => {
    if (art) {
      art.destroy(false);
    }
  });
</script>

<div class="artplayer-app h-60 sm:h-auto md:h-[50vh] lg:h-[60vh] xl:h-[70vh]"></div>