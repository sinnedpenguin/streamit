<script>
	import { Button } from "./ui/button";
  import { Github } from "lucide-svelte";
</script>

<footer class="mt-auto">
  <div class="mx-auto w-full max-w-screen-xl p-6 md:py-8">
    <div class="mb-1 block text-center text-sm text-muted-foreground">
      <a 
        target="_blank"
        href="https://github.com/sinnedpenguin/streamit"
      >
        <Button variant="ghost">
          <Github class="h-5 w-5" />
        </Button>
      </a>
    </div>
    <span class="block text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()}{" "}
      <a
        target="_blank"
        href="https://sinnedpenguin.me/"
        class="hover:underline" rel="noreferrer"
      >
        sinnedpenguin
      </a>
      . All Rights Reserved.
      <p class="mt-2">
        STREAMit! does not store any files on our server; we only link to the media hosted on 3rd-party services.
      </p>
    </span>
  </div>
</footer>