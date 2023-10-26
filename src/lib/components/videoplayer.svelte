<script lang="ts">
  import { onMount } from 'svelte';
  import Artplayer from 'artplayer';
  import Hls from 'hls.js';

  export let url = '';
  let videoUrl = '';

  async function fetchVideoUrl() {
    const response = await fetch(url);
    const data = await response.json();
    videoUrl = data.sources[0].url; 
    console.log(videoUrl);
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

  let art: Artplayer & { hls?: Hls } | undefined;

  onMount(async () => {
    await fetchVideoUrl();
    art = new Artplayer({
      container: '.artplayer-app',
      url: videoUrl,
      type: 'm3u8',
      customType: {
        m3u8: playM3u8,
      },
    });
  });
</script>

<div class="artplayer-app h-60 sm:h-auto md:h-[35vh] lg:h-[45vh] xl:h-[55vh]"></div>